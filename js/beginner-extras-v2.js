/**
 * Beginner track — story scenes, examples, glossaries, recaps, AI prompts
 */
(function () {
  const L = window.SAC_LINKS;

  window.SACPortalExtras = {
    CHARACTERS: {
      you: "Mona — SAC Analyst and learner (that's you)",
      ceo: "Chinnu — RetailCo CEO",
      finance: "Nandan — Head of Finance",
      south: "Menon — South Regional Sales Manager"
    },

    STORY_SCENES: {
      1: "It is Mona's first Monday at <strong>RetailCo India</strong>. CEO Chinnu walks her to a whiteboard covered in sticky notes — North, South, East, West, Central — and says: <em>\"We sell snacks and drinks across India, but I still get five different Excel files every week. I need one place to see the truth. That's why you're here — and that's what SAP Analytics Cloud will become for us.\"</em> Before Mona touches any software today, she needs to understand the world Chinnu lives in.",
      2: "Chinnu forwards Mona an email with a link: <em>\"Your SAC trial is ready — tenant URL inside. Log in and explore; break things if you need to.\"</em> Mona opens <code>https://[tenant].us10.hcs.cloud.sap</code>, heart beating a little fast. The home screen lists Stories, Models, Connections — menus she's never seen. Chinnu calls: <em>\"Don't worry — everyone feels lost on Day 1. Find Stories and Models first. Today is about object types and connection mechanics, not perfection.\"</em>",
      3: "Menon sends Mona a WhatsApp: <em>\"Can you tell me our beverage numbers for March? I have them in a CSV somewhere…\"</em> Minutes later, <strong>Nandan</strong> from Finance forwards the same figures as an Excel attachment: <em>\"Please stop us emailing this every month.\"</em> Mona sees the pattern — Date, Region, Product, Revenue, Units, Target — scattered across files. Today she imports RetailCo's sales CSV into SAC, maps columns to <strong>dimensions and measures</strong>, and builds her first <strong>Analytic Model</strong>. Get the totals wrong by ₹1 and every dashboard for two weeks lies.",
      4: "Chinnu opens a draft dashboard Mona built from yesterday's model and frowns: <em>\"I see total revenue, but are we hitting target? Which region is behind? Put India on a map — and Menon keeps asking why he can see North's numbers. Fix all of that today.\"</em> Raw imports aren't enough. Mona adds <strong>calculated measures</strong> (% vs Target, YTD), <strong>geo enrichment</strong> for a regional map, and <strong>Data Access Control</strong> so Menon sees South only.",
      5: "It is Monday morning. Chinnu's ritual: coffee, laptop, dashboard. He wants three answers in ten seconds — <em>\"How much did we sell? Who is winning? Are we growing?\"</em> Today Mona builds Page 1 of his executive story: three big KPI tiles, a region bar chart, a monthly trend line, and dropdown filters. This is the page that earns her trust.",
      6: "Menon calls Mona: <em>\"South looks good on Page 1, but which snack SKUs are actually driving it? I don't want another report request — I want to click and see.\"</em> Static dashboards won't cut it. Today Mona adds <strong>Page 2</strong>, configures <strong>linked analysis</strong> from the region bar chart, enables drilldown, turns on Smart Insights, and exports PDF for Chinnu's board pack.",
      7: "Nandan from Finance emails Mona a thick Excel file, CC'ing Chinnu: <em>\"This is our FY2026 budget — five regions, three categories, twelve months. We email versions back and forth until someone overwrites the wrong tab. Can SAC be our one budget workbook that never breaks?\"</em> Welcome to <strong>Planning</strong> — where numbers get typed in and saved, not just viewed.",
      8: "Nandan sighs on a Friday call: <em>\"Every month I copy last month's actuals, add 10% growth for South, and spread COGS across products by hand. It takes Finance all afternoon.\"</em> Mona builds him a <strong>Data Action</strong> button: one click, done. Nandan thinks she's magic — she's just automating what Finance used to do by hand.",
      9: "Month-end at RetailCo is controlled chaos — load actuals, refresh forecast, let planners adjust, lock approved numbers, email Chinnu. Mona asks him: <em>\"Can this run itself on the first of every month?\"</em> Today she chains steps into a <strong>Multi Action</strong> and puts it on the Planning Calendar. She is no longer building reports — she is designing how the company thinks.",
      10: "The warehouse manager in Hyderabad calls: <em>\"We're overstocked on cola in South but understocked on chips in East. Can you tell us what the next three months look like?\"</em> Chinnu tells Mona: <em>\"Use Smart Predict — show me a forecast with a range, not a guess.\"</em> Today SAC becomes a crystal ball backed by maths.",
      11: "Chinnu schedules a 10 AM review: <em>\"Show me everything we've built for RetailCo. Pretend I'm the board.\"</em> Mona's stomach flutters — good flutters. Today she polishes three story pages, exports a PDF, practices her narrative out loud, and sketches a path toward SAP certification. This is her graduation day for Phase 1–4.",
      12: "IT sends Mona a diagram: <em>\"In production we don't use CSV uploads — sales flows S/4HANA → Datasphere → SAC live. Your training import was practice wheels. Time for the real bicycle.\"</em> Today she learns how RetailCo's live architecture keeps Chinnu's Monday dashboard always fresh without copying millions of rows.",
      13: "Mona maps the integration puzzle for Chinnu: <em>\"Finance actuals come from S/4HANA, travel expenses from Concur, old history still lives in BW, and daily sales in Datasphere. Can one SAC tenant talk to all of them?\"</em> Yes — but each source speaks a different connection language. Today she draws the full family tree.",
      14: "Go-live week. Two hundred users will open Mona's dashboard on Monday. Chinnu's last question: <em>\"Will it load fast? Will South managers see only South? Can we move this from test to production safely?\"</em> Today Mona answers with weightage analysis, security roles, and a go-live checklist. She is ready."
    },

    GLOSSARY: {
      1: [
        { term: "ERP", meaning: "Software that records daily business transactions — orders, payments, inventory." },
        { term: "S/4HANA", meaning: "SAP's modern ERP system where RetailCo's official sales transactions live." },
        { term: "Datasphere", meaning: "Cloud warehouse that cleans and organises data before reporting." },
        { term: "SAC", meaning: "SAP Analytics Cloud — where charts, budgets, and forecasts are built." },
        { term: "BTP", meaning: "SAP's cloud platform hosting SAC and other services." }
      ],
      2: [
        { term: "Tenant", meaning: "Your isolated SAC environment on SAP BTP — unique URL, users, and objects." },
        { term: "SAP ID", meaning: "Universal login for sap.com, trial signup, and SAC authentication." },
        { term: "Story", meaning: "Presentation layer — charts and KPIs bound to a model." },
        { term: "Model", meaning: "Semantic data layer — dimensions, measures, calculations." },
        { term: "Live connection", meaning: "Runtime query to source — metadata only stored in SAC." },
        { term: "Import (Acquire)", meaning: "Data copied into SAC HANA — fast reads, scheduled refresh." },
        { term: "Side navigation", meaning: "Left menu — Stories, Modeler, Files, Connections (2025+ SAC shell)." },
        { term: "Optimized Story", meaning: "Only story type for new content since Q3 2025 — Canvas or Responsive pages." }
      ],
      3: [
        { term: "Analytic Model", meaning: "Import or live model for read-only BI dashboards and Smart Predict." },
        { term: "Planning Model", meaning: "Write-back model with Version dimension — Nandan uses this on Day 7." },
        { term: "Dimension", meaning: "Category axis — Region, Product, Month (labels, not summed)." },
        { term: "Measure", meaning: "Numeric field aggregated by SUM — Revenue, Units, Target." },
        { term: "Prepare Data", meaning: "Transform tool during import — fix dates, split columns, drop blanks." },
        { term: "Column mapping", meaning: "Assign each CSV column to a dimension or measure at import." },
        { term: "Public dimension", meaning: "Shared master data (e.g. Region) reusable across multiple models." }
      ],
      4: [
        { term: "Calculated measure", meaning: "Model-level formula — e.g. Revenue ÷ Target × 100 for % vs Target." },
        { term: "Restricted measure", meaning: "Measure with a fixed dimension filter — e.g. Beverages revenue only." },
        { term: "YTD", meaning: "Year-to-date — cumulative sum from fiscal year start to current period." },
        { term: "Fiscal year", meaning: "RetailCo starts April — Q1 is Apr–Jun, not Jan–Mar." },
        { term: "Geo enrichment", meaning: "Modeler wizard (Geo Enrichment) that creates a location dimension from coordinates or area names — not a single Region checkbox." },
        { term: "Location dimension", meaning: "Special dimension required for geo map choropleth layers — created by Geo Enrichment." },
        { term: "Supported Locations", meaning: "SAP catalog of spellings for countries/states — members must match exactly." },
        { term: "Choropleth map", meaning: "Map shaded by measure value — darker = higher revenue." },
        { term: "DAC", meaning: "Data Access Control — filters rows by user on a dimension (e.g. Region)." }
      ],
      5: [
        { term: "Optimized Story", meaning: "Modern dashboard — Canvas or Responsive pages bound to a model." },
        { term: "Builder panel", meaning: "Widget data slots — chart type, Rows, Columns, Measures." },
        { term: "Data Panel", meaning: "Story editor — add models, browse fields, drag to canvas (2026)." },
        { term: "KPI tile", meaning: "Single big number widget — often with variance vs target or prior period." },
        { term: "Input control", meaning: "Page-level dropdown/slider — filters all widgets on the page." },
        { term: "Canvas page", meaning: "Fixed desktop grid — Chinnu's executive layout." },
        { term: "Threshold", meaning: "Conditional colour rules on KPIs — green/amber/red by % vs Target." },
        { term: "Theme", meaning: "Story-wide fonts, colours, and chart styles — apply once, consistent everywhere." }
      ],
      6: [
        { term: "Linked analysis", meaning: "Click a chart → other widgets filter to that selection automatically." },
        { term: "Drilldown", meaning: "Navigate hierarchy — Year → Quarter → Month, or Category → SKU." },
        { term: "Rank filter", meaning: "Show top N only — e.g. top 5 products by Revenue on Page 2." },
        { term: "Smart Insights", meaning: "SAC explains anomalies in plain language on a chart." },
        { term: "Just Ask", meaning: "Type a question in natural language — SAC builds an answer chart." },
        { term: "Story filter", meaning: "Cross-page filter passed from Page 1 selection to Page 2." },
        { term: "Export PDF", meaning: "Board-ready snapshot of story pages — no SAC login required to view." }
      ],
      7: [
        { term: "Planning Model", meaning: "Write-back model with Version dimension — Nandan's budget home." },
        { term: "Write-back", meaning: "Planner types a number in SAC and saves it to the model." },
        { term: "Version", meaning: "Parallel data slice — Actual, Forecast, Budget." },
        { term: "Account dimension", meaning: "P&L rows — Gross Sales (INC), COGS (EXP), etc." },
        { term: "Data entry table", meaning: "Excel-like grid in a story — editable for planners." },
        { term: "Public vs private version", meaning: "Private = working copy; public = published for all planners." },
        { term: "Planner role", meaning: "Security role allowing edit on Budget version cells." }
      ],
      8: [
        { term: "Data Action", meaning: "On-demand planning script — Copy, Allocate, Formula steps." },
        { term: "Copy step", meaning: "Clone values version-to-version or period-to-period." },
        { term: "Allocation", meaning: "Spread a lump sum using a driver measure (e.g. Gross Sales)." },
        { term: "Distribution", meaning: "Split by fixed % you define — 40/35/25." },
        { term: "Driver dimension", meaning: "Basis for allocation — Product Category or Region." },
        { term: "Trigger button", meaning: "Story widget that runs a Data Action in one click." },
        { term: "Advanced Formula step", meaning: "Script inside a Data Action — headcount loop, growth %." }
      ],
      9: [
        { term: "Advanced Formula", meaning: "Planning script — LOOKUP, RESULTLOOKUP, IF in Data Actions." },
        { term: "RESULTLOOKUP", meaning: "Read value from another cell context (e.g. prior month)." },
        { term: "LOOKUP", meaning: "Read same slice across time (e.g. same month last year)." },
        { term: "Multi Action", meaning: "Chained job — Data Actions, locks, publish, notify." },
        { term: "Data lock", meaning: "Open / Restricted / Locked — edit control on versions." },
        { term: "Planning Calendar", meaning: "Schedule Multi Actions on date/time." },
        { term: "Job Monitor", meaning: "Execution log — success, failure, error details." }
      ],
      10: [
        { term: "Smart Predict", meaning: "Built-in ML in SAC — no external Python tools." },
        { term: "Time series", meaning: "Forecast future months from historical trend." },
        { term: "Classification", meaning: "Yes/no prediction — e.g. distributor churn." },
        { term: "Regression", meaning: "Predict a specific numeric outcome." },
        { term: "Confidence band", meaning: "Range showing forecast uncertainty (e.g. ₹78–92L)." },
        { term: "Forecast accuracy", meaning: "(1 − |Actual − Forecast| / Actual) × 100." },
        { term: "Predictive Forecast", meaning: "ML output written into planning Forecast version." }
      ],
      11: [
        { term: "Presentation mode", meaning: "Fullscreen story for executive meetings." },
        { term: "Data Analyzer", meaning: "Excel-like exploration without building a story." },
        { term: "Analytics Catalog", meaning: "App store where users find approved dashboards." },
        { term: "C_SAC", meaning: "SAP certification exam for Analytics Cloud skills." },
        { term: "Portfolio", meaning: "Screenshots + case study proving what you built." }
      ],
      12: [
        { term: "Live model", meaning: "SAC reads source at runtime — metadata only stored." },
        { term: "Cloud Connector", meaning: "Secure tunnel for on-premise SAP systems." },
        { term: "Business Data Cloud", meaning: "SAP's unified vision — Datasphere + SAC + partners." },
        { term: "Hybrid architecture", meaning: "Mix of live and import connections by purpose." },
        { term: "Analytic dataset", meaning: "Prepared data object in Datasphere for SAC." }
      ],
      13: [
        { term: "BW/4HANA", meaning: "Classic SAP data warehouse — still common in enterprises." },
        { term: "CDS View", meaning: "Pre-built analytical view in S/4HANA." },
        { term: "Calculation View", meaning: "Advanced data model built in SAP HANA." },
        { term: "Acquire", meaning: "Import connection — data copied into SAC." },
        { term: "Delta load", meaning: "Import only changed rows — faster refresh." }
      ],
      14: [
        { term: "Weightage", meaning: "Performance score per widget — find slow charts." },
        { term: "Activity auth", meaning: "Can user create stories or only view?" },
        { term: "Object auth", meaning: "Can user open this specific story?" },
        { term: "Transport", meaning: "Move content from dev → test → production tenant." },
        { term: "Go-live checklist", meaning: "Final verification before 200 users log in." }
      ]
    },

    HANDS_ON_STEPS: {
      1: [
        {
          title: "Create your free SAP accounts (before opening SAC)",
          goal: "Set up SAP ID, SAC trial, and Learning Hub access — ₹0 total.",
          steps: [
            { action: "Create SAP ID", menu: "sap.com → Sign In → Register", detail: "Use a personal email you check daily. This one login works for trial, Learning Hub, and Help Portal." },
            { action: "Register for SAC 30-day trial", menu: "sap.com → Products → SAP Analytics Cloud → Free Trial", detail: "Complete the form. Note the tenant URL in the confirmation email — bookmark it immediately." },
            { action: "Sign up for SAP Learning", menu: "learning.sap.com → Register", detail: "Same SAP ID. Optional today but useful for official courses later." },
            { action: "Bookmark Help Portal", menu: "help.sap.com/docs/SAP_ANALYTICS_CLOUD", detail: "Every day's Resources tab links here. Use the search box inside Help for specific features." },
            { action: "Verify login works", detail: "Open your tenant URL, sign in with SAP ID, confirm you see the SAC home screen with Stories and Models menus." }
          ],
          tip: "Day 1 is setup only — no models or stories yet. If trial signup fails, try a different browser or disable ad blockers for sap.com."
        }
      ],
      2: [
        {
          title: "Explore the SAC home screen",
          goal: "Learn where Stories, Models, and Connections live before building RetailCo.",
          steps: [
            { action: "Log in to your tenant", detail: "Open your bookmarked URL. Confirm tenant region in System → About if available." },
            { action: "Open Stories menu", menu: "Side navigation → Stories", detail: "Browse sample content. Open BestRunJuice or similar sample story if present — note chart types and filters." },
            { action: "Open Models menu", menu: "Side navigation → Modeler", detail: "Open a sample model. Identify dimensions (Region, Product) vs measures (Revenue)." },
            { action: "Locate start pages", menu: "Side navigation → Stories · Modeler", detail: "Each app has browse + create on one page — Modeler on Day 3, Stories on Day 5." },
            { action: "Open Files and Connections", menu: "Side navigation → Files · Connections", detail: "Files = uploaded CSVs. Connections = live or import sources. RetailCo CSV lands in Files on Day 3." }
          ],
          tip: "Spend 15 minutes clicking menus. Trial tenants are sandbox — you cannot break production data."
        },
        {
          title: "Create your first Optimized Story",
          goal: "One bar chart on any sample or imported data — practice the Builder panel.",
          steps: [
            { action: "Create a new story", menu: "Side navigation → Stories → + Create → Blank story (Canvas)", detail: "Select an existing model (sample or blank with sample data)." },
            { action: "Add a Canvas page", menu: "Story toolbar → Add page → Canvas", detail: "Canvas = fixed desktop layout for Chinnu's executive view later." },
            { action: "Insert a bar chart", menu: "Insert → Chart → Bar/Column", detail: "Drag to resize on the canvas grid." },
            { action: "Assign data in Builder panel", menu: "Builder panel → Rows / Columns / Measures", detail: "Put a dimension (Region or Product) on Rows and a measure (Revenue) on Measures." },
            { action: "Save the story", menu: "File → Save", detail: "Name it My_First_SAC_Story. You will replace this with RetailCo_Executive_Dashboard on Day 5." }
          ],
          tip: "Builder panel = data logic. Styling panel = colours and fonts. Confusing them is a common Day 2 mistake."
        }
      ],
      3: [
        {
          title: "Import RetailCo CSV and build RetailCo_Sales_Analytic",
          goal: "Create the analytic model that powers every dashboard through Day 10.",
          steps: [
            { action: "Upload CSV to Files", menu: "Files → Upload", detail: "Use RetailCo India FMCG sales CSV (Date, Region, Product Category, Revenue, Units, Target)." },
            { action: "Start model from file", menu: "Side navigation → Modeler → Model → Start with data → File", detail: "Select your uploaded CSV." },
            { action: "Run Prepare Data if needed", menu: "Import wizard → Prepare Data", detail: "Fix date format to consistent DD/MM/YYYY or YYYY-MM-DD. Remove blank rows. Trim Region text." },
            { action: "Map columns to dimensions", detail: "Region → Generic dimension. Product Category → Generic dimension. Date column → Date dimension (Month grain)." },
            { action: "Map columns to measures", detail: "Revenue → Decimal, SUM, ₹. Units Sold → Integer, SUM. Target → Decimal, SUM." },
            { action: "Preview and import", menu: "Import wizard → Preview → Import", detail: "Check row count matches source file. Fix any type errors before finishing." },
            { action: "Validate totals", menu: "Modeler → open model → view data", detail: "Sum Revenue across all regions/months — must match Nandan's Excel grand total exactly." },
            { action: "Save and name model", menu: "Model → Save as", detail: "Name: RetailCo_Sales_Analytic. Document grain: 5 regions × 3 categories × 12 months." }
          ],
          tip: "Mapping Revenue as a dimension is the #1 beginner error — if totals look wrong, check your dimension vs measure mapping first."
        }
      ],
      4: [
        {
          title: "Extend the model — calculations, map, and security",
          goal: "Add Pct_vs_Target, YTD, geo map, and DAC for Menon on RetailCo_Sales_Analytic.",
          steps: [
            { action: "Set fiscal year start", menu: "Modeler → Time dimension → Fiscal year", detail: "Set start month = April (Indian FY). Wrong setting breaks every YTD chart downstream." },
            { action: "Create Revenue YTD measure", menu: "Modeler → Calculated measure", detail: "Formula using YTD time navigation on Revenue. Test against manual Excel sum for Apr–current month." },
            { action: "Create Pct_vs_Target measure", menu: "Modeler → Calculated measure", detail: "Formula: [Revenue] / [Target] * 100. Handle divide-by-zero if Target can be zero." },
            { action: "Create Beverage_Revenue restricted measure", menu: "Modeler → Restricted measure", detail: "Revenue restricted to Product Category = Beverages. Use in a test KPI tile." },
            { action: "Run Geo Enrichment — By Area Name", menu: "Modeler → toolbar → Geo Enrichment", detail: "Country = India · Sub-Region = State column (NOT sales Region). Fix all issues in Details panel. Use retailco_sales_analytic_us.csv if India matching fails in trial." },
            { action: "Add choropleth geo map in story", menu: "Story → Geo Map → Choropleth/Drill layer", detail: "Bind location dimension + Revenue. Blank map → Save model again in Modeler. Keep bar chart by Region for sales territories." },
            { action: "Configure DAC for Menon", menu: "Modeler → Region → Data Access Control", detail: "Assign South-only access for Menon's user/team. Use Preview as user to confirm North data is hidden." },
            { action: "Save model", detail: "Re-save RetailCo_Sales_Analytic. All Day 5 story widgets will pick up new measures automatically." }
          ],
          tip: "Build calculations at model level — not in the story. One formula, reused everywhere, better performance."
        }
      ],
      5: [
        {
          title: "Build RetailCo_Executive_Dashboard — Page 1",
          goal: "Chinnu's Monday dashboard: KPIs, bar chart, line chart, and page filters.",
          steps: [
            { action: "Create Optimized Story", menu: "Side navigation → Stories → + Create → Blank story (Canvas)", detail: "Select model RetailCo_Sales_Analytic. Add Canvas page — name it Executive Summary." },
            { action: "Add three KPI tiles", menu: "Insert → KPI", detail: "(1) Total Revenue with variance vs Target. (2) Best Region — top-1 Revenue by Region. (3) MoM Growth % with prior month comparison." },
            { action: "Format Indian currency", menu: "Styling panel → Number format", detail: "Use lakhs/crores (₹ Cr) on all KPIs for readability." },
            { action: "Add bar chart by Region", menu: "Insert → Chart → Bar", detail: "Region on axis, Revenue on measure. South should be tallest (~₹2.1 Cr in sample data)." },
            { action: "Add line chart by Month", menu: "Insert → Chart → Line", detail: "Month (Date hierarchy) on axis, Revenue on measure — fiscal year trend." },
            { action: "Add page input controls", menu: "Insert → Input Control", detail: "Add Region and Product Category filters. Scope = entire page so all widgets update together." },
            { action: "Apply theme and thresholds", menu: "Story → Theme · KPI → Conditional formatting", detail: "Green ≥100% of target, amber 90–99%, red below 90% on Pct_vs_Target KPI." },
            { action: "Save story", menu: "File → Save as", detail: "Name: RetailCo_Executive_Dashboard." }
          ],
          tip: "Test filters: South + Beverages should update every widget on Page 1 simultaneously."
        }
      ],
      6: [
        {
          title: "Add Page 2 — linked analysis and export",
          goal: "Menon clicks South on Page 1 and sees his product detail on Page 2.",
          steps: [
            { action: "Add Page 2", menu: "Story → Add page → Responsive", detail: "Name: Product Detail. Responsive layout for Menon's tablet." },
            { action: "Build product bar chart", menu: "Insert → Chart → Bar", detail: "Product Category on axis, Revenue on measure. Add rank filter — top 5 by Revenue." },
            { action: "Add product detail table", menu: "Insert → Table", detail: "Columns: Product, Revenue, Units, Pct_vs_Target." },
            { action: "Configure linked analysis", menu: "Page 1 region bar → Linked Analysis panel", detail: "Set region bar as leader. Add Page 2 widgets as followers. Test all five regions." },
            { action: "Enable drill on line chart", menu: "Chart → Drill → Enable hierarchy", detail: "Drill Year → Quarter → Month on the trend line." },
            { action: "Enable Smart Insights", menu: "Region bar chart → Smart Insights", detail: "Read one insight aloud — practice explaining it to Chinnu in one sentence." },
            { action: "Export and share", menu: "Story → Export PDF · Share", detail: "Export both pages. Share view access. Test mobile preview on Page 2." }
          ],
          tip: "Demo pattern for interviews: click South → Page 2 updates instantly → read Smart Insights bullet."
        }
      ],
      7: [
        {
          title: "Create RetailCo_Planning and Nandan's budget table",
          goal: "First write-back model — Nandan types budget numbers and saves to SAC.",
          steps: [
            { action: "Create Planning Model", menu: "Side navigation → Modeler → Model → Start with blank model → Enable Planning", detail: "Not Analytic Model. Add dimensions: Account, Region, Product Category, Time, Version." },
            { action: "Set up Account hierarchy", menu: "Modeler → Account dimension", detail: "Gross Sales (INC), COGS (EXP), Marketing (EXP), Net Income. Match Nandan's P&L structure." },
            { action: "Create versions", menu: "Modeler → Version dimension", detail: "Add Actual, Forecast, Budget. Actual = loaded data. Budget = Nandan types in." },
            { action: "Load Actual data", menu: "Modeler → Import / Copy from analytic model", detail: "Seed Actual version from RetailCo_Sales_Analytic or CSV." },
            { action: "Enable planning on Budget accounts", menu: "Modeler → Account → Planning settings", detail: "Mark Budget account members as plannable for write-back." },
            { action: "Create planning story with data entry table", menu: "Side navigation → Stories → + Create → add Table widget", detail: "Bind to RetailCo_Planning. Rows = accounts/regions, columns = months, version = Budget." },
            { action: "Test write-back", detail: "Type a test value in April South Revenue Budget cell → Save → reload story → value must persist." },
            { action: "Save model", detail: "Name: RetailCo_Planning. Assign Planner role to Nandan test user before sharing." }
          ],
          tip: "Planning stories and BI stories are separate objects — both can link to the same Region names for consistency."
        }
      ],
      8: [
        {
          title: "Build Nandan's Friday Data Action",
          goal: "One-click copy, allocation, distribution, and headcount formula on RetailCo_Planning.",
          steps: [
            { action: "Open Data Actions", menu: "Side navigation → Data Actions", detail: "Create new Data Action on RetailCo_Planning." },
            { action: "Add Copy step", detail: "Source: Actual Dec closing → Target: Forecast Jan opening. Test on private Forecast version first." },
            { action: "Add Allocation step", detail: "Company COGS ₹50L → allocate to Beverages/Snacks/Personal Care using Gross Sales as driver. Verify product totals = source." },
            { action: "Add Distribution step", detail: "Marketing ₹20L → 40% / 35% / 25% across categories. Percentages must sum to 100%." },
            { action: "Add Advanced Formula step", detail: "Headcount loop: Closing = Opening + Hires − Terminations. Chain across months and regions." },
            { action: "Test run in Modeler", menu: "Data Action → Run / Test", detail: "Run on private version. Reconcile totals before adding trigger to story." },
            { action: "Add trigger button to planning story", menu: "Planning story → Insert → Planning Trigger", detail: "Bind to your Data Action. Nandan clicks once — all steps execute in sequence." }
          ],
          tip: "Never test Copy steps on Actual version first — always use a private Forecast sandbox."
        }
      ],
      9: [
        {
          title: "Chain month-end automation — Multi Action + Calendar",
          goal: "Schedule Nandan's month-end close: forecast, locks, notify.",
          steps: [
            { action: "Test Advanced Formula in model", menu: "Data Action → Advanced Formula step", detail: "Use RESULTLOOKUP for prior month headcount. Use IF for version-specific logic. Test in sandbox version." },
            { action: "Create Multi Action", menu: "Planning → Multi Actions → New", detail: "Name: RetailCo_Month_End_Close." },
            { action: "Add steps in order", detail: "(1) Import/load actuals (2) Run Day 8 Data Action (3) Unlock Forecast (4) Lock Actual (5) Optional notification." },
            { action: "Configure data lock", menu: "Modeler → Version → Lock settings", detail: "Lock closed Actual month. Keep Forecast Open for Nandan's edits." },
            { action: "Test Multi Action manually", menu: "Multi Action → Run now", detail: "Check each step in Job Monitor. Fix step order or locks if any step fails." },
            { action: "Schedule on Planning Calendar", menu: "Calendar → New job → attach Multi Action", detail: "Schedule 6 AM first business day of month (or a test time 5 minutes ahead)." },
            { action: "Verify in Job Monitor", menu: "Calendar → Job Monitor", detail: "Green = success. Red = open log, fix, re-run. Nandan checks before announcing to Chinnu." }
          ],
          tip: "Document each step on paper before building in SAC — wrong step order is the most common Multi Action failure."
        }
      ],
      10: [
        {
          title: "Forecast beverage demand with Smart Predict",
          goal: "Time series forecast for warehouse stocking — add dashed line + confidence band to Chinnu's dashboard.",
          steps: [
            { action: "Verify training data", menu: "Models → RetailCo_Sales_Analytic", detail: "Confirm 12+ months of beverage history by region. Clean nulls and outliers first." },
            { action: "Create predictive scenario", menu: "Side navigation → Smart Predict → Create", detail: "Choose Time Series. Source: RetailCo_Sales_Analytic or exported dataset with Date + Revenue." },
            { action: "Configure scenario", detail: "Target: Revenue. Filter: Product Category = Beverages. Group by Region. Horizon: 3 months ahead." },
            { action: "Train model", menu: "Smart Predict → Train", detail: "Review accuracy and variable importance. Do not apply if accuracy is below 70% — fix data first." },
            { action: "Apply forecast", menu: "Smart Predict → Apply", detail: "Inspect output values vs business sense (Diwali snack spike in October should appear in patterns)." },
            { action: "Add to executive story", menu: "RetailCo_Executive_Dashboard → Page 1 line chart", detail: "Solid line = Actual. Dashed = Forecast. Shaded band = 90% confidence interval." },
            { action: "Optional: Predictive Forecast in planning", menu: "RetailCo_Planning → Predictive forecast", detail: "Write ML output to Forecast version for Nandan to adjust before lock step in Multi Action." }
          ],
          tip: "Explain the confidence band to Chinnu in plain language: 'South beverages next month: ₹78–92L range, plan warehouse for the middle.'"
        }
      ],
      11: [
        {
          title: "Polish and present RetailCo to the CEO",
          goal: "Three-page story, presentation mode, PDF export, and a five-minute walkthrough.",
          steps: [
            { action: "Add Page 3 forecast summary", menu: "RetailCo_Executive_Dashboard → Add page", detail: "Line chart with actual + forecast + confidence band. One insight tile: Q4 Snacks risk in East." },
            { action: "Enable presentation mode", menu: "Story toolbar → Present", detail: "Fullscreen, no edit chrome. Practice Page 1 → 2 → 3 transitions." },
            { action: "Rehearse 60 seconds per page", detail: "Page 1: performance. Page 2: regional drivers. Page 3: forward forecast and warehouse action." },
            { action: "Export full story PDF", menu: "Story → Export → PDF", detail: "Include all three pages for Chinnu's board pack." },
            { action: "Test mobile / responsive preview", menu: "Story → Device preview", detail: "Confirm Page 2 product detail readable on tablet — Menon's use case." },
            { action: "Publish to Analytics Catalog", menu: "Share → Catalog (if enabled in tenant)", detail: "Document how regional managers discover approved stories." }
          ],
          tip: "Record yourself on phone presenting Page 1 — awkward first take is normal; third take is interview-ready."
        },
        {
          title: "Portfolio and certification prep",
          goal: "Capture deliverables and map completed days to C_SAC exam topics.",
          steps: [
            { action: "Screenshot each story page", detail: "Save PNGs for LinkedIn portfolio or interview deck." },
            { action: "Open Data Analyzer", menu: "Side navigation → Data Analyzer", detail: "Explore RetailCo_Sales_Analytic ad-hoc. Export one pivot to Excel." },
            { action: "Search C_SAC on Learning Hub", menu: "learning.sap.com → Search C_SAC", detail: "Bookmark one free prep course. Map Day 3–6 to BI, Day 7–9 to Planning." },
            { action: "Write one-page case study", detail: "Problem → SAC approach → RetailCo outcome. Save in Journal tab." }
          ],
          tip: "Employers care more about your RetailCo demo story than certification alone — lead with the dashboard."
        }
      ],
      12: [
        {
          title: "Create a live Datasphere connection (concept + trial)",
          goal: "Understand production architecture — live query vs CSV import.",
          steps: [
            { action: "Review your import model", menu: "Models → RetailCo_Sales_Analytic", detail: "Note: data is copied into SAC. Refresh = re-import." },
            { action: "Open Connections", menu: "Side navigation → Connections → Add", detail: "Look for Live → Datasphere (or SAP Datasphere). Trial may show connection types read-only — document menu path anyway." },
            { action: "Document connection fields", detail: "Host URL, authentication (OAuth / basic), space name — ask admin in real projects." },
            { action: "Create Live Model", menu: "Side navigation → Modeler → Model → Start with data → Live connection", detail: "Point to Datasphere analytic dataset. SAC stores metadata only — no row copy." },
            { action: "Build test story on live model", menu: "Side navigation → Stories → + Create", detail: "One KPI + bar chart. Compare load time vs import model." },
            { action: "Draw hybrid architecture diagram", detail: "Live Datasphere for sales dashboard · Import for RetailCo_Planning and Smart Predict training." }
          ],
          tip: "If trial lacks Datasphere, complete steps on paper — interviewers still expect you to explain live vs import trade-offs."
        }
      ],
      13: [
        {
          title: "Map RetailCo's hybrid connection landscape",
          goal: "One SAC tenant talking to S/4HANA, Concur, BW, and Datasphere — on paper first.",
          steps: [
            { action: "List all RetailCo data sources", detail: "Finance actuals (S/4HANA), travel (Concur), legacy history (BW), daily sales (Datasphere)." },
            { action: "Open Connections overview", menu: "Connections → list all types", detail: "OData, Live, Import, Acquisition — note which fits each source." },
            { action: "Document S/4HANA path", detail: "S/4 CDS view or OData → Datasphere transform → SAC live model (preferred) OR direct OData import." },
            { action: "Document planning data path", detail: "Planning models stay import or native SAC — write-back requires SAC embedded store." },
            { action: "Sketch integration diagram", detail: "Draw boxes: sources → Datasphere → SAC BI + Planning + Predict. Label live vs import on each arrow." },
            { action: "List Cloud Connector need", detail: "On-prem S/4 or BW requires SAP Cloud Connector — cloud Datasphere does not." }
          ],
          tip: "Hybrid is normal — no enterprise uses 100% live for everything. Explain why planning stays import."
        }
      ],
      14: [
        {
          title: "Go-live readiness — performance, security, checklist",
          goal: "Prepare RetailCo for 200 users on Monday morning.",
          steps: [
            { action: "Run story performance check", menu: "Open RetailCo_Executive_Dashboard", detail: "Page 1 load under 5 seconds? Reduce chart counts or use import model if live is slow." },
            { action: "Verify DAC for regional managers", menu: "Modeler → Region → DAC", detail: "Preview as Menon — South only. Preview as Chinnu — all regions." },
            { action: "Review sharing roles", menu: "Security → Roles / Teams", detail: "Viewer for executives, Modeler or Data Analyzer access for analysts, Planner for Nandan on planning story." },
            { action: "Test transport path", detail: "Document test → prod promotion: export story/model or use BTP transport — tenant-specific." },
            { action: "Complete go-live checklist", detail: "☐ Performance ☐ Security ☐ Backup/export ☐ User comms ☐ Support contact ☐ Rollback plan." },
            { action: "Export final PDF for sign-off", menu: "Story → Export PDF", detail: "Attach to go-live approval email for Chinnu / IT." }
          ],
          tip: "Go-live week is about confidence — run through Chinnu's three questions: fast load, correct data, South sees only South."
        }
      ]
    },

    TOPIC_EXAMPLES: {
      "1:0": "Chinnu receives five Excel files on Monday — North claims ₹20 Cr, South ₹82 Cr, but Finance's consolidated sheet shows ₹346.04 Cr total. Which is correct? ERP exists so there is ONE official answer, not five opinions.",
      "1:1": "When RetailCo closes March books, S/4HANA stores the official ₹346.04 Cr revenue. SAC will never 'create' sales — it only displays what ERP and the warehouse already captured.",
      "1:2": "Raw S/4HANA data has thousands of invoice lines. Datasphere rolls them up to 'South + Beverages + March = ₹42 lakh.' SAC then shows Chinnu a clean bar chart — not a million spreadsheet rows.",
      "1:3": "You don't install SAC from a CD-ROM. SAP hosts it in the cloud — like Gmail vs a desktop email program. Chinnu opens a browser URL and sees his dashboard from anywhere.",
      "1:4": "Same Monday morning: Chinnu checks sales (BI), Mona enters budget (Planning), warehouse runs beverage forecast (Smart Predict) — all in one SAC login.",

      "2:0": "Your trial URL might look like <code>academy-t-sac.us10.hcs.cloud.sap</code>. Save it in browser favourites next to Gmail — you'll live here for 30 days.",
      "2:1": "Click <strong>Stories</strong> — you'll see sample dashboards. Click <strong>Models</strong> — data lives here. Spend 15 minutes clicking everything. You can't break a trial tenant.",
      "2:2": "Analogy: Model = recipe book. Story = plated dish served to Chinnu. You can't serve a dish without a recipe. Build model first, story second.",
      "2:3": "Live = calling the warehouse every time ('what's revenue RIGHT NOW?'). Import = photocopying yesterday's report (fast to read, might be stale).",
      "2:4": "Create a blank Optimized Story, drag one bar chart, pick any measure. Doesn't need to be perfect — you're learning the canvas, not presenting to the board yet.",

      "3:0": "RetailCo sales dashboard = <strong>Analytic Model</strong> (read-only, import). Nandan's budget workbook on Day 7 = <strong>Planning Model</strong> (write-back, Version dimension). Same Region and Product — different SAC object type.",
      "3:1": "Menon's CSV row: <em>2025-03-15, South, Beverages, 420000, 8500, 400000</em>. Map Date → Date dimension, South → Region member, Beverages → Product member. 420000 → Revenue measure (SUM). Never map numbers as dimensions.",
      "3:2": "Chinnu asks total revenue → SAC runs <code>SUM(Revenue)</code> across all regions. Menon asks South units → <code>SUM(Units)</code> filtered by Region=South. Aggregation type is set at measure definition — usually SUM for currency and counts.",
      "3:3": "Nandan sends Excel with mixed date formats (15/03/2025 vs 2025-03-15). Prepare Data normalises to ISO dates before import. Map Revenue as <strong>Decimal</strong>, Units as <strong>Integer</strong> — wrong types break totals.",
      "3:4": "After import: model total Revenue must equal Nandan's Excel <code>SUM()</code> — ₹346.04 Cr exactly. Name model <code>RetailCo_Sales_Analytic</code>. 23,760 rows × 3 channels × 3 categories × 3 brands × 12 months.",

      "4:0": "RetailCo fiscal year starts <strong>April</strong>. In model settings set fiscal year start month = 4. Wrong setting → Q1 YTD and quarterly charts wrong for Chinnu all year.",
      "4:1": "South Revenue ₹10L, Target ₹8L → calculated measure <code>[Revenue]/[Target]*100</code> = 125%. Defined once in model — every story widget reuses it.",
      "4:2": "Restricted measure <em>Beverage Revenue</em>: Revenue filtered where Product Category = Beverages. KPI tile shows category performance without a manual story filter.",
      "4:3": "Sales Region (North/South) ≠ map geography. Geo Enrichment → By Area Name → Country India + State column. Choropleth needs location dimension + Choropleth/Drill layer. US file optional for trial.",
      "4:4": "DAC on Region: assign Menon → South member only. He opens the same story as Chinnu but SAC injects a row filter — North data never returned. Test with Preview as user.",

      "5:0": "Side navigation → Stories → + Create → Blank story (Canvas) → model <code>RetailCo_Sales_Analytic</code> → Canvas page. Builder = data slots. Styling = visuals only. Save as <code>RetailCo_Executive_Dashboard</code>.",
      "5:1": "KPI 1: Revenue + comparison Target → variance arrow. KPI 2: Revenue by Region → top 1. KPI 3: MoM % → time comparison. Format: ₹ Cr or ₹ L for India.",
      "5:2": "Bar: Region (axis) + Revenue. Line: Month hierarchy (axis) + Revenue. Totals with no filter must match model — sanity check before showing Chinnu.",
      "5:3": "Insert input control → bind Region dimension → <strong>Apply to page</strong>. Repeat for Product Category. Filter South + Beverages → all 5 widgets update.",
      "5:4": "Theme: Story toolbar → Theme. Threshold on Pct_vs_Target: green ≥100%, amber 90–99%, red &lt;90%. Align KPI row top, charts below, filters left or top.",

      "6:0": "Page 1 region bar chart = <strong>leader</strong>. Page 2 product table + bar = <strong>followers</strong>. Linked analysis panel: select source widget → choose targets → filter direction. Click South → Page 2 shows Mango Bites, Cola Rush, Spice Chips.",
      "6:1": "Line chart drill: Year → Quarter → Month on Date hierarchy. Right-click or tap drill icon. Executives stay at Year; Menon drills to Month for South Beverages.",
      "6:2": "Page 2 name: <em>South — Product Detail</em> (Responsive page for Menon's tablet). Widgets: top-5 product bar, product table, monthly trend line. Story filter carries Region from Page 1.",
      "6:3": "Smart Insights on region bar: <em>\"East revenue down 8% — Snacks declined after competitor promo in Odisha.\"</em> Enable in widget Styling/Analytics section. Just Ask: ask <em>\"Revenue by region last quarter\"</em>.",
      "6:4": "Share story: view role for Menon, edit for Mona. Export PDF for Chinnu's board email. Mobile preview Page 2 — Menon checks KPIs between Chennai distributor visits.",

      "7:0": "Nandan's FY2026 Excel: 17 tabs, colour-coded by last editor. SAC Planning = one model <code>RetailCo_Planning</code>, audit trail, no overwritten tabs.",
      "7:1": "Account hierarchy: Gross Sales (INC) − COGS (EXP) = Gross Profit − Opex (EXP) = Net Income. Each row is an Account dimension member.",
      "7:2": "March South Beverages: Actual ₹42L · Budget ₹45L · Forecast ₹43L — same Account+Region+Product+Month cell, different Version slice.",
      "7:3": "Planning Model dimensions: Account · Region · Product Category · Time · <strong>Version</strong>. Import Actual from analytic model or S/4. Write-back enabled on Budget.",
      "7:4": "Nandan opens data entry table → selects Budget version → types ₹45L April South → Save. Mona built the table; Nandan owns numbers. Test write-back before go-live.",

      "8:0": "Nandan's Friday: copy actuals, +10% South growth, spread COGS — 3 hours in Excel. One Data Action trigger button: 60 seconds.",
      "8:1": "Copy step: Source Actual Dec 2025 → Target Forecast Jan 2026 · filter accounts · run on private version first — never overwrite Actual without approval.",
      "8:2": "Company COGS ₹50L at consolidated level, ₹0 by product. Allocation driver = Gross Sales → Beverages 55%, Snacks 30%, Personal Care 15%.",
      "8:3": "Marketing ₹20L split 40/35/25 by management = <strong>distribution</strong>. COGS split by sales mix = <strong>allocation</strong>. Different step types in same Data Action.",
      "8:4": "Headcount: Opening + Hires − Terminations = Closing. Advanced Formula step chains months. HR enters Hires/Terminations; SAC calculates Closing across 5 regions.",

      "9:0": "RESULTLOOKUP: prior month Closing headcount. LOOKUP: same month last year revenue. IF: branch logic by Version or Region — e.g. South-specific forecast rule.",
      "9:1": "HR model: +5 South hires → cross-model copy → Finance salary expense line updates. No more waiting for HR's email attachment.",
      "9:2": "Multi Action chain: import actuals → Day 8 forecast Data Action → unlock Forecast → Nandan edits → lock Actual → email Chinnu. Six steps, one calendar job.",
      "9:3": "March Actual <strong>Locked</strong> after close. Forecast <strong>Open</strong> for Nandan's tweaks. Budget <strong>Locked</strong> post board approval. Lock steps inside Multi Action.",
      "9:4": "Planning Calendar: 6 AM first business day monthly. Job Monitor: green = announce to Chinnu; red = check step order and locks before re-run.",

      "10:0": "Distributor churn? → Classification. Next quarter revenue? → Regression. Oct–Dec beverage demand? → <strong>Time series</strong> (RetailCo warehouse pick).",
      "10:1": "12+ months history required. Smart Predict learns Diwali October snack spike automatically — you didn't code seasonality manually.",
      "10:2": "South Beverages forecast ₹85L, band ₹78–92L. Hyderabad warehouse orders inside band — not a single point guess.",
      "10:3": "Sys_Forecast / Forecast version populated by ML. Nandan adjusts for known Central listing. Human judgment on top of machine baseline.",
      "10:4": "Executive chart: solid = actual, dashed = forecast, shaded = confidence. Chinnu sees Q4 Snacks risk in East before warehouse over-orders.",

      "11:0": "Presentation mode: Page 1 'How are we?' → Page 2 'Why?' → Page 3 'What's next?' Sixty seconds per page. Chinnu nods.",
      "11:1": "PDF on Chinnu's iPad. the South manager checks mobile between meetings. Analytics Catalog lists 'RetailCo Executive Dashboard' for all authorised users.",
      "11:2": "Finance analyst reconciles in Data Analyzer table export. Chinnu never sees the messy pivot — only your polished story.",
      "11:3": "C_SAC exam covers exactly what you built: models, stories, planning, connections. Your 14 days mapped to exam topics.",
      "11:4": "Portfolio one-pager: 'RetailCo had five Excel files → I built one SAC dashboard with planning and forecast.' LinkedIn gold.",

      "12:0": "Import dashboard refreshed at 6 AM. Distributor posts sale at 8 AM. Import shows stale data until tomorrow. Live shows 8 AM sale at 8:05.",
      "12:1": "S/4HANA invoice → Datasphere nightly transform → SAC live story at 7 AM. No CSV email attachments in production.",
      "12:2": "Connections → Add Live → Datasphere → pick analytic model → build story. Change value in Datasphere → refresh story → updated.",
      "12:3": "Parent company strategy: Business Data Cloud = one governed data layer for all analytics. You're speaking their language now.",
      "12:4": "Daily sales dashboard = live. Planning model = import (write-back). Smart Predict training = import. Hybrid is normal, not a compromise.",

      "13:0": "RetailCo parent still has 10 years history in BW. New pipeline in Datasphere. SAC connects to both during migration — common real-world messiness.",
      "13:1": "S/4 CDS view 'Retail Sales by Region' updated with every goods issue. SAC live story for operational 'today' reporting.",
      "13:2": "Concur travel expenses → import Analytic Model. S/4 ACDOCA finance → import Planning Model. Datasphere sales → live BI Story.",
      "13:3": "SuccessFactors HR, Ariba procurement, Amazon S3 files — acquire connects SAC to the non-SAP world too.",
      "13:4": "One diagram on Chinnu's wall: five sources, three connection types, one SAC tenant. You present this in architecture review.",

      "14:0": "Import model: sub-second. Slow BW query live: 30 seconds. Know which you're using before go-live — Chinnu won't wait 30 seconds.",
      "14:1": "Weightage shows scatter plot at 95% load time. Replace with top-10 bar chart on Page 2. Page 1 stays fast.",
      "14:2": "Developer role: builds stories. Planner role: edits budgets. Viewer role: the South manager sees dashboards only. DAC: the South manager sees South data only.",
      "14:3": "Build in dev tenant → test in QA → transport to prod. Connection URLs change per tenant — document what travels vs what you reconfigure.",
      "14:4": "Checklist: weightage green ✓, DAC tested ✓, PDF exported ✓, training done ✓, Analytics Catalog published ✓. Monday go-live."
    },

    STORY_RECAPS: {
      1: "You met <strong>Chinnu, Mona, and the South manager</strong> at RetailCo — and learned the data journey: stores sell → <em>S/4HANA</em> records → <em>Datasphere</em> cleans → <em>SAC</em> shows and plans. SAC doesn't create sales; it helps leaders see and decide. Tomorrow you log into your trial for the first time. No building yet — just explore with curiosity.",
      2: "First login done! You now know the <strong>tenant URL, home screen objects, and Model → Story dependency</strong>. Live = query at runtime (Datasphere, S/4). Import = copy inside SAC (CSV, Excel). You made your first Optimized Story chart — that's real progress. Save your trial URL and note your tenant region before Day 3.",
      3: "Menon's scattered CSV and Nandan's Excel are now one clean <strong>Analytic Model</strong>. You mapped <strong>dimensions</strong> (Region, Product, Month) and <strong>measures</strong> (Revenue, Units, Target). If SAC totals match Finance's Excel to the rupee, Chinnu and Nandan can trust every chart you build next. This model powers the next two weeks.",
      4: "Chinnu gets <strong>% vs Target, YTD Revenue, and beverage-only KPIs</strong> — all calculated in the model, not the story. India appears on a choropleth map. <strong>DAC</strong> means Menon sees South only while Chinnu sees everything. Tomorrow you turn this model into Chinnu's Monday dashboard.",
      5: "Chinnu's Monday page is live: <strong>three KPIs, bar chart, line chart, two input controls</strong>, theme and threshold colours. He gets answers in ten seconds — how much, who wins, are we growing. You turned a model into a story executives trust. Tomorrow Menon wants to click and drill.",
      6: "Menon clicks <strong>South</strong> on Page 1 → Page 2 shows his top products instantly. <strong>Linked analysis</strong> is the demo every SAC interview uses. Smart Insights writes the narrative. PDF export and mobile preview mean the dashboard leaves your trial tenant. Tomorrow Nandan wants Planning.",
      7: "Nandan enters budget numbers in SAC for the first time. <strong>RetailCo_Planning</strong> has Account, Region, Product, Time, and Version dimensions. <strong>Actual vs Budget vs Forecast</strong> side by side — one model, no Excel email chains. Mona built it; Nandan owns the numbers. Tomorrow you automate his Friday routine.",
      8: "Nandan's Friday copy-paste is a <strong>one-click Data Action</strong>: copy actuals, allocate COGS by Gross Sales driver, distribute marketing by fixed %. Headcount calculates itself. Finance gets hours back — that's real SAC Planning value.",
      9: "You automated Nandan's month-end: <strong>Advanced Formula, Multi Actions, data locks, Planning Calendar</strong>. Job Monitor green checkmark = Chinnu gets numbers on time. Phase 3 complete — tomorrow Smart Predict for the warehouse.",
      10: "Smart Predict forecasted beverage demand with a <strong>confidence band</strong>. Hyderabad warehouse knows what to stock. Chinnu sees the future on his dashboard — dashed forecast line, not just past actuals. Zero Python required.",
      11: "RetailCo is presentation-ready. Three pages, PDF export, certification plan, portfolio write-up. Practice saying: <em>'South beat target, beverages lead, Q4 forecast holds.'</em> You're job-interview ready for SAC roles.",
      12: "Production architecture clear: <strong>S/4 → Datasphere → SAC live</strong>. CSV was training wheels. Hybrid live + import is how real companies run. You understand why IT cares about connection types.",
      13: "Full landscape mapped: <strong>BW, S/4, Concur, Datasphere</strong> — each with the right connection type. Your integration diagram is what architects draw in client meetings. Serious enterprise skill.",
      14: "Go-live ready: <strong>fast dashboards, secure access, transport plan, checklist complete</strong>. Fourteen days ago you didn't know what SAC stood for. Today you'd confidently build RetailCo for a real client. 🎉"
    },

    AI_PROMPTS: {
      1: [
        "I'm a complete beginner learning SAP Analytics Cloud. Explain the SAP ecosystem using a simple story about a fictional Indian FMCG company called RetailCo that sells snacks and beverages in 5 regions. Include ERP, S/4HANA, Datasphere, and SAC — use everyday analogies, not jargon.",
        "My CEO asked: 'Where does our sales data actually live before it reaches a dashboard?' Explain for RetailCo using S/4HANA and Datasphere. Keep it under 200 words, friendly tone.",
        "Compare SAP Analytics Cloud to a normal Excel report. What can SAC do that Excel cannot? Use RetailCo budget and forecasting as examples.",
        "Quiz me with 5 simple questions about Day 1 concepts (ERP, warehouse, SAC). After each answer, tell me if I'm right and explain gently if I'm wrong."
      ],
      2: [
        "I just logged into SAP Analytics Cloud for the first time. Explain tenant URLs, SAP ID login, and what US10/EU10 region codes mean — warm tone, step by step.",
        "Explain live connection vs import in SAC with technical detail: where data is stored, when queries run, and which RetailCo use cases need each (daily sales vs CSV training).",
        "Walk me through SAC home screen object types: Stories, Models, Connections, Files, Calendar, Security. Which are data layer vs presentation layer?",
        "What is an Optimized Story vs Classic Story? Explain Canvas vs Responsive pages and the Builder panel (rows, columns, measures)."
      ],
      3: [
        "Explain dimensions vs measures with technical detail — data types, aggregation (SUM), and column mapping. Use RetailCo CSV: Date, Region, Product, Revenue, Units, Target.",
        "Walk me through Side navigation → Modeler → Model → Start with data → File from file in SAC step by step. Include Prepare Data, preview screen, and where to set Date vs Generic dimensions.",
        "What's the difference between Analytic Model and Planning Model at the object level? Why does Nandan's budget need Planning Model on Day 7 but Menon's sales report uses Analytic Model today?",
        "My imported Revenue total is ₹9,39,99,500 but Excel shows ₹9,40,00,000. List 6 technical causes (mapping, data type, duplicates, nulls, aggregation, locale) and how to fix each."
      ],
      4: [
        "Explain calculated measures in SAC with formula syntax. Build % vs Target and Revenue YTD for RetailCo — include fiscal year starting April.",
        "What is a restricted measure vs a story filter? Show how to create Beverage Revenue as a model-level restricted measure with the filter formula.",
        "Walk me through SAP SAC Geo Enrichment step by step: By Area Name vs By Coordinates, Supported Locations, Details panel errors, and choropleth layer setup. Why doesn't Region (North/South) work on a map for RetailCo?",
        "Explain Data Access Control step by step: how to restrict Menon to South region only, preview as user, and what happens if he tries to filter to North."
      ],
      5: [
        "Walk me through building Chinnu's Page 1 in SAC step by step: create Optimized Story, Canvas page, 3 KPI tiles with exact Builder panel field assignments (Revenue, Region, MoM).",
        "Explain input controls vs widget filters in SAC. How do I bind Region and Product Category to filter the entire RetailCo executive page?",
        "What threshold rules should I set on Pct_vs_Target for green/amber/red? Include the Styling panel steps in SAC.",
        "Give me a 6-point checklist to verify Page 1 before demoing to Chinnu — totals, filters, formatting, naming, theme, mobile preview."
      ],
      6: [
        "Explain linked analysis in SAC step by step: leader chart on Page 1, follower widgets on Page 2, filter direction. Use Menon clicking South on the region bar chart.",
        "What's the difference between linked analysis, drilldown, input controls, and story filters? When does RetailCo use each on Page 1 vs Page 2?",
        "How do I enable Smart Insights and Just Ask on RetailCo's revenue chart? What kind of explanation should I expect?",
        "Walk me through exporting RetailCo_Executive_Dashboard as PDF, sharing view access with Menon, and checking Responsive mobile preview for Page 2."
      ],
      7: [
        "Explain SAC Planning vs BI for RetailCo. Why does Nandan need a Planning Model with Version dimension instead of the Day 3 Analytic Model?",
        "Walk me through creating RetailCo_Planning: Account hierarchy (INC/EXP), Region, Product, Time, Actual and Budget versions. Include write-back setup.",
        "How do I build a data entry table in a story for Nandan to enter monthly budget by region? Step-by-step with version selector.",
        "Explain public vs private versions and planner security roles. How does Nandan publish Budget without overwriting Actual?"
      ],
      8: [
        "Explain Data Actions in SAC: Copy, Allocation, Distribution, Advanced Formula steps. Use Nandan's COGS and marketing examples.",
        "Walk me through a Copy step: Actual December 2025 → Forecast January 2026. What filters do I set? Why test on private version first?",
        "Build a COGS allocation by Gross Sales driver across Beverages, Snacks, Personal Care — show how to verify totals match source ₹50L.",
        "Explain headcount formula (Opening + Hires − Terminations = Closing) as a Data Action with trigger button in the planning story."
      ],
      9: [
        "Explain RESULTLOOKUP vs LOOKUP vs IF in SAC Advanced Formula with RetailCo headcount and revenue examples. Include when to use each.",
        "Design a RetailCo month-end Multi Action step-by-step: import, Data Action, unlock, lock, notify. What goes in Planning Calendar?",
        "Explain data lock states Open, Restricted, Locked for Nandan's Actual, Forecast, and Budget versions with RetailCo timing.",
        "How do I use Job Monitor to diagnose a failed Multi Action? List 5 common failure causes and fixes."
      ],
      10: [
        "Explain Smart Predict scenario types for RetailCo: why time series for beverage warehouse forecasting vs classification for churn.",
        "Walk me through Smart Predict workflow: prepare dataset from RetailCo_Sales_Analytic → train → apply → add to story chart.",
        "How do I explain confidence bands to Chinnu without statistics jargon? Use South ₹78–92L example for warehouse stocking.",
        "What is Predictive Forecast in RetailCo_Planning vs standalone Smart Predict? When does Nandan edit the ML baseline?"
      ],
      11: [
        "Help me script a 5-minute presentation to CEO Chinnu for RetailCo dashboard: Page 1 executive, Page 2 product detail, Page 3 forecast. What do I say on each page?",
        "Is C_SAC certification worth it after this 14-day plan? What topics does it cover? Honest beginner perspective.",
        "When should RetailCo users use Data Analyzer instead of my polished story? Give Mona vs the South manager examples.",
        "Create a 30-day C_SAC study plan assuming I finished this RetailCo project. Weekly focus areas only."
      ],
      12: [
        "Explain S/4HANA → Datasphere → SAC live architecture for RetailCo daily sales. Why no CSV in production?",
        "What is SAP Cloud Connector and when does RetailCo need it? Simple analogy.",
        "RetailCo: daily sales dashboard (live), planning model (import), Smart Predict (import). Explain why each choice makes sense.",
        "Draw a text architecture diagram for RetailCo production analytics. I'll copy it into my notes."
      ],
      13: [
        "List RetailCo data sources (S/4, Concur, Datasphere, BW) and whether each should use live or import. One sentence justification each.",
        "What is an S/4HANA CDS View and why would SAC connect to it for operational reporting?",
        "Explain hybrid SAC architecture: live for reporting, import for planning. Why can't planning use live connections easily?",
        "Quiz me: I name a data source, you tell me live or import and why. Start with Concur travel expenses."
      ],
      14: [
        "What is story weightage in SAC and how do I fix a slow dashboard before 200 users log in on Monday?",
        "Explain SAC security layers (Users, Teams, Roles, DAC) using RetailCo: Chinnu sees all, Menon sees South, Nandan edits budget.",
        "What is Transport Management and why move SAC content from dev to production tenant?",
        "Give me a 10-point go-live checklist for RetailCo dashboard. Practical, not generic."
      ]
    },

    FLOW_CHARTS: {
      1: [
        {
          title: "RetailCo data journey — where numbers come from",
          steps: [
            { label: "200+ retail stores", sub: "POS & distributor orders" },
            { label: "S/4HANA (ERP)", sub: "Official transactions" },
            { label: "Datasphere", sub: "Clean & aggregate" },
            { label: "SAP Analytics Cloud", sub: "Dashboards & planning" },
            { label: "Chinnu (CEO)", sub: "Monday decisions", highlight: true }
          ],
          note: "SAC never creates sales — it reads and visualises data from upstream systems."
        },
        {
          title: "SAC's three jobs in one tenant",
          type: "table",
          headers: ["SAC capability", "What it does", "RetailCo example"],
          rows: [
            ["Business Intelligence", "Stories, charts, KPI tiles", "Chinnu's Monday dashboard"],
            ["Planning", "Budget write-back, data actions", "Nandan's P&L workbook (Day 7)"],
            ["Smart Predict", "ML forecasts with confidence bands", "Beverage demand forecast (Day 10)"]
          ],
          note: "One SAC login — three capabilities that most tools split across separate products."
        }
      ],
      2: [
        {
          title: "SAC trial access flow",
          steps: [
            { label: "sap.com signup", sub: "Create SAP ID" },
            { label: "SAC trial request", sub: "30-day tenant" },
            { label: "Tenant URL", sub: "[name].us10.hcs.cloud.sap" },
            { label: "SAC home screen", sub: "Stories · Models · Connections", highlight: true }
          ],
          note: "Bookmark the tenant URL — you will open it every day of this roadmap."
        },
        {
          title: "Model → Story dependency (never skip the model)",
          steps: [
            { label: "Connection", sub: "Live or Import" },
            { label: "Model", sub: "Dimensions + measures", highlight: true },
            { label: "Story", sub: "Charts & KPI widgets" },
            { label: "End user", sub: "Chinnu on Monday AM" }
          ],
          note: "One model can feed many stories. Delete the model → all stories break."
        },
        {
          title: "Live vs Import — where data lives at runtime",
          type: "table",
          headers: ["", "Live connection", "Import (Acquire)"],
          rows: [
            ["Where data lives", "At source system — SAC stores metadata only", "Full copy stored in SAC embedded HANA"],
            ["When data refreshes", "Every chart refresh — runtime SQL/OData query", "At import + scheduled full/delta refresh"],
            ["Performance", "Depends on source speed", "Sub-second — data already inside SAC"],
            ["Planning write-back", "Not supported on pure live models", "Required for Nandan's budget entry"],
            { cells: ["RetailCo use case", "Production daily sales → live Datasphere", "Day 3 CSV training import"], highlight: true }
          ],
          note: "RetailCo daily sales → live Datasphere. Your Day 3 CSV → import."
        },
        {
          title: "Optimized Story page types",
          type: "table",
          headers: ["Page type", "Layout behaviour", "RetailCo user"],
          rows: [
            ["Canvas", "Fixed pixel grid — desktop-first design", "Chinnu — CEO executive page"],
            ["Responsive", "Fluid grid — adapts to tablet and phone", "Menon — regional manager in field"]
          ],
          note: "Both bind to the same model — different layout engines, same data."
        }
      ],
      3: [
        {
          title: "CSV → Analytic Model import pipeline",
          steps: [
            { label: "RetailCo CSV / Excel", sub: "Menon + Nandan files" },
            { label: "Prepare Data", sub: "Clean dates & types" },
            { label: "Column mapping", sub: "Dimension vs measure", highlight: true },
            { label: "Analytic Model", sub: "RetailCo_Sales_Analytic" },
            { label: "Validate totals", sub: "Match Finance Excel", highlight: true }
          ],
          note: "Wrong mapping at step 3 corrupts every chart for two weeks — validate at step 5 before building stories."
        },
        {
          title: "Dimensions vs measures — what goes where",
          type: "table",
          headers: ["", "Dimensions", "Measures"],
          rows: [
            ["Purpose", "Categories — slice and filter data", "Numeric values — aggregated at query time"],
            ["RetailCo examples", "Region · Product Category · Month", "Revenue · Units · Target"],
            ["Aggregation", "Never summed — used as axes and filters", "SUM (currency and counts)"],
            ["Wrong mapping", "If Revenue mapped here → broken charts", "If Region mapped here → nonsense totals"]
          ],
          note: "Dimensions slice and filter. Measures aggregate with SUM (or AVG where appropriate)."
        },
        {
          title: "Analytic Model vs Planning Model",
          type: "table",
          headers: ["", "Analytic Model", "Planning Model"],
          rows: [
            ["Purpose", "Read-only BI dashboards & Smart Predict", "Budget entry & planning automation"],
            ["Write-back", "No — view and analyse only", "Yes — users save typed numbers"],
            ["Key extra dimension", "None", "Version (Actual, Budget, Forecast)"],
            ["RetailCo timing", "Day 3 — Menon's sales data", "Day 7 — Nandan's P&L budget"],
            ["Object name", "RetailCo_Sales_Analytic", "RetailCo_Planning (Day 7)"]
          ],
          note: "Same business concepts — different SAC object types. Never use a Planning Model for a simple sales chart."
        },
        {
          title: "RetailCo model grain (data structure)",
          type: "table",
          headers: ["Layer", "Count", "Members / values"],
          rows: [
            ["Regions", "5", "North · South · East · West · Central"],
            ["Product categories", "3", "Beverages · Snacks · Personal Care"],
            ["Months", "12", "Jan – Dec (Date dimension hierarchy)"],
            ["Measures per cell", "3", "Revenue · Units · Target"]
          ],
          note: "Minimum 180 intersection points (5 × 3 × 12) — each holds Revenue, Units, and Target values."
        }
      ],
      4: [
        {
          title: "Day 4 model enhancements — build order",
          steps: [
            { label: "RetailCo_Sales_Analytic", sub: "Day 3 base model" },
            { label: "Calculated measures", sub: "% vs Target · YTD", highlight: true },
            { label: "Restricted measures", sub: "Beverage Revenue" },
            { label: "Geo Enrichment", sub: "State column → location dim" },
            { label: "DAC security", sub: "Menon = South only", highlight: true }
          ],
          note: "Always add calculations at model level first — stories inherit them and stay performant."
        },
        {
          title: "Calculated measure — % vs Target",
          type: "table",
          headers: ["Step", "Formula part", "South example"],
          rows: [
            ["1", "Revenue (base measure)", "₹10,00,000"],
            ["2", "÷ Target (base measure)", "₹8,00,000"],
            ["3", "× 100 (in model formula)", "125%"]
          ],
          note: "Formula: <code>[Revenue] / [Target] * 100</code> — defined once in model, reused in every KPI tile and chart."
        },
        {
          title: "YTD — fiscal time navigation",
          steps: [
            { label: "Fiscal year start", sub: "April (month 4)" },
            { label: "Current month", sub: "e.g. September" },
            { label: "YTD Revenue", sub: "Sum Apr → Sep", highlight: true },
            { label: "Chinnu's view", sub: "On track this FY?" }
          ],
          note: "YTD uses Date dimension hierarchy — wrong fiscal calendar breaks every cumulative KPI."
        },
        {
          title: "DAC — same story, different rows per user",
          type: "table",
          headers: ["User", "Role", "Region access in SAC"],
          rows: [
            ["Chinnu", "CEO", "All 5 regions — unrestricted"],
            ["Menon", "South Regional Sales Manager", "South only — DAC enforced"],
            ["Nandan", "Head of Finance", "All regions — Finance view"],
            ["Mona", "SAC Analyst (you)", "All regions — builder access"]
          ],
          note: "DAC filters at query time on the Region dimension — configure before sharing to 200 users."
        }
      ],
      5: [
        {
          title: "Chinnu's Page 1 — build order (top to bottom)",
          steps: [
            { label: "Create story", sub: "RetailCo_Executive_Dashboard", highlight: true },
            { label: "Row 1: 3 KPI tiles", sub: "Revenue · Best Region · MoM %" },
            { label: "Row 2: Bar chart", sub: "Revenue by Region" },
            { label: "Row 3: Line chart", sub: "Revenue by Month" },
            { label: "Input controls", sub: "Region + Product filters" },
            { label: "Chinnu", sub: "Monday 8 AM", highlight: true }
          ],
          note: "Standard executive pattern worldwide — KPIs first, comparison chart, trend chart, then filters."
        },
        {
          title: "Three KPI tiles — Builder panel bindings",
          type: "table",
          headers: ["KPI tile", "Primary measure / dimension", "Extra setting"],
          rows: [
            ["Total Revenue", "Revenue (SUM)", "Comparison vs Target or Pct_vs_Target"],
            ["Best Region", "Revenue by Region", "Top-1 ranking — show member name"],
            ["MoM Growth %", "Revenue + prior month", "Variance arrow · time comparison"]
          ],
          note: "Format all three in ₹ Cr or ₹ L — Indian FMCG executives expect lakhs/crores, not raw integers."
        },
        {
          title: "Bar chart vs line chart — Page 1 usage",
          type: "table",
          headers: ["", "Bar / column chart", "Line chart"],
          rows: [
            ["Question answered", "Which region contributes most?", "Are we trending up or down?"],
            ["Axis dimension", "Region (Generic)", "Month (Date hierarchy)"],
            ["Measure", "Revenue", "Revenue"],
            ["RetailCo insight", "South tallest ~₹2.1 Cr", "Monsoon dip in Beverages visible"]
          ],
          note: "Same model, same measure — only the dimension on the axis changes."
        },
        {
          title: "Input control vs widget-only filter",
          type: "table",
          headers: ["", "Input control (use this)", "Widget-level filter"],
          rows: [
            ["Scope", "Entire page — all widgets update", "Single chart only"],
            ["RetailCo Page 1", "Region + Product Category dropdowns", "Avoid — inconsistent executive view"],
            ["Chinnu's experience", "One filter change → whole page answers", "Must filter each chart separately"]
          ],
          note: "Set input controls to Apply to whole page in the Builder panel."
        },
        {
          title: "Threshold colours — Pct_vs_Target KPI",
          type: "table",
          headers: ["Performance", "Pct_vs_Target", "Colour"],
          rows: [
            ["On or above target", "≥ 100%", "Green"],
            ["At risk", "90% – 99%", "Amber"],
            ["Below target", "< 90%", "Red"]
          ],
          note: "Set in Styling panel → conditional formatting. Chinnu reads colour before the number at 8 AM."
        }
      ],
      6: [
        {
          title: "Interactive story flow — Page 1 click to Page 2 detail",
          steps: [
            { label: "Page 1: Region bar chart", sub: "Leader widget", highlight: true },
            { label: "Linked analysis", sub: "Cross-filter configured" },
            { label: "Story filter", sub: "Region = South" },
            { label: "Page 2: Product detail", sub: "Menon's workspace", highlight: true },
            { label: "Top 5 SKUs", sub: "Rank filter on Revenue" }
          ],
          note: "Menon clicks South once — no new report request to Mona. Standard SAC consultant demo pattern."
        },
        {
          title: "Linked analysis vs drilldown vs input control",
          type: "table",
          headers: ["", "Linked analysis", "Drilldown", "Input control"],
          rows: [
            ["Trigger", "Click a chart data point", "Drill icon on hierarchy", "Dropdown selection"],
            ["Scope", "Source chart → target widgets", "Same widget, deeper level", "Whole page filter"],
            ["RetailCo example", "South bar → Page 2 products", "Year → Month on line chart", "Region dropdown on Page 1"],
            ["Menon's need", "South → product mix", "Monthly trend detail", "Filter before clicking"]
          ],
          note: "Use all three on the same story — they solve different interaction patterns."
        },
        {
          title: "Page 2 layout — Menon's product workspace",
          type: "table",
          headers: ["Widget", "Purpose", "Builder binding"],
          rows: [
            ["Top-5 product bar", "Best SKUs in selected region", "Product Category · Revenue · Rank ≤ 5"],
            ["Product table", "Full detail rows", "Product · Revenue · Units · Pct_vs_Target"],
            ["Monthly trend line", "Pattern within region", "Month · Revenue (filtered by story)"]
          ],
          note: "Use a Responsive page for Menon's tablet; Page 1 stays Canvas for Chinnu's desktop."
        },
        {
          title: "Smart Insights vs Just Ask",
          type: "table",
          headers: ["", "Smart Insights", "Just Ask"],
          rows: [
            ["How it starts", "Automatic on selected chart", "User types a question"],
            ["RetailCo example", "East −8% — Snacks promo impact", "\"Show revenue by region last quarter\""],
            ["Best for", "Explaining anomalies to Chinnu", "Ad-hoc questions from managers"],
            ["Where to enable", "Widget analytics / insights settings", "Story toolbar search icon"]
          ],
          note: "Neither replaces good model design — they accelerate discovery on top of your Day 3–5 work."
        },
        {
          title: "Sharing & export options",
          type: "table",
          headers: ["Action", "Purpose", "RetailCo use"],
          rows: [
            ["Share story (view)", "Menon opens live dashboard", "South manager daily checks"],
            ["Share story (edit)", "Mona maintains widgets", "Your builder access"],
            ["Export PDF", "Board pack without SAC login", "Chinnu emails directors Monday AM"],
            ["Mobile preview", "Test Responsive layout", "Menon between distributor visits"]
          ],
          note: "DAC from Day 4 still applies — Menon sees South data only even with view access."
        }
      ],
      7: [
        {
          title: "Planning setup flow — from Excel to SAC write-back",
          steps: [
            { label: "Nandan's Excel", sub: "17 tabs · email chaos" },
            { label: "Planning Model", sub: "RetailCo_Planning", highlight: true },
            { label: "Versions", sub: "Actual · Forecast · Budget" },
            { label: "Data entry table", sub: "Story widget for Nandan" },
            { label: "Save write-back", sub: "Budget cells persist", highlight: true }
          ],
          note: "Mona builds the model and table; Nandan types and saves budget numbers."
        },
        {
          title: "Analytic Model vs Planning Model — RetailCo",
          type: "table",
          headers: ["", "RetailCo_Sales_Analytic", "RetailCo_Planning"],
          rows: [
            ["Purpose", "BI dashboards (Days 3–6)", "Finance budget & forecast"],
            ["Write-back", "No — read only", "Yes — Nandan saves Budget"],
            ["Key dimension", "No Version dimension", "Version (Actual/Budget/Forecast)"],
            ["Owner", "Chinnu & Menon view stories", "Nandan edits planning cells"],
            ["Built on", "Day 3 CSV import", "Day 7 — account hierarchy"]
          ],
          note: "Same Region and Product concepts — different SAC object type."
        },
        {
          title: "RetailCo P&L account structure",
          type: "table",
          headers: ["Account", "Type", "Formula / note"],
          rows: [
            ["Gross Sales", "INC", "Top-line revenue"],
            ["COGS", "EXP", "Cost of goods sold"],
            ["Gross Profit", "INC", "Gross Sales − COGS"],
            ["Marketing", "EXP", "Operating expense"],
            ["Net Income", "INC", "After all expenses"]
          ],
          note: "Account dimension uses INC/EXP types — sign flipping handled in model."
        },
        {
          title: "Versions — what each slice means",
          type: "table",
          headers: ["Version", "Who owns it", "RetailCo example (South Beverages Mar)"],
          rows: [
            ["Actual", "Loaded from ERP / analytic model", "₹42L — what happened"],
            ["Forecast", "Nandan updates monthly", "₹43L — best estimate"],
            ["Budget", "Board-approved plan", "₹45L — target Nandan types"]
          ],
          note: "Same Account × Region × Product × Month — different Version column."
        },
        {
          title: "Planning model dimensions",
          type: "table",
          headers: ["Dimension", "Members", "Notes"],
          rows: [
            ["Account", "Gross Sales, COGS, Marketing…", "Hierarchy with INC/EXP"],
            ["Region", "5 regions", "Same as analytic model"],
            ["Product Category", "3 categories", "Beverages · Snacks · Personal Care"],
            ["Time", "12 months", "April fiscal start"],
            ["Version", "Actual · Forecast · Budget", "Enables write-back"]
          ],
          note: "Name model <code>RetailCo_Planning</code> — distinct from RetailCo_Sales_Analytic."
        }
      ],
      8: [
        {
          title: "Data Action — Nandan's Friday automation",
          steps: [
            { label: "Trigger button", sub: "Planning story widget", highlight: true },
            { label: "Copy step", sub: "Actual → Forecast" },
            { label: "Allocation", sub: "COGS by Gross Sales" },
            { label: "Distribution", sub: "Marketing 40/35/25" },
            { label: "Formula step", sub: "Headcount loop", highlight: true }
          ],
          note: "Runs on Planning Model only — not on RetailCo_Sales_Analytic."
        },
        {
          title: "Allocation vs Distribution",
          type: "table",
          headers: ["", "Allocation", "Distribution"],
          rows: [
            ["Split logic", "Proportional to driver data", "Fixed percentages you define"],
            ["RetailCo example", "COGS ₹50L by Gross Sales mix", "Marketing ₹20L → 40/35/25"],
            ["When to use", "Costs follow sales volume", "Management-set targets"],
            ["Driver", "Gross Sales measure", "None — explicit %"],
            ["Verify", "Product totals = source lump sum", "Percentages sum to 100%"]
          ],
          note: "Both are Data Action step types — can chain in one action."
        },
        {
          title: "Copy step configuration",
          type: "table",
          headers: ["Setting", "Source", "Target"],
          rows: [
            ["Version", "Actual", "Forecast (private first)"],
            ["Time", "Dec 2025 closing", "Jan 2026 opening"],
            ["Accounts", "Revenue accounts filter", "Same accounts"],
            ["Safety", "Never overwrite Actual", "Test on private version"]
          ],
          note: "Most common first Data Action — seeds forecast from actuals."
        },
        {
          title: "COGS allocation example",
          type: "table",
          headers: ["Product category", "Gross Sales driver share", "Allocated COGS"],
          rows: [
            ["Beverages", "55%", "₹27.5L"],
            ["Snacks", "30%", "₹15L"],
            ["Personal Care", "15%", "₹7.5L"],
            ["Total", "100%", "₹50L source"]
          ],
          note: "Allocation step must reconcile — product sum equals company COGS."
        },
        {
          title: "Headcount formula (Advanced Formula step)",
          type: "table",
          headers: ["Measure", "Formula", "Who enters"],
          rows: [
            ["Opening", "Previous month Closing", "Calculated"],
            ["Hires", "Manual input", "HR planner"],
            ["Terminations", "Manual input", "HR planner"],
            ["Closing", "Opening + Hires − Terminations", "Calculated"]
          ],
          note: "Chain across 12 months × 5 regions — one Data Action run."
        }
      ],
      9: [
        {
          title: "RetailCo month-end Multi Action — step order",
          steps: [
            { label: "1. Import actuals", sub: "Load closed month" },
            { label: "2. Data Action", sub: "Forecast update", highlight: true },
            { label: "3. Unlock Forecast", sub: "Nandan edits" },
            { label: "4. Lock Actual", sub: "Protect history" },
            { label: "5. Notify", sub: "Email Chinnu", highlight: true }
          ],
          note: "Scheduled on Planning Calendar — Job Monitor confirms success before announcement."
        },
        {
          title: "LOOKUP vs RESULTLOOKUP",
          type: "table",
          headers: ["Function", "Reads from", "RetailCo example"],
          rows: [
            ["RESULTLOOKUP", "Another cell context", "Prior month Closing headcount"],
            ["LOOKUP", "Same slice, different time", "Same month last year Revenue"],
            ["IF", "Conditional branch", "Different logic for Actual vs Forecast version"]
          ],
          note: "Used inside Advanced Formula steps in Data Actions or Multi Actions."
        },
        {
          title: "Data lock states",
          type: "table",
          headers: ["State", "Who can edit", "RetailCo use"],
          rows: [
            ["Open", "All planners with access", "Forecast during revision period"],
            ["Restricted", "Owners / admins only", "Budget pending board review"],
            ["Locked", "Nobody", "Closed Actual months · approved Budget"]
          ],
          note: "Lock/unlock steps are part of Multi Action workflow."
        },
        {
          title: "Multi Action vs single Data Action",
          type: "table",
          headers: ["", "Data Action (Day 8)", "Multi Action (Day 9)"],
          rows: [
            ["Scope", "One script — copy, allocate, formula", "Chain of steps + locks + notify"],
            ["Trigger", "Story button — on demand", "Calendar schedule — automated"],
            ["RetailCo", "Nandan clicks Friday button", "6 AM month-end job"],
            ["Monitor", "Immediate result in model", "Job Monitor execution log"]
          ],
          note: "Day 8 buttons become steps inside Day 9 Multi Actions."
        }
      ],
      10: [
        {
          title: "Smart Predict — four-step workflow",
          steps: [
            { label: "1. Prepare dataset", sub: "12+ months beverage history" },
            { label: "2. Train model", sub: "Time series scenario", highlight: true },
            { label: "3. Apply forecast", sub: "3 months ahead · 5 regions" },
            { label: "4. Story chart", sub: "Actual + forecast + band", highlight: true }
          ],
          note: "Dataset quality at step 1 determines everything downstream."
        },
        {
          title: "Smart Predict scenario types",
          type: "table",
          headers: ["Type", "Question answered", "RetailCo fit?"],
          rows: [
            ["Classification", "Will X happen? (yes/no)", "Distributor churn — optional"],
            ["Regression", "What number?", "Expected quarterly revenue"],
            ["Time series", "Next N months trend?", "✓ Beverage warehouse forecast"]
          ],
          note: "RetailCo Day 10 focus = time series on beverage sales by region."
        },
        {
          title: "Forecast chart legend",
          type: "table",
          headers: ["Visual", "Meaning", "Line style"],
          rows: [
            ["Solid line", "Actual Revenue", "Historical facts"],
            ["Dashed line", "Forecast Revenue", "ML prediction"],
            ["Shaded area", "Confidence band", "90% uncertainty range"]
          ],
          note: "Add to existing Page 1 line chart on RetailCo_Executive_Dashboard."
        },
        {
          title: "Standalone Smart Predict vs Predictive Forecast",
          type: "table",
          headers: ["", "Smart Predict scenario", "Predictive Forecast in planning"],
          rows: [
            ["Output goes to", "Scenario / story chart", "Forecast version in RetailCo_Planning"],
            ["Edited by", "Mona in story", "Nandan adjusts ML baseline"],
            ["Use case", "Explore & present to Chinnu", "Operational planning cycle"],
            ["Warehouse", "Oct–Dec band for stocking", "Nandan's rolling forecast update"]
          ],
          note: "Both can coexist — story for CEO, planning version for Finance."
        },
        {
          title: "Forecast accuracy guide",
          type: "table",
          headers: ["Accuracy", "Rating", "Action"],
          rows: [
            ["≥ 85%", "Good for monthly FMCG", "Apply to dashboard"],
            ["70–84%", "Acceptable with caution", "Review seasonality & outliers"],
            ["< 70%", "Poor", "Fix data quality before go-live"]
          ],
          note: "Formula: (1 − |Actual − Forecast| / Actual) × 100"
        }
      ]
    },

    TOPIC_TECHNICAL: {
      "2:0": "Tenant URL pattern: <code>https://&lt;tenant-id&gt;.&lt;region&gt;.hcs.cloud.sap</code>. Auth: SAP ID (OAuth) or corporate SAML. Trial includes BI + Planning + Predict modules on BTP.",
      "2:1": "Home screen folders: <strong>Stories</strong>, <strong>Models</strong>, <strong>Connections</strong>, <strong>Files</strong>, <strong>Calendar</strong>, <strong>Security</strong>. Create menu: Story · Model · Digital Boardroom · Analytic Application.",
      "2:2": "Model stores metadata + (for import) data. Story stores widget definitions only. Dependency chain: Connection → Model → Story. Widgets use Builder panel field slots: Rows, Columns, Measures.",
      "2:3": "<strong>Live:</strong> SAC issues SQL/OData at query time — no row copy. <strong>Import:</strong> ETL into embedded HANA — schedule full/delta refresh. Planning write-back requires import or hybrid models.",
      "2:4": "Story type: <strong>Optimized</strong> (use this). Page types: <strong>Canvas</strong> (fixed grid) vs <strong>Responsive</strong> (fluid). Classic Design = legacy — do not create new Classic stories.",
      "3:0": "Object types in Models folder: <strong>Analytic Model</strong> (BI, Smart Predict input) vs <strong>Planning Model</strong> (write-back, Version dimension, data actions). RetailCo sales = Analytic; Nandan's P&amp;L = Planning on Day 7.",
      "3:1": "Dimension types: <strong>Generic</strong> (Region, Product — ID + description properties) and <strong>Date</strong> (Month hierarchy: Year → Quarter → Month). CSV Date column must map to Date dimension, not Generic text.",
      "3:2": "Measure definition: name, aggregation (<strong>SUM</strong> for Revenue/Units/Target at this grain), data type (<strong>Decimal</strong> for currency, <strong>Integer</strong> for Units). SAC executes aggregation at query time in stories.",
      "3:3": "Import path: <strong>Side navigation → Modeler → Model → Start with data → File</strong> → upload CSV → <strong>Prepare Data</strong> (transform) → map columns → preview row count → import. Prefer UTF-8 CSV; Excel also supported via Files.",
      "3:4": "Post-import validation: compare <code>SUM(Revenue)</code> in model grid vs source file. Check for unmapped members, duplicate keys (Region+Product+Month), null dimensions. Save as <code>RetailCo_Sales_Analytic</code>. Optional: mark Region as <strong>public dimension</strong> for reuse.",
      "4:0": "Date dimension settings: <strong>Fiscal year start month = April</strong> (Indian FY). Hierarchy: Year → Quarter → Month → Day. Time navigation functions (YTD, QTD) depend on this config in Model Preferences.",
      "4:1": "Calculated measure: created in Modeler → Measures → Add Calculated Measure. Formula uses <code>[MeasureName]</code> syntax. Stored in model metadata — evaluated at query time. Prefer model-level over story calculated columns for reuse and performance.",
      "4:2": "Restricted measure: base measure + dimension filter in formula (e.g. <code>[Revenue]</code> where Product = Beverages). Filter is baked into the measure definition — unlike story-level dimension filters.",
      "4:3": "Geo Enrichment: Modeler toolbar → Geo Enrichment → By Area Name OR By Coordinates. Creates location dimension. Prerequisite: Country + State columns matching Supported Locations (or Lat/Long). Story: Geo Map → Choropleth/Drill layer — not Location Information on Region alone.",
      "4:4": "DAC: Modeler → Dimension (Region) → Data Access Control → assign users/teams to dimension members. Read access only for viewers. Use <strong>Preview as user</strong> in story to test. Unrestricted users (Chinnu) see all members.",
      "5:0": "Side navigation → Stories → + Create → Blank story (Canvas) → select <code>RetailCo_Sales_Analytic</code>. Page type: <strong>Canvas</strong> (desktop). Panels: <strong>Builder</strong> (Rows/Columns/Measures) vs <strong>Styling</strong> (format, threshold). Widget insert via toolbar + icon menu.",
      "5:1": "KPI widget settings: primary measure, optional comparison measure (Target / prior period), variance display (absolute or %), trend arrow, number scale (auto / lakh / crore). Use Day 4 <code>Pct_vs_Target</code> where applicable.",
      "5:2": "Bar/column chart: categorical dimension on axis (Region). Line chart: time dimension on axis (Month from Date hierarchy). Both bind Revenue in Values. Consistent decimal places across widgets.",
      "5:3": "Input control: Insert → Input Control → dimension source (Region or Product). Scope: <strong>Story/page filter</strong> not widget-only. Linked widgets inherit filter context automatically on Optimized stories.",
      "5:4": "Theme: Story → Edit Theme or pick preset. Threshold: select KPI → Styling → Conditional formatting → measure-based rules. Save story to Files; name <code>RetailCo_Executive_Dashboard</code>.",
      "6:0": "Linked analysis: select leader widget → Linked Analysis panel → add follower widgets (same or other page). Filter direction: leader filters followers. Optimized stories support cross-page linking via story filters.",
      "6:1": "Drilldown: enabled on chart with hierarchy dimension (Date or Product). User navigates levels without new widgets. Drill state is widget-local — different from linked analysis cross-filter.",
      "6:2": "Page 2: Add Canvas or Responsive page. Rank filter: Builder → filter on Product → Top N by Revenue. Story filter from Page 1 passes Region context when linked analysis spans pages.",
      "6:3": "Smart Insights: widget → enable in Builder/Analytics. Generates natural-language bullets from variance detection. Just Ask: story search bar → NL query → temporary chart.",
      "6:4": "Share: File → Share → user/team + role (Viewer/Editor). Export: File → Export → PDF (select pages). Mobile: Story → Preview → device size. Comments optional for manager Q&A on data points.",
      "7:0": "Planning = write-back to model. Side navigation → Modeler → Start with blank model → <strong>Enable Planning</strong> (not Analytic). Requires import or acquired connection. Data Actions and version dimension unavailable in pure analytic models.",
      "7:1": "Account dimension: members typed INC (income), EXP (expense), AST, LEQ. Hierarchy rolls up to Net Income. Mirror Nandan's P&L chart of accounts in model structure.",
      "7:2": "Versions: create in Modeler → Version dimension. <strong>Public</strong> = shared (Budget published). <strong>Private</strong> = sandbox (Forecast working copy). Never edit Actual after close without unlock.",
      "7:3": "Model setup: dimensions Account · Region · Product Category · Time · Version. Load Actual via import or cross-model copy from analytic model. Enable planning on Budget account members.",
      "7:4": "Data entry table: Insert → Table → bind Planning Model → set Version on Budget → mark cells editable for Planner role. Save triggers write-back API to embedded HANA planning store.",
      "8:0": "Data Action: Modeler → Data Actions → New. Step types: Copy · Allocation · Distribution · Advanced Formula · Cross-model Copy. Attach to story via <strong>Planning trigger</strong> widget.",
      "8:1": "Copy step: define source/target scope (version, time, account, region filters). Run from Modeler test panel before adding trigger. Audit log shows who ran action.",
      "8:2": "Allocation step: source account lump sum → driver dimension (Product) → driver measure (Gross Sales) → target accounts. Reconciliation report confirms allocated total = source.",
      "8:3": "Distribution step: explicit % per target member — no driver measure. Use when management sets fixed splits. Validation: percentages must sum to 100%.",
      "8:4": "Advanced Formula in Data Action: script for headcount loop, growth %. Add trigger button to planning story page. Nandan clicks once — all steps execute in sequence (single Data Action).",
      "9:0": "Advanced Formula syntax in Modeler → Data Actions → Formula step. Functions: <code>RESULTLOOKUP</code>, <code>LOOKUP</code>, <code>IF</code>. Test in sandbox private version before production Multi Action.",
      "9:1": "Cross-model copy step: source model + target model mapping. HR Headcount → Finance Salary accounts by Region. Requires both models in same tenant with aligned dimensions.",
      "9:2": "Multi Action builder: add steps (Data Action, Version Mgmt, Data Lock, Import, Notification). Define execution order. Save as named job e.g. <code>RetailCo_Month_End_Close</code>.",
      "9:3": "Data lock config: Modeler → Version → Lock settings per period/account. States propagate to data entry tables — locked cells reject edits. Include unlock step before planner revision window.",
      "9:4": "Planning Calendar: Calendar app → New job → attach Multi Action → cron/schedule. Job Monitor: filter by job name, view log, rerun failed step after fix.",
      "10:0": "Smart Predict entry: Side navigation → Smart Predict → Create scenario. Types: Classification · Regression · <strong>Time Series</strong>. Input: analytic model or imported dataset with Date + measure.",
      "10:1": "Training: minimum periods per SAP docs (~12 months). Review variable importance and error metrics before Apply. Poor training = do not add to executive dashboard.",
      "10:2": "Apply output: future periods + confidence interval columns. Bind to story line chart as secondary measure. Format dashed line + shaded band in Styling panel.",
      "10:3": "Predictive Forecast: Planning Model → Predictive forecast feature → writes to Forecast/Sys_Forecast version. Nandan edits cells post-ML before lock step in Multi Action.",
      "10:4": "Story integration: existing Month × Revenue line chart → add forecast measure + confidence upper/lower. Export PDF Page 1 with forward view for Chinnu's board pack."
    },

    linkBundles: {
      starter: [L.trial, L.learningHome, L.helpMain, L.helpViewer, L.product, L.btp, L.community],
      modeling: [L.helpMain, L.helpViewer, L.learningSAC, L.community],
      stories: [L.helpViewer, L.learningSAC, L.helpMain, L.community],
      planning: [L.helpViewer, L.learningPlanning, L.helpMain, L.pricing, L.community],
      predict: [L.helpViewer, L.learningPredict, L.helpMain, L.community],
      integration: [L.datasphereHelp, L.datasphereProduct, L.dataCloud, L.helpMain, L.community],
      cert: [L.certSearch, L.training, L.learningSAC, L.community],
      admin: [L.helpViewer, L.helpMain, L.training, L.community]
    }
  };

  const portal = window.SACPortal;
  const extras = window.SACPortalExtras;
  const bundles = extras.linkBundles;

  if (portal && portal.DAYS) {
    const bundleMap = {
      1: bundles.starter, 2: bundles.starter,
      3: bundles.modeling, 4: bundles.modeling,
      5: bundles.stories, 6: bundles.stories,
      7: bundles.planning, 8: bundles.planning, 9: bundles.planning,
      10: bundles.predict, 11: bundles.cert,
      12: bundles.integration, 13: bundles.integration, 14: bundles.admin
    };

    portal.DAYS.forEach((d) => {
      if (bundleMap[d.day]) d.links = bundleMap[d.day];
      (d.topicsDetailed || []).forEach((t, i) => {
        const ex = extras.TOPIC_EXAMPLES[`${d.day}:${i}`];
        if (ex) t.example = ex;
        const tech = extras.TOPIC_TECHNICAL?.[`${d.day}:${i}`];
        if (tech) t.technical = tech;
      });
    });

    if (portal.CASE_STUDY) {
      portal.CASE_STUDY.characters = [
        { name: "Chinnu", role: "CEO", desc: "Wants one dashboard every Monday — no more Excel chaos." },
        { name: "Mona", role: "SAC Analyst", desc: "Building RetailCo's analytics and planning stack — that's you learning SAC.", isYou: true },
        { name: "Nandan", role: "Head of Finance", desc: "Owns budgets, forecasts, and month-end close." },
        { name: "Menon", role: "South Regional Sales Manager", desc: "Needs product drilldown for his territory." }
      ];
      portal.CASE_STUDY.storyOpening =
        "RetailCo India sells beverages, snacks, and personal care through 200+ outlets across five regions. You are <strong>Mona</strong>, the SAC analyst — Chinnu, Nandan, Menon, and the rest of the team will ask you for dashboards, planning, and forecasts. Your job over 14 days is to build what they need in SAP Analytics Cloud, one story at a time.";
    }
  }
})();
