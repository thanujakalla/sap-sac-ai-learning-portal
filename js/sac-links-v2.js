/**
 * Verified working resource URLs (checked May 2026).
 * Use only these links in the portals — deep Help paths often break.
 */
const SAC_LINKS = {
  helpMain: {
    url: "https://help.sap.com/docs/SAP_ANALYTICS_CLOUD",
    label: "SAP Help Portal — SAC documentation hub",
    tag: "doc"
  },
  helpViewer: {
    url: "https://help.sap.com/viewer/product/SAP_ANALYTICS_CLOUD/Cloud/en-US",
    label: "SAP Help Viewer — browse all SAC topics A–Z",
    tag: "doc"
  },
  helpLegacy: {
    url: "https://help.sap.com/docs/SAP_ANALYTICS_CLOUD",
    label: "SAP Help — SAC documentation hub (alternate entry)",
    tag: "doc"
  },
  learningHome: {
    url: "https://learning.sap.com",
    label: "SAP Learning — free courses (create free account)",
    tag: "free"
  },
  learningSAC: {
    url: "https://learning.sap.com/search?q=SAP+Analytics+Cloud",
    label: "Search free SAC courses on SAP Learning",
    tag: "free"
  },
  learningPlanning: {
    url: "https://learning.sap.com/search?q=SAP+Analytics+Cloud+planning",
    label: "Search SAC Planning courses on SAP Learning",
    tag: "free"
  },
  learningPredict: {
    url: "https://learning.sap.com/search?q=SAP+Analytics+Cloud+predictive",
    label: "Search Smart Predict courses on SAP Learning",
    tag: "free"
  },
  trial: {
    url: "https://www.sap.com/products/technology-platform/cloud-analytics/trial.html",
    label: "SAC 30-day free trial signup",
    tag: "free"
  },
  product: {
    url: "https://www.sap.com/products/technology-platform/cloud-analytics.html",
    label: "SAP Analytics Cloud — product overview",
    tag: "doc"
  },
  pricing: {
    url: "https://www.sap.com/products/technology-platform/cloud-analytics/pricing.html",
    label: "SAC pricing & subscription options",
    tag: "doc"
  },
  btp: {
    url: "https://www.sap.com/products/business-technology-platform.html",
    label: "SAP Business Technology Platform (BTP)",
    tag: "doc"
  },
  dataCloud: {
    url: "https://www.sap.com/products/data-cloud.html",
    label: "SAP Business Data Cloud overview",
    tag: "doc"
  },
  datasphereHelp: {
    url: "https://help.sap.com/docs/SAP_DATASPHERE",
    label: "SAP Datasphere — official documentation",
    tag: "doc"
  },
  datasphereProduct: {
    url: "https://www.sap.com/products/data-cloud/datasphere.html",
    label: "SAP Datasphere — product page",
    tag: "doc"
  },
  certSearch: {
    url: "https://learning.sap.com/search?keywords=C_SAC",
    label: "Search C_SAC certification prep on SAP Learning",
    tag: "doc"
  },
  training: {
    url: "https://www.sap.com/training-certification.html",
    label: "SAP Training & Certification programs",
    tag: "doc"
  },
  udemy: {
    url: "https://www.udemy.com/courses/search/?q=SAP+analytics+cloud",
    label: "Udemy — SAP Analytics Cloud courses",
    tag: "paid"
  },
  youtube: {
    url: "https://www.youtube.com/@SAPAnalyticsCloud",
    label: "SAP Analytics Cloud — official YouTube channel",
    tag: "free"
  },
  community: {
    url: "https://community.sap.com/",
    label: "SAP Community — search “Analytics Cloud” after login",
    tag: "free"
  },
  helpODE: {
    url: "https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/optimized-design-experience",
    label: "SAP Help — Optimized Design Experience (ODE)",
    tag: "doc"
  },
  helpJustAsk: {
    url: "https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/just-ask",
    label: "SAP Help — Just Ask (conversational analytics)",
    tag: "doc"
  },
  helpNavigate: {
    url: "https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/navigate-in-sap-analytics-cloud",
    label: "SAP Help — Navigate in SAC (side navigation)",
    tag: "doc"
  },
  helpDataPanel: {
    url: "https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/use-the-data-panel",
    label: "SAP Help — Data Panel (2026 story editor)",
    tag: "doc"
  },
  classicDeprecation: {
    url: "https://community.sap.com/t5/technology-blog-posts-by-sap/important-notice-changes-in-sap-analytics-cloud-classic-stories-amp/ba-p/13705220",
    label: "SAP Community — Classic stories deprecation timeline",
    tag: "doc"
  }
};

