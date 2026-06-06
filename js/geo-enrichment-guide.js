/**
 * V2 only — detailed SAP SAC geo enrichment reference (import models + choropleth)
 * Sources: SAP Help "Add Geomap Support to Datasets", "Analyzing Geographical Data", "Adding the Choropleth Layer"
 */
(function () {
  const extras = window.SACPortalExtras || {};
  window.SACPortalExtras = extras;

  extras.GEO_ENRICHMENT_GUIDE = {
    intro: "Geo maps are <strong>not</strong> one checkbox on Region. SAC needs a <em>location dimension</em> created through <strong>Geo Enrichment</strong> in Modeler — either from coordinates or from area names that match SAP's supported location catalog.",
    retailCoTrap: "RetailCo's <code>Region</code> values (North, South, East, West, Central) are <strong>sales territories</strong>, not Indian states. SAC will <em>not</em> place them on a map automatically. For India choropleth practice use the <code>State</code> column (Delhi, Tamil Nadu, …) or the separate US file <code>retailco_sales_analytic_us.csv</code> where state names match SAP's US catalog.",
    methods: [
      {
        id: "coordinates",
        name: "By Coordinates",
        when: "You have Latitude and Longitude columns (decimal degrees, no ° symbol — e.g. 28.6139, 77.2090).",
        steps: [
          "Open model in Modeler → toolbar → <strong>Geo Enrichment</strong>",
          "Choose <strong>By Coordinates</strong>",
          "<strong>Enrich Dimension</strong> tab: pick dimension ID + map Lat/Long columns — OR",
          "<strong>Create New Dimension</strong> tab: new location dimension name + Lat/Long columns",
          "Review <strong>Details</strong> panel for data quality issues before Save",
          "Save model — metadata refresh may be required before story geo map sees the location dimension"
        ],
        storyUse: "Store-level or city-level analysis when you have exact coordinates in the CSV."
      },
      {
        id: "area",
        name: "By Area Name",
        when: "You have Country + optional Region/Sub-Region columns with names that match SAP's <em>Supported Locations</em> list (exact English spelling or ISO country codes).",
        steps: [
          "Prerequisite: CSV must include unique location IDs plus country (required when sub-areas span countries)",
          "Modeler → <strong>Geo Enrichment</strong> → <strong>By Area Name</strong>",
          "Country: pick from dropdown <em>or</em> map a Country column (ISO2/ISO3 or English name e.g. India, United States)",
          "Map <strong>Region</strong> and optional <strong>Sub-Region</strong> to your dataset columns",
          "Click Supported Locations link in the wizard — verify every member spelling (Tamil Nadu not TN)",
          "Fix unmatched rows in Details panel; unresolved members = blank map polygons",
          "Save model — location dimension appears for geo map widget"
        ],
        storyUse: "RetailCo India: map <code>State</code> as Sub-Region, fixed Country = India. US trial: use <code>State</code> column with California, Texas, etc."
      }
    ],
    choroplethSteps: [
      "Story → Insert → <strong>Geo Map</strong> widget",
      "Add layer → type <strong>Choropleth / Drill</strong> (required for area-enriched dimensions)",
      "Data Source → edit → select model with location dimension",
      "Location dimension = your enriched dimension (not the raw Region text unless enriched)",
      "Measure = Revenue (or other numeric measure)",
      "If map is empty: return to Modeler → Save model again (refreshes MDS metadata cache)",
      "Test drill: Country → Region → Sub-Region when hierarchy exists"
    ],
    troubleshooting: [
      { issue: "Map shows world but no shading", cause: "Location dimension not selected or enrichment failed silently", fix: "Modeler → Geo Enrichment → check Details panel; re-save model" },
      { issue: "South / North sales regions missing", cause: "Custom territory labels ≠ geographic areas", fix: "Enrich on State column or create coordinate-based location dimension" },
      { issue: "Indian states not recognized", cause: "Abbreviations (TN, MH) or wrong spelling", fix: "Use full English names from Supported Locations list" },
      { issue: "Works in Modeler, blank in story", cause: "Stale metadata / wrong layer type", fix: "Model Save; use Choropleth/Drill layer not bubble-only; ODE geo map may need 2025.8+ for Smart Insights pairing" },
      { issue: "Live BW/HANA model", cause: "Geo must be configured at source with 0LATITUDE/0LONGITUDE attributes", fix: "Different path — source system geo relevance, not import Geo Enrichment wizard" }
    ],
    retailCoPaths: {
      indiaStates: "Country = India · Sub-Region = State column · Keep Region as separate sales dimension for bar charts",
      usTrial: "Use data/retailco_sales_analytic_us.csv · Country = United States · State = full state name · Geo Enrichment By Area Name",
      salesRegionsOnly: "Use bar chart by Region — do not expect choropleth until you enrich real geography"
    },
    helpLinks: [
      { label: "Add Geomap Support to Datasets", url: "https://help.sap.com/doc/00f68c2e08b941f081002fd3691d86a7/2023.20/en-US/75d8d1fa7a794955a44278172da2cf69.html" },
      { label: "Analyzing Geographical Data", url: "https://help.sap.com/doc/00f68c2e08b941f081002fd3691d86a7/2023.20/en-US/fd69fd5e5c914637ad26927143b0d100.html" },
      { label: "Adding the Choropleth Layer", url: "https://help.sap.com/doc/00f68c2e08b941f081002fd3691d86a7/2023.20/en-US/5446d2beeb0b42029c225c27c2e482da.html" }
    ]
  };
})();
