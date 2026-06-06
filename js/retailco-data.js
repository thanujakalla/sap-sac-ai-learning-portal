/**

 * RetailCo practice datasets — file paths, column mapping, chart/story guide, validation totals

 */

(function () {

  const extras = window.SACPortalExtras || {};

  window.SACPortalExtras = extras;



  extras.DATA_SOURCES = {

    retailco_sales_analytic: {

      id: "retailco_sales_analytic",

      name: "RetailCo FMCG Sales Export (detailed)",

      file: "data/retailco_sales_analytic.csv",

      downloadName: "retailco_sales_analytic.csv",

      format: "CSV · UTF-8 · 31 columns",

      owner: "Nandan (Finance) — same file Menon emails as WhatsApp attachment",

      story: "This is the <strong>main BI dataset</strong> for Days 2–6 and 10. It is richer than a simple region report: every row is Region × State × City × Channel × SKU × Month so you can practice <em>bar charts, line trends, pie share, treemaps, geo maps, tables, and filters</em> — all from one import into <code>RetailCo_Sales_Analytic</code>.",

      sacModel: "RetailCo_Sales_Analytic",

      connectionType: "Import (Acquire) — copied into SAC embedded HANA",

      grain: "23,760 rows = 5 regions × 15 states × 33 cities × 4 channels × 15 SKUs × 12 months",

      period: "April 2025 – March 2026 (Indian FY)",

      firstUsedDay: 3,

      usedInDays: [2, 3, 4, 5, 6, 10],

      modelTip: "Map text columns → Dimensions. Number columns → Measures (SUM). Build hierarchy Product_Category → Brand → Product_SKU for Day 6 drilldown.",

      columns: [

        { name: "Date", type: "Date", mapsTo: "Date dimension (Month · Year→Quarter→Month hierarchy)", chartUse: "Line, area, heat map columns", doNot: "Never map as a measure" },

        { name: "Region", type: "Text", mapsTo: "Generic dimension — North · South · East · West · Central", chartUse: "Bar chart axis · KPI top region · page filter · geo enrichment", doNot: "Case-sensitive member names" },

        { name: "State", type: "Text", mapsTo: "Generic dimension (geo drill under Region)", chartUse: "Choropleth map · geo drill", doNot: "Not a measure" },

        { name: "Channel", type: "Text", mapsTo: "Generic dimension — Modern Trade · General Trade · E-Commerce · Quick Commerce", chartUse: "Stacked bar · donut · compare channel mix", doNot: "Good for 'what suits pie' — only 3 members" },

        { name: "Customer_Segment", type: "Text", mapsTo: "Generic dimension — Premium · Mass · Rural", chartUse: "Stacked column · input control filter", doNot: "Not a measure" },

        { name: "Product_Category", type: "Text", mapsTo: "Generic dimension — Beverages · Snacks · Personal Care", chartUse: "Pie/donut · bar · Chinnu's product filter", doNot: "Parent level of Brand hierarchy" },

        { name: "Brand", type: "Text", mapsTo: "Generic dimension — AquaFresh, CrunchyBite, etc.", chartUse: "Ranking bar · treemap · Menon Page 2 drill", doNot: "Middle level: Category → Brand → SKU" },

        { name: "Product_SKU", type: "Text", mapsTo: "Generic dimension — lowest product grain", chartUse: "Detail table rows · top-10 SKU bar", doNot: "Too many for pie chart — use bar/table" },

        { name: "Revenue", type: "Number", mapsTo: "Measure · Decimal · SUM · ₹", chartUse: "Almost every chart — primary KPI measure", doNot: "If under Dimensions, totals break" },

        { name: "Units_Sold", type: "Number", mapsTo: "Measure · Integer · SUM", chartUse: "Secondary KPI · table column · scatter Y-axis", doNot: "" },

        { name: "Target", type: "Number", mapsTo: "Measure · Decimal · SUM", chartUse: "KPI variance · Pct_vs_Target calc (Day 4)", doNot: "" },

        { name: "COGS", type: "Number", mapsTo: "Measure · Decimal · SUM", chartUse: "Margin stories · waterfall with Revenue (Day 7+)", doNot: "" },

        { name: "Discount_Amount", type: "Number", mapsTo: "Measure · Decimal · SUM", chartUse: "Scatter vs Revenue · E-Commerce analysis", doNot: "" },

        { name: "Returns_Units", type: "Number", mapsTo: "Measure · Integer · SUM", chartUse: "Quality KPI · conditional formatting", doNot: "" },

        { name: "Marketing_Spend", type: "Number", mapsTo: "Measure · Decimal · SUM", chartUse: "Bubble size · planning bridge to Day 7", doNot: "" },

        { name: "Unit_Price", type: "Number", mapsTo: "Measure · Decimal · AVG (not SUM in stories)", chartUse: "Average price KPI · scatter axis", doNot: "Use AVG aggregation — summing price is wrong" },
        { name: "Fiscal_Quarter", type: "Text", mapsTo: "Generic or Date attribute Q1–Q4", chartUse: "Filter · quarter compare", doNot: "" },
        { name: "City", type: "Text", mapsTo: "Generic dimension — 33 cities", chartUse: "Detail table · top cities bar · geo with lat/long", doNot: "" },
        { name: "Latitude", type: "Number", mapsTo: "Geo Enrichment By Coordinates", chartUse: "Coordinate-based location dimension", doNot: "Do not SUM" },
        { name: "Longitude", type: "Number", mapsTo: "Geo Enrichment By Coordinates", chartUse: "Pair with Latitude in wizard", doNot: "Do not SUM" },
        { name: "Pack_Size", type: "Text", mapsTo: "Product attribute", chartUse: "Table detail", doNot: "" },
        { name: "Distributor_ID", type: "Text", mapsTo: "Generic · join to distributor master", chartUse: "Blend stories · distributor ranking", doNot: "" },
        { name: "Distributor_Name", type: "Text", mapsTo: "Generic attribute", chartUse: "Table labels", doNot: "" },
        { name: "Sales_Rep_ID", type: "Text", mapsTo: "Generic dimension", chartUse: "Rep performance table", doNot: "" },
        { name: "Warehouse_Code", type: "Text", mapsTo: "Generic dimension", chartUse: "Supply chain slice", doNot: "" },
        { name: "Promotion_Applied", type: "Text", mapsTo: "Generic Yes/No", chartUse: "Filter promo vs non-promo", doNot: "" },
        { name: "Net_Revenue", type: "Number", mapsTo: "Measure · SUM", chartUse: "After-discount KPI", doNot: "" },
        { name: "Order_Count", type: "Number", mapsTo: "Measure · SUM", chartUse: "Operational KPI", doNot: "" },
        { name: "Gross_Margin", type: "Number", mapsTo: "Measure · SUM (or calc Revenue−COGS)", chartUse: "Margin KPI · waterfall", doNot: "" },
        { name: "Freight_Cost", type: "Number", mapsTo: "Measure · SUM", chartUse: "Logistics analysis", doNot: "" },
        { name: "In_Stock_Rate", type: "Number", mapsTo: "Measure · AVG", chartUse: "Conditional formatting · quality", doNot: "Use AVG not SUM" },

      ],

      validation: {

        rowCount: "23,760 rows (+ header)",

        totalRevenue: "₹346.04 Cr (3,460,386,895 approx.)",

        southRegionTotal: "₹82.40 Cr — South largest sales region",

        southAprilBeverages: "Spot-check: Chennai · Tamil Nadu · AquaFresh · Apr 2025 ≈ ₹3.1 L",

        diwaliSpike: "November Revenue > June Revenue — Diwali seasonality in the line chart",

        rule: "After import, SUM(Revenue) in model must match CSV grand total — Nandan rejects the build if it differs by ₹1"

      }

    },

    retailco_distributor_master: {
      id: "retailco_distributor_master",
      name: "RetailCo Distributor Master",
      file: "data/retailco_distributor_master.csv",
      downloadName: "retailco_distributor_master.csv",
      format: "CSV · 396 distributors",
      owner: "Sales ops — join on Distributor_ID",
      story: "Lookup for <strong>396 distributors</strong> across 33 cities. Blend with sales on Distributor_ID.",
      sacModel: "Blend with RetailCo_Sales_Analytic",
      connectionType: "Import · join on Distributor_ID",
      grain: "396 rows",
      period: "Static master",
      firstUsedDay: 5,
      usedInDays: [5, 6],
      validation: { rowCount: "396 rows", rule: "Distributor_ID matches sales file" }
    },

    retailco_product_master: {

      id: "retailco_product_master",

      name: "RetailCo Product Master (lookup)",

      file: "data/retailco_product_master.csv",

      downloadName: "retailco_product_master.csv",

      format: "CSV · UTF-8 · 15 SKUs",

      owner: "Category manager — optional join for hierarchy practice",

      story: "Small <strong>dimension lookup</strong> file: 15 SKUs with Brand, Category, pack size, launch year. Use on Day 3+ when you learn <em>Product_Category → Brand → Product_SKU</em> hierarchy — or ignore it until Day 6 product drilldown.",

      sacModel: "Joined to RetailCo_Sales_Analytic (advanced) or reference only",

      connectionType: "Import as second file · blend on Product_SKU",

      grain: "15 rows — one per SKU in sales file",

      period: "Static master data",

      firstUsedDay: 3,

      usedInDays: [3, 6],

      columns: [

        { name: "Product_SKU", type: "Text", mapsTo: "Join key to sales file", chartUse: "Table ID column", doNot: "" },

        { name: "Brand", type: "Text", mapsTo: "Generic dimension", chartUse: "Treemap · ranking bar", doNot: "" },

        { name: "Product_Category", type: "Text", mapsTo: "Generic dimension", chartUse: "Hierarchy parent", doNot: "" },

        { name: "Pack_Size", type: "Text", mapsTo: "Generic attribute", chartUse: "Table detail · tooltip", doNot: "" },

        { name: "Launch_Year", type: "Text", mapsTo: "Generic attribute", chartUse: "Filter new vs legacy SKUs", doNot: "" },

        { name: "Is_Active", type: "Text", mapsTo: "Generic attribute", chartUse: "Exclude inactive in stories", doNot: "" }

      ],

      validation: {

        rowCount: "15 SKU rows",

        rule: "Every Product_SKU in this file exists in retailco_sales_analytic.csv"

      }

    },

    retailco_planning_seed: {

      id: "retailco_planning_seed",

      name: "RetailCo Planning Actuals Seed",

      file: "data/retailco_planning_seed.csv",

      downloadName: "retailco_planning_seed.csv",

      format: "CSV · UTF-8 · P&L accounts",

      owner: "Nandan — P&L actuals by account · region · category · month",

      story: "When you create <strong>RetailCo_Planning</strong> on Day 7, this seeds the <em>Actual</em> version. Six account lines (Gross_Sales through Other_Opex) support <strong>waterfall charts</strong> and write-back Budget rows — not just two accounts anymore.",

      sacModel: "RetailCo_Planning",

      connectionType: "Import into Planning Model · Version = Actual",

      grain: "5,040 rows = 7 accounts × 5 regions × 3 categories × 4 channels × 12 months",

      period: "Same 12 months as sales CSV · reconciles to sales Revenue",

      firstUsedDay: 7,

      usedInDays: [7, 8, 9],

      columns: [

        { name: "Account", type: "Text", mapsTo: "Account dimension — Gross_Sales · COGS · Marketing · Distribution · Salary · Other_Opex", chartUse: "Waterfall · planning table rows", doNot: "" },

        { name: "Account_Type", type: "Text", mapsTo: "Attribute INC / EXP on Account", chartUse: "Colour income vs expense in tables", doNot: "" },

        { name: "Region", type: "Text", mapsTo: "Region dimension (same five members as sales model)", chartUse: "Planning table filter · DAC", doNot: "" },

        { name: "Product_Category", type: "Text", mapsTo: "Product Category dimension", chartUse: "Slice P&L by category", doNot: "" },

        { name: "Month", type: "Text", mapsTo: "Time dimension · YYYY-MM", chartUse: "Planning columns Apr–Mar", doNot: "" },

        { name: "Version", type: "Text", mapsTo: "Version dimension · Actual for this file", chartUse: "Switch Actual / Budget / Forecast in story", doNot: "" },

        { name: "Amount", type: "Number", mapsTo: "Measure · SUM · currency", chartUse: "Planning table cells · waterfall", doNot: "" }

      ],

      validation: {

        rowCount: "5,040 rows",

        rule: "SUM(Gross_Sales) should reconcile to RetailCo_Sales_Analytic Revenue by region/month/category"

      }

    },

    retailco_hr_headcount: {

      id: "retailco_hr_headcount",

      name: "RetailCo HR Headcount by Region & Department",

      file: "data/retailco_hr_headcount.csv",

      downloadName: "retailco_hr_headcount.csv",

      format: "CSV · UTF-8 · workforce + salary",

      owner: "HR shared with Finance — used in Day 8–9 headcount formula",

      story: "Nandan's Data Action loops headcount: Opening + Hires − Terminations = Closing. Now split by <strong>Department</strong> (Sales, Warehouse, Admin) with salary cost — supports stacked bar headcount stories and links to Planning Salary account.",

      sacModel: "RetailCo_Planning (HR accounts) or separate HR model in enterprise setups",

      connectionType: "Import or manual entry in planning cells",

      grain: "300 rows = 5 regions × 5 departments × 12 months",

      period: "April 2025 – March 2026",

      firstUsedDay: 8,

      usedInDays: [8, 9],

      columns: [

        { name: "Month", type: "Text", mapsTo: "Time", chartUse: "Line chart headcount trend", doNot: "" },

        { name: "Region", type: "Text", mapsTo: "Region dimension", chartUse: "Bar by region · Menon DAC", doNot: "" },

        { name: "Department", type: "Text", mapsTo: "Generic dimension — Sales · Warehouse · Admin", chartUse: "Stacked bar headcount mix", doNot: "" },

        { name: "Cost_Center", type: "Text", mapsTo: "Generic attribute", chartUse: "Table detail column", doNot: "" },

        { name: "Opening", type: "Number", mapsTo: "Plannable / calculated measure", chartUse: "Planning grid · formula start", doNot: "" },

        { name: "Hires", type: "Number", mapsTo: "Manual planner input", chartUse: "Data action copy source", doNot: "" },

        { name: "Terminations", type: "Number", mapsTo: "Manual planner input", chartUse: "Data action copy source", doNot: "" },

        { name: "Closing", type: "Number", mapsTo: "Calculated = Opening + Hires − Terminations", chartUse: "KPI headcount · line trend", doNot: "" },

        { name: "Salary_per_Employee", type: "Number", mapsTo: "Measure · AVG or input", chartUse: "Table · assumption cell", doNot: "Don't SUM across departments blindly" },

        { name: "Total_Salary_Cost", type: "Number", mapsTo: "Measure · SUM", chartUse: "Link to Planning Salary account", doNot: "" }

      ],

      validation: {

        rowCount: "300 rows",

        rule: "Closing month N must equal Opening month N+1 per Region+Department — formula puzzle on Day 8"

      }

    }

  };



  extras.DAY_DATA_FILES = {

    2: ["retailco_sales_analytic"],

    3: ["retailco_sales_analytic", "retailco_product_master"],

    4: ["retailco_sales_analytic"],

    5: ["retailco_sales_analytic", "retailco_distributor_master"],

    6: ["retailco_sales_analytic", "retailco_product_master", "retailco_distributor_master"],

    7: ["retailco_sales_analytic", "retailco_planning_seed"],

    8: ["retailco_planning_seed", "retailco_hr_headcount"],

    9: ["retailco_planning_seed", "retailco_hr_headcount"],

    10: ["retailco_sales_analytic"]

  };



  /** Which SAC widget fits which RetailCo question — Reference tab + Lesson context */

  extras.CHART_STORY_GUIDE = {

    intro: "Stories are the dining room; models are the kitchen. Pick the chart that matches the <strong>question shape</strong> — not whatever looks prettiest.",

    modelFirst: [

      { step: "1", title: "Import CSV → Analytic Model", detail: "Days 3–6: retailco_sales_analytic.csv → RetailCo_Sales_Analytic. Dimensions = labels. Measures = numbers to sum." },

      { step: "2", title: "Add calculations in the model", detail: "Day 4: Pct_vs_Target, Revenue_YTD, Beverage_Revenue, geo on Region — before any story widget." },

      { step: "3", title: "Create Optimized Story on the model", detail: "Day 5+: Create → Story → pick RetailCo_Sales_Analytic. Canvas for Chinnu (desktop). Responsive for Menon (tablet)." },

      { step: "4", title: "Wire widgets in Builder panel", detail: "Rows/Columns = dimensions. Values = measures. Styling panel = colours only — never data logic." }

    ],

    widgets: [

      { type: "KPI tile", question: "One headline number?", dimensions: "Optional (Top-1 Region)", measures: "Revenue, Pct_vs_Target, MoM %", retailCo: "Chinnu: Total Revenue · Best Region · growth %", day: 5, avoid: "Comparing 5 regions at once — use bar chart" },

      { type: "Bar / Column", question: "Who is bigger?", dimensions: "Region, Brand, Channel", measures: "Revenue, Units_Sold", retailCo: "South tallest bar (~₹11 Cr region total)", day: 5, avoid: "12-month trend — use line chart" },

      { type: "Stacked bar", question: "Mix within each bar?", dimensions: "Region + Channel (or Category)", measures: "Revenue", retailCo: "E-Commerce share growing through the year", day: 5, avoid: "Too many stacks (>5) — hard to read" },

      { type: "Line / Area", question: "How did we trend over time?", dimensions: "Date (Month hierarchy)", measures: "Revenue", retailCo: "Nov spike (Diwali) · Jun dip (monsoon)", day: 5, avoid: "Comparing regions without legend clutter — filter first" },

      { type: "Pie / Donut", question: "Share of whole (few slices)?", dimensions: "Product_Category or Channel (≤5 members)", measures: "Revenue", retailCo: "Beverages vs Snacks vs Personal Care split", day: 5, avoid: "Brand/SKU level — too many slices" },

      { type: "Treemap", question: "Hierarchy size?", dimensions: "Product_Category → Brand", measures: "Revenue", retailCo: "Menon Page 2 — which brands fill South?", day: 6, avoid: "Time series — use line" },

      { type: "Geo map", question: "Where geographically?", dimensions: "Region or State (geo enriched)", measures: "Revenue", retailCo: "India choropleth — South darkest green", day: 4, avoid: "Precise ₹ comparison — bar chart is clearer" },

      { type: "Table", question: "Exact numbers / export?", dimensions: "Brand, Product_SKU, Region", measures: "Revenue, Units, Pct_vs_Target", retailCo: "Menon detail table on Page 2", day: 6, avoid: "Executive 10-second view — use KPIs" },

      { type: "Heat map", question: "Matrix pattern?", dimensions: "Region × Month", measures: "Revenue or Pct_vs_Target", retailCo: "Spot weak region-month cells", day: 10, avoid: "Single region story — overkill" },

      { type: "Scatter / Bubble", question: "Correlation?", dimensions: "Optional split colour", measures: "Discount_Amount vs Revenue · bubble = Marketing_Spend", retailCo: "E-Commerce discount vs sales", day: 10, avoid: "Board Monday view — keep simple" },

      { type: "Input control", question: "Filter whole page?", dimensions: "Region, Product_Category, Channel", measures: "—", retailCo: "Chinnu picks South + Beverages — all widgets update", day: 5, avoid: "Widget-only filter when page should sync" },

      { type: "Linked analysis", question: "Click chart A → filter chart B?", dimensions: "Leader: Region bar", measures: "Followers on Page 2", retailCo: "Menon clicks South → product table filters", day: 6, avoid: "Replacing drill-down inside one chart" },

      { type: "Waterfall", question: "P&L walk?", dimensions: "Account", measures: "Amount", retailCo: "Gross_Sales down to costs in planning story", day: 7, avoid: "Sales analytic model — use planning model" },

      { type: "Planning table", question: "Type Budget numbers?", dimensions: "Account, Region, Version=Budget", measures: "Amount (editable)", retailCo: "Nandan replaces Excel Budget tab", day: 7, avoid: "Read-only analytic model" }

    ]

  };

})();


