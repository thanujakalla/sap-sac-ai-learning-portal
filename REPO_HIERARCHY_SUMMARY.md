# Repository Hierarchy and One-line File Summaries

This file lists the repository structure and a one-line description of the logic or purpose for each file, to help other agents or contributors quickly understand the project.

## Root files
- [AI_AGENT_INTEGRATION_GUIDE.md](AI_AGENT_INTEGRATION_GUIDE.md): Instructions for integrating an AI agent with this project.
- [Azure_RAG_Project_Documentation.md](Azure_RAG_Project_Documentation.md): Documentation for Azure Retrieval-Augmented Generation setup and architecture.
- [DATA_FILES_VISUAL_PREVIEW.md](DATA_FILES_VISUAL_PREVIEW.md): Visual overview and examples of dataset files.
- [index.html](index.html): Main frontend entry page that bootstraps the portal and loads scripts/styles.
- [README.md](README.md): Project overview, install/run instructions, and high-level notes.
- [RETAILCO_DATA_FILES_ENHANCEMENT.md](RETAILCO_DATA_FILES_ENHANCEMENT.md): Notes and plans for improving RetailCo data files and schemas.
- [sap_sac_beginner_portal_unified.html](sap_sac_beginner_portal_unified.html): Unified beginner portal page combining teaching modules.
- [sap_sac_beginner_portal_v2.html](sap_sac_beginner_portal_v2.html): Version 2 of the beginner portal with updated layout/content.
- [sap_sac_beginner_portal.html](sap_sac_beginner_portal.html): Original beginner portal page for SAP SAC learning materials.
- [sap_sac_learning_portal.html](sap_sac_learning_portal.html): Learning portal page hosting tutorials and examples.
- [tasks done till now.md](tasks done till now.md): Project task log/changelog of completed work.

## api/
- [api/host.json](api/host.json): Azure Functions host configuration (bindings/extensions).
- [api/local.settings.json](api/local.settings.json): Local development settings and secrets for Azure Functions.
- [api/local.settings.json.example](api/local.settings.json.example): Template example for local settings.
- [api/README.md](api/README.md): How-to for running and developing the API functions.
- [api/requirements.txt](api/requirements.txt): Python dependency list for the Azure Functions.

### api function packages
- [api/ai_tutor/__init__.py](api/ai_tutor/__init__.py): Module init for the AI tutor Azure Function.
- [api/ai_tutor/function.json](api/ai_tutor/function.json): Binding/config for the `ai_tutor` function.
- [api/content/__init__.py](api/content/__init__.py): Module init for content API endpoints.
- [api/content/function.json](api/content/function.json): Binding/config for the `content` function.
- [api/feature_flags/__init__.py](api/feature_flags/__init__.py): Module init for feature-flags function.
- [api/feature_flags/function.json](api/feature_flags/function.json): Binding/config for `feature_flags`.
- [api/health/__init__.py](api/health/__init__.py): Module init for the health-check function.
- [api/health/function.json](api/health/function.json): Binding/config exposing health endpoint.
- [api/progress/__init__.py](api/progress/__init__.py): Module init for progress-tracking endpoints.
- [api/progress/function.json](api/progress/function.json): Binding/config for `progress` function.
- [api/retailco_data/__init__.py](api/retailco_data/__init__.py): Module init for retail data ingestion/retrieval.
- [api/retailco_data/function.json](api/retailco_data/function.json): Binding/config for retail data endpoints.

### api shared utilities
- [api/shared/__init__.py](api/shared/__init__.py): Package init for shared API utilities.
- [api/shared/content_store.py](api/shared/content_store.py): Implements content storage/retrieval helpers (file/blob-backed).
- [api/shared/http.py](api/shared/http.py): HTTP utilities for building responses and requests.

## config/
- [config/app-config.json](config/app-config.json): Frontend/app configuration (endpoints, flags, UI settings).

## css/
- [css/base.css](css/base.css): Global base styles and CSS resets.
- [css/components.css](css/components.css): Styles for UI components like buttons and cards.
- [css/layout.css](css/layout.css): Layout/grid styles for pages.
- [css/main.css](css/main.css): Main theme and site-wide CSS rules.
- [css/responsive.css](css/responsive.css): Responsive breakpoints and adjustments.
- [css/sac-portal.css](css/sac-portal.css): Portal-specific styling for SAP SAC pages.

## data/
- [data/retailco_distributor_master.csv](data/retailco_distributor_master.csv): Distributor master sample dataset for demos.
- [data/retailco_hr_headcount.csv](data/retailco_hr_headcount.csv): HR headcount sample CSV for analytics demos.
- [data/retailco_planning_seed.csv](data/retailco_planning_seed.csv): Seed planning dataset used in planning examples.
- [data/retailco_product_master.csv](data/retailco_product_master.csv): Product master CSV for RetailCo demos.
- [data/retailco_sales_analytic_us.csv](data/retailco_sales_analytic_us.csv): US sales analytic sample dataset.
- [data/retailco_sales_analytic.csv](data/retailco_sales_analytic.csv): Global sales analytics sample dataset.
- [data/retailco_validation.json](data/retailco_validation.json): Validation rules and metadata for RetailCo datasets.

