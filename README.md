# 🚢 CodeVoyage

**AI-Powered Tech Stack Migration Planning**

[![Built with Subconscious](https://img.shields.io/badge/Built%20with-Subconscious-orange)](https://subconscious.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Chart your migration journey with AI. Analyze codebases, research best practices, estimate effort, and create actionable migration roadmaps using multi-agent orchestration.

**[Live Demo](#)** • **[GitHub](https://github.com/mtrishal123/codevoyage)**

---

## 🎯 What is CodeVoyage?

CodeVoyage is an intelligent migration planning system that uses **4 specialized AI agents** working together to analyze your codebase and create comprehensive migration strategies. Instead of manually researching migration paths, estimating effort, and planning phases, CodeVoyage does it all automatically in ~15 minutes.

### Real-World Example

**Input:** 
- Repository: `github.com/your-org/react-app`
- Target: `Next.js 15 with TypeScript and App Router`

**Output (in ~15 minutes):**
- ✅ Complete tech stack analysis
- ✅ Migration research with official guides & case studies
- ✅ Effort estimates (timeline, cost, team size)
- ✅ Phase-by-phase migration roadmap
- ✅ Risk assessment & mitigation strategies

**Cost:** ~$0.25 per analysis

---

## ✨ Key Features

### 🤖 Multi-Agent Architecture
Four specialized AI agents work together like a consulting team:

| Agent | Purpose | Tools Used |
|-------|---------|------------|
| **Stack Analyzer** | Analyzes current tech stack, dependencies, architecture | Parallel Search, Web Search |
| **Migration Researcher** | Researches best practices, case studies, tools | Exa Search, Exa Crawl |
| **Effort Estimator** | Estimates timeline, cost, complexity | GPT-4.1 Reasoning |
| **Migration Planner** | Creates actionable roadmap with phases | GPT-4.1 Synthesis |

### 📊 Comprehensive Reports
- **Current Stack Analysis** - Languages, frameworks, dependencies, complexity rating
- **Migration Research** - Official guides, real case studies, common challenges
- **Effort Estimates** - Timeline by team size, cost breakdown, resource requirements
- **Migration Roadmap** - Phase-by-phase plan, tasks, deliverables, success metrics

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Subconscious API key ([Get one here](https://subconscious.dev))

### Installation
```bash
# Clone the repository
git clone https://github.com/mtrishal123/codevoyage.git
cd codevoyage

# Install backend dependencies
cd backend
npm install
cp .env.example .env
# Add your SUBCONSCIOUS_API_KEY to .env

# Install frontend dependencies
cd ../frontend
npm install
cp .env.example .env.local

# Run backend (Terminal 1)
cd backend
npm run dev

# Run frontend (Terminal 2)
cd frontend
npm run dev
```

Visit `http://localhost:3000` and start analyzing! 🎉

---

## 💡 How It Works
```
┌─────────────────────────────────────────────────────┐
│  User Input: GitHub URL + Target Stack             │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│          ORCHESTRATOR (Coordinates Agents)          │
└─────────────────────────────────────────────────────┘
                        ↓
        ┌───────────────┴───────────────┐
        ↓                               ↓
┌──────────────────┐          ┌──────────────────┐
│  Agent 1         │          │  Agent 2         │
│  Stack Analyzer  │  →       │  Migration       │
│                  │          │  Researcher      │
│  • Uses Parallel │          │  • Uses Exa      │
│    Search        │          │    tools         │
│  • Analyzes repo │          │  • Finds guides  │
└──────────────────┘          └──────────────────┘
        ↓                               ↓
┌──────────────────┐          ┌──────────────────┐
│  Agent 3         │          │  Agent 4         │
│  Effort          │  →       │  Migration       │
│  Estimator       │          │  Planner         │
│                  │          │                  │
│  • Calculates    │          │  • Creates       │
│    timeline/cost │          │    roadmap       │
└──────────────────┘          └──────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│   Complete Migration Analysis (4 Reports)           │
│   • Current Stack  • Research  • Estimate  • Plan   │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Language:** TypeScript
- **Framework:** Express
- **AI Platform:** Subconscious (Multi-agent orchestration)
- **Tools:** Parallel Search, Exa Search, Exa Crawl

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Custom CSS
- **Deployment:** Render

### AI Engines Used
- **tim-gpt** (Primary) - GPT-4.1 backed, balanced performance

---

## 📖 Architecture
```
codevoyage/
├── backend/                 # Node.js + TypeScript backend
│   ├── src/
│   │   ├── agents/         # 4 specialized AI agents
│   │   │   ├── current-stack-analyzer.ts
│   │   │   ├── migration-researcher.ts
│   │   │   ├── effort-estimator.ts
│   │   │   ├── migration-planner.ts
│   │   │   └── orchestrator.ts
│   │   ├── server.ts       # Express API
│   │   └── types.ts
│   └── outputs/            # Generated reports
├── frontend/               # Next.js frontend
│   ├── app/
│   │   ├── page.tsx       # Landing page
│   │   ├── analyze/       # Analysis progress
│   │   └── results/       # Results display
│   └── main.css
└── README.md
```

---

## 🏆 Key Achievements

### Innovation
- ✅ **Multi-Agent Orchestration** - Coordinates 4 specialized agents for migration planning
- ✅ **Tool Integration** - Combined Parallel Search + Exa tools for comprehensive research
- ✅ **Production Quality** - Professional output ready for team execution

### Performance
- ⚡ **15-20 minute** analysis time
- 💰 **~$0.25** per complete analysis
- 📊 **50,000+ tokens** of comprehensive documentation
- 🎯 **100% success rate** on tested repositories

### Platform Contributions
During development, discovered and documented critical bugs in the Subconscious platform:
- 🐛 **tim-edge engine completely broken** - Returns "Failed to parse URL from /pipeline" error
- 🐛 **Planning loops** - Complex prompts cause infinite planning without execution
- 💡 **Workarounds implemented** - Used tim-gpt + simplified prompts

---

## 🎯 Use Cases

### For Development Teams
- **Planning Tech Stack Upgrades** - React 17 → 18, Python 2 → 3
- **Framework Migrations** - CRA → Next.js, Vue 2 → Vue 3
- **Language Transitions** - JavaScript → TypeScript

### For Engineering Managers
- **Effort Estimation** - Timeline and cost projections
- **Resource Planning** - Team size and skill requirements
- **Risk Assessment** - Identify potential blockers

### For CTOs/Tech Leads
- **Strategic Planning** - Evaluate migration feasibility
- **Budget Allocation** - Cost-benefit analysis
- **Vendor Evaluation** - Compare migration approaches

---

## 🚀 Deployment

### Environment Variables

**Backend:**
```bash
SUBCONSCIOUS_API_KEY=your_api_key_here
PORT=3001
```

**Frontend:**
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Deploy to Render

**Backend:**
1. Create Web Service on Render
2. Connect GitHub repo
3. Root Directory: `backend`
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`
6. Add Environment Variable: `SUBCONSCIOUS_API_KEY`

**Frontend:**
1. Create Web Service on Render
2. Connect GitHub repo
3. Root Directory: `frontend`
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`
6. Add Environment Variable: `NEXT_PUBLIC_API_URL`

---

## 📊 Example Output

### Stack Analysis
```markdown
## Current Tech Stack Analysis

**Primary Language:** JavaScript (ES6+, React 19.2.1)
**Framework:** Create React App
**State Management:** Context API with custom hooks
**Routing:** React Router DOM v7.1.1
**Build Tool:** Webpack (via CRA)
**Complexity:** MEDIUM
**Estimated LOC:** 2,000-3,000
```

### Effort Estimate
```markdown
## Effort Estimate

**Complexity:** MEDIUM
**Timeline:**
- Small team (1-2 devs): 4-6 weeks
- Medium team (3-5 devs): 2-4 weeks
- Large team (6+ devs): 2-3 weeks

**Cost Estimate:** $12,000 - $18,000
(Based on 80-120 developer hours @ $150/hr)
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Subconscious** - For building an amazing multi-agent platform
- **Exa** - For powerful semantic search capabilities
- **Render** - For deployment infrastructure
- **Anthropic** - For Claude AI assistance during development

---

## 📧 Contact

**Trishal Varma Mudunuri**
- GitHub: [@mtrishal123](https://github.com/mtrishal123)
- Project: [CodeVoyage](https://github.com/mtrishal123/codevoyage)

---

## 🌟 Star History

If you find CodeVoyage useful, please consider giving it a ⭐ on GitHub!

---

**Built with ❤️ using Subconscious AI Platform**