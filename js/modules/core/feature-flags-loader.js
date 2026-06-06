/**
 * Feature Flags Module — Runtime feature detection and conditional loading
 * 
 * Loads feature flags from JSON config and manages feature activation across the portal.
 * Supports A/B testing, gradual rollouts, and beta feature management.
 * 
 * Usage:
 *   const flags = await FeatureFlagsLoader.init('/data/config/feature-flags.json');
 *   if (flags.isEnabled('v2_ui_enabled')) { ... }
 */

if (!window.FeatureFlagsLoader) {
  class FeatureFlagsLoader {
    constructor() {
      this.flags = null;
      this.loaded = false;
    }

  /**
   * Initialize feature flags from JSON config file
   * @param {string} configPath - Path to feature-flags.json
   * @returns {Promise<FeatureFlagsLoader>}
   */
    async init(configPath = 'data/config/feature-flags.json') {
      try {
        let config;

        if (window.appApiClient) {
          config = await window.appApiClient.getFeatureFlags();
        } else {
          const response = await fetch(configPath);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          config = await response.json();
        }

        this.flags = config.features;
        this.rollout = config.rollout;
        this.debug = config.debug || false;
      } catch (error) {
        console.warn('[FeatureFlags] Failed to load config, using defaults:', error.message);
        this.flags = this._getDefaultFlags();
      }

      this.loaded = true;
      if (this.debug) {
        console.log('[FeatureFlags] Loaded:', this.flags);
      }
      return this;
    }

  /**
   * Check if a feature is enabled
   * @param {string} featureName - Feature key
   * @param {number} userId - Optional user ID for A/B testing (default: random)
   * @returns {boolean}
   */
    isEnabled(featureName, userId = null) {
      if (!this.loaded) {
        console.warn('[FeatureFlags] Not yet initialized');
        return false;
      }

      // Check if feature exists in configuration
      if (!(featureName in this.flags)) {
        if (this.debug) {
          console.warn(`[FeatureFlags] Unknown feature: ${featureName}`);
        }
        return false;
      }

      const enabled = this.flags[featureName];

      // If feature is simply boolean
      if (typeof enabled === 'boolean') {
        return enabled;
      }

      // Check rollout percentage
      const rolloutKey = featureName.replace('_enabled', '');
      const rolloutPct = this.rollout?.[`${rolloutKey}_percentage`] ?? 0;

      if (rolloutPct > 0 && rolloutPct < 100) {
        const seed = userId || Math.floor(Math.random() * 100);
        return (seed % 100) < rolloutPct;
      }

      return enabled;
    }

  /**
   * Get all active features
   * @returns {object}
   */
    getActiveFeatures() {
      if (!this.loaded) return {};

      const active = {};
      Object.keys(this.flags).forEach(key => {
        if (this.isEnabled(key)) {
          active[key] = true;
        }
      });
      return active;
    }

  /**
   * Force enable/disable a feature (development only)
   * @param {string} featureName
   * @param {boolean} enabled
   */
    setOverride(featureName, enabled) {
      if (!this.flags) this.flags = {};
      this.flags[featureName] = enabled;
      if (this.debug) {
        console.log(`[FeatureFlags] Override: ${featureName} = ${enabled}`);
      }
    }

  /**
   * Default flags (fallback if config load fails)
   * @private
   */
    _getDefaultFlags() {
      return {
        v2_ui_enabled: true,
        enhanced_navigation: true,
        geo_enrichment_guide: false,
        advanced_analytics: false,
        ai_assistant_beta: false,
        dark_mode: false,
        accessibility_enhanced: true
      };
    }
  }

  // Export as singleton
  window.FeatureFlagsLoader = new FeatureFlagsLoader();
}