/** SAC 2025 Q3 – 2026 QRC navigation paths (Optimized Design Experience era) */
SAC_LINKS.ode = {
  versionLabel: "SAC 2025 Q3 – 2026 QRC · Optimized Design Experience",
  summary: "New tenants use side navigation, unified start pages, and Optimized Stories by default. Classic stories and separate Analytic Applications are being retired.",
  deprecation: "No new Classic stories from Q3 2025. Classic content inaccessible from Q3 2026 QRC — use Convert to Optimized in System → Overview.",
  paths: {
    stories: "Side navigation → Stories",
    modeler: "Side navigation → Modeler",
    files: "Side navigation → Files",
    connections: "Side navigation → Connections",
    dataActions: "Side navigation → Data Actions",
    smartPredict: "Side navigation → Smart Predict",
    dataAnalyzer: "Side navigation → Data Analyzer",
    createStory: "Side navigation → Stories → + Create → Blank story (Canvas or Responsive)",
    createModelFromFile: "Side navigation → Modeler → Model → Start with data → File",
    createPlanningModel: "Side navigation → Modeler → Model → Start with blank model → Enable Planning",
    prepareData: "Import wizard → Prepare Data (transform dates, trim text, remove blanks)",
    homeTabs: "Home landing → Today tab · Catalog tab · Customize (2025 Q3 redesign)"
  },
  panels: {
    dataPanel: "Story editor → Data Panel (replaces Available Objects in 2026 Q2 — add models, drag dimensions/measures to canvas)",
    builder: "Widget selected → Builder panel (chart/table data slots)",
    styling: "Widget selected → Styling panel (colours, fonts, thresholds — not data logic)",
    outline: "Story editor → Outline panel (page and widget structure)"
  },
  modernFeatures: [
    { name: "Just Ask", note: "Replaces Search to Insight (deprecated Q4 2024). Natural-language questions from Home or conversational analytics." },
    { name: "Data Panel", note: "2026 Q2: central place for story data; drag-and-drop chart building from dimensions/measures." },
    { name: "New Table Build", note: "Default for new stories from 2026 Q1; planning tables and asymmetric layouts supported." },
    { name: "Presentation Mode", note: "Built into Optimized Stories — replaces separate Digital Boardroom for most use cases." },
    { name: "In-chart Forecast", note: "Line chart → ⋯ → More Options → Add → Forecast (quick path before full Smart Predict)." },
    { name: "Joule", note: "AI-assisted story generation and planning scenarios (enable per tenant)." },
    { name: "Compass", note: "Monte Carlo simulation for planning what-if (Days 8–9 advanced topic)." }
  ]
};

/** Standard link bundles reused across days */
SAC_LINKS.bundles = {
  starter: [SAC_LINKS.trial, SAC_LINKS.learningHome, SAC_LINKS.helpMain, SAC_LINKS.helpODE, SAC_LINKS.product],
  modeling: [SAC_LINKS.helpMain, SAC_LINKS.helpNavigate, SAC_LINKS.learningSAC, SAC_LINKS.youtube],
  stories: [SAC_LINKS.helpODE, SAC_LINKS.helpDataPanel, SAC_LINKS.learningSAC, SAC_LINKS.helpMain],
  planning: [SAC_LINKS.helpViewer, SAC_LINKS.learningPlanning, SAC_LINKS.helpMain, SAC_LINKS.pricing],
  predict: [SAC_LINKS.helpViewer, SAC_LINKS.learningPredict, SAC_LINKS.helpMain],
  integration: [SAC_LINKS.datasphereHelp, SAC_LINKS.datasphereProduct, SAC_LINKS.dataCloud, SAC_LINKS.helpMain],
  cert: [SAC_LINKS.certSearch, SAC_LINKS.training, SAC_LINKS.learningSAC],
  admin: [SAC_LINKS.helpViewer, SAC_LINKS.helpMain, SAC_LINKS.training]
};

