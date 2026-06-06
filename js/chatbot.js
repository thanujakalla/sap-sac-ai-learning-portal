/**
 * SAP SAC AI Tutor — Chat Widget
 * Drop-in · no build step · no dependencies
 *
 * Usage: Add to any portal page —
 *   <link rel="stylesheet" href="css/chatbot.css">
 *   <script src="js/chatbot.js" defer></script>
 *
 * Config: set window.CHATBOT_CONFIG before this script loads, e.g.:
 *   <script>
 *     window.CHATBOT_CONFIG = {
 *       apiUrl: 'https://your-function-app.azurewebsites.net/api/chat',
 *       apiKey: '',          // leave empty if APIM handles auth
 *       maxHistory: 8,       // turns to keep (user+ai pairs)
 *       userName: 'Learner'  // shown in user avatar
 *     };
 *   </script>
 */

(function () {
  'use strict';

  /* ── Config ── */
  const CFG = Object.assign({
    apiUrl:     '/api/chat',
    apiKey:     '',
    maxHistory: 8,
    userName:   'You'
  }, window.CHATBOT_CONFIG || {});

  /* ── State ── */
  const state = {
    open:    false,
    loading: false,
    available: true,
    history: [],   // [{role:'user'|'ai', text:'...'}]
    context: {}    // populated from portal page
  };

  /* ── Context reader ─────────────────────────────────
     Reads lesson context from the portal page DOM / localStorage.
     Works with both the unified portal and any future portal.
  ──────────────────────────────────────────────────── */
  function readContext() {
    const ctx = {};

    /* Current active day (unified portal stores as sac_current_day) */
    try {
      const day = localStorage.getItem('sac_current_day')
               || localStorage.getItem('sacCurrentDay');
      if (day) ctx.day = parseInt(day, 10);
    } catch (_) {}

    /* Active lesson title from sidebar */
    try {
      const activeDay = document.querySelector('.day-btn.active, .day-item.active');
      if (activeDay) ctx.lessonTitle = activeDay.textContent?.trim();
    } catch (_) {}

    /* Active tab / view */
    try {
      const activeView = document.querySelector('.nav-btn.active');
      if (activeView) ctx.view = activeView.dataset.view || activeView.textContent?.trim();
    } catch (_) {}

    /* Portal version (v1 / v2) from body data attr or brandSub */
    try {
      ctx.portalVersion = document.body.dataset.portalVersion
        || (document.getElementById('brandSub')?.textContent?.includes('v2') ? 'v2' : 'v1');
    } catch (_) {}

    state.context = ctx;
    return ctx;
  }

  /* ── Context pill label ── */
  function contextLabel(ctx) {
    if (ctx.day && ctx.lessonTitle) return `Day ${ctx.day} · ${ctx.lessonTitle}`;
    if (ctx.day) return `Day ${ctx.day}`;
    if (ctx.lessonTitle) return ctx.lessonTitle;
    return null;
  }

  /* ── Utility: escape HTML special chars ── */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Utility: simple markdown → html (no library needed) ── */
  function mdToHtml(text) {
    const lines = String(text).split('\n');
    let html = '';
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');

      // Heading lines (# ## ###) → section heading
      const headingMatch = line.match(/^#{1,3} (.+)$/);
      if (headingMatch) {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<span class="cb-section-heading">${headingMatch[1]}</span>`;
        continue;
      }

      // Standalone bold line (e.g. **Geo enrichment**) → section heading
      const boldHeadingMatch = line.match(/^<strong>(.+?)<\/strong>:?\s*$/);
      if (boldHeadingMatch) {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<span class="cb-section-heading">${boldHeadingMatch[1]}</span>`;
        continue;
      }

      // Bullet list items
      const bulletMatch = line.match(/^[-*•] (.+)$/);
      if (bulletMatch) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += `<li>${bulletMatch[1]}</li>`;
        continue;
      }

      // Close list on non-bullet
      if (inList) { html += '</ul>'; inList = false; }

      // Empty line → paragraph break
      if (line.trim() === '') {
        if (i < lines.length - 1) html += '';
        continue;
      }

      html += `<p>${line}</p>`;
    }

    if (inList) html += '</ul>';
    return html;
  }

  /* ── Time formatter ── */
  function now() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  /* ── Scroll to bottom ── */
  function scrollBottom() {
    const m = document.getElementById('cb-messages');
    if (m) m.scrollTop = m.scrollHeight;
  }

  /* ── DOM: build full widget HTML ── */
  function buildWidget() {
    const initials = CFG.userName.substring(0, 2).toUpperCase();

    const html = `
    <!-- FAB button -->
    <button id="cb-fab" aria-label="Open SAC AI Tutor" aria-expanded="false" aria-controls="cb-panel">
      <svg class="cb-icon-open" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <circle cx="8.5" cy="11" r="1" fill="white"/><circle cx="12" cy="11" r="1" fill="white"/><circle cx="15.5" cy="11" r="1" fill="white"/>
      </svg>
      <svg class="cb-icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6 6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span id="cb-badge" aria-hidden="true"></span>
    </button>

    <!-- Panel -->
    <div id="cb-panel" role="dialog" aria-label="SAC AI Tutor" aria-modal="true" hidden>

      <!-- Header -->
      <div id="cb-header">
        <div class="cb-avatar" aria-hidden="true">🎓</div>
        <div class="cb-header-info">
          <div class="cb-header-name">SAC AI Tutor</div>
          <div class="cb-header-status">
            <span class="cb-status-dot" aria-hidden="true"></span>
            <span id="cb-status-text">Ask me anything about SAC</span>
          </div>
        </div>
        <div class="cb-header-actions">
          <button class="cb-hbtn" id="cb-clear" title="Clear chat" aria-label="Clear chat">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>
            </svg>
          </button>
          <button class="cb-hbtn" id="cb-close-btn" title="Close" aria-label="Close chat">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Context pill (shown when on a lesson) -->
      <div id="cb-context-pill" aria-live="polite"></div>

      <!-- Messages -->
      <div id="cb-messages" role="log" aria-label="Chat messages" aria-live="polite">
        <!-- Welcome state injected by JS -->
        <div id="cb-welcome">
          <div class="cb-welcome-icon" aria-hidden="true">🎓</div>
          <h3>Your SAC tutor is ready</h3>
          <p>Ask anything about SAP Analytics Cloud — stories, charts, models, geo maps, and more.</p>
          <div class="cb-welcome-chips">
            <button class="cb-welcome-chip" data-q="How do I create my first story in SAC?">
              <span class="wc-icon" aria-hidden="true">📊</span>How do I create my first story in SAC?
            </button>
            <button class="cb-welcome-chip" data-q="What is the difference between a story and an analytic application?">
              <span class="wc-icon" aria-hidden="true">🤔</span>Story vs analytic application — what's the difference?
            </button>
            <button class="cb-welcome-chip" data-q="How does the RetailCo case study use planning features?">
              <span class="wc-icon" aria-hidden="true">🏪</span>How does RetailCo use SAC planning features?
            </button>
            <button class="cb-welcome-chip" data-q="Explain geo enrichment and choropleth maps in SAC">
              <span class="wc-icon" aria-hidden="true">🗺️</span>Explain geo enrichment and choropleth maps
            </button>
          </div>
        </div>
      </div>

      <!-- Input footer -->
      <div id="cb-footer">
        <div class="cb-input-wrap">
          <textarea
            id="cb-input"
            placeholder="Ask about SAC stories, models, charts…"
            rows="1"
            aria-label="Type your question"
            autocomplete="off"
            spellcheck="true"
          ></textarea>
          <button id="cb-send" aria-label="Send message" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="cb-powered" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          Powered by Azure AI · SAP documentation
        </div>
      </div>

    </div>`;

    const container = document.createElement('div');
    container.id = 'cb-root';
    container.innerHTML = html;
    document.body.appendChild(container);
  }

  /* ── Render: append a message bubble ── */
  function appendMessage(role, text, citations) {
    const messages = document.getElementById('cb-messages');

    /* Remove welcome state on first message */
    const welcome = document.getElementById('cb-welcome');
    if (welcome) welcome.remove();

    const row = document.createElement('div');
    row.className = `cb-row ${role}`;

    const avatarContent = role === 'user'
      ? `<span aria-hidden="true">👤</span>`
      : `<span aria-hidden="true">🎓</span>`;

    let citationsHtml = '';
    if (citations && citations.length) {
      citationsHtml = `<div class="cb-citations" role="list" aria-label="Sources">
        ${citations.map(c => `
          <span class="cb-cite" role="listitem" title="${escapeHtml(c.title || '')}">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
              <polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2"/>
            </svg>
            ${escapeHtml(c.title || 'Source')}${c.page ? ` · p.${escapeHtml(c.page)}` : ''}
          </span>`).join('')}
      </div>`;
    }

    row.innerHTML = `
      <div class="cb-msg-avatar" aria-hidden="true">${avatarContent}</div>
      <div>
        <div class="cb-bubble">${mdToHtml(text)}${citationsHtml}</div>
        <div class="cb-ts">${now()}</div>
      </div>`;

    messages.appendChild(row);
    scrollBottom();
    return row;
  }

  /* ── Render: streaming token append ── */
  function appendToken(bubbleEl, token) {
    /* find the bubble text node (before citations) */
    const textNode = bubbleEl.querySelector('.cb-bubble');
    if (textNode) {
      /* strip trailing loading indicator if present */
      textNode.innerHTML = mdToHtml(
        textNode.dataset.raw ? textNode.dataset.raw + token : token
      );
      textNode.dataset.raw = (textNode.dataset.raw || '') + token;
    }
    scrollBottom();
  }

  /* ── Render: typing indicator ── */
  function showTyping() {
    const messages = document.getElementById('cb-messages');
    const row = document.createElement('div');
    row.className = 'cb-typing-row';
    row.id = 'cb-typing';
    row.innerHTML = `
      <div class="cb-msg-avatar" aria-hidden="true"><span>🎓</span></div>
      <div class="cb-typing-bubble" role="status" aria-label="AI is typing">
        <span class="cb-dot"></span><span class="cb-dot"></span><span class="cb-dot"></span>
      </div>`;
    messages.appendChild(row);
    scrollBottom();
  }
  function hideTyping() {
    document.getElementById('cb-typing')?.remove();
  }

  /* ── Update context pill ── */
  function updateContextPill() {
    const ctx = readContext();
    const pill = document.getElementById('cb-context-pill');
    if (!pill) return;
    const label = contextLabel(ctx);
    if (label) {
      pill.textContent = `📍 ${label}`;
      pill.classList.add('show');
    } else {
      pill.classList.remove('show');
    }
  }

  /* ── API call ── */
  async function callApi(question) {
    if (!state.available) {
      throw new Error('AI service URL is not configured');
    }
    const ctx = readContext();

    /* Build message history for API */
    const historyMessages = state.history.slice(-CFG.maxHistory).map(h => ({
      role: h.role === 'user' ? 'user' : 'assistant',
      content: h.text
    }));

    const payload = {
      question,
      history: historyMessages,
      context: ctx,
    };

    const headers = { 'Content-Type': 'application/json' };
    if (CFG.apiKey) headers['Ocp-Apim-Subscription-Key'] = CFG.apiKey;

    const res = await fetch(CFG.apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`API ${res.status}: ${errText || res.statusText}`);
    }

    const data = await res.json();

    return {
      answer:    data.answer    || data.text   || '(No response)',
      citations: data.citations || data.sources || []
    };
  }

  /* ── Send message flow ── */
  async function sendMessage(text) {
    text = (text || '').trim();
    if (!text || state.loading) return;

    /* Update UI state */
    state.loading = true;
    setInputEnabled(false);

    /* Show user bubble */
    appendMessage('user', text);
    state.history.push({ role: 'user', text });

    /* Clear input */
    const input = document.getElementById('cb-input');
    if (input) { input.value = ''; autoResize(input); }

    /* Show typing */
    showTyping();

    try {
      const { answer, citations } = await callApi(text);
      hideTyping();
      appendMessage('ai', answer, citations);
      state.history.push({ role: 'ai', text: answer });
    } catch (err) {
      hideTyping();
      /* Show error bubble */
      const messages = document.getElementById('cb-messages');
      const errRow = document.createElement('div');
      errRow.className = 'cb-row ai';
      errRow.innerHTML = `
        <div class="cb-msg-avatar" aria-hidden="true"><span>🎓</span></div>
        <div>
          <div class="cb-error-bubble" role="alert">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Couldn't reach the AI service. Please try again in a moment.
          </div>
          <div class="cb-ts">${now()}</div>
        </div>`;
      messages.appendChild(errRow);
      scrollBottom();
      console.error('[ChatBot]', err);
    } finally {
      state.loading = false;
      setInputEnabled(true);
      document.getElementById('cb-input')?.focus();
    }
  }

  /* ── Input helpers ── */
  function setInputEnabled(enabled) {
    const input  = document.getElementById('cb-input');
    const btn    = document.getElementById('cb-send');
    const canUseInput = enabled && state.available;
    if (input) input.disabled = !canUseInput;
    if (btn) btn.disabled = !canUseInput || !input?.value.trim();
  }

  function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }

  /* ── Toggle open/close ── */
  function openPanel() {
    state.open = true;
    const panel = document.getElementById('cb-panel');
    if (panel) {
      panel.hidden = false;
      panel.classList.add('open');
    }
    document.getElementById('cb-fab')?.classList.add('open');
    document.getElementById('cb-fab')?.setAttribute('aria-expanded', 'true');
    document.getElementById('cb-badge')?.classList.remove('show');
    document.body.classList.add('cb-dialog-open');
    updateContextPill();
    setTimeout(() => {
      const target = state.available
        ? document.getElementById('cb-input')
        : document.getElementById('cb-close-btn');
      target?.focus();
    }, 50);
  }

  function closePanel() {
    state.open = false;
    const panel = document.getElementById('cb-panel');
    if (panel) {
      panel.classList.remove('open');
      panel.hidden = true;
    }
    document.getElementById('cb-fab')?.classList.remove('open');
    document.getElementById('cb-fab')?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('cb-dialog-open');
    document.getElementById('cb-fab')?.focus();
  }

  /* ── Clear chat ── */
  function clearChat() {
    state.history = [];
    const messages = document.getElementById('cb-messages');
    if (!messages) return;
    messages.innerHTML = '';

    /* Re-inject welcome state */
    const welcome = document.createElement('div');
    welcome.id = 'cb-welcome';
    welcome.innerHTML = `
      <div class="cb-welcome-icon" aria-hidden="true">🎓</div>
      <h3>Your SAC tutor is ready</h3>
      <p>Ask anything about SAP Analytics Cloud — stories, charts, models, geo maps, and more.</p>
      <div class="cb-welcome-chips">
        <button class="cb-welcome-chip" data-q="How do I create my first story in SAC?">
          <span class="wc-icon" aria-hidden="true">📊</span>How do I create my first story in SAC?
        </button>
        <button class="cb-welcome-chip" data-q="What is the difference between a story and an analytic application?">
          <span class="wc-icon" aria-hidden="true">🤔</span>Story vs analytic application — what's the difference?
        </button>
        <button class="cb-welcome-chip" data-q="How does the RetailCo case study use planning features?">
          <span class="wc-icon" aria-hidden="true">🏪</span>How does RetailCo use SAC planning features?
        </button>
        <button class="cb-welcome-chip" data-q="Explain geo enrichment and choropleth maps in SAC">
          <span class="wc-icon" aria-hidden="true">🗺️</span>Explain geo enrichment and choropleth maps
        </button>
      </div>`;
    messages.appendChild(welcome);
    wireWelcomeChips();
  }

  /* ── Wire welcome chip clicks ── */
  function wireWelcomeChips() {
    document.querySelectorAll('.cb-welcome-chip').forEach(btn =>
      btn.addEventListener('click', () => sendMessage(btn.dataset.q))
    );
  }

  /* ── Key: Escape closes, Shift+Enter newline ── */
  function handleKeydown(e) {
    if (e.key === 'Escape' && state.open) { closePanel(); return; }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const text = document.getElementById('cb-input')?.value.trim();
      if (text) sendMessage(text);
    }
  }

  function trapPanelFocus(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closePanel();
      return;
    }
    if (e.key !== 'Tab') return;

    const panel = document.getElementById('cb-panel');
    const focusable = panel
      ? [...panel.querySelectorAll('button:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')]
      : [];
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function configureAvailability() {
    const invalidUrl = !CFG.apiUrl || CFG.apiUrl.includes('YOUR_');
    state.available = !invalidUrl;
    if (state.available) return;

    const status = document.getElementById('cb-status-text');
    const input = document.getElementById('cb-input');
    const welcomeTitle = document.querySelector('#cb-welcome h3');
    const welcomeText = document.querySelector('#cb-welcome p');
    if (status) status.textContent = 'AI service URL not configured';
    if (input) input.placeholder = 'Configure chatbot.apiUrl in app-config.json';
    if (welcomeTitle) welcomeTitle.textContent = 'Connect the SAC AI Tutor';
    if (welcomeText) {
      welcomeText.textContent = 'Add your deployed Azure Function URL to chatbot.apiUrl in config/app-config.json.';
    }
    document.querySelectorAll('.cb-welcome-chip').forEach((button) => {
      button.disabled = true;
    });
    setInputEnabled(false);
  }

  /* ── Init ── */
  function init() {
    /* Inject stylesheet if not already loaded */
    if (!document.querySelector('link[href*="chatbot.css"]')) {
      const link = document.createElement('link');
      link.rel  = 'stylesheet';
      link.href = 'css/chatbot.css?v=20260607';
      document.head.appendChild(link);
    }

    buildWidget();
    configureAvailability();

    /* Bind FAB */
    document.getElementById('cb-fab')?.addEventListener('click', () => {
      state.open ? closePanel() : openPanel();
    });

    /* Bind close button */
    document.getElementById('cb-close-btn')?.addEventListener('click', closePanel);

    /* Bind clear button */
    document.getElementById('cb-clear')?.addEventListener('click', clearChat);
    document.getElementById('cb-panel')?.addEventListener('keydown', trapPanelFocus);

    /* Bind input */
    const input = document.getElementById('cb-input');
    if (input) {
      input.addEventListener('input', () => {
        autoResize(input);
        const btn = document.getElementById('cb-send');
        if (btn) btn.disabled = !input.value.trim() || state.loading;
      });
      input.addEventListener('keydown', handleKeydown);
    }

    /* Bind send button */
    document.getElementById('cb-send')?.addEventListener('click', () => {
      const text = document.getElementById('cb-input')?.value.trim();
      if (text) sendMessage(text);
    });

    /* Bind welcome chips */
    wireWelcomeChips();

    /* Watch for portal navigation changes to update context pill */
    document.querySelectorAll('.nav-btn, .day-btn, .day-item').forEach(el =>
      el.addEventListener('click', () => {
        if (state.open) setTimeout(updateContextPill, 100);
      })
    );

    /* Show badge after 3s on first visit to hint the widget exists */
    const seen = localStorage.getItem('cb_seen');
    if (!seen) {
      setTimeout(() => {
        if (!state.open) document.getElementById('cb-badge')?.classList.add('show');
      }, 3000);
      localStorage.setItem('cb_seen', '1');
    }
  }

  /* ── Boot ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();