# Tasks Done Till Now — SAP SAC Learning Portal

Last updated: 30 May 2026

This file summarises all work completed on the **SAP Analytics Cloud (SAC) Absolute Beginner Learning Portal** for the RetailCo India case study track.

---

## Project goal

Build a beginner-friendly, story-based 14-day SAC learning website for someone with no prior SAP experience. Lessons use the **RetailCo India FMCG** case study (five regions, beverages/snacks/personal care), daily checklists, official SAP documentation links, copy-paste AI prompts, and visual flow charts — no embedded YouTube on the beginner track.

---

## Files created / modified

| File | Purpose |
|------|---------|
| `index.html` | Landing page — beginner track primary; Power BI track marked coming soon |
| `sap_sac_beginner_portal.html` | Main beginner portal entry point |
| `sap_sac_learning_portal.html` | Power BI track (deferred — not current focus) |
| `css/sac-portal.css` | Shared enterprise design system, story UI, flow chart styles |
| `js/sac-links.js` | Verified SAP documentation URLs |
| `js/data-beginner.js` | 14-day lesson content (topics, tasks, case notes) |
| `js/beginner-extras.js` | Story scenes, examples, glossaries, recaps, AI prompts, flow charts, technical notes |
| `js/retailco-data.js` | CSV data file registry, column mapping, validation totals, day-to-file map |
| `js/hands-on-puzzles.js` | Puzzle-style hands-on overrides for Days 2–7 (models & stories) |
| `data/*.csv` | RetailCo practice datasets (sales, planning seed, HR headcount) |
| `js/sac-portal.js` | Portal UI engine (tabs, progress, notes, rendering) |
| `.nojekyll` | GitHub Pages compatibility |
| `README.md` | Deploy and usage instructions |
| `tasks done till now.md` | This summary file |

---

## Version 1 vs Version 2 (May 2026)

| | **Version 1** | **Version 2** |
|---|---------------|---------------|
| Entry | `sap_sac_beginner_portal.html` | `sap_sac_beginner_portal_v2.html` |
| Progress key | `sac_beginner_state_v2` | `sac_beginner_v2_state` |
| Navigation | Classic paths (`Home → Create`, etc.) | ODE 2025–2026 side navigation |
| Geo enrichment | Short lesson (Region → Location Information) | Full wizard guide: By Area Name / Coordinates, Supported Locations, choropleth layers, US CSV fallback |
| Files | `js/data-beginner.js`, etc. | `js/*-v2.js`, `js/geo-enrichment-guide.js` |

**V1 was restored** — ODE edits were moved out so existing learners are not disrupted.

---

Portal updated for **Optimized Design Experience** era (2025 Q3 – 2026 QRC):

- **Navigation**: All hands-on steps use **side navigation → start pages** (Stories, Modeler, Files) — not legacy `Home → Create`
- **Story creation**: `Stories → + Create → Blank story (Canvas)` — ODE is default; Classic deprecated
- **Model import**: `Modeler → Model → Start with data → File` + **Prepare Data** step
- **Planning model**: `Modeler → Start with blank model → Enable Planning`
- **Just Ask** replaces deprecated Search to Insight (Day 6)
- **Reference tab**: New **SAC 2025–2026 navigation (ODE)** section with path cheat sheet, panels, modern features
- **Day 10**: Added in-chart Forecast path before full Smart Predict
- **`js/sac-links.js`**: `SAC_LINKS.ode` object + modern Help links (ODE, Just Ask, Data Panel, navigate)
- **Header badge**: `ODE 2025–2026` on beginner portal

Verification agent audit: ~80% concepts were already valid; main fixes were menu paths and deprecated NLQ feature names.

---

- **Modular JavaScript**: data (`data-beginner.js`) + enrichments (`beginner-extras.js`) + UI (`sac-portal.js`)
- **Script load order**: `sac-links.js` → `data-beginner.js` → `beginner-extras.js` → `retailco-data.js` → `hands-on-puzzles.js` → `sac-portal.js`
- **Progress & notes**: stored in browser `localStorage` under key `sac_beginner_state_v2`
- **GitHub Pages ready**: relative paths, `.nojekyll` present

