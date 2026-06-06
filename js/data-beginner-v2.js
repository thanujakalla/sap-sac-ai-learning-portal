/**
 * SAP SAC Learning Portal — Absolute Beginner Track
 * Requires sac-links.js loaded first.
 */
const L = window.SAC_LINKS;

window.SACPortal = {
  showCompareTab: false,

  CONFIG: {
    totalDays: 14,
    contentUpdatedThroughDay: 10,
    storageKey: "sac_beginner_v2_state",
    showCompareTab: false,
    hideVideoTab: true,
    hideVisualTab: true,
    collapseLessonSections: true,
    hideFeaturedVideos: true,
    hideCaseStudyVideo: true,
    pageTitle: "SAP Analytics Cloud Learning Portal | Absolute Beginner · Version 2",
    heroTitle: "Learn SAP Analytics Cloud from zero — story by story, with RetailCo",
    heroDescription: "A gentle 14-day roadmap aligned with SAC 2025–2026 (Optimized Design Experience): side navigation, Data Panel, Just Ask, and current menu paths — plus RetailCo story lessons, official SAP docs, and AI prompts.",
    brandSubtitle: "Learning Portal · Version 2 · ODE 2025–2026",
    sacVersionBadge: "Version 2",
    notePlaceholder: "Your personal notes for today — questions, aha moments, things to practice in SAC...",
    globalNotePlaceholder: "Your SAC learning journal — write like a diary: what confused you, what clicked, RetailCo build steps, questions for your mentor..."
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
      title: "SAP ecosystem — where SAC fits",
      subtitle: "ERP, S/4HANA, BW, Datasphere, and the role of Analytics Cloud",
      dayIntro: "Welcome to Day 1. Before you open SAP Analytics Cloud, we need to understand the SAP landscape — the systems that capture business data and the tools that turn that data into decisions. Think of today as reading the campus map before your first class.",
      searchHint: "SAP Analytics Cloud overview ecosystem",
      topicsDetailed: [
        {
          title: "ERP fundamentals — the business backbone",
          story: "Picture <em>RetailCo India</em>, an FMCG company selling beverages, snacks, and personal care products across five regions — North, South, East, West, and Central. Every day, distributors place orders, warehouses ship cartons, and finance teams record payments. An <em>ERP</em> (Enterprise Resource Planning) system is the central ledger that captures all of this: who sold what, where, and for how much. Without ERP, each department keeps separate spreadsheets that never reconcile.",
          cover: [
            "Define ERP in plain language: software that runs core business transactions",
            "List the main business areas SAP ERP covers: sales, finance, inventory, procurement",
            "Understand why companies need one authoritative source for operational data"
          ]
        },
        {
          title: "S/4HANA — SAP's modern intelligent ERP",
          story: "Older SAP systems were called ECC — reliable but complex. <em>S/4HANA</em> is the modern replacement, built on the HANA in-memory database so reports run dramatically faster. When RetailCo's finance team closes monthly books, S/4HANA holds the official revenue numbers for every region. <em>SAP Analytics Cloud</em> will later read those numbers to build dashboards, but S/4HANA is where the transactional truth lives first.",
          cover: [
            "Know that S/4HANA is SAP's current flagship ERP product",
            "Understand HANA as a fast in-memory database optimised for analytics",
            "Remember: transactional data originates in ERP, not in SAC"
          ]
        },
        {
          title: "BW, BW/4HANA, and Datasphere — the data warehouse layer",
          story: "Raw transaction data in S/4HANA is too granular for executive reporting — hundreds of tables, millions of rows. SAP built warehouse layers to clean, join, and organise data for analysis. <em>BW/4HANA</em> is the classic on-premise warehouse; <em>Datasphere</em> is the modern cloud successor. Imagine RetailCo's sales flowing from store POS → S/4HANA → Datasphere (cleaned and aggregated) → SAC dashboard showing 'South region beverages up 12% this quarter'.",
          cover: [
            "Explain why a data warehouse sits between ERP and reporting tools",
            "Name Datasphere as SAP's modern cloud data warehouse",
            "Draw the flow: Business Apps → Warehouse → SAC"
          ]
        },
        {
          title: "SAP Business Technology Platform (BTP)",
          story: "<em>SAP BTP</em> is the cloud platform where SAP hosts integration, extension, and analytics services. SAC runs on BTP alongside Datasphere, SAP Build, and connectivity services. For RetailCo, BTP is the cloud foundation — you do not install SAC on a server in Mumbai; SAP hosts it and gives you a tenant URL to log into.",
          cover: [
            "Understand BTP as SAP's cloud platform for analytics and integration",
            "Know SAC is a cloud service, not software you install locally",
            "Recognise BTP connects SAC to Datasphere, S/4HANA, and third-party apps"
          ]
        },
        {
          title: "Where SAC fits — BI, Planning, and Predictive in one tool",
          story: "Most analytics tools only show charts. SAC does three jobs in one tenant: <em>Business Intelligence</em> (dashboards and stories), <em>Planning</em> (finance teams enter budgets directly in the tool), and <em>Smart Predict</em> (forecast next quarter's beverage demand using machine learning). For RetailCo, one SAC tenant can show today's regional sales, let the CFO enter next year's budget, and forecast snack inventory — all without switching applications.",
          cover: [
            "List SAC's three pillars: BI, Planning, and Predictive",
            "Understand SAC reads data via live connections or file import",
            "Articulate SAC's role: the decision layer on top of ERP and warehouse data"
          ]
        }
      ],
      links: L.bundles.starter,
      tasks: [
        "Create a free account at sap.com and register for the SAC 30-day trial",
        "Sign up at learning.sap.com with your SAP ID",
        "Bookmark the SAP Help Portal SAC documentation hub",
        "Draw RetailCo's data flow on paper: stores → S/4HANA → Datasphere → SAC"
      ],
      caseNote: "RetailCo India runs S/4HANA for daily FMCG sales across five regions. Your SAC journey starts by understanding where those transaction numbers originate before you build a single chart."
    },
    {
      day: 2, phase: "Phase 1", pc: "p1",
      title: "SAC UI orientation",
      subtitle: "Trial access, home screen, stories vs models, live vs import",
      dayIntro: "Today you log into SAC for the first time. The 2025–2026 interface uses left side navigation and unified start pages — not the old top-level Create menu. By the end of today you will know tenant URLs, how to open Stories and Modeler, the Model → Story dependency, live vs import connections, and you will create your first chart in an Optimized Story (the default for all new content).",
      searchHint: "getting started SAP Analytics Cloud",
      topicsDetailed: [
        {
          title: "Signing up and accessing your SAC trial tenant",
          story: "Your SAC trial gives you a unique URL like <em>https://[tenant].us10.hcs.cloud.sap</em> — bookmark it immediately. You authenticate with your <em>SAP ID</em> (Universal ID) via OAuth; corporate tenants may use SAML SSO instead. The trial tenant runs on SAP BTP in a specific region (e.g. US10, EU10) and includes BI, Planning, and Smart Predict for 30 days. Each tenant is isolated — your objects, users, and connections never mix with another company's tenant.",
          cover: [
            "Complete SAC trial registration using the official sap.com signup page",
            "Bookmark your tenant URL — you will use it every day of this roadmap",
            "Confirm you can see the SAC home screen after successful login",
            "Note your tenant region code (US10/EU10) — it affects data residency"
          ]
        },
        {
          title: "Home screen and side navigation — Stories, Modeler, Files",
          story: "After login you land on the SAC <em>Home</em> page (2025 Q3 redesign: <em>Today</em> and <em>Catalog</em> tabs, plus <em>Customize</em>). The real work happens via <strong>left side navigation</strong>: <em>Stories</em> (dashboards), <em>Modeler</em> (analytic and planning models), <em>Files</em> (uploaded CSV/Excel), <em>Connections</em>, <em>Data Actions</em>, <em>Smart Predict</em>, and <em>Data Analyzer</em>. Each app has a <em>start page</em> where you browse and create in one place — there is no separate legacy Create menu. For this roadmap focus on <strong>Stories</strong> and <strong>Modeler</strong> only.",
          cover: [
            "Use side navigation to open Stories, Modeler, Files, and Connections",
            "Explore Home → Today and Catalog tabs; note the Customize button",
            "Open a sample story such as BestRunJuice if available in your tenant",
            "Locate System → About to confirm your SAC release version"
          ]
        },
        {
          title: "Stories vs Models — two objects you must never confuse",
          story: "A <em>Model</em> defines the semantic layer: dimensions (Region, Product, Date), measures (Revenue, Units), hierarchies, and calculated members. A <em>Story</em> is a presentation layer that binds widgets to model fields via the Builder panel. RetailCo's Analytic Model might hold 5 regions × 3 categories × 12 months; the CEO Story references that model but stores no data itself. Technical rule: <em>one model can feed many stories</em>, but deleting or repointing a model breaks every dependent story widget.",
          cover: [
            "Define Model as the data layer and Story as the presentation layer",
            "Understand one model can feed multiple stories",
            "Know deleting a model breaks all stories built on it",
            "Recognise story widgets query the model at runtime — they are not copies"
          ]
        },
        {
          title: "Live connection vs Import (Acquire)",
          story: "This distinction drives architecture decisions. A <em>Live Data Connection</em> stores only metadata in SAC; at runtime SAC sends SQL/OData queries to the source (Datasphere, BW/4HANA, HANA, S/4 CDS views). Data stays at source — always fresh, but query performance depends on source speed. An <em>Import (Acquire)</em> connection copies rows into SAC's embedded HANA — sub-second chart load, but you schedule refresh (full or delta). RetailCo production sales = live Datasphere; your Day 3 CSV training = acquire.",
          cover: [
            "Define live vs import in your own words with a concrete example",
            "Know live is used for Datasphere, BW, HANA, and S/4HANA views",
            "Know import is used for CSV, Excel, and cloud apps like Concur",
            "Understand import models support write-back for Planning; pure live models do not"
          ]
        },
        {
          title: "Optimized Story — the only story type to learn (ODE)",
          story: "SAP retired <em>Classic</em> story design for new development — from <strong>Q3 2025</strong> you cannot create new Classic stories; from <strong>Q3 2026 QRC</strong> Classic becomes inaccessible. All new dashboards use the <em>Optimized Design Experience (ODE)</em>: <em>Canvas</em> pages (desktop layout) and <em>Responsive</em> pages (tablet/phone). In 2026, the story editor uses a <em>Data Panel</em> (left) for models and fields — you can drag dimensions and measures onto the canvas. Widget data still flows through the <em>Builder panel</em>; <em>Styling</em> is visuals only. Separate Analytic Applications and Classic Digital Boardroom are merged into Optimized Stories.",
          cover: [
            "Create one blank Canvas story from the Stories start page (ODE is default)",
            "Add a single bar chart — try drag-and-drop from the Data Panel if available",
            "Open Builder panel and identify Rows, Columns, and Measures slots",
            "Read Reference → SAC 2025–2026 navigation guide for path cheat sheet"
          ]
        }
      ],
      links: [L.trial, L.helpViewer, L.helpMain, L.youtube],
      tasks: [
        "Log into your SAC trial and explore every home menu item",
        "Open the BestRunJuice sample model and story if available",
        "Create a blank Optimized Story with one bar chart",
        "In My notes, list 5 SAC object types and whether each is data or presentation layer",
        "Sketch the Model → Story dependency diagram from today's flow chart"
      ],
      caseNote: "The BestRunJuice sample has Store, Product, and Date dimensions — structurally similar to RetailCo's Region, Product, and Month setup. Explore it before building your own model on Day 3."
    },
    {
      day: 3, phase: "Phase 2", pc: "p2",
      title: "Analytic modeling — Part 1",
      subtitle: "Dimensions, measures, and CSV import",
      dayIntro: "A model is the foundation of everything in SAC — like the skeleton of a building. Today Menon and Nandan both send you the same sales data in different files. You import RetailCo's CSV via Modeler → Start with data → File, use Prepare Data if transforms are needed, map columns to dimensions and measures, and validate totals against Finance's Excel before any chart gets built.",
      searchHint: "creating analytic models dimensions measures",
      topicsDetailed: [
        {
          title: "Analytic Model vs Planning Model",
          story: "<em>Analytic Models</em> are import or live semantic layers for read-only BI — dashboards, KPIs, and Smart Predict training data. <em>Planning Models</em> add a <em>Version</em> dimension (Actual, Budget, Forecast) and support write-back so users save typed numbers to the model. RetailCo's sales dashboard (today) = Analytic Model. Nandan's budget workbook (Day 7) = Planning Model. Same Region and Product dimensions possible — different SAC object type and permissions.",
          cover: [
            "Define Analytic Model as the foundation for BI stories and Smart Predict",
            "Define Planning Model as the foundation for budget entry and data actions",
            "Know you build the Analytic Model first; Nandan's Planning Model comes on Day 7",
            "Understand Planning Models require import or hybrid connections for write-back"
          ]
        },
        {
          title: "Dimensions — the who, what, where, and when",
          story: "Dimensions are categorical axes — not values you sum. RetailCo uses <em>Region</em> (Generic dimension: North, South, East, West, Central), <em>Product Category</em> (Generic: Beverages, Snacks, Personal Care), and <em>Month</em> (Date dimension with Year → Quarter → Month hierarchy). Each dimension member is a label; SAC uses them as filters and chart axes. Mapping a numeric column like Revenue as a dimension is the most common beginner mistake.",
          cover: [
            "Create Region, Product, and Month dimensions in your model",
            "Understand Generic dimension vs Date dimension types",
            "Map each CSV column to the correct dimension during import",
            "Set ID and description properties for Generic dimension members"
          ]
        },
        {
          title: "Measures — the numbers you aggregate",
          story: "Measures hold numeric facts: <em>Revenue</em> (Decimal, SUM aggregation, ₹), <em>Units Sold</em> (Integer, SUM), and <em>Target</em> (Decimal, SUM). When Chinnu asks 'Total revenue last month?', SAC executes <code>SUM(Revenue)</code> filtered by the Month dimension. When Menon asks 'South units sold?', SAC sums Units where Region = South. Aggregation type is defined once in the model — stories inherit it automatically.",
          cover: [
            "Define Revenue, Units, and Target as measures with correct aggregation",
            "Understand the difference between dimensions and measures clearly",
            "Validate that model totals match your original CSV after import",
            "Assign correct data types — Decimal for currency, Integer for counts"
          ]
        },
        {
          title: "Importing CSV and using Prepare Data",
          story: "Path in SAC: <em>Side navigation → Modeler → Model → Start with data → File</em>. Upload CSV or Excel from Files or pick a local file. The import wizard opens <em>Prepare Data</em> when transforms are needed — normalise date formats (Nandan's Excel often mixes DD/MM/YYYY), trim whitespace, split combined columns, remove blank rows. Map each source column to target dimension or measure on the mapping screen, preview row counts and sample values, then execute import into the embedded HANA store.",
          cover: [
            "Upload the RetailCo CSV via Modeler → Start with data → File",
            "Use Prepare Data to fix date formats and data type issues",
            "Use the preview screen to verify row counts and column mappings",
            "Fix any data type errors — dates as Date dimension, numbers as measures"
          ]
        },
        {
          title: "Public dimensions and model validation",
          story: "After import, validate like Nandan in Finance would. Sum Revenue across all regions and months — must match the source CSV grand total exactly. Scan for null Region members, duplicate keys (same Region + Product + Month twice), and unmapped rows dropped during import. Name the model <em>RetailCo_Sales_Analytic</em>. <em>Public dimensions</em> (optional today) let Region master data sync across future models — useful when sales and planning models share the same region list.",
          cover: [
            "Compare SAC model totals against Nandan's Excel grand total",
            "Identify and fix any import errors, duplicates, or missing values",
            "Save and name your model clearly: RetailCo_Sales_Analytic",
            "Document the model grain: 5 regions × 3 categories × 12 months"
          ]
        }
      ],
      links: L.bundles.modeling,
      tasks: [
        "Upload the RetailCo India FMCG sales CSV into SAC",
        "Create Region, Product Category, and Month dimensions with correct types",
        "Define Revenue, Units Sold, and Target as measures (SUM aggregation)",
        "Verify model Revenue total matches Nandan's Excel — zero discrepancy",
        "Name the model RetailCo_Sales_Analytic and note the grain in My notes"
      ],
      caseNote: "Menon needs March beverage numbers; Nandan needs Finance-validated totals. Foundation model: 5 regions × 3 categories × 12 months × 3 measures. This single Analytic Model powers every dashboard and forecast until Day 7 when Nandan's Planning Model joins."
    },
    {
      day: 4, phase: "Phase 2", pc: "p2",
      title: "Analytic modeling — Part 2",
      subtitle: "Calculated measures, time, geo enrichment, and security",
      dayIntro: "Raw revenue from Day 3 is not enough — Chinnu wants % vs Target and year-to-date totals, Menon wants a map and privacy. Today you extend RetailCo_Sales_Analytic with calculated measures, restricted measures, geo enrichment on Region, and Data Access Control so regional managers see only their territory.",
      searchHint: "calculated measures geo enrichment data access control",
      topicsDetailed: [
        {
          title: "Time dimension — making dates work for trends",
          story: "SAC's <em>Date dimension</em> exposes hierarchies: Year → Quarter → Month → Day. <em>YTD (year-to-date)</em> calculations navigate from fiscal year start to the current period. RetailCo's fiscal year starts in <em>April</em> (standard for many Indian companies) — set fiscal year start month = 4 in model preferences. If you leave January as default, Q1 YTD and quarterly comparisons will be wrong in every downstream chart and KPI.",
          cover: [
            "Configure the Date dimension with April as fiscal year start",
            "Verify Year → Quarter → Month hierarchies in the modeler",
            "Create a Revenue YTD calculated measure using time navigation",
            "Test YTD totals against a manual Excel sum for Apr–current month"
          ]
        },
        {
          title: "Calculated measures — formulas at model level",
          story: "A <em>calculated measure</em> is a formula stored in the model using <code>[MeasureName]</code> syntax — e.g. <em>Pct_vs_Target = [Revenue] / [Target] * 100</em>. South at ₹10 lakh vs ₹8 lakh target returns 125%. Build at <strong>model level</strong>, not in the story: one definition, reused by every widget, evaluated efficiently at query time. Story-level calculated columns duplicate logic and hurt performance at scale.",
          cover: [
            "Create Revenue YTD calculated measure using YTD time navigation",
            "Create Pct_vs_Target calculated measure with divide-by-zero handling if needed",
            "Understand model-level vs story-level calculation performance impact",
            "Validate calculated values against Excel for one region and month"
          ]
        },
        {
          title: "Restricted measures — filtered calculations",
          story: "A <em>restricted measure</em> embeds a dimension filter inside the measure definition — e.g. <em>Beverage_Revenue</em> = Revenue where Product Category = Beverages. Nandan wants a beverage KPI tile without selecting a filter each morning. The filter is fixed in the model; story widgets bind to the restricted measure directly. Different from story filters, which apply only to one widget at runtime.",
          cover: [
            "Create Beverage_Revenue restricted measure filtered to Beverages category",
            "Use the restricted measure in a test KPI tile",
            "Compare restricted totals against a manually filtered chart — must match",
            "Understand when restricted measures beat story-level filters"
          ]
        },
        {
          title: "Geo enrichment — why Region alone fails on a map",
          story: "Chinnu asks for India on a map — but RetailCo's <code>Region</code> dimension holds <em>sales territories</em> (North, South, East, West, Central), not official state boundaries. SAC geo enrichment does <strong>not</strong> guess that \"South\" means Tamil Nadu + Karnataka. You must run <strong>Geo Enrichment</strong> in Modeler (toolbar) using either <em>By Coordinates</em> (Latitude/Longitude columns) or <em>By Area Name</em> (Country + Region/Sub-Region columns that match SAP's <em>Supported Locations</em> catalog). Until a <em>location dimension</em> exists, choropleth map widgets have nothing to draw.",
          cover: [
            "Explain why sales Region ≠ mappable geography",
            "Open SAP Help Supported Locations and verify spelling for Indian states",
            "Choose By Area Name (State column) or By Coordinates path for your dataset",
            "Read Reference → Geo enrichment guide (V2) before touching the map widget"
          ]
        },
        {
          title: "Geo enrichment wizard — By Area Name (RetailCo India)",
          story: "For <code>retailco_sales_analytic.csv</code>, use the <code>State</code> column (Delhi, Tamil Nadu, Maharashtra, …) — not Region. In Modeler: <strong>Geo Enrichment → By Area Name</strong>. Set Country = <em>India</em> (dropdown or constant). Map Sub-Region to <code>State</code>. SAC validates each row in the <strong>Details</strong> panel — fix typos, abbreviations (TN, MH), and unmatched members before Save. This creates or enriches a <em>location dimension</em> separate from your sales Region hierarchy. Keep Region for bar charts; use location dimension only in geo map layers.",
          cover: [
            "Run Geo Enrichment → By Area Name on import model",
            "Country = India; Sub-Region = State column from CSV",
            "Resolve all data quality warnings in Details panel",
            "Save model and confirm location dimension appears in model structure"
          ]
        },
        {
          title: "Geo enrichment — US trial alternative",
          story: "Many trial tenants map US states more reliably than Indian states. Use <code>data/retailco_sales_analytic_us.csv</code>: Country = United States, State = full names (California, Texas, New York). Same wizard: Geo Enrichment → By Area Name. If India enrichment fails after spelling fixes, practice choropleth on the US file first — the story-building steps are identical; only the country catalog changes.",
          cover: [
            "Optional: import US CSV when India Supported Locations matching fails",
            "Map Country + State columns per geo wizard",
            "Document which file powered your first working choropleth",
            "Return to India State column once member names match the catalog"
          ]
        },
        {
          title: "Choropleth layer in the story — after enrichment only",
          story: "Insert <strong>Geo Map</strong> → add <strong>Choropleth / Drill</strong> layer (area-enriched dimensions require this layer type, not bubble-only). Data Source = RetailCo model with location dimension. Assign location dimension + Revenue measure. States shade darker when Revenue is higher — only if enrichment succeeded. If the map is blank: Modeler → <strong>Save</strong> again (refreshes metadata cache), verify layer type, re-check Details panel. Pair with bar chart by Region for precise ₹ comparisons — maps for geographic pattern, bars for exact numbers.",
          cover: [
            "Add Geo Map with Choropleth/Drill layer to a test story page",
            "Bind location dimension and Revenue — not raw Region unless enriched",
            "If blank map: re-save model, verify Supported Locations spelling",
            "Compare choropleth view vs bar chart by sales Region — different dimensions, different questions"
          ]
        },
        {
          title: "Data Access Control — row-level security",
          story: "<em>Data Access Control (DAC)</em> restricts which dimension members each user sees at query time. Configure on the Region dimension: assign <em>Menon</em> to South only, leave Chinnu and Nandan unrestricted. Menon opens the same story as the CEO but SAC returns only South rows — he cannot drill into North even if he tries. Always test with <em>Preview as user</em> before go-live; DAC mistakes are security incidents, not cosmetic bugs.",
          cover: [
            "Understand DAC as row-level security at the model dimension level",
            "Configure DAC so Menon (South user) sees South region data only",
            "Preview the story as Menon and confirm North data is inaccessible",
            "Document which users are unrestricted (Chinnu, Nandan) vs regional (Menon)"
          ]
        }
      ],
      links: L.bundles.modeling,
      tasks: [
        "Set fiscal year start to April on the Date dimension",
        "Add Revenue YTD and Pct_vs_Target calculated measures to RetailCo_Sales_Analytic",
        "Create Beverage_Revenue restricted measure and test in a KPI tile",
        "Complete Geo Enrichment wizard (By Area Name on State, or US CSV) and build choropleth map",
        "Configure DAC for Menon (South only) and preview as that user"
      ],
      caseNote: "Pct_vs_Target drives red/green KPI tiles on Chinnu's executive page (Day 5). YTD tells Nandan if the fiscal year is on track. DAC ensures Menon never sees competitor regions' data in the same story."
    },
    {
      day: 5, phase: "Phase 2", pc: "p2",
      title: "Story building — Part 1",
      subtitle: "Charts, KPI tiles, filters, and themes",
      dayIntro: "Today your model becomes Chinnu's Monday dashboard. You build Page 1 of an Optimized Story on RetailCo_Sales_Analytic: three KPI tiles (Revenue, Best Region, MoM growth), a bar chart by Region, a line chart by Month, and page-level input controls — plus theme and threshold colours so green/red tells the story before he reads a number.",
      searchHint: "stories KPI tiles input controls charts",
      topicsDetailed: [
        {
          title: "Creating an Optimized Story on your RetailCo model",
          story: "Path: <em>Side navigation → Stories → + Create → Blank story (Canvas)</em> → add your model from the <em>Data Panel</em> → select <em>RetailCo_Sales_Analytic</em>. The canvas is a fixed grid for desktop layout — Chinnu's Monday view. The <em>Builder panel</em> assigns data: chart type, dimensions to Rows/Columns, measures to Values. The <em>Styling panel</em> handles fonts, colours, and number formats — no data logic here. From 2026 Q2 you can also drag fields from the Data Panel directly onto the canvas to create charts.",
          cover: [
            "Create a new Optimized Story bound to RetailCo_Sales_Analytic",
            "Add a Canvas page named Executive Summary or Page 1",
            "Identify Builder panel (data) vs Styling panel (visuals)",
            "Insert at least three widgets and practice drag-resize on the grid"
          ]
        },
        {
          title: "KPI tiles — the three numbers leadership wants first",
          story: "KPI widgets show one primary number with optional comparison. Chinnu's three tiles: (1) <em>Total Revenue</em> — measure Revenue, comparison vs Target or Pct_vs_Target from Day 4; (2) <em>Best Region</em> — Revenue ranked by Region, show top member; (3) <em>MoM Growth %</em> — Revenue with time comparison vs prior month. Enable variance arrows (green up / red down). Format currency in lakhs or crores for Indian FMCG — ₹346.04 Cr reads better than ₹3,460,386,895.",
          cover: [
            "Build Total Revenue KPI with variance vs Target or Pct_vs_Target",
            "Build Best Region KPI using top-1 ranking on Revenue by Region",
            "Build MoM Growth % KPI with prior-period comparison",
            "Apply Indian number formatting (lakhs/crores) on all three tiles"
          ]
        },
        {
          title: "Bar and line charts — comparing and trending",
          story: "Below the KPI row, add a <em>bar/column chart</em>: Region on the axis, Revenue on the measure — compares five territories side by side (South tallest at ~₹11 Cr). Add a <em>line chart</em>: Month (Date hierarchy) on the axis, Revenue on the measure — shows fiscal-year trend including monsoon dips and a November Diwali spike. Add a <em>donut or stacked bar</em> on Channel (Modern Trade vs E-Commerce) — only three members, ideal for share charts. Bar = categorical comparison. Line = time series. Both query the same model; only the dimension on the axis changes.",
          cover: [
            "Add bar chart: Revenue by Region (all five territories)",
            "Add line chart: Revenue by Month across the fiscal year",
            "Use consistent number formatting across KPIs and charts",
            "Verify chart totals match model sums when no filters applied"
          ]
        },
        {
          title: "Input controls — filters that update every widget",
          story: "<em>Input controls</em> are page-level filters — insert from toolbar, bind to a dimension (Region, Product Category). Set scope to <strong>apply to whole page</strong> so selecting South in the dropdown recalculates every KPI, bar, and line on Page 1. Different from widget-level filters (one chart only). Chinnu uses Region + Product dropdowns to answer follow-up questions without new report requests to you.",
          cover: [
            "Add Region input control scoped to the entire page",
            "Add Product Category input control scoped to the entire page",
            "Test combinations: South + Beverages, All regions + Snacks",
            "Confirm all five widgets respond to every filter change"
          ]
        },
        {
          title: "Themes and visual polish",
          story: "Apply a <em>story theme</em> (Story menu → Theme) for consistent fonts and chart palettes across pages. On KPI tiles, set <em>threshold conditional formatting</em> on Pct_vs_Target: green ≥100%, amber 90–99%, red &lt;90% — Chinnu reads colour at 8 AM before the number. Align widgets to the canvas grid; equal spacing between KPI row and charts. Name the story <em>RetailCo_Executive_Dashboard</em> and save.",
          cover: [
            "Apply and customise a story theme with RetailCo brand colours",
            "Set green/amber/red thresholds on Pct_vs_Target KPI",
            "Review alignment, spacing, and readability at 100% zoom",
            "Save story as RetailCo_Executive_Dashboard"
          ]
        }
      ],
      links: L.bundles.stories,
      tasks: [
        "Create Optimized Story RetailCo_Executive_Dashboard on RetailCo_Sales_Analytic",
        "Build Page 1: 3 KPI tiles (Total Revenue, Best Region, MoM Growth %)",
        "Add bar chart by Region and line chart by Month",
        "Add Region and Product Category input controls (page scope)",
        "Apply theme + Pct_vs_Target threshold colours; walk Chinnu through Page 1"
      ],
      caseNote: "Chinnu's Monday ritual: open this page, scan three KPIs, glance at bar + line, optionally filter by Region or Product. Tomorrow (Day 6) you make it interactive — Menon clicks South and drills into products."
    },
    {
      day: 6, phase: "Phase 2", pc: "p2",
      title: "Story building — Part 2",
      subtitle: "Linked analysis, drilldown, and sharing",
      dayIntro: "Page 1 answers Chinnu's Monday questions — but Menon wants to click South and see products. Today you add Page 2, wire linked analysis from the region bar chart, enable drilldown on the trend line, turn on Smart Insights, and export PDF for the board pack.",
      searchHint: "linked analysis drilldown sharing stories",
      topicsDetailed: [
        {
          title: "Linked analysis — charts that talk to each other",
          story: "<em>Linked analysis</em> cross-filters widgets: the <strong>leader</strong> chart (Page 1 region bar) passes its selection to <strong>follower</strong> widgets (Page 2 product table and bar). Configure in the Linked Analysis panel — select source, add targets, set filter direction. When Menon clicks South, followers show only South products. Test all five regions; broken linking is the #1 bug in interactive SAC demos.",
          cover: [
            "Set Page 1 region bar chart as linked analysis leader",
            "Add Page 2 product widgets as followers",
            "Test every region — North, South, East, West, Central",
            "Verify story filter shows selected Region on Page 2 header"
          ]
        },
        {
          title: "Drilldown and hierarchy navigation",
          story: "<em>Drilldown</em> navigates within one widget through a hierarchy — Year → Quarter → Month on the line chart, or Product Category → SKU when you add SKU level later. Unlike linked analysis (cross-widget), drill stays inside the chart Menon clicked. Enable drill on the monthly Revenue line; executives stay at Year, analysts drill to Month for operational detail.",
          cover: [
            "Enable Date hierarchy drill on the Page 1 or Page 2 line chart",
            "Test drill-down and drill-up on Year → Quarter → Month",
            "Understand drill (in-widget) vs linked analysis (cross-widget)",
            "Confirm drilled totals still match model sums at each level"
          ]
        },
        {
          title: "Page 2 — product drilldown for Menon",
          story: "Add <em>Page 2</em> — name it <em>Product Detail</em>. Layout: top-5 product bar (rank filter ≤5 by Revenue), product detail table (Product, Revenue, Units, Pct_vs_Target), monthly trend line filtered by story Region. Use a <em>Responsive</em> page for Menon's tablet; Page 1 stays Canvas for Chinnu. Linked from Page 1, this answers: <em>\"What exactly is selling in my territory?\"</em>",
          cover: [
            "Create Page 2 with product-focused layout (Responsive page)",
            "Apply rank filter — top 5 products by Revenue",
            "Link Page 1 region selection to filter Page 2 automatically",
            "Walk Menon through: click South → see his SKU mix"
          ]
        },
        {
          title: "Smart Insights and Just Ask",
          story: "<em>Smart Insights</em> scans a chart and surfaces plain-language explanations — e.g. <em>\"East revenue down 8% — Snacks fell after competitor promotion.\"</em> Enable on the region bar chart (2025 QRC2+ in ODE); Chinnu reads it in meetings. <em>Just Ask</em> (successor to deprecated Search to Insight) lets managers type questions — <em>\"Revenue by region last quarter\"</em> — from Home or conversational analytics. Admin enables Just Ask under System → Administration → Conversational Analytics.",
          cover: [
            "Enable Smart Insights on the regional revenue bar chart",
            "Read and interpret at least one insight bullet aloud",
            "Try Just Ask with one RetailCo sales question",
            "Explain one insight to Chinnu in a single actionable sentence"
          ]
        },
        {
          title: "Sharing, comments, and export",
          story: "Share <em>RetailCo_Executive_Dashboard</em>: view access for Menon, edit for yourself. <em>Export PDF</em> — select Page 1 + Page 2 for Chinnu's Monday board email. Test <em>mobile preview</em> on Page 2 Responsive layout — Menon checks KPIs between distributor visits. Optional: pin <em>comments</em> on a data point for async manager questions. DAC from Day 4 still restricts Menon to South rows.",
          cover: [
            "Share story with view access for a test user (Menon role)",
            "Export full story as PDF — both pages",
            "Test mobile/responsive preview on Page 2",
            "Confirm DAC still limits Menon to South when shared"
          ]
        }
      ],
      links: L.bundles.stories,
      tasks: [
        "Build Page 2 Product Detail with top-5 bar, table, and trend line",
        "Configure linked analysis: Page 1 region bar → Page 2 followers",
        "Enable drilldown on line chart and Smart Insights on region bar",
        "Export PDF, share view access, test mobile preview as Menon"
      ],
      caseNote: "Interview demo pattern: click South on Page 1 → Page 2 top SKUs appear instantly. Pair with Smart Insights narrative for East underperformance — Chinnu gets story and data in one sitting."
    },
    {
      day: 7, phase: "Phase 3", pc: "p3",
      title: "Finance planning fundamentals",
      subtitle: "P&L structure, versions, and data entry tables",
      dayIntro: "Days 3–6 were read-only BI. Nandan emails his FY2026 budget Excel — seventeen tabs, version chaos. Today you build RetailCo_Planning: Account hierarchy, Version dimension (Actual, Forecast, Budget), and a data entry table where Nandan types and saves budget numbers.",
      searchHint: "planning models versions P&L data entry",
      topicsDetailed: [
        {
          title: "What makes Planning different from BI",
          story: "BI (Days 3–6) observes what happened — charts read the Analytic Model. <em>Planning</em> decides what should happen next: Nandan types FY2026 budget by region and product directly in SAC and clicks Save — numbers write back to the Planning Model. Excel email chains with overwritten tabs disappear. One model, audit trail, Actual sitting beside Budget in the same grid.",
          cover: [
            "Define planning as write-back vs BI as read-only reporting",
            "List use cases: annual budget, rolling forecast, headcount plan",
            "Explain why RetailCo needs both RetailCo_Sales_Analytic and RetailCo_Planning",
            "Identify who edits (Nandan) vs who views (Chinnu, Mona builds)"
          ]
        },
        {
          title: "Finance P&L structure — accounts you will work with",
          story: "The <em>Account</em> dimension mirrors Nandan's P&L: <em>Gross Sales</em> (INC), <em>COGS</em> (EXP), <em>Gross Profit</em> (calculated), <em>Marketing</em> (EXP), <em>Net Income</em>. Account types INC/EXP/AST/LEQ control sign behaviour in reports. Each row is an account member; columns are months; Version slice is Actual, Forecast, or Budget.",
          cover: [
            "Know INC, EXP, AST, and LEQ account type abbreviations",
            "Trace Gross Sales → COGS → Gross Profit → Opex → Net Income",
            "Map RetailCo accounts in the Planning Model hierarchy",
            "Verify rollup totals match Nandan's Excel P&L subtotals"
          ]
        },
        {
          title: "Versions — Actual, Forecast, and Budget",
          story: "<em>Versions</em> are parallel slices on the same grid. <em>Actual</em> = what happened (loaded from ERP or copied from analytic model). <em>Forecast</em> = Nandan's rolling estimate. <em>Budget</em> = board-approved plan he types in. Compare side by side: South Beverages March — Actual ₹42L, Forecast ₹43L, Budget ₹45L. Use <em>private</em> versions for sandbox edits; publish to <em>public</em> when ready.",
          cover: [
            "Create Actual, Forecast, and Budget versions in RetailCo_Planning",
            "Understand public vs private version workflow",
            "Never overwrite Actual after month close without approval",
            "Show all three versions in one data entry table view"
          ]
        },
        {
          title: "Planning model setup for RetailCo",
          story: "Create <em>RetailCo_Planning</em> via <em>Modeler → Model → Start with blank model → Enable Planning</em> (not the Day 3 analytic import path). Dimensions: Account, Region, Product Category, Time, Version. Import or copy Actual revenue as starting Actual version. Enable planning on Budget accounts. Structure aligns with RetailCo_Sales_Analytic regions and categories so Chinnu sees consistent geography across BI and planning stories.",
          cover: [
            "Create planning-enabled model with Account, Region, Product, Time, Version",
            "Load Actual data as the starting Actual version",
            "Enable write-back on Budget account members",
            "Name and save model as RetailCo_Planning"
          ]
        },
        {
          title: "Data entry tables — the planner's input screen",
          story: "Insert a <em>data entry table</em> in a planning story: rows = accounts or regions, columns = Jan–Dec, version selector = Budget. Nandan types ₹45L in April South Revenue, clicks Save — write-back persists to the model. Mona builds and tests the table; assign <em>Planner</em> role to Nandan, <em>Viewer</em> to Chinnu. Switch version dropdown to compare Actual vs Budget in the same layout.",
          cover: [
            "Build input table for monthly budget by region and account",
            "Verify write-back saves a test value to Budget version",
            "Test Actual vs Budget toggle in the same table",
            "Assign planner security before sharing with Nandan"
          ]
        }
      ],
      links: L.bundles.planning,
      tasks: [
        "Create RetailCo_Planning with Account, Region, Product, Time, Version dimensions",
        "Set up Actual, Forecast, and Budget versions with P&L account hierarchy",
        "Load Actual revenue and build Nandan's budget data entry table",
        "Enter one test Budget value, save write-back, confirm it persists on reload"
      ],
      caseNote: "Nandan enters FY2026 budget for five regions × three categories. Same regions as Menon's sales dashboard — consistency across BI and planning is non-negotiable for Chinnu's trust."
    },
    {
      day: 8, phase: "Phase 3", pc: "p3",
      title: "Data Actions and allocations",
      subtitle: "Automate copy, distribute, and driver-based allocation",
      dayIntro: "Nandan spends every Friday copying actuals, applying South growth, and spreading COGS in Excel. Today you build Data Actions — Copy, Allocation, Distribution, and Advanced Formula steps — with a one-click trigger button in the planning story.",
      searchHint: "data actions allocation copy planning",
      topicsDetailed: [
        {
          title: "What is a Data Action",
          story: "A <em>Data Action</em> is an on-demand planning script: sequence of Copy, Allocation, Distribution, or Advanced Formula steps run against <em>RetailCo_Planning</em> only. Chinnu asks <em>\"What if South grows 10%?\"</em> — Nandan clicks one trigger button instead of three hours in Excel. Data Actions never run on Analytic Models — planning object only.",
          cover: [
            "Define Data Action and its role in the planning workflow",
            "List step types: Copy, Allocation, Distribution, Advanced Formula",
            "Know Data Actions require a Planning Model",
            "Plan to add a trigger button to the planning story"
          ]
        },
        {
          title: "Copy step — cloning version data",
          story: "Most common step: copy <em>Actual</em> Dec 2025 closing to <em>Forecast</em> Jan 2026 opening. Configure source version, target version, time range, and account filter explicitly. Always test on a <strong>private</strong> Forecast version first — never overwrite Actual without Nandan's sign-off. Verify copied values match source to the rupee.",
          cover: [
            "Create Copy step: Actual Dec → Forecast Jan",
            "Set source and target filters explicitly in the step definition",
            "Run on private version and reconcile totals",
            "Document which accounts are included/excluded"
          ]
        },
        {
          title: "Allocation — spreading values by a driver",
          story: "<em>Allocation</em> distributes a lump sum using a driver measure. Company COGS = ₹50L but zero at product level — allocate to Beverages, Snacks, Personal Care using <em>Gross Sales as driver</em> (55% / 30% / 15%). Allocated product totals must equal the source ₹50L exactly. Driver-based — follows real business mix, not arbitrary percentages.",
          cover: [
            "Understand driver-based allocation vs equal split",
            "Build COGS allocation by Gross Sales across three categories",
            "Verify allocated totals reconcile to source lump sum",
            "Run allocation on private version before publishing"
          ]
        },
        {
          title: "Distribution vs Allocation",
          story: "<em>Distribution</em> splits by fixed percentages — Marketing ₹20L → 40% Beverages, 35% Snacks, 25% Personal Care (management decision). <em>Allocation</em> uses data-driven weights from Gross Sales. COGS = allocation; marketing budget = distribution. Both are step types you can chain in one Data Action before the trigger button.",
          cover: [
            "Define distribution (fixed %) vs allocation (driver-based)",
            "Build one distribution step for marketing budget split",
            "Build one allocation step for COGS — compare behaviour",
            "Confirm percentages sum to 100% on distribution"
          ]
        },
        {
          title: "Headcount formula — a practical planning scenario",
          story: "HR planning: <em>Closing = Opening + Hires − Terminations</em>; next month's Opening = previous Closing. Use an <em>Advanced Formula</em> step inside a Data Action across 5 regions × 12 months. HR enters Hires and Terminations; SAC calculates Opening and Closing. Add a <em>planning trigger</em> widget to the story — Nandan runs month-end headcount in one click.",
          cover: [
            "Understand Opening / Hires / Terminations / Closing logic",
            "Create Data Action with Advanced Formula for headcount",
            "Add trigger button to planning story for one-click run",
            "Test one region before rolling out to all five"
          ]
        }
      ],
      links: L.bundles.planning,
      tasks: [
        "Create Copy step: Actual December → Forecast January (private version)",
        "Build COGS allocation by Gross Sales driver across three categories",
        "Build marketing distribution step (40/35/25) and verify totals",
        "Create headcount Data Action + trigger button; run end-to-end test"
      ],
      caseNote: "Chinnu asks 'What if South grows 10%?' — run growth Data Action and show P&L impact across categories in under 60 seconds. Day 9 chains these into Multi Actions on a schedule.",
      codeExample: "Headcount loop (Advanced Formula):\nClosing = Opening + Hires - Terminations\nNext month Opening = Previous month Closing"
    },
    {
      day: 9, phase: "Phase 3", pc: "p3",
      title: "Advanced formulas and Multi Actions",
      subtitle: "Script syntax, cross-model copy, and month-end automation",
      dayIntro: "Nandan asks: can month-end close run itself? Today you learn Advanced Formula (LOOKUP, RESULTLOOKUP, IF), chain Day 8 steps into Multi Actions, lock approved versions, and schedule everything on the Planning Calendar with Job Monitor.",
      searchHint: "advanced formulas multi actions planning calendar",
      topicsDetailed: [
        {
          title: "Advanced Formula syntax — LOOKUP and RESULTLOOKUP",
          story: "<em>RESULTLOOKUP</em> reads from another cell context — e.g. previous month Closing headcount. <em>LOOKUP</em> reads across time — same account, same month last year. Combined with <em>IF</em> for version-specific logic. These replace Excel VLOOKUP at planning scale. Nandan's headcount loop from Day 8 becomes an Advanced Formula step inside a Multi Action.",
          cover: [
            "Write one formula using RESULTLOOKUP for prior-period headcount",
            "Write one LOOKUP for prior-year same-month revenue comparison",
            "Use IF for version-specific logic (Actual vs Forecast)",
            "Test formula in Modeler before adding to Multi Action"
          ]
        },
        {
          title: "Cross-model copy — linking HR to Finance",
          story: "<em>Cross-model copy</em> moves data between planning models — HR Headcount Plan → Finance P&L salary expense. When HR adds 5 South hires, Finance personnel cost updates without email attachments. RetailCo starts with one P&L model; enterprise deployments split HR and Finance — know this pattern for interviews.",
          cover: [
            "Understand why HR and Finance often use separate planning models",
            "Map RetailCo flow: headcount → salary expense by region",
            "Identify cross-model copy as a Multi Action step type",
            "Document source and target model/dimension mappings on paper first"
          ]
        },
        {
          title: "Multi Actions — chaining steps into one workflow",
          story: "A <em>Multi Action</em> chains: Data Action (Day 8 copy/allocation) → version publish → data lock → optional import → notification. RetailCo month-end: load actuals → run forecast Data Action → unlock Forecast for Nandan → lock Actual after close → email Chinnu. One scheduled job replaces six manual steps.",
          cover: [
            "List Multi Action step types available in your tenant",
            "Design RetailCo month-end close workflow on paper (6+ steps)",
            "Build draft Multi Action combining at least two Day 8 Data Actions",
            "Test run manually before scheduling on calendar"
          ]
        },
        {
          title: "Data locking — protecting approved numbers",
          story: "<em>Data locking</em> states: <strong>Open</strong> (planners edit freely), <strong>Restricted</strong> (owners only), <strong>Locked</strong> (no edits). Lock March Actual after close. Lock Budget after board sign-off. Unlock Forecast when Nandan revises assumptions. Include lock/unlock steps inside Multi Actions — prevents accidental overwrite of approved numbers.",
          cover: [
            "Configure lock on Actual for one closed month",
            "Understand when to use Open vs Restricted vs Locked",
            "Add lock step to draft Multi Action after forecast run",
            "Verify locked cells reject edits for non-owner roles"
          ]
        },
        {
          title: "Planning Calendar and Job Monitor",
          story: "<em>Planning Calendar</em> schedules Multi Actions — e.g. 6 AM first business day each month. <em>Job Monitor</em> shows success/failure, duration, error logs. Nandan reviews green checkmark before announcing numbers to Chinnu. Failed job = check step order, locks, and version scope before re-run.",
          cover: [
            "Locate Planning Calendar and Job Monitor in SAC",
            "Schedule test Multi Action for a future date/time",
            "Run job and confirm success in Job Monitor",
            "Document error-handling steps if a job fails"
          ]
        }
      ],
      links: L.bundles.planning,
      tasks: [
        "Write and test Advanced Formula with IF + RESULTLOOKUP in RetailCo_Planning",
        "Build Multi Action for month-end close (document each step)",
        "Configure data lock on closed Actual month",
        "Schedule Multi Action in Planning Calendar; verify in Job Monitor"
      ],
      caseNote: "RetailCo month-end: load actuals → forecast Data Action → unlock Forecast → Nandan adjusts → lock → notify Chinnu. Mona builds automation; Nandan owns the calendar.",
      codeExample: "IF([d/Version]=\"Actual\", [Gross_Sales],\n  IF([d/Region]=\"South\", [Revenue_South], [Revenue_Other]))"
    },
    {
      day: 10, phase: "Phase 4", pc: "p4",
      title: "Smart Predict",
      subtitle: "Time-series forecasting and predictive scenarios",
      dayIntro: "Hyderabad warehouse calls: overstocked on cola in South, understocked on chips in East. Chinnu tells Mona to use Smart Predict — forecast beverage demand with confidence bands, no Python. Today: prepare dataset, train time-series model, apply to planning Forecast version, add dashed line to Chinnu's dashboard.",
      searchHint: "Smart Predict time series forecast",
      topicsDetailed: [
        {
          title: "Three predictive scenario types",
          story: "Smart Predict offers <em>Classification</em> (will distributor churn? yes/no), <em>Regression</em> (expected revenue number), and <em>Time Series</em> (next 3 months trend). RetailCo warehouse needs <strong>Time Series</strong> on beverage sales by region — FMCG inventory planning. Minimum ~12 months history for seasonality (Diwali snack spike in October).",
          cover: [
            "Define classification, regression, and time-series scenarios",
            "Choose time series for RetailCo beverage demand by region",
            "Confirm RetailCo_Sales_Analytic has 12+ months of history",
            "Know when NOT to use Smart Predict (dirty or insufficient data)"
          ]
        },
        {
          title: "The four-step predictive workflow",
          story: "Step 1: <strong>Prepare dataset</strong> from RetailCo_Sales_Analytic (clean, 12+ months). Step 2: <strong>Train</strong> — SAC learns seasonality automatically. Step 3: <strong>Apply</strong> — generate future periods. Step 4: <strong>Visualize</strong> — add forecast line + confidence band to executive story. Skipping data quality at Step 1 is the #1 forecast failure.",
          cover: [
            "Create predictive scenario with beverage sales history",
            "Review training metrics before applying model",
            "Apply model and inspect output values vs business sense",
            "Reject forecast if accuracy metrics below acceptable threshold"
          ]
        },
        {
          title: "Quick forecast in ODE (before Smart Predict)",
          story: "For a fast executive demo, use <em>in-chart forecast</em> on your RetailCo line chart: select the chart → <em>⋯ → More Options → Add → Forecast</em>. SAC projects the next periods from history — no separate Smart Predict scenario needed. Use this on Day 10 practice first; graduate to full <em>Side navigation → Smart Predict</em> when you need segmented multi-region ML models with training metrics.",
          cover: [
            "Add in-chart Forecast to the Revenue-by-Month line chart",
            "Compare quick forecast vs Smart Predict output for one region",
            "Know when in-chart forecast is enough vs full Smart Predict",
            "Document which path you used for Chinnu's dashboard"
          ]
        },
        {
          title: "Confidence intervals and forecast accuracy",
          story: "<em>Confidence bands</em>: South Beverages next month ₹78–92L (90% confidence), point forecast ₹85L. Warehouse stocks inside the band — not a single risky guess. <em>Forecast Accuracy</em> = (1 − |Actual − Forecast| / Actual) × 100. Target &gt;85% for monthly FMCG; below 70% revisit data or horizon.",
          cover: [
            "Interpret confidence band on forecast chart",
            "Calculate forecast accuracy for one region-product combo",
            "Write two-sentence insight Chinnu can act on for warehouse",
            "Explain band width to non-technical stakeholder"
          ]
        },
        {
          title: "Predictive Forecast in planning models",
          story: "<em>Predictive Forecast</em> writes ML output into planning model <em>Forecast</em> version (or Sys_Forecast) — Nandan adjusts for known events (new Central listing). Standalone Smart Predict scenario = exploration; in-model Predictive Forecast = operational planning baseline. Human + machine: SAC proposes, Nandan revises.",
          cover: [
            "Understand Predictive Forecast vs standalone Smart Predict scenario",
            "Know planners edit ML baseline with business knowledge",
            "Map forecast output to RetailCo_Planning Forecast version",
            "Compare ML forecast to Nandan's manual Forecast before lock"
          ]
        },
        {
          title: "Adding forecast to the RetailCo dashboard",
          story: "On Chinnu's line chart: <strong>solid line</strong> = actual Revenue, <strong>dashed line</strong> = forecast, <strong>shaded band</strong> = confidence. Narrative: <em>\"Nine months on target; Q4 Snacks risk in East per 90% band — reduce warehouse order.\"</em> Forward-looking dashboard completes Phase 4 before Day 11 presentation polish.",
          cover: [
            "Add forecast + confidence band to RetailCo_Executive_Dashboard",
            "Distinguish actual vs forecast visually (line style + legend)",
            "Present one insight: trend, risk, recommended action",
            "Export updated PDF including forecast page for Chinnu"
          ]
        }
      ],
      links: L.bundles.predict,
      tasks: [
        "Run time-series forecast on RetailCo beverage sales (3 months ahead, 5 regions)",
        "Review confidence bands and training accuracy before applying",
        "Add forecast line + band to executive story line chart",
        "Write CFO-ready paragraph on Q4 South beverage demand and warehouse action"
      ],
      caseNote: "Operations needs Oct–Dec beverage forecast with 90% confidence band for warehouse stocking — deliver plain-language recommendation Chinnu can forward to Hyderabad."
    },
    {
      day: 11, phase: "Phase 4", pc: "p4",
      title: "Review and certification path",
      subtitle: "Polish RetailCo, present confidently, plan C_SAC certification",
      dayIntro: "Your consolidation day. Finalise the RetailCo story, practice presenting it as if to the CEO, and map your path toward SAP certification. By today you should demo this dashboard confidently to a hiring manager or project sponsor.",
      searchHint: "certification C_SAC presentation export",
      topicsDetailed: [
        {
          title: "Presentation mode and executive storytelling",
          story: "<em>Presentation mode</em> turns your story into a fullscreen slide experience — page transitions, no edit buttons visible, professional and distraction-free. RetailCo's final narrative: Page 1 'How are we performing?' → Page 2 'What is driving regional results?' → Page 3 'What happens next?' with the beverage forecast. Practice narrating each page in 60 seconds.",
          cover: [
            "Enable presentation mode and test fullscreen navigation",
            "Structure a three-page narrative: status, detail, forecast",
            "Practice a five-minute stakeholder walkthrough out loud"
          ]
        },
        {
          title: "Export, mobile, and Analytics Catalog",
          story: "Export PDF for board packs and investor meetings. Test the SAC Mobile app or responsive preview — RetailCo regional heads check KPIs between distributor visits. The <em>Analytics Catalog</em> is the portal where authorised users discover approved stories — like an internal app store for dashboards. Configure sharing so each regional manager finds only relevant content.",
          cover: [
            "Export the complete RetailCo story as a PDF",
            "Test the story on mobile preview or the SAC Mobile app",
            "Understand Analytics Catalog as the end-user discovery portal"
          ]
        },
        {
          title: "Data Analyzer for ad-hoc reporting",
          story: "<em>Data Analyzer</em> lets power users explore model data in a table format without building a full story — pivot, filter, drill, export to Excel. RetailCo's finance analyst uses Data Analyzer for month-end reconciliation while executives use the polished story. Know when to direct users to Data Analyzer versus a curated dashboard.",
          cover: [
            "Open Data Analyzer on the RetailCo model and explore freely",
            "Export one ad-hoc view to Excel for reconciliation practice",
            "Understand Data Analyzer vs Story — self-service vs curated reporting"
          ]
        },
        {
          title: "C_SAC certification overview",
          story: "The <em>C_SAC</em> certification validates SAC skills in BI, planning, connectivity, and administration. Exam topics align with your completed days: models, stories, planning, data actions, connections, security. Search SAP Learning for C_SAC prep courses — many are free. Target the exam 30 to 60 days after completing this roadmap when concepts are fresh.",
          cover: [
            "Search C_SAC certification prep materials on learning.sap.com",
            "Map exam topic areas to the days you have completed",
            "Draft a 30-day certification study plan with weekly milestones"
          ]
        },
        {
          title: "Portfolio and next steps",
          story: "Screenshot your RetailCo dashboard pages. Write a one-page case study: business problem, your SAC approach, tools used, outcome achieved. This portfolio piece demonstrates practical SAC skills to employers. Your next learning focus: Datasphere live connections on Day 12, enterprise SAP integration on Day 13, and production readiness on Day 14.",
          cover: [
            "Capture PDF exports and screenshots for your portfolio",
            "Write a one-page RetailCo case study summary",
            "List three SAC-related job roles you will research this week"
          ]
        }
      ],
      links: L.bundles.cert,
      tasks: [
        "Finalise the three-page RetailCo dashboard: executive, drilldown, forecast",
        "Export PDF and record a five-minute stakeholder walkthrough",
        "Draft a 30-day C_SAC certification study plan",
        "Write a one-page portfolio case study for RetailCo India FMCG"
      ],
      caseNote: "Final presentation line for the CEO: 'South is 15% above target, Beverages are driving growth, and the Q4 forecast holds with 90% confidence across all five regions.'"
    },
    {
      day: 12, phase: "Phase 5", pc: "p5",
      title: "Datasphere and live connections",
      subtitle: "Connect SAC to the modern SAP data cloud",
      dayIntro: "Until now you imported CSV files — excellent for learning. Real enterprises connect SAC live to Datasphere so data stays in one place and dashboards always reflect current numbers. Today you learn that production architecture.",
      searchHint: "live data connection Datasphere",
      topicsDetailed: [
        {
          title: "Why live connections exist",
          story: "Importing copies data — but what if the source changes five minutes after refresh? <em>Live connections</em> query the source at runtime. SAC stores only metadata — column names and types — not millions of rows. When RetailCo's CEO opens the sales dashboard at 9 AM, SAC asks Datasphere 'what is revenue right now?' and renders the answer. Zero stale data, zero duplicate storage costs.",
          cover: [
            "Explain live vs import trade-offs: freshness vs query performance",
            "Know SAC stores metadata only for live models, not row data",
            "List supported live sources: Datasphere, BW, HANA, S/4HANA CDS views"
          ]
        },
        {
          title: "Datasphere to SAC architecture",
          story: "The modern SAP pattern: S/4HANA captures transactions → Datasphere transforms and models data → SAC reports and plans on top. A Datasphere analyst builds an <em>Analytic Model</em> with cleaned FMCG sales data joined across regions and products. SAC creates a <em>Live Connection</em> to that model. RetailCo's CSV import was training wheels; live Datasphere is the production bicycle.",
          cover: [
            "Draw the architecture: S/4HANA → Datasphere → SAC",
            "Understand Datasphere Analytic Model as the live data source",
            "Know SAP Cloud Connector is required for on-premise source systems"
          ]
        },
        {
          title: "Creating a live connection step by step",
          story: "In SAC: navigate to Connections → Add → Live → Datasphere. Enter the host URL and authentication details from your Datasphere administrator. Create a Live Model pointing to the Datasphere analytic dataset. Build a story on the live model. Test by changing a value in Datasphere and refreshing the story — numbers should update without any re-import step.",
          cover: [
            "Create a live connection to Datasphere in your trial or document the steps",
            "Build a live model and a test story on top of it",
            "Compare refresh behaviour and performance against your import model"
          ]
        },
        {
          title: "Business Data Cloud context",
          story: "<em>SAP Business Data Cloud</em> unifies Datasphere, SAC, and partner technologies like Databricks into one data and analytics strategy. For RetailCo's parent group, Business Data Cloud is the strategic direction — one governed data layer feeding SAC dashboards, planning models, and advanced analytics. Understanding this positioning helps you speak credibly in architecture discussions.",
          cover: [
            "Understand Business Data Cloud as SAP's unified data and analytics vision",
            "Know Datasphere is the warehouse layer within Business Data Cloud",
            "Recognise SAC as the analytics and planning consumption layer"
          ]
        },
        {
          title: "When to choose live vs import",
          story: "Use <em>live</em> for operational dashboards needing current data — daily regional sales, inventory levels. Use <em>import</em> for planning models with write-back, Smart Predict training datasets, or when the source system is slow. RetailCo hybrid strategy: live Datasphere for the sales dashboard, import for planning and predictive scenarios. Hybrid architectures are normal and expected in every enterprise.",
          cover: [
            "Document RetailCo's hybrid connection strategy with rationale for each source",
            "List three business scenarios suited to live and three suited to import",
            "Understand performance implications of each connection type"
          ]
        }
      ],
      links: L.bundles.integration,
      tasks: [
        "Draw RetailCo's live architecture diagram: S/4 → Datasphere → SAC",
        "Create a live connection to Datasphere or document the exact steps",
        "Build a test story on a live model and compare to the import model",
        "Write a live vs import decision matrix for RetailCo's five data sources"
      ],
      caseNote: "Production pattern for RetailCo: S/4HANA ACDOCA flows to Datasphere for transformation, then SAC live reporting for daily sales. Planning models remain import-based to support write-back."
    },
    {
      day: 13, phase: "Phase 5", pc: "p5",
      title: "BW, HANA, and S/4HANA integration",
      subtitle: "Enterprise SAP landscape connectivity",
      dayIntro: "Most SAP customers have years of investment in BW and S/4HANA. SAC must connect to all of it. Today you learn which connection type maps to which SAP source — essential knowledge for any SAC consultant or in-house developer role.",
      searchHint: "BW live connection S/4HANA acquired",
      topicsDetailed: [
        {
          title: "SAP BW/4HANA live connection",
          story: "Many enterprises still run <em>BW/4HANA</em> as their primary warehouse. SAC connects live to BW Queries and Composite Providers — no data duplication. Legacy BEx queries from older BW releases also connect but Datasphere is SAP's strategic direction for new projects. At RetailCo's parent company, ten years of historical FMCG sales may live in BW while new pipelines flow through Datasphere.",
          cover: [
            "Know BW/4HANA Composite Provider as a live SAC data source",
            "Understand legacy BEx query connections for older BW landscapes",
            "Recognise the migration path: BW → Datasphere → SAC for new implementations"
          ]
        },
        {
          title: "S/4HANA CDS Views for operational reporting",
          story: "<em>CDS Views</em> are pre-built analytical views in S/4HANA — ready-made report tables maintained by SAP. SAC connects live to analytic CDS views for operational reporting directly from ERP. Example: a retail sales CDS view updated every time a distributor posts a goods issue. Simple operational reports can skip the warehouse entirely and read straight from S/4HANA.",
          cover: [
            "Define CDS views as S/4HANA's analytical reporting interface",
            "Know when to report directly from S/4 vs routing through a warehouse",
            "Identify RetailCo S/4 sources: ACDOCA for finance actuals, sales CDS for revenue"
          ]
        },
        {
          title: "SAP HANA Calculation Views",
          story: "<em>HANA Calculation Views</em> are sophisticated data models built in SAP HANA Studio or SAP HANA Cloud. SAC connects live to calculation views for complex joins and aggregations pre-computed in HANA. If RetailCo's IT team already built HANA views for distributor profitability analysis, SAC can consume them live without rebuilding the logic.",
          cover: [
            "Understand calculation views as pre-built HANA analytic models",
            "Know SAC live models can point directly to HANA calculation views",
            "Compare building logic in HANA vs in SAC analytic models"
          ]
        },
        {
          title: "Acquire connections — cloud apps and files",
          story: "Not every data source is SAP. <em>Acquire (import)</em> connects to SuccessFactors for HR, Concur for travel expenses, Ariba for procurement, Amazon S3, SQL databases, and Excel files. RetailCo imports Concur travel data for the employee expense dashboard and S/4 ACDOCA exports for finance planning actuals. Each source type has its own connector configuration in SAC.",
          cover: [
            "List five acquire connection types and a business use case for each",
            "Understand delta and incremental load schedules for large imports",
            "Research Concur-to-SAC import steps in the SAP Help Viewer"
          ]
        },
        {
          title: "Hybrid integration blueprint for RetailCo",
          story: "Draw RetailCo's complete landscape on one page: S/4 actuals imported to the Planning Model for budget comparison. Datasphere sales data connected live to the BI Story for daily monitoring. Concur travel expenses imported to a separate Analytic Model. Each source gets the connection type suited to its purpose, refresh needs, and performance requirements. This blueprint is what you present in architecture review meetings.",
          cover: [
            "Create an integration blueprint diagram for all RetailCo data sources",
            "Assign live or acquire to each source with written justification",
            "Document refresh schedules for every import connection"
          ]
        }
      ],
      links: [L.helpViewer, L.datasphereHelp, L.dataCloud, L.helpMain],
      tasks: [
        "Document RetailCo's complete integration architecture on one diagram",
        "List live vs acquire assignment for each source system with rationale",
        "Research Concur-to-SAC import configuration in the Help Viewer",
        "Present your integration blueprint to a colleague or mentor for feedback"
      ],
      caseNote: "Three models at RetailCo: Travel expenses from Concur (import), Finance Planning actuals from S/4HANA (import), Sales Dashboard from Datasphere (live). Each connection type matches its business purpose."
    },
    {
      day: 14, phase: "Phase 5", pc: "p5",
      title: "Performance optimization and administration",
      subtitle: "Story weightage, security, roles, and transport",
      dayIntro: "Your final day. A beautiful dashboard that takes 60 seconds to load will be rejected by users. A fast dashboard with wrong security creates compliance risk. Today you learn weightage analysis, role design, team sharing, and transport — the consultant's finishing skills before go-live.",
      searchHint: "story weightage security roles transport management",
      topicsDetailed: [
        {
          title: "Import vs live performance characteristics",
          story: "Import models store data in SAC's embedded HANA — sub-second queries, one-page refresh, parallel processing across widgets. Live models depend entirely on source system performance — a slow BW query means a slow dashboard regardless of SAC optimisation. Rule of thumb: operational dashboards on import or fast HANA-optimised views; strategic dashboards on live when data freshness outweighs raw speed.",
          cover: [
            "Explain why import models are generally faster for interactive dashboards",
            "Know live performance depends on source query optimisation",
            "List HANA strengths: in-memory processing, column store, compression"
          ]
        },
        {
          title: "Story weightage analysis",
          story: "SAC's <em>weightage</em> tool scores each widget's performance impact on page load. Heavy offenders: scatter plots with 50,000 points, unfiltered tables, too many story-level calculations. Fix by adding top-10 filters, moving calculations to the model, and placing heavy charts on drilldown pages rather than the landing page. Run weightage analysis before every production go-live.",
          cover: [
            "Run weightage analysis on the RetailCo story",
            "Identify and optimise the heaviest widget on the report",
            "Apply the rule: KPIs on Page 1, heavy charts on Page 2 and beyond"
          ]
        },
        {
          title: "Security — users, teams, roles, and data access",
          story: "Three security layers protect SAC content: <em>Activity authorization</em> (can this user create stories?), <em>Object authorization</em> (can this user open this specific story?), and <em>Data authorization</em> (can this user see South region data only?). Create roles — SAC Developer, Planner, End Viewer. Assign teams — Sales Managers, Finance Planners. Combine with DAC configured on Day 4 for complete row-level protection.",
          cover: [
            "Create three custom roles: Developer, Planner, and End Viewer",
            "Set up team-based story sharing for Sales Managers",
            "Verify DAC from Day 4 works correctly with role assignments"
          ]
        },
        {
          title: "Transport Management across tenants",
          story: "<em>Transport Management</em> moves SAC content from development to test to production tenants — similar to deploying code through staging environments. RetailCo's analytics team builds in a dev tenant, tests in QA, then transports the approved story to production. Document what travels (stories, models, connections) and what requires manual reconfiguration (connection endpoints differ per tenant).",
          cover: [
            "Understand the dev → test → production transport workflow",
            "Document which RetailCo objects would be transported vs rebuilt",
            "Locate Transport Management in the SAP Help documentation"
          ]
        },
        {
          title: "Go-live checklist and Analytics Catalog",
          story: "Before RetailCo's dashboard goes live to 200 users: weightage passed, security tested with real user accounts, transport completed, Analytics Catalog published, and users trained. The <em>Analytics Catalog</em> is the Fiori-style portal where end users discover approved stories. A thorough go-live checklist prevents the Friday-afternoon emergency calls that every SAC admin dreads.",
          cover: [
            "Complete a go-live checklist for the RetailCo story",
            "Publish or configure Analytics Catalog entry for the executive dashboard",
            "Document ten performance and security rules for your team reference"
          ]
        }
      ],
      links: L.bundles.admin,
      tasks: [
        "Run weightage analysis on RetailCo story and fix the heaviest widget",
        "Create Developer, Planner, and Viewer roles with appropriate permissions",
        "Set up team-based sharing for regional Sales Managers",
        "Complete the go-live checklist document for RetailCo production deployment"
      ],
      caseNote: "Go-live rules for RetailCo: calculated measures at model level, KPIs on Page 1 only, DAC enabled for all regional users, weightage green, transport tested across dev and prod tenants."
    }
  ],

  SUBSCRIPTIONS: [
    {
      tool: "SAP Analytics Cloud Trial",
      purpose: "Full SAC tenant — BI, Planning, Smart Predict, and connectivity for hands-on practice",
      cost: "free",
      costLabel: "Free 30 days",
      action: L.trial.url,
      actionLabel: "Start trial ↗",
      priority: 1
    },
    {
      tool: "SAP Learning (learning.sap.com)",
      purpose: "Official free courses — SAC getting started, modelling, planning, and predictive",
      cost: "free",
      costLabel: "Free",
      action: L.learningHome.url,
      actionLabel: "Sign up ↗",
      priority: 1
    },
    {
      tool: "SAP Help Portal",
      purpose: "Complete official documentation for every SAC feature and configuration option",
      cost: "free",
      costLabel: "Free",
      action: L.helpMain.url,
      actionLabel: "Open docs ↗",
      priority: 1
    },
    {
      tool: "SAP Analytics Cloud — Product Overview",
      purpose: "Understand SAC capabilities, licensing tiers, and platform positioning",
      cost: "free",
      costLabel: "Free",
      action: L.product.url,
      actionLabel: "View product ↗",
      priority: 2
    },
    {
      tool: "SAC Pricing & Subscriptions",
      purpose: "Reference BI vs Planning license costs before production discussions",
      cost: "free",
      costLabel: "Reference",
      action: L.pricing.url,
      actionLabel: "View pricing ↗",
      priority: 2
    },
    {
      tool: "SAP Datasphere",
      purpose: "Practice live connections — modern cloud data warehouse layer for SAC",
      cost: "free",
      costLabel: "Product info",
      action: L.datasphereProduct.url,
      actionLabel: "Learn more ↗",
      priority: 2
    },
    {
      tool: "SAP Analytics Cloud YouTube",
      purpose: "Official video tutorials covering modelling, stories, planning, and Smart Predict",
      cost: "free",
      costLabel: "Free",
      action: L.youtube.url,
      actionLabel: "Watch ↗",
      priority: 1
    },
    {
      tool: "SAP Community",
      purpose: "Q&A forums, expert blogs, troubleshooting, and best-practice discussions",
      cost: "free",
      costLabel: "Free",
      action: L.community.url,
      actionLabel: "Join ↗",
      priority: 1
    },
    {
      tool: "Udemy — SAP Analytics Cloud Courses",
      purpose: "Structured paid video courses with guided hands-on exercises",
      cost: "paid",
      costLabel: "Varies",
      action: L.udemy.url,
      actionLabel: "Browse ↗",
      priority: 3
    },
    {
      tool: "C_SAC Certification Prep",
      purpose: "Search official SAP Learning materials for C_SAC exam preparation",
      cost: "free",
      costLabel: "Free search",
      action: L.certSearch.url,
      actionLabel: "Search ↗",
      priority: 3
    },
    {
      tool: "SAP Training & Certification",
      purpose: "Official certification programs, exam registration, and training paths",
      cost: "paid",
      costLabel: "Exam fee",
      action: L.training.url,
      actionLabel: "Explore ↗",
      priority: 4
    }
  ],

  RESOURCE_LIBRARY: [
    {
      category: "Official SAP Documentation",
      items: [
        { label: L.helpMain.label, url: L.helpMain.url, tag: L.helpMain.tag },
        { label: L.helpViewer.label, url: L.helpViewer.url, tag: L.helpViewer.tag },
        { label: L.helpLegacy.label, url: L.helpLegacy.url, tag: L.helpLegacy.tag },
        { label: L.datasphereHelp.label, url: L.datasphereHelp.url, tag: L.datasphereHelp.tag }
      ]
    },
    {
      category: "Free Learning & Certification",
      items: [
        { label: L.learningHome.label, url: L.learningHome.url, tag: L.learningHome.tag },
        { label: L.learningSAC.label, url: L.learningSAC.url, tag: L.learningSAC.tag },
        { label: L.learningPlanning.label, url: L.learningPlanning.url, tag: L.learningPlanning.tag },
        { label: L.learningPredict.label, url: L.learningPredict.url, tag: L.learningPredict.tag },
        { label: L.certSearch.label, url: L.certSearch.url, tag: L.certSearch.tag },
        { label: L.training.label, url: L.training.url, tag: L.training.tag }
      ]
    },
    {
      category: "Product, Trial & Platform",
      items: [
        { label: L.trial.label, url: L.trial.url, tag: L.trial.tag },
        { label: L.product.label, url: L.product.url, tag: L.product.tag },
        { label: L.pricing.label, url: L.pricing.url, tag: L.pricing.tag },
        { label: L.btp.label, url: L.btp.url, tag: L.btp.tag },
        { label: L.dataCloud.label, url: L.dataCloud.url, tag: L.dataCloud.tag },
        { label: L.datasphereProduct.label, url: L.datasphereProduct.url, tag: L.datasphereProduct.tag }
      ]
    },
    {
      category: "Community & Extended Learning",
      items: [
        { label: L.community.label, url: L.community.url, tag: L.community.tag },
        { label: L.youtube.label, url: L.youtube.url, tag: L.youtube.tag },
        { label: L.udemy.label, url: L.udemy.url, tag: L.udemy.tag }
      ]
    }
  ],

  PERFORMANCE_GUIDE: [
    {
      rule: "Prefer import models for high-performance interactive dashboards",
      detail: "Data stored in SAC's HANA repository enables sub-second queries, one-page refresh, and parallel widget processing."
    },
    {
      rule: "Use live models when data freshness is more important than raw speed",
      detail: "Live performance depends entirely on the source system — ensure HANA-optimised views and efficient BW queries before go-live."
    },
    {
      rule: "Build calculated measures at the model level, not the story level",
      detail: "Model-level calculations aggregate efficiently. Story-level calculations run per widget and degrade performance at scale."
    },
    {
      rule: "Run story weightage analysis before every production deployment",
      detail: "Identify heavy widgets early. Reduce chart complexity, limit dimension counts, and apply top-N filters on large datasets."
    },
    {
      rule: "Limit linked analysis scope to necessary charts only",
      detail: "Cross-filter only the widgets that need it — avoid story-wide linked analysis on datasets with millions of rows."
    },
    {
      rule: "Use public dimensions for shared master data like Region and Product",
      detail: "Avoid duplicating Region or Product dimensions across multiple models — public dimensions reduce maintenance and storage."
    },
    {
      rule: "Match time dimension granularity to reporting needs",
      detail: "Do not load daily-level data if every report aggregates to monthly — unnecessary granularity slows imports and queries."
    },
    {
      rule: "Schedule import refreshes during off-peak hours",
      detail: "Use delta or incremental loads for large datasets instead of full reloads that compete with daytime user activity."
    },
    {
      rule: "Keep Page 1 lightweight — KPIs and simple charts only",
      detail: "Place heavy visuals (scatter plots, unfiltered tables, complex geo maps) on drilldown pages, not the landing page executives open first."
    },
    {
      rule: "Test on mobile preview before publishing to field users",
      detail: "Regional sales managers access dashboards on phones — verify responsive pages render correctly and load within acceptable time."
    }
  ],

  CASE_STUDY: {
    name: "RetailCo India",
    tagline: "Regional FMCG sales analytics, financial planning, and demand forecasting",
    company: "Mid-size FMCG company operating across five Indian regions — North, South, East, West, and Central — with three product categories: Beverages, Snacks, and Personal Care, sold through 200+ retail outlets and distributor networks",
    role: "You are Mona, SAC Analyst — building RetailCo's complete analytics and planning stack from scratch for Chinnu and the regional sales team",
    goal: "Track actual sales vs budget by region and category, identify growth opportunities, forecast beverage demand, automate planning workflows, and present actionable insights to the C-suite",
    phases: [
      {
        days: "Days 3–4",
        title: "Build the Analytic Model",
        desc: "Create Region, Product Category, and Month dimensions. Import RetailCo CSV. Define Revenue, Units, and Target measures. Add YTD calculations, geo enrichment, and regional DAC security."
      },
      {
        days: "Days 5–6",
        title: "Build the BI Story",
        desc: "Two-page Optimized Story: executive KPI page with region and product filters, plus product drilldown page with linked analysis from Page 1."
      },
      {
        days: "Days 7–9",
        title: "Planning Layer",
        desc: "Finance P&L Planning Model with Actual and Budget versions. Budget input tables by region. Data Actions for COGS allocation and headcount. Multi Actions for month-end close automation."
      },
      {
        days: "Days 10–11",
        title: "Smart Predict & Presentation",
        desc: "Time-series forecast for beverage demand across five regions with confidence bands. Finalise three-page dashboard. Export PDF and prepare C_SAC certification study plan."
      },
      {
        days: "Days 12–14",
        title: "Enterprise Integration & Go-Live",
        desc: "Datasphere live connection for daily sales. S/4HANA and BW integration blueprint. Performance weightage tuning, role-based security, transport management, and Analytics Catalog publication."
      }
    ],
    financeExample: {
      title: "Finance P&L Planning Scenario — RetailCo India FMCG",
      steps: [
        "Import Actual revenue and COGS from S/4HANA ACDOCA into the Planning Model by region and product category",
        "Run Predictive Forecast on beverage and snack sales → save results to the Sys_Forecast version",
        "Copy Sys_Forecast to Forecast_2026 private version for regional planner adjustments (promotions, new listings)",
        "Allocate company-level COGS across Beverages, Snacks, and Personal Care using Gross Sales as the driver dimension",
        "Run Multi Action: copy revised Forecast → Budget version for board approval cycle",
        "Lock Actual version for closed months and Budget version after board sign-off",
        "Present variance analysis in SAC story: Actual vs Forecast vs Budget by region for the CFO review"
      ]
    }
  }
};
