/**
 * Version 2 UI Enhancements — SAC 2025–2026 ODE features
 * 
 * This module contains all v2-specific UI elements and behaviors:
 * - ODE navigation guide
 * - Geo enrichment & choropleth map guide
 * - Chart/story recommendation guide
 * - Version badge
 * 
 * Conditionally loaded when v2_ui_enabled feature flag is true.
 */

if (!window.V2Enhancements) {
  class V2Enhancements {
    constructor() {
      this.enabled = false;
    }

  /**
   * Initialize v2 enhancements
   */
    async init() {
      // Check if v2 is enabled
      if (!window.FeatureFlagsLoader.isEnabled('v2_ui_enabled')) {
        console.log('[V2Enhancements] Disabled via feature flags');
        return;
      }

      this.enabled = true;
      console.log('[V2Enhancements] Initializing...');

      // Version badge only — ODE, geo, CSV library, and chart guides are rendered by sac-portal-v2.js
      this._initVersionBadge();
    }

  /**
   * Add version badge to header
   * @private
   */
    _initVersionBadge() {
      const headerActions = document.querySelector('.header-actions');
      if (!headerActions) return;

      // Check if badge already exists
      if (document.getElementById('sacVersionBadge')) return;

      const badge = document.createElement('span');
      badge.id = 'sacVersionBadge';
      badge.className = 'header-sac-badge';
      badge.title = 'Version 2: SAC 2025–2026 ODE';
      badge.textContent = 'Version 2';

      // Insert before progress span
      const progressSpan = headerActions.querySelector('.header-progress');
      if (progressSpan) {
        headerActions.insertBefore(badge, progressSpan);
      }

      console.log('[V2Enhancements] Version badge added');
    }

  /**
   * Initialize ODE (OnDemand Edition) navigation guide
   * @private
   */
  _initODEGuide() {
    const container = document.getElementById('odeNavigationGuide');
    if (!container) return;

    const odeGuide = window.GEO_ENRICHMENT_GUIDE?.odeNavigationGuide || this._getDefaultODEGuide();
    
    // Only populate once
    if (container.children.length > 0) return;

    const html = `
      <div class="ode-guide">
        <p><strong>SAC 2025–2026 uses a new ODE interface.</strong> Your SAC instance might still be on a previous version — check your SAC URL and navigation bar first.</p>
        <div class="ode-steps">
          ${odeGuide.map((step, i) => `
            <div class="ode-step">
              <h4>Step ${i + 1}: ${step.title}</h4>
              <p>${step.description}</p>
              ${step.substeps ? `
                <ul>
                  ${step.substeps.map(s => `<li>${s}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.innerHTML = html;
    console.log('[V2Enhancements] ODE guide loaded');
  }

  /**
   * Initialize geo enrichment & choropleth map guide
   * @private
   */
  _initGeoEnrichmentGuide() {
    const container = document.getElementById('geoEnrichmentGuide');
    if (!container) return;

    // Only populate once
    if (container.children.length > 0) return;

    const geoGuide = window.GEO_ENRICHMENT_GUIDE?.enrichmentSteps || this._getDefaultGeoGuide();

    const html = `
      <div class="geo-guide">
        <p><strong>Geographic Enrichment</strong> adds location data (latitude/longitude) to your RetailCo data, enabling choropleth maps and geo-tagged insights.</p>
        <div class="geo-steps">
          ${geoGuide.map((step, i) => `
            <div class="geo-step">
              <h4>Step ${i + 1}: ${step.title}</h4>
              <p>${step.description}</p>
              ${step.tips ? `<p class="geo-tip"><strong>Tip:</strong> ${step.tips}</p>` : ''}
            </div>
          `).join('')}
        </div>
        <div class="info-card">
          <p><strong>Coordinates included in RetailCo CSVs:</strong> Each city and state has lat/lon for mapping.</p>
        </div>
      </div>
    `;

    container.innerHTML = html;
    console.log('[V2Enhancements] Geo enrichment guide loaded');
  }

  /**
   * Initialize chart vs story recommendation guide
   * @private
   */
  _initChartStoryGuide() {
    const container = document.getElementById('chartStoryGuide');
    if (!container) return;

    // Only populate once
    if (container.children.length > 0) return;

    const html = `
      <div class="chart-story-guide">
        <table class="guide-table">
          <thead>
            <tr>
              <th>Use case</th>
              <th>Story (recommended)</th>
              <th>Chart (quick view)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Real-time dashboard</td>
              <td>✓ Multiple visualizations</td>
              <td>✓ Single metric</td>
            </tr>
            <tr>
              <td>Executive summary</td>
              <td>✓ Narrative + charts</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Quick metric check</td>
              <td>—</td>
              <td>✓ Fast load</td>
            </tr>
            <tr>
              <td>What-if analysis</td>
              <td>✓ Input controls</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Mobile view</td>
              <td>✓ Responsive</td>
              <td>✓ Lightweight</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
    console.log('[V2Enhancements] Chart/Story guide loaded');
  }

  /**
   * Get default ODE guide (fallback)
   * @private
   */
  _getDefaultODEGuide() {
    return [
      {
        title: "Navigate to Stories",
        description: "In the left sidebar, look for 'Stories' or 'Workspace' → click 'New Story'.",
        substeps: ["Left sidebar → Stories", "Click 'Create' → 'Story'", "Choose data source"]
      },
      {
        title: "Connect to RetailCo CSV",
        description: "Upload or connect to your RetailCo data files.",
        substeps: ["Data → Import", "Select RetailCo CSV", "Map columns"]
      },
      {
        title: "Add visualizations",
        description: "Drag-and-drop RetailCo columns into charts.",
        substeps: ["Insert → Chart", "Drag dimension (Region)", "Drop measure (Revenue)"]
      },
      {
        title: "Publish story",
        description: "Save and share your story.",
        substeps: ["Save (Ctrl+S)", "Publish → Share link", "Set permissions"]
      }
    ];
  }

  /**
   * Get default geo guide (fallback)
   * @private
   */
  _getDefaultGeoGuide() {
    return [
      {
        title: "Verify RetailCo has coordinates",
        description: "Each row should have latitude and longitude columns.",
        tips: "RetailCo CSVs already include Latitude and Longitude for all cities."
      },
      {
        title: "Create a geo dimension",
        description: "In SAC, create a dimension from latitude/longitude columns.",
        tips: "Use 'Location Dimension' from Data Model editor."
      },
      {
        title: "Insert geo/map chart",
        description: "Use Geo Chart type instead of Bar or Line.",
        tips: "Drag Region to map and Revenue to color intensity."
      },
      {
        title: "Color by metric (choropleth)",
        description: "Set chart to show intensity based on your metric.",
        tips: "More revenue = darker color on the map."
      }
    ];
  }

  /**
   * Initialize RetailCo data files library with download buttons
   * @private
   */
  _initDataSourcesLibrary() {
    const container = document.getElementById('dataSourcesLibrary');
    if (!container) return;

    // Only populate once
    if (container.children.length > 0) return;

    const html = `
      <div class="data-sources-library">
        <p class="reference-section-desc">All RetailCo CSV files are ready to download and use in SAC. Each file represents a different view of the same company data.</p>

        <div class="data-files-grid">
          <!-- Sales Analytics File -->
          <div class="data-file-card">
            <div class="data-file-header">
              <h4>📊 Sales Analytics</h4>
              <span class="data-file-badge">Transaction Level</span>
            </div>
            <p class="data-file-desc">Daily sales transactions for RetailCo across all regions, channels, and products.</p>
            <div class="data-file-columns">
              <strong>Key columns:</strong>
              <ul>
                <li><code>Date</code> — daily transaction date (2021–2024)</li>
                <li><code>Region, State, City</code> — geography with lat/lon for maps</li>
                <li><code>Channel</code> — distributor, direct, wholesale</li>
                <li><code>Category, Brand, SKU</code> — product hierarchy</li>
                <li><code>Revenue, COGS, Units, Margin</code> — financials</li>
              </ul>
            </div>
            <div class="data-file-stats">
              <small>~19,200 rows per day | ~7M+ transactions total</small>
            </div>
            <a href="data/retailco_sales_analytic.csv" class="btn-download" download="retailco_sales_analytic.csv" title="Download sales analytics CSV">
              ⬇️ Download CSV
            </a>
            <button class="btn-secondary" type="button" onclick="alert('Open with Excel or Google Sheets. Columns: Date, Year, Month, Region, State, City, Channel, Category, Brand, SKU, Pack_Size, Revenue, COGS, Margin, Units, Unit_Price')">
              📋 Column guide
            </button>
          </div>

          <!-- Planning Seed File -->
          <div class="data-file-card">
            <div class="data-file-header">
              <h4>📈 Planning &amp; Forecasting</h4>
              <span class="data-file-badge">Aggregated</span>
            </div>
            <p class="data-file-desc">Monthly aggregated data for budget forecasting and what-if analysis. Pre-calculated margins and variances.</p>
            <div class="data-file-columns">
              <strong>Key columns:</strong>
              <ul>
                <li><code>Year, Month</code> — monthly aggregation period</li>
                <li><code>Region, Category, Channel</code> — dimensional grouping</li>
                <li><code>Gross_Sales, COGS, Gross_Profit</code> — financial metrics</li>
                <li><code>Units, Targets, Variance</code> — volume &amp; forecasting</li>
              </ul>
            </div>
            <div class="data-file-stats">
              <small>~2,000 rows | 48 months × 80 products × regions</small>
            </div>
            <a href="data/retailco_planning_seed.csv" class="btn-download" download="retailco_planning_seed.csv" title="Download planning seed CSV">
              ⬇️ Download CSV
            </a>
            <button class="btn-secondary" type="button" onclick="alert('Open with Excel or Google Sheets. Columns: Year, Month, Region, Category, Channel, Gross_Sales, COGS, Gross_Profit, Units, Targets, Variance')">
              📋 Column guide
            </button>
          </div>

          <!-- Product Master Reference -->
          <div class="data-file-card">
            <div class="data-file-header">
              <h4>🏷️ Product Master</h4>
              <span class="data-file-badge">Reference</span>
            </div>
            <p class="data-file-desc">All RetailCo products with hierarchy. Use to enrich sales/planning data in SAC.</p>
            <div class="data-file-columns">
              <strong>Key columns:</strong>
              <ul>
                <li><code>Brand</code> — product brand (e.g., Sundown, Refresh)</li>
                <li><code>Category</code> — product line (e.g., Juices, Water)</li>
                <li><code>SKU, Pack_Size</code> — item identifier &amp; volume</li>
              </ul>
            </div>
            <div class="data-file-stats">
              <small>~400 products | 5 categories × 80 brands</small>
            </div>
            <a href="data/retailco_product_master.csv" class="btn-download" download="retailco_product_master.csv" title="Download product master CSV">
              ⬇️ Download CSV
            </a>
            <button class="btn-secondary" type="button" onclick="alert('Reference table for products. Use to create lookup dimensions in SAC Models → Dimensions.')">
              📋 How to use
            </button>
          </div>

          <!-- HR/Headcount File (Optional) -->
          <div class="data-file-card">
            <div class="data-file-header">
              <h4>👥 HR &amp; Headcount</h4>
              <span class="data-file-badge">Optional</span>
            </div>
            <p class="data-file-desc">RetailCo team size and hiring trends (optional — used for advanced workforce analytics).</p>
            <div class="data-file-columns">
              <strong>Key columns:</strong>
              <ul>
                <li><code>Month</code> — reporting period</li>
                <li><code>Region</code> — location</li>
                <li><code>Headcount</code> — team size</li>
                <li><code>Revenue_per_Employee</code> — productivity metric</li>
              </ul>
            </div>
            <div class="data-file-stats">
              <small>~600 rows | 48 months × 12 regions</small>
            </div>
            <a href="data/retailco_hr_headcount.csv" class="btn-download" download="retailco_hr_headcount.csv" title="Download HR CSV">
              ⬇️ Download CSV
            </a>
            <button class="btn-secondary" type="button" onclick="alert('Optional file for workforce analysis. Advanced topics: Day 10+')">
              📋 Usage
            </button>
          </div>
        </div>

        <div class="info-card data-usage-tips">
          <h4>📌 Quick Start: How to use these files</h4>
          <ol>
            <li><strong>Download</strong> retailco_sales_analytic.csv (required for all lessons)</li>
            <li><strong>Open in Excel / Google Sheets</strong> to preview columns and data</li>
            <li><strong>Go to Day 1</strong> in the Learn section — instructions will guide you to import into SAC</li>
            <li><strong>Join data</strong> across files using Region, Category, Channel as keys (Day 4+)</li>
            <li><strong>Create stories</strong> with geographic maps using Latitude/Longitude (Day 6+)</li>
          </ol>
        </div>

        <div class="info-card data-validation-tips">
          <h4>✓ Data quality notes</h4>
          <ul>
            <li>All files use <strong>UTF-8 encoding</strong> — compatible with Excel, Google Sheets, and SAC</li>
            <li><strong>Dates</strong> are in YYYY-MM-DD format (ISO standard)</li>
            <li><strong>Currencies</strong> are in INR (Indian Rupees) — no symbol, numeric only</li>
            <li><strong>Coordinates</strong> (Latitude/Longitude) are in WGS84 (standard for Google Maps)</li>
            <li><strong>Columns match</strong> across files — join on Region, Category, Channel (Day 4+)</li>
          </ul>
        </div>
      </div>
    `;

    container.innerHTML = html;
    console.log('[V2Enhancements] Data sources library loaded');
  }
}

// Export singleton
window.V2Enhancements = new V2Enhancements();
}
