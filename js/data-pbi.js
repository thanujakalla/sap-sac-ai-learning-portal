/**
 * SAP SAC Learning Portal — Power BI Developer Transition Track
 * 14-day curriculum with PBI concept mapping, teacher-style lessons, verified links only.
 */
const L = window.SAC_LINKS;

window.SACPortal = {
  showCompareTab: true,

  CONFIG: {
    totalDays: 14,
    storageKey: "sac_pbi_state_v3",
    pageTitle: "SAP Analytics Cloud | Power BI Developer Transition",
    heroTitle: "Your complete path from Power BI to SAP Analytics Cloud",
    heroDescription: "Structured 14-day transition plan for Power BI developers — daily lessons map familiar Microsoft concepts to SAC, hands-on RetailCo tasks, planning and Smart Predict, Datasphere live connections, and C_SAC_2415 certification prep.",
    brandSubtitle: "Learning Portal · Power BI Developer Transition",
    learnerProfile: "Power BI Developer → SAP Analytics Cloud",
    notePlaceholder: "Write your notes, Power BI vs SAC comparisons, and key takeaways here...",
    globalNotePlaceholder: "Write your overall SAC learning journal — DAX vs SAC formulas, features with no PBI equivalent, certification prep notes..."
  },

  PHASES: [
    { id: 1, name: "Phase 1: SAP Foundation", color: "#378ADD", days: "1–2" },
    { id: 2, name: "Phase 2: BI & Modeling", color: "#1D9E75", days: "3–6" },
    { id: 3, name: "Phase 3: Planning", color: "#EF9F27", days: "7–9" },
    { id: 4, name: "Phase 4: Predictive", color: "#7F77DD", days: "10–11" },
    { id: 5, name: "Phase 5: Advanced & Integration", color: "#D64545", days: "12–14" }
  ],

  DAYS: [
    {
      day: 1, phase: "Phase 1", pc: "p1",
      title: "Welcome to the SAP world",
      subtitle: "Map your Power BI mental model to the SAP landscape",
      dayIntro: "You already know workspaces, datasets, and the Microsoft data stack. Today you learn where SAC sits in SAP — and why your Power BI skills transfer faster than you think.",
      contextBox: "Power BI mapping: Power BI Service ≈ SAC tenant · Azure ≈ SAP BTP · Fabric Lakehouse ≈ Datasphere",
      topicsDetailed: [
        {
          title: "What SAP actually does — your ERP primer",
          story: "In Power BI you connect to SQL, Excel, or Fabric and build reports. Underneath those sources, enterprise data often originates in an <em>ERP</em> — software that records sales, inventory, and finance. SAP is that ERP for thousands of global companies. Picture <em>RetailCo India</em>: store POS feeds S/4HANA (SAP's ERP), not a random SQL table. SAC reads from SAP's warehouse layer — similar to how Power BI reads from a Fabric semantic model, but the upstream system is SAP-native.",
          cover: ["Define ERP in plain English and compare to transactional sources you model in Power BI", "List SAP's core domains: sales, finance, inventory, HR", "Understand why SAC connects to SAP sources differently than PBI connects to Azure SQL"]
        },
        {
          title: "S/4HANA — the system behind the numbers",
          story: "Think of <em>S/4HANA</em> as the SAP equivalent of the operational database behind your Power BI dataset — except it is the official system of record, not a copy. Old SAP was ECC; S/4HANA runs on the HANA in-memory engine (like having your data always in RAM). When RetailCo closes monthly books, the revenue you will chart in SAC originates here first — just as Fabric DirectLake still traces back to source tables.",
          cover: ["Know S/4HANA = SAP's current flagship ERP", "Compare HANA in-memory concept to Power BI's VertiPaq/import cache", "Remember: SAC dashboards display data; S/4HANA creates it"]
        },
        {
          title: "BW, BW/4HANA, and Datasphere — the warehouse layer",
          story: "Raw S/4HANA tables are too granular for executive dashboards — same problem Fabric Lakehouse solves for Power BI. SAP's answer evolved from <em>BW/4HANA</em> (classic warehouse) to <em>Datasphere</em> (modern cloud warehouse). If you use Fabric's gold layer before semantic models, Datasphere is the SAP gold layer before SAC. Flow: Business Apps → Warehouse → SAC Story — parallel to Source → Fabric → Power BI Report.",
          cover: ["Explain why a warehouse sits between ERP and reporting tools", "Name Datasphere as SAP's cloud data warehouse (Fabric Lakehouse analog)", "Draw the flow: S/4 → Datasphere → SAC"]
        },
        {
          title: "Where SAC fits — BI + Planning + Predictive in one tenant",
          story: "Power BI excels at BI; planning usually needs Power Apps, Excel, or third-party EPM. SAC bundles three pillars in one URL: <em>Business Intelligence</em> (Stories ≈ Reports), <em>Planning</em> (native write-back — no Power Apps hack), and <em>Smart Predict</em> (built-in ML vs Azure ML + custom visuals). RetailCo can show sales, enter budgets, and forecast beverages in one SAC tenant — three licenses in the Microsoft world, one in SAP.",
          cover: ["List SAC's three pillars and note which have no native Power BI equivalent", "Map SAC tenant to Power BI Service workspace + capacity", "Know SAC reads warehouse data live or imports files like PBI Import mode"]
        },
        {
          title: "SAC vs Power BI — your transition cheat sheet",
          story: "Day one mindset shift: stop looking for DAX Editor and start thinking Models + Stories + Versions. Your Power BI strengths — star schema thinking, measure logic, slicer UX, row-level security — all have SAC equivalents with different names. Weak spots to watch: planning write-back, Advanced Formulas syntax, and live BW connections have no PBI parallel. Write a one-page mapping before Day 2.",
          cover: ["List 5 concepts that translate directly (dataset, measure, slicer, RLS, report)", "List 3 SAC-only capabilities (Planning, Data Actions, Versions)", "Bookmark the Power BI vs SAC tab in this portal"]
        }
      ],
      links: L.bundles.starter,
      tasks: [
        "Create SAP.com account and SAC 30-day trial (same urgency as getting Power BI Pro)",
        "Sign up at learning.sap.com — your free SAP Learning Hub entry point",
        "Write a 1-page cheat sheet: SAP terms mapped to Microsoft equivalents (tenant, model, story, version)",
        "Compare SAC home screen navigation to Power BI Service — list 5 UI differences"
      ],
      caseNote: "RetailCo runs S/4HANA for daily sales. As a former Power BI developer, your SAC job is to make those ERP numbers visible, plannable, and forecastable — without rebuilding everything in DAX first."
    },
    {
      day: 2, phase: "Phase 1", pc: "p1",
      title: "Your first login — SAC platform tour",
      subtitle: "Navigate SAC using your Power BI workspace mental model",
      dayIntro: "Today you open SAC for the first time. Map every screen to something you already know in Power BI Service and Desktop — then build your first Optimized Story chart.",
      contextBox: "Power BI mapping: SAC Home ≈ Power BI workspace · Stories ≈ Reports · Models ≈ Semantic models (datasets)",
      topicsDetailed: [
        {
          title: "Signing up and accessing your SAC tenant",
          story: "Your SAC trial URL looks like <em>https://[tenant].hcs.cloud.sap/...</em> — treat it like your Power BI Service tenant URL. Log in with your SAP ID. The trial includes BI, Planning, and Smart Predict for 30 days — broader than a Power BI Pro trial because planning is native. Bookmark the URL; you will live here like you live in app.powerbi.com.",
          cover: ["Complete SAC trial registration and bookmark tenant URL", "Compare trial scope to Power BI Desktop + Service + Premium trial", "Confirm Home screen loads with Stories, Models, and Connections menus"]
        },
        {
          title: "Home screen — Stories, Models, Connections, Calendar",
          story: "Power BI developers know: Reports live in workspaces, datasets sit underneath, gateways connect on-prem. SAC mirrors this: <em>Stories</em> = reports, <em>Models</em> = semantic models, <em>Connections</em> = data sources + Cloud Connector (gateway analog), <em>Calendar</em> = scheduled planning jobs (no direct PBI equivalent). Click each menu once and write the Power BI label next to it.",
          cover: ["Click through Stories, Models, Files, Connections, Security", "Open BestRunJuice sample story — compare layout to a sample Power BI report", "Identify where to create a new story vs a new model (like Report vs Dataset)"]
        },
        {
          title: "Live connection vs Import (Acquire)",
          story: "This maps cleanly to Power BI: <em>Import (Acquire)</em> = Import mode — data copied into SAC HANA, fast queries, scheduled refresh. <em>Live connection</em> = DirectQuery — metadata in SAC, rows stay at source (Datasphere, BW, HANA). Live is always fresh but source-bound; Import is fast but stale until refresh. You already make this trade-off in Power BI; SAC uses the same logic with different connection wizards.",
          cover: ["Define live vs import using Power BI Import/DirectQuery analogies", "Know live sources: Datasphere, BW, HANA, S/4 views", "Know import sources: CSV, Excel, Concur, SuccessFactors"]
        },
        {
          title: "Optimized Story — the report canvas you should build",
          story: "Ignore Classic stories (legacy, like old Power BI dashboards). <em>Optimized Story</em> is the current standard — canvas pages for desktop executives, responsive pages for mobile. Think Power BI report pages with two layout modes. RetailCo's CEO dashboard will be canvas; regional managers get responsive — same report, different layout philosophy than PBI's phone view.",
          cover: ["Create one blank Optimized Story", "Add a single bar chart — compare Builder panel to Power BI Visualizations pane", "Switch to mobile preview and compare to Power BI mobile layout view"]
        }
      ],
      links: [L.trial, L.helpViewer, L.helpMain, L.product],
      imgs: [
        { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-planning.png", cap: "SAC Planning interface" },
        { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-predictive.png", cap: "Smart Predict in SAC" }
      ],
      tasks: [
        "Log into SAC trial and explore every home menu item — note the Power BI equivalent for each",
        "Open BestRunJuice sample model and story — compare to a sample .pbix structure",
        "Create a blank Optimized Story with one bar chart",
        "List 5 UI differences from Power BI Desktop/Service in your notes"
      ],
      caseNote: "BestRunJuice has Store, Product, Date dimensions — same star-schema shape you would build in Power BI. Explore it before creating RetailCo's model on Day 3."
    },
    {
      day: 3, phase: "Phase 2", pc: "p2",
      title: "Building your first data model",
      subtitle: "Dimensions, measures, and CSV import — your semantic model skills apply",
      dayIntro: "A SAC Analytic Model is your Power BI dataset. Today you upload RetailCo's CSV and structure dimensions and measures — the same star-schema thinking you use in Power Query and Model view.",
      contextBox: "Power BI mapping: Analytic Model ≈ Import-mode semantic model · Dimensions ≈ Columns/tables · Measures ≈ DAX measures",
      topicsDetailed: [
        {
          title: "Analytic Model vs Planning Model — read-only vs write-back",
          story: "<em>Analytic Models</em> are read-only — your Power BI Import dataset for dashboards. <em>Planning Models</em> allow typed input and save-back — something Power BI needs Power Apps + SQL or third-party EPM for. RetailCo sales dashboard = Analytic Model. Finance budget = Planning Model (Day 7). Same grain, different purpose — do not conflate them like mixing a dataset with an Excel write-back sheet.",
          cover: ["Define Analytic Model = BI reporting (like PBI dataset)", "Define Planning Model = budgets with write-back (no PBI native equivalent)", "Plan to build Analytic first, Planning on Day 7"]
        },
        {
          title: "Dimensions — categories, not numbers",
          story: "Dimensions are your dimension tables and categorical columns: <em>Region</em>, <em>Product</em>, <em>Month</em>. In Power BI you drag Region to a slicer; in SAC you assign Region as a dimension on the model. Same star-schema rule: dimensions describe, measures quantify. RetailCo: 5 regions × 3 categories × 12 months — identical modeling instinct to building dimDate and dimProduct in Power BI.",
          cover: ["Create Region, Product, and Month dimensions", "Compare Generic vs Date dimension types to Power BI column types", "Map each CSV column to the correct dimension like Power Query typing"]
        },
        {
          title: "Measures — the numbers you aggregate",
          story: "Measures in SAC behave like DAX measures: <em>Revenue</em>, <em>Units Sold</em>, <em>Target</em>. SAC auto-aggregates SUM; you define format strings like Power BI measure formatting. Key difference: SAC separates Account-type measures in planning models, but Analytic Models feel familiar — Revenue is Revenue, just without CALCULATE until Day 4.",
          cover: ["Define Revenue, Units, and Target as measures", "Validate totals match CSV — same sanity check as refreshing Power BI", "Compare implicit vs explicit aggregation to Power BI measure behavior"]
        },
        {
          title: "Importing CSV and Data Wrangler",
          story: "Uploading CSV to SAC is like Get Data → Text/CSV in Power BI, but the <em>Data Wrangler</em> is Power Query-lite inside SAC — fix dates, split columns, trim blanks. RetailCo columns: Date, Region, Product, Revenue, Units, Target. One wrong mapping corrupts every chart — same as wrong relationship cardinality in Power BI. Preview row counts before save.",
          cover: ["Upload RetailCo CSV via Create → Model → Import", "Use preview to verify totals match source file", "Fix data types — compare to Power Query 'Changed Type' step"]
        }
      ],
      links: L.bundles.modeling,
      tasks: [
        "Upload RetailCo CSV into SAC — compare import flow to Power BI Get Data",
        "Create Region, Product, Month dimensions (same as building dim tables in PBI)",
        "Define Revenue, Units, Target measures",
        "Compare SAC model grand totals against original CSV — same validation you do after refresh in Power BI"
      ],
      caseNote: "Foundation model: 5 regions × 3 categories × 12 months. This is your RetailCo semantic model — every story for the next two weeks connects here, like a single dataset powering multiple Power BI reports."
    },
    {
      day: 4, phase: "Phase 2", pc: "p2",
      title: "Calculations, time, and geo enrichment",
      subtitle: "Calculated measures and RLS — your DAX skills translate with new syntax",
      dayIntro: "Today you add calculated measures, restricted filters, and row-level security — direct parallels to DAX measures, CALCULATE, and RLS in Power BI.",
      contextBox: "Power BI mapping: Calculated Measure ≈ DAX measure · Restricted Measure ≈ CALCULATE(filter) · Data Access Control ≈ Row-Level Security",
      topicsDetailed: [
        {
          title: "Time dimension — fiscal calendar setup",
          story: "SAC's <em>Date dimension</em> auto-builds Year → Quarter → Month hierarchies like Power BI's auto date table — but you configure fiscal year start explicitly. RetailCo India FY starting April is common; wrong fiscal start skews YTD comparisons exactly like wrong DATEADD boundaries in DAX. Set it once in the model, not per visual.",
          cover: ["Configure Date dimension with correct fiscal year start", "Compare hierarchy behavior to Power BI date hierarchies", "Test a simple time-series chart before building executive dashboards"]
        },
        {
          title: "Calculated measures — model-level formulas",
          story: "A <em>calculated measure</em> is SAC's DAX measure: <em>% vs Target = Revenue / Target × 100</em>. Build at model level for performance — same rule as preferring measures over calculated columns in Power BI. <em>Revenue YTD</em> maps to TOTALYTD in DAX; SAC has YTD functions with different syntax but identical business intent.",
          cover: ["Create Revenue YTD calculated measure — note DAX TOTALYTD equivalent", "Create % vs Target measure", "Understand model-level vs story-level calcs (like measure vs visual calc in PBI)"]
        },
        {
          title: "Restricted measures — CALCULATE in SAC clothing",
          story: "<em>Restricted measures</em> embed a filter inside the formula — SAC's closest equivalent to <em>CALCULATE([Revenue], Product[Beverages])</em>. Use for KPI tiles showing one category. Power BI developers often over-rely on CALCULATE; in SAC, restricted measures are first-class and perform better than story-level filters on large models.",
          cover: ["Create Beverage-only restricted measure", "Compare to a DAX CALCULATE measure you would write in Power BI", "Use restricted measure in a test KPI tile"]
        },
        {
          title: "Geo enrichment and Data Access Control",
          story: "<em>Geo enrichment</em> turns Region names into map coordinates — like using Azure Maps or Bing in Power BI, but configured on the dimension. <em>Data Access Control (DAC)</em> is RLS: South managers see South only. In Power BI you write DAX FILTER tables; in SAC you assign dimension members to roles. Same security outcome, different admin UI.",
          cover: ["Enable geo enrichment on Region — compare to Power BI filled map requirements", "Configure DAC so South managers see only South data", "Document DAC role mapping vs Power BI RLS role tables"]
        }
      ],
      links: L.bundles.modeling,
      tasks: [
        "Add Revenue YTD and % vs Target measures — write the equivalent DAX formula beside each",
        "Create Beverage-only restricted measure and compare behavior to CALCULATE in Power BI",
        "Enable geo enrichment and test map visual vs Power BI filled map",
        "Configure DAC for South-only access — compare steps to Power BI 'Manage roles'"
      ],
      caseNote: "YTD Revenue = Power BI TOTALYTD equivalent. % vs Target drives red/green KPI tiles on the executive page — same conditional formatting instinct as Power BI cards with targets."
    },
    {
      day: 5, phase: "Phase 2", pc: "p2",
      title: "Your first executive dashboard",
      subtitle: "KPI tiles, charts, slicers, and themes — report building day",
      dayIntro: "Today your RetailCo model becomes a Story — the SAC equivalent of publishing a Power BI report. KPI cards, bar charts, slicers, and themes map almost one-to-one.",
      contextBox: "Power BI mapping: Story ≈ Power BI Report · Input Control ≈ Slicer · KPI tile ≈ Card visual",
      topicsDetailed: [
        {
          title: "Creating an Optimized Story on your model",
          story: "Start Optimized Story → connect RetailCo Analytic Model. The canvas is your report page; the <em>Builder panel</em> is Visualizations; <em>Styling</em> is Format pane. Power BI developers feel at home in 10 minutes — the muscle memory of drag dimension to Axis, measure to Values still applies.",
          cover: ["Create story from RetailCo Analytic Model", "Map Builder panel and Styling panel to Power BI panes", "Add at least 3 widgets before polishing design"]
        },
        {
          title: "KPI tiles — Card visual equivalents",
          story: "Executives want three numbers first: <em>Total Revenue</em>, <em>Best Region</em>, <em>MoM Growth %</em>. SAC KPI tiles show variance arrows like Power BI Card with trend and target — configure comparison measure and trend direction. These three tiles answer 'How are we doing?' before anyone reads a chart.",
          cover: ["Build Total Revenue KPI with variance vs Target", "Build Best Region KPI — compare to TOPN ranking pattern in DAX", "Build MoM Growth % KPI with trend indicator"]
        },
        {
          title: "Bar and line charts — the standard layout",
          story: "Bar chart by Region = Power BI clustered bar. Line by Month = line chart with Date hierarchy. This two-chart layout below KPIs is the global standard — you have built it hundreds of times in Power BI. SAC chart types differ slightly (waterfall, bullet native) but assignment logic is identical.",
          cover: ["Add bar chart: Revenue by Region", "Add line chart: Revenue by Month", "Apply number formatting — compare to Power BI custom format strings"]
        },
        {
          title: "Input controls and themes",
          story: "<em>Input controls</em> are slicers — page-level, story-level, or calculation-scoped (like slicer sync vs visual-level filter). Add Region and Product dropdowns filtering all visuals. <em>Themes</em> match Power BI report themes — set brand colors once instead of formatting each visual. RetailCo SAP-branded palette = one theme apply.",
          cover: ["Add Region input control affecting all page widgets — compare to PBI sync slicers", "Add Product filter", "Apply custom theme — compare to Power BI View → Themes"]
        }
      ],
      links: L.bundles.stories,
      imgs: [
        { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-dashboard.png", cap: "SAC executive dashboard" }
      ],
      tasks: [
        "Build executive page with 3 KPI tiles — compare each to Power BI Card visual setup",
        "Add bar chart by Region and line chart by Month",
        "Add Region and Product input controls — compare slicer sync behavior to Power BI",
        "Apply consistent theme — note differences from Power BI theme JSON format"
      ],
      caseNote: "This page is RetailCo's Monday CEO view. Three KPIs + two charts + two slicers = minimum viable executive dashboard — identical information architecture to your best Power BI landing pages."
    },
    {
      day: 6, phase: "Phase 2", pc: "p2",
      title: "Interactive dashboards — drilldowns and linked analysis",
      subtitle: "Cross-filtering and drill — Edit Interactions in SAC",
      dayIntro: "Static reports answer one question. Today you enable linked analysis (cross-filter) and drilldown — the SAC equivalents of Edit Interactions and drill-through in Power BI.",
      contextBox: "Power BI mapping: Linked Analysis ≈ Edit interactions · Drill-through ≈ Drill-through page · Bookmarks ≈ Story bookmarks",
      topicsDetailed: [
        {
          title: "Linked analysis — cross-filter on click",
          story: "When a sales manager clicks the South bar, the product table filters to South. In Power BI you configure Edit Interactions → Filter. In SAC it is <em>Linked Analysis</em> — select source chart, choose targets, set direction. Test every region click. Power BI developers who master interaction design will demo this confidently in SAC interviews.",
          cover: ["Configure linked analysis: region bar → product table", "Compare to Power BI Edit Interactions panel", "Test all 5 regions and verify filter propagation"]
        },
        {
          title: "Drilldown and hierarchy navigation",
          story: "Drilldown in SAC works like Power BI drill on Date hierarchy or Product hierarchy — Year → Quarter → Month, Category → SKU. Enable on line chart and bar chart. Drill-through pages in Power BI map to SAC's dimension drill and linked pages — Page 2 receives context from Page 1 selection.",
          cover: ["Enable time hierarchy drill on line chart", "Add product dimension drilldown", "Compare drill paths to Power BI drill-down vs drill-through pages"]
        },
        {
          title: "Page 2 — product drilldown for sales managers",
          story: "Build operational Page 2: top-5 products, detail table, trend line. Link from Page 1 region selection — like Power BI drill-through passing Region filter to a detail page. Sales managers live here; executives stay on Page 1. Same information architecture as multi-page Power BI apps.",
          cover: ["Create Page 2 with product focus", "Add top-5 rank filter — compare to TOPN visual filter in Power BI", "Link Page 1 region selection to Page 2 filters"]
        },
        {
          title: "Sharing, comments, and export",
          story: "Share story with view/edit access — Power BI workspace sharing. Comments on data points — Power BI comments. Export PDF — Power BI Export to PDF. Mobile preview — Power BI mobile layout. Smart Insights and Search to Insight (Just Ask) are SAC's augmented analytics — closer to Copilot for Power BI than anything in standard PBI Desktop.",
          cover: ["Share story with view access — compare sharing model to Power BI workspaces", "Export PDF and test mobile preview", "Try Smart Insights on revenue chart — compare to Power BI 'Analyze' explain feature"]
        }
      ],
      links: L.bundles.stories,
      tasks: [
        "Build Page 2 with linked analysis — compare configuration steps to Power BI Edit Interactions",
        "Add top-5 products rank filter",
        "Export story as PDF — compare output to Power BI PDF export",
        "Document 3 interaction patterns that work identically in PBI and SAC"
      ],
      caseNote: "Sales manager clicks South → sees top 5 SKUs instantly. This linked analysis demo replaces a Power BI drill-through page in your portfolio — show both versions in interviews."
    },
    {
      day: 7, phase: "Phase 3", pc: "p3",
      title: "Introduction to SAC Planning",
      subtitle: "Native write-back — the capability Power BI cannot match out of the box",
      dayIntro: "Everything until now was read-only BI — your comfort zone. Planning is SAC's superpower: finance types budgets directly into the model. No Power Apps, no write-back connector, no SQL staging tables.",
      contextBox: "Power BI mapping: Planning Model ≈ No Power BI equivalent · Versions ≈ Scenario/what-if tables · Write-back ≈ Power Apps + SQL workaround",
      topicsDetailed: [
        {
          title: "What makes Planning different from BI",
          story: "Power BI shows what happened. SAC Planning decides what should happen — users type budget numbers that persist in the model. You might have hacked write-back with Power Apps forms or third-party tools; SAC ships it native. RetailCo finance enters FY2026 monthly budget by region inside SAC, connected to the same Actuals you chart in BI.",
          cover: ["Define planning write-back vs BI read-only", "List use cases: budget, forecast, headcount — note PBI workarounds for each", "Understand why this is the #1 reason enterprises pick SAC over Power BI alone"]
        },
        {
          title: "Finance P&L structure — accounts and sign logic",
          story: "Finance speaks in account types: <em>Income</em>, <em>Expense</em>, <em>Asset</em>, <em>Liability</em>. Power BI developers model GL data as fact tables; SAC Planning uses account dimension with INC/EXP/AST/LEQ types and sign flipping. Learn Gross Sales → COGS → Gross Profit → Opex → Net Income — same P&L you have visualized, different input paradigm.",
          cover: ["Know INC, EXP, AST, LEQ account types", "Map RetailCo accounts: Revenue, COGS, Marketing, Salaries", "Compare to how you model GL in Power BI star schema"]
        },
        {
          title: "Versions — Actual, Forecast, Budget",
          story: "Power BI what-if parameters and calculation groups simulate scenarios; SAC <em>Versions</em> are persistent slices of the cube — Actual, Forecast, Budget living side-by-side. RetailCo shows budget ₹100L vs forecast ₹95L vs actual ₹92L in one table. Versions are structural, not a DAX SWITCH hack.",
          cover: ["Create Actual and Budget versions", "Compare public vs private versions to Power BI dataset copies / XMLA branches", "Understand planners edit private versions then publish — no PBI equivalent"]
        },
        {
          title: "Data entry tables — the planner's Excel replacement",
          story: "A <em>data entry table</em> looks like Excel inside SAC — rows = accounts, columns = months, cells editable for Budget version. Power BI has no native editable matrix that saves to the model. Your job as developer: build the table and security; finance types numbers. Write-back just works.",
          cover: ["Create Planning Model for RetailCo", "Build input table for monthly budget by region", "Verify write-back saves — compare to any PBI write-back hack you have seen"]
        }
      ],
      links: L.bundles.planning,
      imgs: [
        { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-planning.png", cap: "Finance P&L planning in SAC" }
      ],
      tasks: [
        "Create Finance Planning model — note there is no Planning Model equivalent in standard Power BI",
        "Set up Actual and Budget versions — compare concept to Power BI scenario parameters",
        "Build budget input table by region and month",
        "Write 3 sentences explaining to a Power BI client why SAC Planning beats PBI + Power Apps"
      ],
      caseNote: "Finance enters FY2026 budget by region. Products: Apparel and Footwear. This is the feature you put in slide one when explaining SAC to a Power BI-only organization."
    },
    {
      day: 8, phase: "Phase 3", pc: "p3",
      title: "Data Actions — automate planning tasks",
      subtitle: "Planning macros — beyond Power Automate + SQL scripts",
      dayIntro: "Finance repeats monthly: copy actuals, apply growth, spread costs. Data Actions are one-click planning automation — closer to SSAS writeback partitions + stored procedures than anything in Power BI.",
      contextBox: "Power BI mapping: Data Action ≈ Power Automate + SQL for planning · Allocation ≈ DAX allocation pattern · Distribution ≈ % split logic",
      topicsDetailed: [
        {
          title: "What is a Data Action",
          story: "A <em>Data Action</em> is a button planners run: copy version A to B, multiply by 10%, allocate COGS by driver. Power BI has no native equivalent — you would chain Power Automate, Azure Functions, and SQL MERGE. RetailCo CFO clicks 'Simulate 10% South growth' and sees P&L impact in 30 seconds.",
          cover: ["Define Data Action purpose for Power BI developers", "List step types: Copy, Allocation, Advanced Formula", "Know Data Actions run on Planning models only — not datasets"]
        },
        {
          title: "Copy step — version cloning",
          story: "Most common action: copy <em>Actual</em> to seed <em>Forecast</em> — like copying a Power BI dataset branch or exporting/importing scenario tables, but atomic inside SAC. Copy Dec Actual headcount to Jan Forecast opening. Always test on private version — never overwrite Actual (same discipline as not overwriting production SQL).",
          cover: ["Create Copy step: Actual → Forecast for one month", "Compare to how you would clone scenario data in Power BI", "Run and verify copied values match source"]
        },
        {
          title: "Allocation — driver-based spreading",
          story: "<em>Allocation</em> distributes a lump sum by a driver — COGS ₹50L spread by Gross Sales per product. Power BI consultants simulate this in DAX or Excel; SAC runs it server-side on the planning model. Driver-based allocation = proportional split; equal distribution = even split. Finance uses drivers daily.",
          cover: ["Understand driver-based vs equal split allocation", "Create COGS allocation by Gross Sales driver", "Compare to DAX allocation patterns you may have used in PBI what-if models"]
        },
        {
          title: "Headcount formula — planning script in action",
          story: "Opening + Hires − Terminations = Closing; next month Opening = prior Closing. Circular logic that breaks Excel; SAC handles it with <em>Advanced Formula</em> steps in Data Actions. HR enters Hires/Terminations; SAC calculates headcount roll-forward — no Power Automate loop required.",
          cover: ["Understand Opening/Hires/Terminations/Closing logic", "Create Data Action with formula steps for headcount", "Add trigger button to planning story — compare to Power BI button + refresh hack"]
        }
      ],
      links: L.bundles.planning,
      tasks: [
        "Create Copy step: Actual to Forecast — compare to Power BI scenario copy workflows",
        "Build COGS allocation by Gross Sales driver",
        "Create headcount formula Data Action",
        "Add trigger button to planning story and demo to a colleague used to Power BI only"
      ],
      caseNote: "CFO scenario: 'What if South grows 10%?' — run allocation and show P&L impact. This 60-second demo has no Power BI native counterpart.",
      codeExample: "Headcount loop (Advanced Formula):\nClosing = Opening + Hires - Terminations\nNext month Opening = Previous month Closing"
    },
    {
      day: 9, phase: "Phase 3", pc: "p3",
      title: "Advanced Formulas and Multi Actions",
      subtitle: "DAX meets MDX — enterprise planning automation",
      dayIntro: "Advanced Formulas use LOOKUP and RESULTLOOKUP — think DAX + MDX hybrid. Multi Actions chain planning jobs like an orchestrated pipeline beyond Power Automate's comfort zone.",
      contextBox: "Power BI mapping: Advanced Formula ≈ DAX + MDX hybrid · Multi Action ≈ Planning pipeline · Planning Calendar ≈ Scheduled dataset refresh + Power Automate",
      topicsDetailed: [
        {
          title: "Advanced Formula syntax — RESULTLOOKUP and LOOKUP",
          story: "<em>RESULTLOOKUP</em> reads another cell context — 'get Closing headcount from previous month'. <em>LOOKUP</em> reads across time — prior year same period. Power BI developers reach for CALCULATE, SAMEPERIODLASTYEAR, and LOOKUPVALUE; SAC planning formulas use different syntax but identical intent. Master these two functions and most planning scripts become readable.",
          cover: ["Read a RESULTLOOKUP formula — map parameters to DAX CALCULATE mental model", "Use LOOKUP for prior-year comparison — compare to SAMEPERIODLASTYEAR", "Practice IF statements for version-specific logic"]
        },
        {
          title: "Cross-model copy — integrated planning",
          story: "HR Headcount model feeds Finance FTE costs via <em>cross-model copy</em>. In Power BI you would merge datasets or use shared semantic models; SAC copies planning data between models with governed steps. When HR adds 5 hires, Finance salary expense updates — integrated planning Power BI cannot do without custom ETL.",
          cover: ["Understand why multiple planning models exist", "Map cross-model copy to Power BI shared dataset / composite model patterns", "Connect RetailCo HR headcount → Finance salary expense"]
        },
        {
          title: "Multi Actions — chained planning workflows",
          story: "A <em>Multi Action</em> chains: Data Action + Version publish + Data lock + notification. Month-end close: load actuals → forecast → unlock → planners adjust → lock → email CFO. Power BI has refresh + Power Automate; SAC has native orchestration with audit trail on planning data.",
          cover: ["List Multi Action step types: Data Action, Version Mgmt, Data Lock, Import", "Design MEC workflow on paper — compare to Power BI + Power Automate architecture", "Know Planning Calendar schedules Multi Actions like scheduled refresh"]
        },
        {
          title: "Data locking — protect approved numbers",
          story: "Once Budget is board-approved, lock it. States: Open, Restricted, Locked — finer than locking a Power BI workspace. Lock Actual months after close; unlock Forecast for planner revisions. Preventing 'someone changed the budget spreadsheet' was never Power BI's job; it is core SAC planning governance.",
          cover: ["Configure lock on Actual for closed months", "Compare to Power BI workspace role restrictions (view-only is not data lock)", "Include lock step in Multi Action workflow"]
        }
      ],
      links: L.bundles.planning,
      tasks: [
        "Write and test Advanced Formula with IF/RESULTLOOKUP — document DAX equivalent intent",
        "Design Multi Action for month-end close on paper",
        "Configure data lock on test version",
        "Explain to a Power BI developer why Multi Actions replace 3 Power Automate flows"
      ],
      caseNote: "Month-end close: Data Load → Predictive Forecast → Unlock → Planner revision → Budget allocation → Lock → Email. No Power BI native pipeline matches this.",
      codeExample: "IF([d/Version]=\"Actual\", [Gross_Sales],\n  IF([d/Entity]=\"United States\", [Revenue_NA], [Revenue_Overseas]))"
    },
    {
      day: 10, phase: "Phase 4", pc: "p4",
      title: "Smart Predict — machine learning forecasts",
      subtitle: "Built-in ML — no Azure ML or Python visuals required",
      dayIntro: "Smart Predict is SAC's AutoML for time series, classification, and regression. Power BI offers basic Analytics pane forecasting; SAC trains models inside the tenant — closer to Azure ML AutoML than to PBI's linear forecast line.",
      contextBox: "Power BI mapping: Smart Predict ≈ Azure ML AutoML · Time-series ≈ Analytics pane forecast · Classification ≈ Binary prediction custom visual",
      topicsDetailed: [
        {
          title: "Three predictive scenario types",
          story: "Smart Predict offers <em>Classification</em> (churn yes/no), <em>Regression</em> (predict a number), and <em>Time Series</em> (forecast trend). Power BI's forecast button handles simple linear extrapolation; SAC trains on seasonality automatically. RetailCo needs Time Series for beverage demand — the FMCG standard use case.",
          cover: ["Define classification, regression, and time-series", "Compare PBI Analytics pane forecast limitations to Smart Predict", "Choose time-series for RetailCo beverage forecast"]
        },
        {
          title: "The 4-step predictive workflow",
          story: "Dataset → Train → Apply → Story. Like preparing a Power BI dataset, training an Azure ML model, scoring, and visualizing — but inside SAC without switching portals. Step 1 data quality matters: garbage in from your Day 3 import = garbage forecast, same as bad Power Query steps ruin PBI forecasts.",
          cover: ["Prepare RetailCo beverage sales history (12+ months minimum)", "Create predictive scenario in Smart Predict", "Review training accuracy before applying — compare to Azure ML validation metrics"]
        },
        {
          title: "Confidence intervals and forecast accuracy",
          story: "Power BI's forecast line shows point estimate; SAC adds <em>confidence bands</em> — '₹80–95L with 90% confidence'. Calculate <em>Forecast Accuracy</em> = (1 − |Actual − Forecast| / Actual) × 100. Above 85% is good. You would build similar MAPE measures in DAX; SAC surfaces accuracy in the predictive workflow.",
          cover: ["Interpret confidence bands vs PBI single forecast line", "Calculate forecast accuracy for one product", "Write CFO-ready insight paragraph"]
        },
        {
          title: "Adding forecast to your RetailCo dashboard",
          story: "Combine actual solid line + forecast dashed line + shaded confidence band on your Day 5 line chart — richer than default Power BI forecast visual. CEO sees: 'Nine months on target; Q4 Snacks risk per 90% band.' Forward-looking dashboards differentiate SAC portfolios from PBI-only work.",
          cover: ["Add forecast output to story chart", "Combine actual + forecast on one time-series", "Compare final visual to Power BI forecast analytics pane result"]
        }
      ],
      links: L.bundles.predict,
      imgs: [
        { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-predictive.png", cap: "Smart Predict scenario editor" }
      ],
      tasks: [
        "Run time-series forecast on RetailCo beverage sales (3 months)",
        "Compare Smart Predict output to Power BI Analytics pane forecast on same data",
        "Add forecast line + confidence band to dashboard",
        "Write 2-sentence CFO insight — note what PBI could not show without Azure ML"
      ],
      caseNote: "Ops head needs Oct–Dec beverage demand with confidence band — deliver what a Power BI + Azure ML project would take weeks to build."
    },
    {
      day: 11, phase: "Phase 4", pc: "p4",
      title: "Polish, present, and plan certification",
      subtitle: "Portfolio delivery and PL-300 → C_SAC_2415 transition",
      dayIntro: "Finalise RetailCo, practice presenting, and map your PL-300 study habits to C_SAC_2415. Your Power BI portfolio piece gets a SAC sibling today.",
      contextBox: "Power BI mapping: Presentation Mode ≈ Power BI full-screen · Analytics Catalog ≈ Power BI Apps · Data Analyzer ≈ Analyze in Excel / Explore",
      topicsDetailed: [
        {
          title: "Presentation mode and executive storytelling",
          story: "<em>Presentation mode</em> is Power BI full-screen F5 with cleaner transitions. Narrative: Page 1 status → Page 2 detail → Page 3 forecast. Practice 5-minute walkthrough — same demo skills you use for Power BI executive reviews, different URL.",
          cover: ["Enable presentation mode and test fullscreen", "Structure 3-page narrative: status → detail → forecast", "Practice 5-minute stakeholder walkthrough"]
        },
        {
          title: "Export, mobile, and Analytics Catalog",
          story: "Export PDF for board packs — Power BI Export to PDF. SAC Mobile app — Power BI mobile app. <em>Analytics Catalog</em> is Power BI Apps: curated story portal for 200 RetailCo users who should not browse all workspace content. Configure team sharing like Power BI app audience groups.",
          cover: ["Export full story as PDF", "Test mobile preview vs Power BI phone layout", "Compare Analytics Catalog publishing to Power BI App creation"]
        },
        {
          title: "C_SAC_2415 certification — your PL-300 parallel",
          story: "If you hold or studied for <em>PL-300</em>, <em>C_SAC_2415</em> is the SAP equivalent — 80 questions, 180 minutes, covering models, stories, planning, connections, admin. Your Power BI exam prep rhythm applies: hands-on labs + practice questions + weak-area review. Search learning.sap.com for C_SAC prep.",
          cover: ["Search C_SAC prep on SAP Learning", "Map exam topics to your 11 completed days", "Draft 30-day study plan using same cadence as PL-300 prep"]
        },
        {
          title: "Portfolio — show both Power BI and SAC",
          story: "Screenshot RetailCo SAC dashboard beside an equivalent Power BI report you built on the same data. Write a one-page case study highlighting where SAC adds planning and forecast bands Power BI lacked. Dual-stack portfolios win SAP + Microsoft hybrid roles.",
          cover: ["Export PDF and capture screenshots", "Write 1-page case study with PBI vs SAC comparison section", "List 3 job roles valuing both skillsets"]
        }
      ],
      links: L.bundles.cert,
      tasks: [
        "Finalise 3-page RetailCo dashboard — compare polish to your best Power BI report",
        "Export PDF and record 5-minute walkthrough",
        "Draft 30-day C_SAC_2415 study plan referencing your PL-300 experience",
        "Add SAC case study to portfolio alongside existing Power BI work"
      ],
      caseNote: "Final line: 'South 15% above target, Beverages driving growth, Q4 forecast holds at 90% confidence' — a story Power BI alone could tell only partially."
    },
    {
      day: 12, phase: "Phase 5", pc: "p5",
      title: "SAP Datasphere and live connections",
      subtitle: "DirectQuery to SAP — Fabric Warehouse analog",
      dayIntro: "CSV import was training wheels. Enterprises connect SAC live to Datasphere — like Power BI DirectQuery to Fabric Warehouse or Azure SQL, but SAP-native.",
      contextBox: "Power BI mapping: Datasphere live ≈ DirectQuery to Fabric Warehouse · Cloud Connector ≈ On-premises data gateway",
      topicsDetailed: [
        {
          title: "Why live connections exist",
          story: "Import copies data — stale until refresh, like Power BI Import mode. <em>Live</em> queries source at runtime — DirectQuery. SAC stores metadata only; rows stay in Datasphere. CEO opens dashboard → SAC asks Datasphere for today's revenue. Same freshness trade-off you explain to Power BI clients daily.",
          cover: ["Explain live vs import using PBI DirectQuery vs Import language", "Know SAC stores metadata only for live models", "List live sources: Datasphere, BW, HANA, S/4"]
        },
        {
          title: "Datasphere → SAC architecture",
          story: "Modern SAP pattern: S/4HANA → Datasphere (transform) → SAC (report). Parallel: Source → Fabric Lakehouse → Power BI semantic model → Report. Datasphere Analytic Model = gold layer dataset. Cloud Connector = on-prem data gateway for BW/HANA behind the firewall.",
          cover: ["Draw architecture: S/4 → Datasphere → SAC", "Compare Datasphere Analytic Model to Fabric semantic model", "Know Cloud Connector = Power BI gateway equivalent"]
        },
        {
          title: "Creating a live connection step by step",
          story: "Connections → Add → Live → Datasphere. Enter host, authenticate, create Live Model, build story. Change data in Datasphere → refresh story → numbers update without re-import. Power BI developers who configured DirectQuery to SQL will recognize the wizard — different driver, same mental model.",
          cover: ["Create live connection to Datasphere (trial if available)", "Build live model and test story", "Compare refresh behavior to Power BI DirectQuery performance"]
        },
        {
          title: "When to choose live vs import",
          story: "Live for operational dashboards needing freshness (today's sales). Import for planning write-back, Smart Predict training, and heavy historical analysis. Hybrid is normal — like Power BI reports mixing DirectQuery and Import via composite models. RetailCo: live sales dashboard, import planning model.",
          cover: ["Document RetailCo hybrid strategy", "List 3 live scenarios and 3 import scenarios with PBI parallels", "Explain performance implications to a client who knows PBI Import speed"]
        }
      ],
      links: L.bundles.integration,
      tasks: [
        "Draw RetailCo live architecture diagram — annotate Power BI equivalent at each layer",
        "Create live connection to Datasphere or document steps",
        "Build test story on live model",
        "Write live vs import decision matrix comparing SAC and Power BI trade-offs"
      ],
      caseNote: "Production: S/4HANA ACDOCA → Datasphere → SAC live reporting. Planning stays import for write-back — same hybrid thinking as PBI Import for heavy models + DirectQuery for fresh KPIs."
    },
    {
      day: 13, phase: "Phase 5", pc: "p5",
      title: "BW, HANA, and S/4HANA connections",
      subtitle: "Enterprise SAP sources — beyond Power BI's typical SQL connectors",
      dayIntro: "SAP customers invested years in BW and S/4HANA. SAC connects live to BW Queries, CDS Views, and HANA Calculation Views — connector types Power BI supports differently via SAP connectors.",
      contextBox: "Power BI mapping: BW Query live ≈ DirectQuery to SSAS · CDS View ≈ SQL view · BEx Query ≈ Legacy SSAS",
      topicsDetailed: [
        {
          title: "SAP BW/4HANA live connection",
          story: "Many enterprises still run <em>BW/4HANA</em>. SAC connects live to Composite Providers and BW Queries — similar to Power BI connecting to SSAS or SAP BW Open ODS via connector. Legacy BEx queries work but Datasphere is strategic. Know both because your Power BI clients moving to SAP will ask.",
          cover: ["Know BW/4HANA Composite Provider as live source", "Compare to Power BI SAP BW connector experience", "Recognise migration path: BW → Datasphere → SAC"]
        },
        {
          title: "S/4HANA CDS Views",
          story: "<em>CDS Views</em> are pre-built analytical views in S/4 — like curated SQL views or Fabric warehouse tables. SAC connects live for operational reporting without a warehouse hop. Power BI can query CDS via SAP connector; SAC native live is tighter for SAP shops.",
          cover: ["Define CDS view as S/4 analytical interface", "Compare direct S/4 reporting vs warehouse path — same debate as PBI on transactional DB", "List RetailCo sources: ACDOCA finance actuals"]
        },
        {
          title: "Acquire connections — cloud apps and files",
          story: "Not everything is SAP. <em>Acquire</em> imports SuccessFactors, Concur, Ariba, S3, SQL — like Power BI's 100+ connectors. RetailCo imports Concur travel expenses and S/4 ACDOCA for planning actuals. Delta loads = incremental refresh in Power BI parlance.",
          cover: ["List 5 acquire types and compare to Power BI connector equivalents", "Understand delta/incremental load vs full refresh", "Know hybrid import schedules like Power BI gateway refresh schedules"]
        },
        {
          title: "Hybrid integration blueprint",
          story: "Draw RetailCo landscape: S/4 actuals → import to Planning. Datasphere sales → live to BI Story. Concur travel → import Analytic Model. Each source gets the right connection type — same architecture slide you draw for Power BI gateway + DirectQuery + Import mixes.",
          cover: ["Create integration blueprint with live/import labels", "Assign connection type per source with PBI parallel noted", "Document refresh schedules for each import"]
        }
      ],
      links: [L.helpViewer, L.datasphereHelp, L.dataCloud, L.helpMain],
      tasks: [
        "Document RetailCo integration architecture — add Power BI equivalent column",
        "List live vs acquire for each source with rationale",
        "Research Concur → SAC import in Help Viewer",
        "Present blueprint comparing SAC and Power BI integration options"
      ],
      caseNote: "Three models: Travel (Concur import), Finance Planning (S/4 import), Sales Dashboard (Datasphere live) — a hybrid pattern familiar to senior Power BI architects."
    },
    {
      day: 14, phase: "Phase 5", pc: "p5",
      title: "Performance, security, and going live",
      subtitle: "Weightage, RLS, and deployment — Production readiness",
      dayIntro: "A beautiful SAC story that loads 60 seconds fails like a slow Power BI report. Today: weightage analysis, roles, teams, transport — the admin skills PL-300 touches lightly but C_SAC_2415 tests directly.",
      contextBox: "Power BI mapping: Weightage ≈ Performance analyzer · DAC ≈ RLS · Transport ≈ Deployment pipelines / ALM",
      topicsDetailed: [
        {
          title: "Import vs live performance",
          story: "Import models sit in SAC HANA — sub-second queries like Power BI Import on Premium. Live depends on source speed — slow BW query = slow dashboard, identical to DirectQuery on unoptimized SQL. Rule you already preach in Power BI: optimize the model/source, not just the visual.",
          cover: ["Explain import speed vs live source dependency", "Compare to Power BI Import vs DirectQuery performance profiles", "List HANA in-memory advantages"]
        },
        {
          title: "Story weightage analysis",
          story: "SAC <em>weightage</em> scores widget cost — like Power BI Performance Analyzer per visual. Heavy widgets: unfiltered tables, scatter with 50K points, story-level calcs. Fix: top-N filters, model-level measures, move heavy charts to drilldown pages. Run before go-live — same checklist as PBI performance tuning.",
          cover: ["Run weightage on RetailCo story", "Fix heaviest widget — compare to Performance Analyzer findings in PBI", "Apply rule: KPIs page 1, heavy charts page 2+"]
        },
        {
          title: "Security — roles, teams, and DAC",
          story: "Three layers: Activity auth (can create stories? = Power BI workspace role), Object auth (see this story? = report permissions), Data auth (see South only? = RLS). Create SAC Developer, Planner, Viewer roles. DAC on Region dimension — same outcome as DAX FILTER in Power BI RLS roles.",
          cover: ["Create 3 custom roles — map to Power BI Admin/Member/Viewer", "Set up team-based sharing", "Configure DAC for South manager test user"]
        },
        {
          title: "Transport and Analytics Catalog go-live",
          story: "<em>Transport Management</em> moves content Dev → Test → Prod — Power BI Deployment Pipelines / ALM. <em>Analytics Catalog</em> publishes approved stories to 200 users — Power BI Apps. Go-live checklist: weightage green, security tested, transport documented, users trained.",
          cover: ["Document transport path with PBI pipeline parallel", "Understand Analytics Catalog vs Power BI App publishing", "Complete go-live checklist for RetailCo story"]
        }
      ],
      links: L.bundles.admin,
      tasks: [
        "Run weightage analysis — compare remediation steps to Power BI Performance Analyzer playbook",
        "Create Developer, Planner, Viewer roles — document PBI role mapping",
        "Set up team sharing for Sales Managers",
        "Write 10 performance rules for SAC — extend your existing Power BI best-practices list"
      ],
      caseNote: "Go-live rule: model-level calcs, KPIs on page 1, DAC enabled, weightage green, transport tested — the SAC version of your Power BI production checklist."
    }
  ],

  PBI_COMPARISON: [
    { feature: "Semantic layer", pbi: "Power BI Dataset (Import/DirectQuery)", sac: "Analytic Model (Import) or Live Model" },
    { feature: "Calculated fields", pbi: "DAX measures & calculated columns", sac: "Calculated/restricted measures & calc dimensions" },
    { feature: "Reports", pbi: "Power BI Report (.pbix)", sac: "Optimized Story" },
    { feature: "Slicers", pbi: "Slicer visual", sac: "Input Controls (page/story/calc)" },
    { feature: "Cross-filter", pbi: "Edit interactions", sac: "Linked Analysis" },
    { feature: "Write-back planning", pbi: "Power Apps + SQL (custom)", sac: "Native Planning Models + Data Actions" },
    { feature: "Forecasting", pbi: "Analytics pane forecast / Azure ML", sac: "Smart Predict + Predictive Forecast" },
    { feature: "Data warehouse", pbi: "Fabric Lakehouse / SQL DW", sac: "Datasphere / BW/4HANA" },
    { feature: "Gateway", pbi: "On-premises data gateway", sac: "SAP Cloud Connector" },
    { feature: "Certification", pbi: "PL-300", sac: "C_SAC_2415" }
  ],

  SUBSCRIPTIONS: [
    { tool: "SAP Analytics Cloud Trial", purpose: "Full SAC — BI, Planning, Smart Predict, connectivity (broader than Power BI Pro trial)", cost: "free", costLabel: "Free 30 days", action: L.trial.url, priority: 1 },
    { tool: "SAP Learning (learning.sap.com)", purpose: "Official free courses — SAC getting started, planning, modelling", cost: "free", costLabel: "Free", action: L.learningHome.url, priority: 1 },
    { tool: "SAP Help Portal", purpose: "Complete official documentation — use Help Viewer search like Power BI docs", cost: "free", costLabel: "Free", action: L.helpMain.url, priority: 1 },
    { tool: "SAP Community", purpose: "Q&A forums, blogs, troubleshooting — like Power BI Community", cost: "free", costLabel: "Free", action: L.community.url, priority: 1 },
    { tool: "SAP Analytics Cloud YouTube", purpose: "Official tutorials for visual learners from Power BI background", cost: "free", costLabel: "Free", action: L.youtube.url, priority: 1 },
    { tool: "SAP Datasphere Trial", purpose: "Practice live connections — Fabric Warehouse equivalent in SAP stack", cost: "free", costLabel: "Free trial", action: L.datasphereProduct.url, priority: 2 },
    { tool: "Udemy SAC course", purpose: "Structured course with hands-on exercises for PBI developers", cost: "paid", costLabel: "~₹499 sale", action: L.udemy.url, priority: 3 },
    { tool: "SAC BI License", purpose: "Production: BI + Predictive + Augmented Analytics", cost: "paid", costLabel: "$200/user/yr", action: L.product.url, priority: 4 },
    { tool: "SAC Planning License", purpose: "Production: BI + Planning + Predictive (native write-back — no Power Apps cost)", cost: "paid", costLabel: "$1,200/user/yr", action: L.pricing.url, priority: 4 },
    { tool: "SAP Learning Hub", purpose: "Deep official content + C_SAC_2415 certification prep (PL-300 depth for SAP)", cost: "paid", costLabel: "~$399/yr", action: L.training.url, priority: 5 },
    { tool: "C_SAC_2415 Certification", purpose: "SAP Certified Application Associate — SAC (parallel to PL-300)", cost: "paid", costLabel: "~₹47,000", action: L.certSearch.url, priority: 6 }
  ],

  RESOURCE_LIBRARY: [
    {
      category: "Official SAP Documentation",
      items: [
        { label: L.helpMain.label, url: L.helpMain.url, tag: L.helpMain.tag },
        { label: L.helpViewer.label, url: L.helpViewer.url, tag: L.helpViewer.tag },
        { label: L.helpLegacy.label, url: L.helpLegacy.url, tag: L.helpLegacy.tag },
        { label: L.datasphereHelp.label, url: L.datasphereHelp.url, tag: L.datasphereHelp.tag },
        { label: L.btp.label, url: L.btp.url, tag: L.btp.tag },
        { label: L.dataCloud.label, url: L.dataCloud.url, tag: L.dataCloud.tag }
      ]
    },
    {
      category: "Free Learning (learning.sap.com)",
      items: [
        { label: L.learningHome.label, url: L.learningHome.url, tag: L.learningHome.tag },
        { label: L.learningSAC.label, url: L.learningSAC.url, tag: L.learningSAC.tag },
        { label: L.learningPlanning.label, url: L.learningPlanning.url, tag: L.learningPlanning.tag },
        { label: L.learningPredict.label, url: L.learningPredict.url, tag: L.learningPredict.tag },
        { label: L.certSearch.label, url: L.certSearch.url, tag: L.certSearch.tag }
      ]
    },
    {
      category: "Product & Trial Pages",
      items: [
        { label: L.trial.label, url: L.trial.url, tag: L.trial.tag },
        { label: L.product.label, url: L.product.url, tag: L.product.tag },
        { label: L.pricing.label, url: L.pricing.url, tag: L.pricing.tag },
        { label: L.datasphereProduct.label, url: L.datasphereProduct.url, tag: L.datasphereProduct.tag }
      ]
    },
    {
      category: "Community & Training",
      items: [
        { label: L.community.label, url: L.community.url, tag: L.community.tag },
        { label: L.youtube.label, url: L.youtube.url, tag: L.youtube.tag },
        { label: L.training.label, url: L.training.url, tag: L.training.tag },
        { label: L.udemy.label, url: L.udemy.url, tag: L.udemy.tag }
      ]
    }
  ],

  PERFORMANCE_GUIDE: [
    { rule: "Prefer import models for high-performance dashboards", detail: "Data stored in SAC HANA — sub-second queries. Same instinct as Power BI Import on Premium capacity." },
    { rule: "Use live models when data freshness is critical", detail: "Performance depends on source (Datasphere/BW/HANA). Like DirectQuery — optimize the source, not just the story." },
    { rule: "Build calculated measures at model level", detail: "Model-level: calculate then aggregate. Story-level: aggregate then calculate — slower at scale. Same rule as DAX measures vs visual calculations." },
    { rule: "Run weightage analysis before go-live", detail: "SAC's Performance Analyzer equivalent. Fix heavy widgets, add top-N filters, reduce chart complexity." },
    { rule: "Limit linked analysis scope", detail: "Cross-filter only necessary charts — avoid story-wide linked analysis on large datasets, like limiting Edit Interactions in Power BI." },
    { rule: "Use public dimensions for shared master data", detail: "Avoid duplicating Region/Product across models — similar to shared dimension tables in Power BI." },
    { rule: "Optimize time dimension granularity", detail: "Don't load day-level data if reporting at month level — same grain mismatch mistake as oversized date tables in PBI." },
    { rule: "Schedule import refreshes off-peak", detail: "Delta/incremental loads for large datasets — parallel to Power BI incremental refresh policies." },
    { rule: "First page = major KPIs only", detail: "Heavy charts (scatter, treemap, geo) on drilldown pages — identical landing-page discipline in Power BI." },
    { rule: "Test on mobile device preview", detail: "Responsive pages for executives; canvas for analysts — compare to Power BI mobile layout testing." }
  ],

  CASE_STUDY: {
    name: "RetailCo India",
    tagline: "Regional FMCG sales analytics, planning & forecasting",
    company: "Mid-size FMCG with 5 regions, 3 product categories, 200 retail outlets across India",
    role: "Former Power BI developer building RetailCo's full SAC analytics + planning stack — translating existing PBI dashboard patterns into native SAC Planning and Smart Predict",
    goal: "Track actuals vs budget, identify growth regions, forecast demand, present to C-suite — demonstrating SAC capabilities Power BI alone cannot deliver natively",
    phases: [
      { days: "Days 3–4", title: "Build Analytic Model", desc: "Region, Product, Month dimensions. Upload flat CSV. Revenue, Units, Target measures — same star schema you would build in Power BI." },
      { days: "Days 5–6", title: "Build BI Story", desc: "2-page story: executive KPI page + product drilldown. Region slicer + linked analysis — Edit Interactions in SAC terms." },
      { days: "Days 7–9", title: "Planning Layer", desc: "Finance P&L model with native write-back. Data Actions for headcount & COGS allocation — no Power Apps required." },
      { days: "Days 10–11", title: "Smart Predict", desc: "Time-series forecast beverage sales 3 months with confidence bands — beyond Power BI Analytics pane forecast." },
      { days: "Days 12–14", title: "Enterprise Integration", desc: "Datasphere live connection. S/4HANA actuals import. Performance tuning & security — hybrid architecture like Fabric + on-prem gateway." }
    ],
    financeExample: {
      title: "Finance P&L Planning Scenario",
      steps: [
        "Import Actuals from S/4HANA ACDOCA into Planning Model (like loading GL into Power BI, but with write-back destination)",
        "Run Predictive Forecast → save to Sys_Forecast version",
        "Copy to Forecast_2026 private version for planner adjustments",
        "Allocate COGS across products by Gross Sales driver",
        "Copy Forecast → Budget version for approval cycle",
        "Export plan to S/4HANA ACDOCP for consolidation"
      ]
    }
  }
};
