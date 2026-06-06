/**
 * Portal Boot Script — Unified v1/v2 initialization
 * 
 * Loads feature flags, determines which version to activate, and initializes the portal.
 * This is the single entry point for the unified portal.
 * 
 * Execution order:
 * 1. Load feature flags
 * 2. Initialize core modules (always needed)
 * 3. Load version-specific modules based on flags
 * 4. Initialize portal
 */

(function () {
  "use strict";

  // Configuration
  const BOOT_CONFIG = {
    featureFlagsUrl: 'data/config/feature-flags.json',
    coreModules: [
      'js/modules/core/api-client.js',
      'js/modules/core/feature-flags-loader.js'
    ],
    contentModules: [
      'js/sac-links-v2.js',
      'js/data-beginner-v2.js',
      'js/beginner-extras-v2.js',
      'js/retailco-data-v2.js',
      'js/geo-enrichment-guide.js',
      'js/hands-on-puzzles-v2.js',
      'js/modules/content-loader.js'
    ],
    v2Modules: [
      'js/modules/features/v2-enhancements.js'
    ],
    mainPortalScript: 'js/sac-portal-v2.js'
  };

  let flags = null;

  /**
   * Step 1: Load core modules (always needed)
   */
  async function loadCoreModules() {
    console.log('[PortalBoot] Loading core modules...');

    for (const moduleUrl of BOOT_CONFIG.coreModules) {
      try {
        await loadScript(moduleUrl);
      } catch (error) {
        console.error(`[PortalBoot] Failed to load ${moduleUrl}:`, error);
        return false;
      }
    }

    console.log('[PortalBoot] Core modules loaded');
    return true;
  }

  /**
   * Step 2: Load and initialize feature flags
   */
  async function initializeFeatureFlags() {
    console.log('[PortalBoot] Loading feature flags...');
    
    if (!window.FeatureFlagsLoader) {
      console.error('[PortalBoot] FeatureFlagsLoader not yet loaded');
      return false;
    }

    try {
      await window.FeatureFlagsLoader.init(BOOT_CONFIG.featureFlagsUrl);
      flags = window.FeatureFlagsLoader;
      console.log('[PortalBoot] Feature flags initialized');
      return true;
    } catch (error) {
      console.warn('[PortalBoot] Failed to init feature flags:', error);
      // Continue with defaults
      return true;
    }
  }

  /**
   * Step 3: Load portal content/data modules
   */
  async function loadContentModules() {
    console.log('[PortalBoot] Loading content modules...');

    for (const moduleUrl of BOOT_CONFIG.contentModules) {
      try {
        await loadScript(moduleUrl);
      } catch (error) {
        console.error(`[PortalBoot] Failed to load ${moduleUrl}:`, error);
        return false;
      }
    }

    console.log('[PortalBoot] Content modules loaded');
    return true;
  }

  /**
   * Step 4: Load version-specific modules
   */
  async function loadVersionModules() {
    console.log('[PortalBoot] Checking version modules...');

    if (!flags) {
      console.warn('[PortalBoot] Flags not available, skipping version modules');
      return true;
    }

    if (flags.isEnabled('v2_ui_enabled')) {
      console.log('[PortalBoot] Loading v2 modules...');
      for (const moduleUrl of BOOT_CONFIG.v2Modules) {
        try {
          await loadScript(moduleUrl);
        } catch (error) {
          console.error(`[PortalBoot] Failed to load ${moduleUrl}:`, error);
        }
      }
    }

    return true;
  }

  /**
   * Step 5: Load main portal script
   */
  async function loadPortalScript() {
    if (window.SACPortalApp) {
      console.log('[PortalBoot] Portal already loaded, skipping');
      return true;
    }

    console.log('[PortalBoot] Loading main portal...');

    try {
      await loadScript(BOOT_CONFIG.mainPortalScript);
      console.log('[PortalBoot] Portal script loaded');
      return true;
    } catch (error) {
      console.error('[PortalBoot] Failed to load portal:', error);
      return false;
    }
  }

  /**
   * Step 6: Initialize v2 enhancements if enabled
   */
  async function initializeEnhancements() {
    if (flags?.isEnabled('v2_ui_enabled') && window.V2Enhancements) {
      console.log('[PortalBoot] Initializing v2 enhancements...');
      await window.V2Enhancements.init();
    }
  }

  /**
   * Utility: Load script dynamically
   */
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * Main boot sequence
   */
  async function boot() {
    console.log('[PortalBoot] Starting...');

    try {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
      }

      // Load core modules
      if (!await loadCoreModules()) {
        throw new Error('Failed to load core modules');
      }

      // Initialize feature flags
      if (!await initializeFeatureFlags()) {
        throw new Error('Failed to initialize feature flags');
      }

      // Load portal content globals and JSON loader
      if (!await loadContentModules()) {
        throw new Error('Failed to load content modules');
      }

      // Load version-specific modules
      if (!await loadVersionModules()) {
        throw new Error('Failed to load version modules');
      }

      // Load main portal
      if (!await loadPortalScript()) {
        throw new Error('Failed to load portal script');
      }

      // Initialize enhancements after portal is ready
      // (Give portal a chance to set up first)
      setTimeout(() => initializeEnhancements(), 100);

      console.log('[PortalBoot] Complete ✓');
    } catch (error) {
      console.error('[PortalBoot] Fatal error:', error);
      document.body.innerHTML = `<p style="color:red;margin:2rem">Portal initialization failed. Please refresh the page.</p>`;
    }
  }

  // Start boot sequence
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
