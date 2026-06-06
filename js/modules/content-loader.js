/**
 * ContentLoader — Load portal content from JSON files
 * Fallback to hardcoded data if JSON unavailable (backward compatible)
 */
if (!window.ContentLoader) {
  class ContentLoader {
    constructor() {
      this.cache = {};
      this.contentBasePath = 'data/content';
      this.fallback = window.SACPortalExtras || {};
    }

  /**
   * Load story scenes from JSON or fallback to hardcoded
   */
    async loadStoryScenes() {
      if (this.cache.storyScenes) return this.cache.storyScenes;

      try {
        const data = window.appApiClient
          ? await window.appApiClient.getStoryScenes()
          : await this._fetchJson(`${this.contentBasePath}/story-scenes.json`);
        this.cache.storyScenes = data.story_scenes;
        console.log('[ContentLoader] Loaded story scenes from JSON');
        return this.cache.storyScenes;
      } catch (error) {
        console.warn('[ContentLoader] Failed to load story-scenes.json, using fallback:', error.message);
        return this.fallback.STORY_SCENES || {};
      }
    }

  /**
   * Load glossary from JSON or fallback
   */
    async loadGlossary() {
      if (this.cache.glossary) return this.cache.glossary;

      try {
        const data = window.appApiClient
          ? await window.appApiClient.getGlossary()
          : await this._fetchJson(`${this.contentBasePath}/glossary-by-day.json`);
        this.cache.glossary = data.glossary;
        console.log('[ContentLoader] Loaded glossary from JSON');
        return this.cache.glossary;
      } catch (error) {
        console.warn('[ContentLoader] Failed to load glossary-by-day.json, using fallback:', error.message);
        return this.fallback.GLOSSARY || {};
      }
    }

  /**
   * Get glossary terms for a specific day
   */
    async getGlossaryForDay(day) {
      const glossary = await this.loadGlossary();
      return glossary[day] || [];
    }

  /**
   * Load characters from JSON or fallback
   */
    async loadCharacters() {
      if (this.cache.characters) return this.cache.characters;

      try {
        const data = window.appApiClient
          ? await window.appApiClient.getCharacters()
          : await this._fetchJson(`${this.contentBasePath}/characters.json`);
        this.cache.characters = data.characters;
        console.log('[ContentLoader] Loaded characters from JSON');
        return this.cache.characters;
      } catch (error) {
        console.warn('[ContentLoader] Failed to load characters.json, using fallback:', error.message);
        return this.fallback.CHARACTERS || {};
      }
    }

  /**
   * Load all content at once
   */
    async loadAll() {
      return Promise.all([
        this.loadStoryScenes(),
        this.loadGlossary(),
        this.loadCharacters()
      ]);
    }

  /**
   * Get a specific scene by day number
   */
    async getScene(dayNumber) {
      const scenes = await this.loadStoryScenes();
      return scenes[dayNumber] || null;
    }

  /**
   * Preload all content (call on page load for better UX)
   */
    async preload() {
      try {
        await this.loadAll();
        console.log('[ContentLoader] Preload complete');
        return true;
      } catch (error) {
        console.error('[ContentLoader] Preload failed:', error);
        return false;
      }
    }

  /**
   * Clear cache (for testing)
   */
    clearCache() {
      this.cache = {};
      console.log('[ContentLoader] Cache cleared');
    }

    async _fetchJson(url) {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    }
  }

  // Export for use in other modules
  window.ContentLoader = ContentLoader;
}

// Auto-initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.contentLoader = new window.ContentLoader();
    window.contentLoader.preload().catch(err => console.error('[ContentLoader] Init error:', err));
  });
} else {
  window.contentLoader = new window.ContentLoader();
  window.contentLoader.preload().catch(err => console.error('[ContentLoader] Init error:', err));
}