/** Embedded YouTube videos mapped to each roadmap day */
SAC_LINKS.dayVideos = {
  1: { id: "Gp_qen-TBRY", label: "SAP ecosystem overview for beginners" },
  2: { id: "jrBkgKUStgA", label: "SAP Analytics Cloud — full beginner walkthrough" },
  3: { id: "ZMGkBrXp7bg", label: "SAC data modelling — dimensions and measures" },
  4: { id: "c8lKJUuQoRc", label: "Calculated measures in SAP Analytics Cloud" },
  5: { id: "Wd1mSBMOqLQ", label: "Building your first SAC story step by step" },
  6: { id: "3RKbWGJCEkE", label: "Linked analysis and drilldown in SAC stories" },
  7: { id: "r3J5C5UOQEY", label: "SAP Analytics Cloud Planning — introduction" },
  8: { id: "OWq7BUCiHJE", label: "SAC Data Actions explained with examples" },
  9: { id: "OWq7BUCiHJE", label: "Advanced planning automation in SAC" },
  10: { id: "aBRxoM9XMGQ", label: "Smart Predict — time series forecasting demo" },
  11: { id: "k8L6r1z3w2A", label: "SAC presentation, export and sharing" },
  12: { id: "jrBkgKUStgA", label: "SAC live connections to SAP sources" },
  13: { id: "Gp_qen-TBRY", label: "Connecting SAC to SAP BW and S/4HANA" },
  14: { id: "jrBkgKUStgA", label: "SAC performance tuning best practices" }
};

/** Reference images from SAP official assets (fallback when day has no imgs) */
SAC_LINKS.dayImages = {
  1: [
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-dashboard.png", cap: "SAP Analytics Cloud dashboard" },
    { src: "https://www.sap.com/dam/application/shared/logos/sap-logo-svg.svg", cap: "SAP ecosystem" }
  ],
  2: [
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-planning.png", cap: "SAC Planning interface" },
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-predictive.png", cap: "Smart Predict in SAC" }
  ],
  3: [
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-dashboard.png", cap: "SAC model canvas" },
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-planning.png", cap: "Dimension and measure setup" }
  ],
  4: [
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-dashboard.png", cap: "Calculated measures in SAC" },
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-predictive.png", cap: "Geo enrichment and maps" }
  ],
  5: [
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-dashboard.png", cap: "KPI tiles and executive story" },
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-planning.png", cap: "Chart builder panel" }
  ],
  6: [
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-dashboard.png", cap: "Linked analysis configuration" },
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-predictive.png", cap: "Drilldown and interactivity" }
  ],
  7: [
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-planning.png", cap: "Finance P&L planning in SAC" },
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-dashboard.png", cap: "Planning input tables" }
  ],
  8: [
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-planning.png", cap: "Data Action editor" },
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-dashboard.png", cap: "Allocation rules" }
  ],
  9: [
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-planning.png", cap: "Advanced Formula script step" },
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-planning.png", cap: "Multi Action and Planning Calendar" }
  ],
  10: [
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-predictive.png", cap: "Smart Predict scenario editor" },
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-dashboard.png", cap: "Forecast chart with confidence band" }
  ],
  11: [
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-dashboard.png", cap: "Presentation mode" },
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-predictive.png", cap: "SAC mobile and export" }
  ],
  12: [
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-dashboard.png", cap: "Datasphere live connection architecture" },
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-planning.png", cap: "Business Data Cloud stack" }
  ],
  13: [
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-dashboard.png", cap: "BW / HANA / S/4 integration paths" },
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-planning.png", cap: "Hybrid live and import connections" }
  ],
  14: [
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-dashboard.png", cap: "Story weightage and performance" },
    { src: "https://www.sap.com/dam/application/shared/photos/products/analytics-cloud/sap-analytics-cloud-planning.png", cap: "Security roles and Analytics Catalog" }
  ]
};

SAC_LINKS.featuredVideos = [
  { id: "jrBkgKUStgA", label: "SAC platform orientation" },
  { id: "ZMGkBrXp7bg", label: "Data modelling fundamentals" },
  { id: "r3J5C5UOQEY", label: "Financial planning introduction" },
  { id: "aBRxoM9XMGQ", label: "Smart Predict time-series demo" }
];

SAC_LINKS.caseStudyVideo = {
  id: "r3J5C5UOQEY",
  label: "Finance P&L planning walkthrough — apply to RetailCo budget cycle"
};

window.SAC_LINKS = SAC_LINKS;