### data/config subfolder
- [data/config/categories.json](data/config/categories.json): Category taxonomy used by UI and generators.
- [data/config/channels.json](data/config/channels.json): Channel definitions (online/retail/etc.) for datasets.
- [data/config/feature-flags.json](data/config/feature-flags.json): Default feature-flag settings used by the app.
- [data/config/regions.json](data/config/regions.json): Region metadata used across data and UI.

## content/
- [content/characters.json](content/characters.json): Character metadata for tutorials or story experiences.
- [content/glossary-by-day.json](content/glossary-by-day.json): Day-indexed glossary entries used in learning paths.
- [content/story-scenes.json](content/story-scenes.json): Structured scene data for interactive lessons.

## future_tasks/
- [future_tasks/PHASE_1_IMPLEMENTATION.md](future_tasks/PHASE_1_IMPLEMENTATION.md): Phase 1 implementation plan and checklist.
- [future_tasks/PHASE_1_SUMMARY.md](future_tasks/PHASE_1_SUMMARY.md): Summary of completed Phase 1 items.
- [future_tasks/PHASE_2_AND_3_DETAILED.md](future_tasks/PHASE_2_AND_3_DETAILED.md): Detailed plans and requirements for phases 2 and 3.
- [future_tasks/SCOPE.md](future_tasks/SCOPE.md): Project scope and objectives.

## js/
- [js/beginner-extras-v2.js](js/beginner-extras-v2.js): v2 enhancements and helpers for the beginner portal.
- [js/beginner-extras.js](js/beginner-extras.js): Original helper scripts for beginner flows.
- [js/data-beginner-v2.js](js/data-beginner-v2.js): v2 data handling scripts used in beginner tutorials.
- [js/data-beginner.js](js/data-beginner.js): Initial data-handling logic for beginner examples.
- [js/data-pbi.js](js/data-pbi.js): Integration/embedding helpers for Power BI visualizations.
- [js/geo-enrichment-guide.js](js/geo-enrichment-guide.js): Geo-enrichment UI and helper functions.
- [js/hands-on-puzzles-v2.js](js/hands-on-puzzles-v2.js): v2 interactive puzzle logic for hands-on exercises.
- [js/hands-on-puzzles.js](js/hands-on-puzzles.js): Original puzzle interaction code.
- [js/retailco-data-v2.js](js/retailco-data-v2.js): v2 RetailCo data loaders and visualization logic.
- [js/retailco-data.js](js/retailco-data.js): RetailCo data loading and presentation scripts.
- [js/sac-links-v2.js](js/sac-links-v2.js): v2 link/navigation helpers for the portal.
- [js/sac-links.js](js/sac-links.js): Navigation/link utilities for SAP SAC portal.
- [js/sac-portal-v2.js](js/sac-portal-v2.js): v2 portal bootstrap and orchestration logic.
- [js/sac-portal.js](js/sac-portal.js): Original portal bootstrapping and initialization.

### js/modules subfolder
- [js/modules/content-loader.js](js/modules/content-loader.js): Fetches, caches, and serves JSON content to the frontend.
- [js/modules/core/api-client.js](js/modules/core/api-client.js): Lightweight wrapper for calling backend API endpoints from the UI.
- [js/modules/core/feature-flags-loader.js](js/modules/core/feature-flags-loader.js): Loads and exposes feature-flag checks to UI modules.
- [js/modules/core/portal-boot.js](js/modules/core/portal-boot.js): Portal startup sequence that wires modules and initial state.
- [js/modules/features/v2-enhancements.js](js/modules/features/v2-enhancements.js): Feature module implementing v2 UX enhancements.

## scripts/
- [scripts/generate_retailco_data.py](scripts/generate_retailco_data.py): Generates synthetic RetailCo datasets for demos.
- [scripts/generate_retailco_us_data.py](scripts/generate_retailco_us_data.py): Generates US-specific RetailCo demo data.
- [scripts/generate.py](scripts/generate.py): Generic data generation CLI/utility wrapper.

### scripts/lib subfolder
- [scripts/lib/__init__.py](scripts/lib/__init__.py): Package init for data generation helpers.
- [scripts/lib/config_loader.py](scripts/lib/config_loader.py): Loads configuration for data generators.
- [scripts/lib/data_generator.py](scripts/lib/data_generator.py): Core logic producing synthetic rows/records.
- [scripts/lib/outputs.py](scripts/lib/outputs.py): Writes generated CSV/JSON outputs to disk.
- [scripts/lib/validators.py](scripts/lib/validators.py): Validation functions ensuring generated data meets schema rules.

## tests/
- [scripts/tests/test_data_generator.py](scripts/tests/test_data_generator.py): Unit test(s) validating data generation outputs.

---

If you want this exported as JSON or would like more precise single-file summaries (for example `api/shared/content_store.py`), tell me which files to open and I'll extract a short code-level description.
