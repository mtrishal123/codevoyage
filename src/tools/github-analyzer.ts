import express, { Request, Response } from 'express';
import { Octokit } from '@octokit/rest';
import axios from 'axios';

const app = express();
app.use(express.json());

// Initialize Octokit (GitHub API client)
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Optional: for higher rate limits
});

interface RepoAnalysisRequest {
  repoUrl: string;
}

interface RepoAnalysisResponse {
  owner: string;
  repo: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  openIssues: number;
  readme: string;
  fileStructure: string[];
  dependencies: Record<string, any>;
  topics: string[];
  license: string;
}

// Helper: Parse GitHub URL
function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace('.git', '') };
}

// Helper: Get README content
async function getReadme(owner: string, repo: string): Promise<string> {
  try {
    const { data } = await octokit.repos.getReadme({ owner, repo });
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return content;
  } catch (error) {
    return 'No README found';
  }
}

// Helper: Get repository tree (file structure)
async function getFileStructure(owner: string, repo: string): Promise<string[]> {
  try {
    const { data } = await octokit.git.getTree({
      owner,
      repo,
      tree_sha: 'HEAD',
      recursive: '1',
    });
    
    return data.tree
      .filter((item: any) => item.type === 'blob')
      .map((item: any) => item.path)
      .slice(0, 50); // Limit to first 50 files
  } catch (error) {
    return [];
  }
}

// Helper: Get package.json dependencies
async function getDependencies(owner: string, repo: string): Promise<Record<string, any>> {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'package.json',
    });
    
    if ('content' in data) {
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      const packageJson = JSON.parse(content);
      return {
        dependencies: packageJson.dependencies || {},
        devDependencies: packageJson.devDependencies || {},
      };
    }
  } catch (error) {
    // Try other common files
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path: 'requirements.txt',
      });
      if ('content' in data) {
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        return { requirements: content.split('\n').filter(Boolean) };
      }
    } catch {}
  }
  return {};
}

// Main endpoint: Analyze repository
app.post('/analyze-repo', async (req: Request, res: Response) => {
  try {
    const { repoUrl } = req.body as RepoAnalysisRequest;
    
    if (!repoUrl) {
      return res.status(400).json({ error: 'repoUrl is required' });
    }

    const parsed = parseGitHubUrl(repoUrl);
    if (!parsed) {
      return res.status(400).json({ error: 'Invalid GitHub URL' });
    }

    const { owner, repo } = parsed;

    // Fetch repository data
    const [repoData, readme, fileStructure, dependencies] = await Promise.all([
      octokit.repos.get({ owner, repo }),
      getReadme(owner, repo),
      getFileStructure(owner, repo),
      getDependencies(owner, repo),
    ]);

    const response: RepoAnalysisResponse = {
      owner,
      repo,
      description: repoData.data.description || '',
      language: repoData.data.language || 'Unknown',
      stars: repoData.data.stargazers_count,
      forks: repoData.data.forks_count,
      openIssues: repoData.data.open_issues_count,
      readme: readme.substring(0, 5000), // Limit README length
      fileStructure: fileStructure.slice(0, 30),
      dependencies,
      topics: repoData.data.topics || [],
      license: repoData.data.license?.name || 'No license',
    };

    res.json(response);
  } catch (error: any) {
    console.error('Error analyzing repository:', error);
    res.status(500).json({ 
      error: 'Failed to analyze repository',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', service: 'github-analyzer' });
});

const PORT = process.env.TOOL_PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 GitHub Analyzer Tool running on http://localhost:${PORT}`);
});

export default app;