# Effort Estimate

# FlashCard App Migration Effort Estimate

## 1. Complexity Rating
**MEDIUM.**
- **Why:** The app is modular (about 18 components, modular CSS, moderate Context API state, basic Express backend), and lacks third-party UI/state libraries—reducing some complexity. However, all component and state logic must be manually rewritten to Vue.js, modular CSS retargeted, and React idioms unpicked. There are some backend API integrations. No automated tooling exists, so migration is hands-on, but not unusually difficult for a modern JS frontend team.

## 2. Timeline by Team Size
**Total Dev Hours:** _104–132 hours_ (phase-by-phase in reasoning tree)

**Small Team (1–2 devs):**
- 1 dev: 3.5–4.5 weeks (18–22 workdays)
- 2 devs: 2.5–3 weeks (10–15 workdays, some parallelization/overhead)

**Medium Team (3–5 devs):**
- 1.5–2 weeks (7–10 workdays; parallelize components/tests, but code review/merge required)

**Large Team (6+ devs):**
- 
Minimum possible: ~1 week (5–6 workdays) — bottlenecks in specialized tasks, code reviews, and serial phases (docs, final QA, state wiring, etc.)

**Assumptions:** All estimates assume focused dev work (6–7 effective hours/day), no major external blockers or unexpected architectural pitfalls.

## 3. Cost Estimate ($150/hr)
- **Low end:** 104 hrs x $150 = **$15,600**
- **High end:** 132 hrs x $150 = **$19,800**

## 4. Main Migration Risks
**Risks most likely to delay/inflate project scope:**
1. **Manual Rewrite Errors:** SFC conversion is manual; missing prop/event/lifecycle logic can cause slow debugging.
2. **Uncovered React idioms:** Hidden custom hooks or context usages could require unexpected refactoring.
3. **State Re-architecture Issues:** Nontrivial state flows, async logic, or context coupling may add time.
4. **No Auto-Migration Tools:** All conversion (component/test/state/doc) is fully manual, making quality reviews crucial.
5. **Styling (CSS) Quirks:** Scoped `<style>` migration can break at edge cases if naming/scoping differs subtly.
6. **Backend Integration Glitches:** Changing frontend API wiring could reveal previously unnoticed backend/data coupling.
7. **Test Migration Coverage Gaps:** Legacy test dependencies on React or Jest may not translate cleanly to Vue/Vitest, requiring new tests.
8. **Doc/QA Drift:** Outdated onboarding, API docs, or missing migration notes can slow down hand-off and bug fixes.
9. **Coordination Overhead:** More pronounced in larger teams; review merges, conflicting PRs, and code review cycles can add days.

---

## **Summary Table**
| Team Size      | Timeline       | Total Cost      |
|----------------|---------------|----------------|
| Small (1–2)    | 2.5–4.5 weeks | $15,600–$19,800 |
| Medium (3–5)   | 1.5–2 weeks   | $15,600–$19,800 |
| Large (>6)     | ~1 week       | $15,600–$19,800 |

_Actual timeline depends on project familiarity, hidden code complexity, and QA/bug cycles. All core phases (prep, SFC rewrite, state, CSS, backend, tests, docs/QA) are included. Reviewing migration risks and setting interim deliverables will help control costs and delays._

**In summary:**
- _This FlashCard app migration is practical but requires careful manual effort._
- _Budget: $16–20k, delivered in 1–4 weeks based on team size._
- _Active risk tracking and incremental QA are essential to hitting timeline and cost targets._