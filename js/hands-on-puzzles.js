/**
 * Puzzle-style hands-on overrides — Days 2–7 (models & stories)
 * Loaded after beginner-extras.js; merges into HANDS_ON_STEPS
 */
(function () {
  const extras = window.SACPortalExtras;
  if (!extras || !extras.HANDS_ON_STEPS) return;

  Object.assign(extras.HANDS_ON_STEPS, {
    2: [
      {
        title: "Treasure map — find the rooms before RetailCo data arrives",
        goal: "Explore SAC so Day 3 import feels like coming home, not a maze.",
        puzzle: "Imagine SAC as a building accessed by <strong>side navigation</strong>: <strong>Files</strong> = basement · <strong>Modeler</strong> = kitchen · <strong>Stories</strong> = dining room. In 2025–2026 there is no separate top Create menu — each app has its own start page.",
        dataFile: "retailco_sales_analytic",
        steps: [
          { piece: "Room 1 — Lobby", action: "Log in to your tenant URL", menu: "Bookmark saved from Day 1", detail: "Confirm home screen shows Create, Stories, Models, Files.", verify: "You see the SAC home screen — not an error page." },
          { piece: "Room 2 — Dining room", action: "Open any sample Story", menu: "Home → Stories", detail: "Open BestRunJuice or similar. Click a chart — notice Builder panel on the right.", verify: "Builder panel shows dimensions and measures — not Styling only.", clue: "Stories never store raw rows — they read from a model." },
          { piece: "Room 3 — Kitchen", action: "Open any sample Model", menu: "Home → Models", detail: "Find Dimensions list vs Measures list. This is where RetailCo_Sales_Analytic will live from Day 3.", verify: "You can name at least one dimension and one measure you saw." },
          { piece: "Room 4 — Basement", action: "Open Files", menu: "Home → Files", detail: "This is where you will upload <code>retailco_sales_analytic.csv</code> tomorrow. Download it today from Reference → Data files.", verify: "You downloaded the CSV or know where Reference tab lists it." },
          { piece: "Mini puzzle — First dish", action: "Create a practice story", menu: "Create → Story → Optimized Story", detail: "Pick any sample model from the Data Panel. Add bar chart — try drag-and-drop from Data Panel if your tenant has 2026 Q2+. Region on axis, Revenue on measure.", verify: "One bar chart renders with numbers — even if sample data.", clue: "Builder = data. Styling = colours. Data Panel = models and fields." },
          { piece: "Save your practice", action: "Save story as My_First_SAC_Story", menu: "File → Save", detail: "Day 5 replaces this with RetailCo_Executive_Dashboard on your own model.", verify: "Story appears in Home → Stories list." }
        ],
        tip: "Tomorrow Nandan expects ₹346.04 Cr total revenue from the CSV — write that number on a sticky note."
      }
    ],
    3: [
      {
        title: "The ₹346.04 Cr puzzle — build RetailCo_Sales_Analytic",
        goal: "Turn Nandan's detailed CSV into the model every story uses until Day 10.",
        puzzle: "Nandan left a sticky note: <em>\"23,760 rows. Total revenue must be ₹346.04 Cr. If your model shows anything else, don't bother Chinnu with charts.\"</em> Thirty-one columns — map each text column as a <strong>dimension</strong> and each number as a <strong>measure</strong>. One wrong move and the whole picture lies.",
        dataFile: "retailco_sales_analytic",
        steps: [
          { piece: "Piece 1 — Get the file", action: "Download retailco_sales_analytic.csv", menu: "Reference tab → Data files · or data/ folder", detail: "Open in Excel/Sheets: skim columns Date, Region, State, Channel, Customer_Segment, Product_Category, Brand, Product_SKU, then Revenue through Unit_Price.", verify: "File has 23,760 data rows + header (23,761 lines)." },
          { piece: "Piece 2 — Stash in SAC", action: "Upload CSV to Files", menu: "Files → Upload", detail: "Upload the exact file. Wait for green success — 1,620 rows may take up to a minute.", verify: "File name appears in Files list." },
          { piece: "Piece 3 — Start the recipe", action: "Begin import model wizard", menu: "Create → Model → Get data from a file", detail: "Select your uploaded CSV. Choose <strong>Analytic Model</strong> (not Planning).", verify: "Mapping screen shows all 31 column names." },
          { piece: "Piece 4 — Time & place (dimensions)", action: "Map geography + time dimensions", detail: "Date → Date (Month). Region → Generic. State → Generic. These three power bar charts and geo maps on Day 4–5.", verify: "Preview shows Region as text members — not summed numbers.", clue: "If Revenue appears under Dimensions, stop and remap — puzzle fails." },
          { piece: "Piece 5 — Who & what (dimensions)", action: "Map Channel, Segment, Product dimensions", detail: "Channel · Customer_Segment · Product_Category · Brand · Product_SKU → all Generic dimensions.", verify: "Eight dimension columns mapped; Channel shows Modern Trade / General Trade / E-Commerce." },
          { piece: "Piece 6 — Numbers (measures)", action: "Map Revenue, Net_Revenue, Units, COGS, Gross_Margin, etc. — Unit_Price as AVG", detail: "Revenue, Units_Sold, Target, COGS, Discount_Amount, Returns_Units, Marketing_Spend → SUM. Unit_Price → <strong>AVG</strong> (not SUM).", verify: "Measures panel lists Revenue with Aggregation SUM; Unit_Price with AVG." },
          { piece: "Piece 7 — Product ladder", action: "Create hierarchy Category → Brand → SKU", menu: "Modeler → Product_Category dimension", detail: "Add hierarchy levels Brand and Product_SKU under Product_Category — needed for Menon's Day 6 drilldown.", verify: "Hierarchy shows three levels in modeler.", clue: "Reference → Stories & charts guide shows treemap uses this hierarchy." },
          { piece: "Piece 8 — Clean the edges", action: "Run Data Wrangler if prompted", menu: "Transform data", detail: "Fix mixed dates to YYYY-MM-DD. Trim spaces in Region. Delete blank rows.", verify: "Preview row count still 23,760." },
          { piece: "Piece 9 — The grand total test", action: "Import and validate totals", menu: "Preview → Import → open model data", detail: "Sum Revenue in model view. Must equal CSV grand total ≈ ₹346.04 Cr (3,460,386,895).", verify: "Model total matches Nandan's note within rounding.", clue: "South region alone should be ~₹82.40 Cr — largest slice." },
          { piece: "Piece 10 — Name the model", action: "Save as RetailCo_Sales_Analytic", menu: "Model → Save as", detail: "This exact name is used in every hands-on step from Day 4 onward.", verify: "Model appears in Home → Models with correct name." }
        ],
        tip: "Screenshot model total next to CSV total — plus the column mapping table from Reference."
      }
    ],
    4: [
      {
        title: "Four locks — calculations, map, and Menon's privacy door",
        goal: "Unlock what Chinnu and Menon need before any story is built.",
        puzzle: "Chinnu wants <strong>four keys</strong>: (1) Are we hitting target? (2) Year-to-date? (3) India on a map? (4) Menon sees only South? Each key is one model feature — no story widgets until all four turn.",
        dataFile: "retailco_sales_analytic",
        steps: [
          { piece: "Lock 1 — Fiscal calendar", action: "Set fiscal year start = April", menu: "Modeler → Time dimension → Fiscal year", detail: "RetailCo India FY starts April. Wrong month breaks every YTD calculation.", verify: "Time settings show April as fiscal start." },
          { piece: "Lock 2 — Target %", action: "Create calculated measure Pct_vs_Target", menu: "Modeler → Calculated measure", detail: "Formula: [Revenue] / [Target] * 100. Test South Beverages April ≈ 105%.", verify: "Measure returns sensible % — not blank or error.", clue: "Build in model — never only in story." },
          { piece: "Lock 2b — Margin", action: "Create Gross_Margin calculated measure", menu: "Modeler → Calculated measure", detail: "Formula: [Revenue] - [COGS]. Use in KPI or table later — COGS column is now in your CSV.", verify: "Gross_Margin positive for Beverages rows." },
          { piece: "Lock 3 — YTD trail", action: "Create Revenue_YTD measure", menu: "Modeler → Calculated measure", detail: "YTD time navigation on Revenue from fiscal year start.", verify: "April YTD = April Revenue; May YTD = Apr + May." },
          { piece: "Lock 4 — Beverage lens", action: "Create Beverage_Revenue restricted measure", menu: "Modeler → Restricted measure", detail: "Revenue where Product_Category = Beverages only.", verify: "Total less than overall Revenue." },
          { piece: "Lock 5 — Map enrichment", action: "Enable geo on Region", menu: "Region dimension → Location Information", detail: "Enable enrichment · location type Region/State · India.", verify: "Geo preview shows Indian regions on map widget test." },
          { piece: "Lock 6 — Menon's door (DAC)", action: "Configure Data Access Control", menu: "Region → Data Access Control", detail: "Menon's user/team → South only. Preview as Menon — North must disappear.", verify: "Preview as Menon hides North/East/West/Central revenue." },
          { piece: "Save the vault", action: "Re-save RetailCo_Sales_Analytic", detail: "Day 5 story binds to this model — all new measures appear automatically.", verify: "Model saved with 6+ measures visible." }
        ],
        tip: "Demo to yourself: 'Menon logs in — sees only South.' That sentence wins stakeholder trust."
      }
    ],
    5: [
      {
        title: "Monday morning test — Chinnu's 10-second dashboard",
        goal: "Assemble Page 1 of RetailCo_Executive_Dashboard — model already holds the truth.",
        puzzle: "Chinnu walks in with coffee: <em>\"How much did we sell? Who's winning? Are we growing?\"</em> You have <strong>six widgets</strong> to answer in one screen. Wrong order to build: filters first trap you — build KPIs, then charts, then filters last.",
        dataFile: "retailco_sales_analytic",
        steps: [
          { piece: "Frame 1 — Blank canvas", action: "Create Optimized Story on RetailCo_Sales_Analytic", menu: "Create → Story → Optimized Story", detail: "Select model RetailCo_Sales_Analytic (not sample data). Add Canvas page → name <strong>Executive Summary</strong>.", verify: "Story title bar shows your model name." },
          { piece: "Frame 2 — Three numbers", action: "Insert three KPI tiles in a row", menu: "Insert → KPI", detail: "(1) Total Revenue vs Target variance. (2) Top-1 Region by Revenue — should highlight South. (3) MoM Revenue growth %.", verify: "South wins KPI #2; totals near ₹346.04 Cr full-year context.", clue: "Format ₹ as Cr/lakhs in Styling panel — not Builder." },
          { piece: "Frame 3 — Who's winning?", action: "Add bar chart by Region", menu: "Insert → Chart → Bar/Column", detail: "Region on axis · Revenue on measure. South bar tallest (~₹82.40 Cr region total).", verify: "Five bars — South highest." },
          { piece: "Frame 4 — Trend line", action: "Add line chart by Month", menu: "Insert → Chart → Line", detail: "Date (Month hierarchy) on axis · Revenue on measure. Spot November spike (Diwali) and June dip (monsoon).", verify: "Line shows 12 months Apr–Mar with visible Nov peak." },
          { piece: "Frame 4b — Mix chart", action: "Add donut or stacked bar by Channel", menu: "Insert → Chart → Donut or Stacked column", detail: "Channel dimension (only 3 members — perfect for pie/donut) · Revenue measure. See Modern Trade vs E-Commerce mix.", verify: "Three channel slices visible.", clue: "Reference guide: pie suits ≤5 categories — Channel is ideal." },
          { piece: "Frame 5 — Remote controls", action: "Add page filters last", menu: "Insert → Input Control", detail: "Region dropdown + Product Category dropdown + optional Channel dropdown. Scope = Entire page.", verify: "Pick South + Beverages + E-Commerce — all widgets update together." },
          { piece: "Frame 6 — Traffic lights", action: "Apply conditional formatting", menu: "KPI → Thresholds · Story → Theme", detail: "Green ≥100% target · Amber 90–99% · Red below 90% on Pct_vs_Target tile.", verify: "At least one KPI shows green/amber/red." },
          { piece: "Name the board", action: "Save as RetailCo_Executive_Dashboard", menu: "File → Save as", detail: "Chinnu's Monday screen — Menon gets Page 2 on Day 6.", verify: "Story in list with exact name." }
        ],
        tip: "Run the 10-second test: open story cold — can you answer Chinnu's three questions without clicking?"
      }
    ],
    6: [
      {
        title: "Menon's click — Page 2 linked analysis puzzle",
        goal: "When Menon clicks South on Page 1, Page 2 must tell him which products drive it.",
        puzzle: "Page 1 is Chinnu's helicopter view. Page 2 is Menon's microscope. The puzzle: connect them with <strong>linked analysis</strong> so one click on South filters Page 2 — no new report request, no email to Mona.",
        dataFile: "retailco_sales_analytic",
        steps: [
          { piece: "Chapter 1 — New page", action: "Add Page 2 Responsive layout", menu: "Story → Add page → Responsive", detail: "Name: <strong>Product Detail</strong> — Menon's tablet view.", verify: "Story has two pages in page strip." },
          { piece: "Chapter 2 — Product bars", action: "Bar chart: Brand × Revenue (or Category × Revenue)", menu: "Insert → Chart → Bar", detail: "Use Brand dimension (9 brands) with rank filter Top 5 by Revenue. AquaFresh often leads Beverages in South.", verify: "At least five brands visible with rank filter.", clue: "Don't use pie here — too many slices. Bar or treemap fits Brand." },
          { piece: "Chapter 2b — Treemap optional", action: "Treemap: Category → Brand hierarchy", menu: "Insert → Chart → Treemap", detail: "Product_Category parent · Brand child · Revenue size. Shows Menon which brands fill his territory.", verify: "Rectangles sized by Revenue — Beverages block largest." },
          { piece: "Chapter 3 — Detail table", action: "Insert table widget", menu: "Insert → Table", detail: "Columns: Brand, Product_SKU, Revenue, Units_Sold, Pct_vs_Target, Channel.", verify: "Table shows SKU-level numbers — not empty." },
          { piece: "Chapter 4 — The wire", action: "Configure linked analysis", menu: "Page 1 region bar → Linked Analysis", detail: "Leader = Page 1 region bar chart. Followers = Page 2 bar + table.", verify: "Click North on Page 1 → Page 2 shows North products. Click South → South products.", clue: "If Page 2 doesn't move, follower not added or wrong leader selected." },
          { piece: "Chapter 5 — Drill down time", action: "Enable drill on line chart", menu: "Page 1 line chart → Drill", detail: "Drill Year → Quarter → Month on revenue trend.", verify: "Drill path works on Page 1 line chart." },
          { piece: "Chapter 6 — Smart voice", action: "Turn on Smart Insights", menu: "Region bar → Smart Insights", detail: "Read one bullet aloud as if presenting to Chinnu in one sentence.", verify: "Insight text generates — even if you paraphrase it." },
          { piece: "Chapter 7 — Board pack", action: "Export PDF both pages", menu: "Story → Export → PDF", detail: "Share view access with test user. Mobile-preview Page 2.", verify: "PDF has Page 1 + Page 2." }
        ],
        tip: "Interview demo: click South → pause → read Smart Insight → Page 2 already filtered. Magic."
      }
    ],
    7: [
      {
        title: "Nandan's spreadsheet killer — planning model puzzle",
        goal: "Replace email budget versions with one write-back table in SAC.",
        puzzle: "Nandan's Excel has tabs named <em>Budget_v3_FINAL_v2.xlsx</em>. Your puzzle: build <strong>RetailCo_Planning</strong> with Version dimension so Actual, Forecast, and Budget coexist — and one saved cell proves write-back works.",
        dataFile: "retailco_planning_seed",
        steps: [
          { piece: "Piece A — New object type", action: "Create Planning Model (not Analytic)", menu: "Create → Model → Planning Model", detail: "Dimensions: Account · Region · Product Category · Time · Version.", verify: "Model type says Planning in properties.", clue: "RetailCo_Sales_Analytic stays read-only — different object." },
          { piece: "Piece B — Chart of accounts", action: "Build Account hierarchy", menu: "Account dimension", detail: "Gross_Sales (INC) · COGS (EXP) · Marketing (EXP) · Net Income rollup.", verify: "Account members typed INC/EXP correctly." },
          { piece: "Piece C — Three timelines", action: "Create Version members", menu: "Version dimension", detail: "Actual · Forecast · Budget. Actual = history. Budget = Nandan types.", verify: "Three version members exist." },
          { piece: "Piece D — Seed Actuals", action: "Load Actual data", menu: "Import retailco_planning_seed.csv OR copy from RetailCo_Sales_Analytic", detail: "Reference → Data files for planning seed. Map Version = Actual.", verify: "Actual version shows numbers — not empty grid." },
          { piece: "Piece E — Unlock typing", action: "Enable planning on Budget accounts", menu: "Account → Planning settings", detail: "Mark Budget version cells editable for Planner role on revenue accounts.", verify: "Budget version cells show as plannable." },
          { piece: "Piece F — Nandan's table", action: "Create planning story with data entry table", menu: "Create → Story → Table widget", detail: "Bind RetailCo_Planning · Version = Budget · rows = accounts/regions · columns = months.", verify: "Table renders with editable cells on Budget." },
          { piece: "Piece G — The save test", action: "Type test value and save", detail: "Enter ₹999999 in one April South Gross_Sales Budget cell → Save → refresh browser → value persists.", verify: "Value still there after reload — write-back works.", clue: "If value disappears, planning not enabled or wrong version." },
          { piece: "Piece H — Name it", action: "Save model RetailCo_Planning", detail: "Day 8 Data Actions attach to this model.", verify: "Two models now: RetailCo_Sales_Analytic + RetailCo_Planning." }
        ],
        tip: "Tell Nandan: 'One workbook, three versions, no more email attachments.'"
      }
    ]
  });
})();