### Beginner track CONFIG flags

- Video tab hidden (`hideVideoTab`)
- Visual tab hidden (`hideVisualTab`)
- Featured videos hidden (`hideFeaturedVideos`)
- Case study video hidden (`hideCaseStudyVideo`)
- Compare tab disabled
- **Long-page UX** — `collapseLessonSections: true` (accordion lessons, collapsed diagrams, jump outline)

---

## Handling long lesson pages (UX strategy)

As each day gained more lessons, diagrams, and technical boxes, full scroll became unwieldy. Two layers of mitigation:

### Within a day (content density)
| Technique | What it does | Default state |
|-----------|--------------|---------------|
| **Accordion lesson cards** | Each lesson is a `<details>` block | First lesson open |
| **Collapsed diagrams section** | Diagrams & tables in `<details>` with count badge | Collapsed |
| **Jump to lesson outline** | Quick links when 4+ lessons | Visible |
| **Comparison tables** | Side-by-side contrasts instead of tall arrow flows | By topic |

### Portal structure (May 2026 UX restructure)

The old layout stacked **6 top tabs**, **5 metric cards**, a **hero progress card**, and **14 expandable day rows** — too many layers before reaching content.

**New information architecture (4 sections):**

| Tab | Purpose |
|-----|---------|
| **Case Study** (default) | RetailCo intro, team, phases + **Start building →** opens Learn Day 1 |
| **Learn** | Sidebar day nav + single-day workspace |
| **Reference** | Trial setup, **RetailCo CSV data files**, SAP doc library, performance tips |
| **Journal** | Global learning diary |

Hero **Continue learning** button → Learn tab on first incomplete day.

**Key structural changes:**
- **Single-day focus** — sidebar picks Day 1–14; only one day's content renders at a time (no 14 nested accordions)
- **Sticky phase sidebar** — days grouped by phase with completion checkmarks; Days 11–14 show **Update in progress** badge
- **Continue button** — hero CTA jumps to first incomplete day
- **Compact hero** — one progress bar instead of duplicate metric strip + hero card
- **Case study** — dedicated **Case Study** tab (default landing); **Start building** CTA opens Learn Day 1
- **Cleaner day tabs** — text labels (Lesson · Hands-on steps · Tasks · Resources · Ask AI · Notes · Case)
- **Pinned day header** — day title, progress, and tabs stick below site header while scrolling
- **Compact pinned mode** — header shrinks when scrolled (subtitle hidden, single-line title)
- **Lesson task rail** — Tasks checklist pinned on the right while reading Lesson (desktop); stacks below on tablet/mobile
- **Combined progress** — sidebar mini-bar + header pill count **tasks + hands-on steps** (e.g. `8/18 done`)
- **Hands-on steps tab** — click-by-click SAC walkthroughs with checkable steps (all 14 days)
- **Deep links** — `#day-5` opens Learn view on that day

CSS: `.learning-shell`, `.day-sidebar`, `.day-workspace`, `.day-workspace-sticky`, `.lesson-task-rail`, `.day-nav-progress-wrap`, `.btn-continue`

Logic: `sac-portal.js` — `setActiveDay()`, `renderDaySidebar()`, `renderDayWorkspace()`, `getContinueDay()`, `getDayProgress()`, `initStickyCompact()`, `updateDayProgressUI()`

CONFIG: `contentUpdatedThroughDay: 10` in `data-beginner.js`

**Not used:** separate HTML page per day (breaks progress/notes continuity).

---

## UI tabs (per day)

| Tab | Content |
|-----|---------|
| **Lesson** | Opening scene, day intro, **Hands-on steps callout**, glossary, diagrams, lesson cards, recap — **+ task rail on the right (desktop)** |
| **Hands-on steps** | Click-by-click SAC walkthroughs with **checkable steps** (saved in browser) — all 14 days |
| **Tasks** | Full outcome checklist (synced with Lesson task rail) |
| **Resources** | Official SAP doc links |
| **Ask AI** | Copy-paste prompts |
| **Notes** | Personal notes per day |
| **Case** | RetailCo business angle for the day |

