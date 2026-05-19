## Goal
- Achieve 100% certification match across all 5 target certifications with interactive code examples, auto-complete from inline checkpoints, empty project templates, and professional UI

## Constraints & Preferences
- All 120 topics must have enriched teaching content (not placeholder), executable code examples pre-loaded in playgrounds, and 5 interview-style questions per topic
- Auto-complete when inline checkpoints are answered correctly; fail < 3/5 forces topic repeat
- Projects must be empty templates with requirements only, not pre-filled walkthroughs
- Side navigation must look modern (not "ugly")
- Spreadsheet must have menu/options (sort, filter, chart) — not just raw grid
- Comparison includes Google Data Analytics Cert, Microsoft PL-300, Tableau Desktop Specialist, CompTIA Data+, and IBM Data Analyst Cert — must reach 100% match with NO gaps

## Progress
### Done
- Full curriculum audit of all 120 topics completed
- Code examples pre-loaded in playgrounds
- Formula engine: VLOOKUP, XLOOKUP, SUM, AVERAGE, MIN, MAX, IF, range arithmetic
- Playground assignment: id-based (w5-w12 → SQL, w13-w17 → Python) + code block detection
- 9 certification gap sections added (ETL/OLTP/OLAP, Power Query, DAX Time Intel, LOD Expressions, Groups/Sets/Parameters, ASK Framework, AI/GenAI, RLS/OLS, Dashboard Actions)
- **Checkpoint auto-complete**: CheckpointCard state lifted to parent via `onAnswer` callback + `checkpointResults` state; `useEffect` auto-calls `toggleTask` when all checkpoints answered correctly
- **Quiz threshold**: changed 80% → 60% (3/5)
- **Chart keyword routing**: `chart` moved from LiveSheet to BIDashboard keywords; `visual` added too
- **Side nav**: progress bars per week, compact topic buttons, green checkmarks, scale effect on active topic
- **Empty project templates**: all 6 capstones cleared to requirements-only briefs
- **LiveSheet toolbar**: Sort (by column asc/desc), Filter (by column + text), Chart (SVG bar chart from sorted data)
- Build: `npm run lint` → 0 errors; `npm run build` → ~974 KB JS + 70 KB CSS, 2263 modules
- **all 24 weeks present in data.ts** (regenerated from generate-full.ts)
- **5 interview-style quiz questions per topic** across all 120 topics via supplementQuiz function in generate-full.ts

## Relevant Files
- `CoursePlayer.tsx`: checkpoints state management, auto-complete, playground routing, side nav
- `QuizModal.tsx`: 60% pass threshold, retry button on fail
- `LiveSheet.tsx`: sort/filter/chart toolbar, formula engine, 6 presets
- `data.ts`: all 120 topics, cert gap content, capstone briefs
- `BIDashboard.tsx`, `PythonPlayground.tsx`, `SqlPlayground.tsx`: content-based code loading
