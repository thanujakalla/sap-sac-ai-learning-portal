/**
 * AppApiClient - frontend data boundary.
 *
 * Defaults to static JSON files today. When Azure Functions are added, set
 * config/app-config.json environment to "api" and apiBaseUrl to the Functions
 * base URL, then map endpoint keys to API routes.
 */
if (!window.AppApiClient) {
  class AppApiClient {
    constructor(configPath = 'config/app-config.json') {
      this.configPath = configPath;
      this.config = null;
      this.initPromise = null;
      this.cache = {};
    }

    async init() {
      if (this.config) return this;
      if (this.initPromise) return this.initPromise;

      this.initPromise = (async () => {
        try {
          const response = await fetch(this.configPath, { cache: 'no-cache' });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          this.config = await response.json();
        } catch (error) {
          console.warn('[AppApiClient] Failed to load app config, using static defaults:', error.message);
          this.config = this._defaultConfig();
        }
        return this;
      })();
      return this.initPromise;
    }

    async getJson(endpointKey, fallbackPath = '') {
      await this.init();

      const url = this._resolveUrl(endpointKey, fallbackPath);
      if (this.cache[url]) return this.cache[url];

      const response = await fetch(url, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      this.cache[url] = data;
      return data;
    }

    async getFeatureFlags() {
      return this.getJson('featureFlags', 'data/config/feature-flags.json');
    }

    async getStoryScenes() {
      return this.getJson('storyScenes', 'data/content/story-scenes.json');
    }

    async getGlossary() {
      return this.getJson('glossary', 'data/content/glossary-by-day.json');
    }

    async getCharacters() {
      return this.getJson('characters', 'data/content/characters.json');
    }

    async getChatbotConfig() {
      await this.init();
      return this.config?.chatbot || { enabled: false, apiUrl: '' };
    }

    clearCache() {
      this.cache = {};
    }

    _resolveUrl(endpointKey, fallbackPath) {
      const endpoint = this.config?.endpoints?.[endpointKey] || fallbackPath;
      const useApi = this.config?.environment === 'api';
      const baseUrl = useApi ? this.config?.apiBaseUrl : this.config?.staticBaseUrl;

      if (!endpoint) {
        throw new Error(`Missing endpoint: ${endpointKey}`);
      }

      if (!baseUrl || endpoint.startsWith('http') || endpoint.startsWith('/')) {
        return endpoint;
      }

      return `${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    }

    _defaultConfig() {
      return {
        environment: 'static',
        apiBaseUrl: '',
        staticBaseUrl: '',
        endpoints: {
          featureFlags: 'data/config/feature-flags.json',
          storyScenes: 'data/content/story-scenes.json',
          glossary: 'data/content/glossary-by-day.json',
          characters: 'data/content/characters.json'
        },
        chatbot: {
          enabled: false,
          apiUrl: ''
        }
      };
    }
  }

  window.AppApiClient = AppApiClient;
}

window.appApiClient = window.appApiClient || new window.AppApiClient();