---

## Content enrichment

**Portal content updated through Day 10** (Days 11–14 remain draft in data files).

Each enhanced day includes in `beginner-extras.js`:

- **STORY_SCENES** — narrative opening
- **TOPIC_EXAMPLES** — concrete ₹ RetailCo examples per lesson card
- **GLOSSARY** — key terms (7 terms on technical days)
- **STORY_RECAPS** — end-of-day summary
- **AI_PROMPTS** — 4 copy-paste prompts per day
- **FLOW_CHARTS** — pipeline flows + comparison tables
- **TOPIC_TECHNICAL** — per-lesson technical boxes (Days 2–10)
- **HANDS_ON_STEPS** — guided SAC click paths per day (Create Model, Build Story, Data Actions, Smart Predict, go-live)
- **DATA_SOURCES** + **DAY_DATA_FILES** (`retailco-data.js`) — CSV downloads, column mapping, Nandan's validation totals
- **Puzzle hands-on** (`hands-on-puzzles.js`) — story/puzzle format for Days 2–7 with pieces, clues, verify checks
- **linkBundles** — doc-focused official links per phase

### RetailCo CSV data files (`data/`)

| File | Used from | SAC object | Key validation |
|------|-----------|------------|------------------|
| `retailco_sales_analytic.csv` | Day 3 | RetailCo_Sales_Analytic | **23,760 rows · 31 columns · ₹346.04 Cr** |
| `retailco_distributor_master.csv` | Day 5 | Blend on Distributor_ID | **396 rows** |
| `retailco_product_master.csv` | Day 3/6 | SKU lookup | **15 SKUs** |
| `retailco_planning_seed.csv` | Day 7 | Planning Actual | **5,040 rows** (+ Channel) |
| `retailco_hr_headcount.csv` | Day 8–9 | Headcount | **300 rows · 5 departments** |
| `retailco_sales_analytic_us.csv` | V2 Day 4 | US geo practice | **24,480 rows** |

Shown in **Reference → Data files**, **Reference → Stories & charts guide**, **Lesson tab** (days that use files), and top of **Hands-on steps**.

Regenerate CSVs anytime: `python3 scripts/generate_retailco_data.py` (writes `data/retailco_validation.json` with exact totals).

### Day 2 additions (technical focus)

- **TOPIC_TECHNICAL** — per-lesson technical boxes (tenant URL, home screen objects, Model→Story chain, live vs import, Optimized Story)
- Enhanced lesson stories in `data-beginner.js` with SAP ID, BTP regions, Builder panel, SQL/OData, etc.
- Extra daily tasks (object layer classification, sketch Model→Story diagram)

---

## Flow charts & comparison tables

Visual diagrams in the **Story lesson** tab via `FLOW_CHARTS` in `beginner-extras.js`:

- **Pipeline flows** (vertical arrows) — data journeys, import pipelines, build order
- **Comparison tables** — Live vs Import, Dimensions vs Measures, Analytic vs Planning, DAC users, etc.

Section label: **📊 Diagrams & comparison tables**

### Day 1 flow charts

1. **RetailCo data journey** — stores → S/4HANA → Datasphere → SAC → CEO
2. **SAC's three jobs** — BI · Planning · Smart Predict (horizontal)

### Day 2 flow charts

1. **SAC trial access flow** — sap.com → trial → tenant URL → home screen
2. **Model → Story dependency** — Connection → Model → Story → End user
3. **Live vs Import** — runtime query vs copy in SAC HANA (horizontal comparison)
4. **Optimized Story page types** — Canvas vs Responsive (horizontal)

### Day 8 flow charts

1. **Data Action step types** — Copy · Allocation · Distribution · Advanced Formula
2. **Copy step scope** — source/target filters
3. **Allocation vs Distribution** — driver-based vs fixed %
4. **Month-end button workflow** — Nandan click → chained steps

### Day 9 flow charts

1. **RetailCo month-end Multi Action** — import → Data Action → unlock → lock → notify
2. **LOOKUP vs RESULTLOOKUP** — comparison table
3. **Data lock states** — Open · Restricted · Locked
4. **Multi Action vs single Data Action** — scope, trigger, monitor

### Day 10 flow charts

1. **Smart Predict four-step workflow** — prepare → train → apply → story
2. **Scenario types** — Classification · Regression · Time series
3. **Forecast chart legend** — solid / dashed / shaded band
4. **Standalone Smart Predict vs Predictive Forecast** — story vs planning version
5. **Forecast accuracy guide** — ≥85% / 70–84% / &lt;70% thresholds

CSS classes: `.flow-chart`, `.flow-node`, `.flow-arrow`, `.flow-node-highlight`, `.lesson-technical`, `.collapsible-section`, `.lesson-collapsible`

## RetailCo case study characters

| Character | Role |
|-----------|------|
| Chinnu | CEO — wants one Monday dashboard |
| Mona | SAC Analyst — **that's you**, the learner |
| Nandan | Head of Finance — budgets, forecasts, month-end close |
| Menon | South Regional Sales Manager — product drilldown |

---

## 14-day roadmap phases

| Phase | Days | Focus |
|-------|------|-------|
| Phase 1: SAP Foundation | 1–2 | Ecosystem + SAC UI orientation |
| Phase 2: BI & Modeling | 3–6 | Models, calculations, executive dashboard |
| Phase 3: Planning | 7–9 | Budget entry, data actions, automation |
| Phase 4: Predictive | 10–11 | Smart Predict, presentation |
| Phase 5: Advanced & Integration | 12–14 | Live architecture, hybrid connections, go-live |

---

## Day-by-day review status

| Day | Status | Notes |
|-----|--------|-------|
| **Day 1** | ✅ Reviewed & approved | Ecosystem story, 2 flow charts |
| **Day 2** | ✅ Enhanced | Technical depth + 4 flow charts + technical boxes |
| **Day 3** | ✅ Enhanced | Analytic modeling, 4 flow charts, technical boxes, Nandan in story |
| **Day 4** | ✅ Enhanced | Calculated/restricted measures, geo, DAC, 4 flow charts |
| **Day 5** | ✅ Enhanced | Executive Page 1, KPIs, charts, filters, theme, tables |
| **Day 6** | ✅ Enhanced | Linked analysis, Page 2, Smart Insights, PDF, Visual tab removed |
| **Day 7** | ✅ Enhanced | Planning model, versions, write-back, Nandan data entry |
| **Day 8** | ✅ Enhanced | Data Actions — copy, allocation, distribution, headcount |
| **Day 9** | ✅ Enhanced | Advanced Formula, Multi Actions, locks, Planning Calendar, Job Monitor |
| **Day 10** | ✅ Enhanced | Smart Predict time series, confidence bands, dashboard forecast |
| Days 11–14 | 📝 Draft · **Content update in progress** | Continue when user says proceed |

> **Summary:** Content and enrichments are **updated through Day 10**. Portal UX restructured to single-day focus with sidebar navigation (May 2026).

## Explicitly deferred

- **Power BI track** — content exists in separate files; user asked to focus on beginner track first
- **YouTube embeds** — removed/hidden on beginner track; official docs used instead

---

## How to open the portal

1. Open `index.html` or `sap_sac_beginner_portal.html` in a browser
2. Or serve locally: `python3 -m http.server 8765` and visit `http://localhost:8765/sap_sac_beginner_portal.html`
3. Deploy to GitHub Pages from repo root (see `README.md`)

---

## Next steps (when user says "proceed")

1. Review and enhance **Day 11** — presentation mode, PDF export, Analytics Catalog, certification path
2. Continue day-by-day through Days 12–14 (live architecture, hybrid connections, go-live)
3. ~~Optional: sample RetailCo CSV download for Day 3 hands-on steps~~ ✅ Done — see `data/` and Reference tab
4. Optional: Power BI track when beginner track is complete

---

*End of summary.*
