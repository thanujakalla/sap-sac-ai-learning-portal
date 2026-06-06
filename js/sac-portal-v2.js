/**
 * SAP SAC Learning Portal — UI Engine (shared by all tracks)
 */
(function () {
  "use strict";

  const portal = window.SACPortal;
  if (!portal) return;

  const {
    CONFIG, DAYS, SUBSCRIPTIONS, RESOURCE_LIBRARY,
    PERFORMANCE_GUIDE, CASE_STUDY, PHASES,
    PBI_COMPARISON, showCompareTab
  } = portal;

  const EXTRAS = window.SACPortalExtras || {};

  const LINKS = window.SAC_LINKS || {};

  const STATE = { done: new Set(), tasksDone: {}, handsOnDone: {}, notes: {}, globalNotes: "", activeDay: 1 };

  function saveState() {
    try {
      localStorage.setItem(CONFIG.storageKey, JSON.stringify({
        done: [...STATE.done],
        tasksDone: STATE.tasksDone,
        handsOnDone: STATE.handsOnDone,
        notes: STATE.notes,
        globalNotes: STATE.globalNotes,
        activeDay: STATE.activeDay
      }));
    } catch (_) {}
  }

  function loadState() {
    try {
      const s = JSON.parse(localStorage.getItem(CONFIG.storageKey) || "{}");
      if (s.done) s.done.forEach((d) => STATE.done.add(d));
      if (s.tasksDone) STATE.tasksDone = s.tasksDone;
      if (s.handsOnDone) STATE.handsOnDone = s.handsOnDone;
      if (s.notes) STATE.notes = s.notes;
      if (s.globalNotes) STATE.globalNotes = s.globalNotes;
      if (s.activeDay) STATE.activeDay = s.activeDay;
    } catch (_) {}
  }

  function countTasksDone() {
    return Object.values(STATE.tasksDone).filter(Boolean).length;
  }

  function countHandsOnDoneTotal() {
    return Object.values(STATE.handsOnDone).filter(Boolean).length;
  }

  function countAllItemsTotal() {
    return totalTasks() + DAYS.reduce((n, d) => n + countHandsOnSteps(d), 0);
  }

  function totalTasks() {
    return DAYS.reduce((n, d) => n + d.tasks.length, 0);
  }

  function updateProgress() {
    const daysDone = STATE.done.size;
    const pct = Math.round((daysDone / CONFIG.totalDays) * 100);
    const tasksDone = countTasksDone();
    const itemsDone = tasksDone + countHandsOnDoneTotal();
    const itemsTotal = countAllItemsTotal();
    setText("mDone", daysDone);
    setText("mPct", pct + "%");
    setText("mTasks", tasksDone + "/" + totalTasks());
    setText("progLabel", daysDone + " / " + CONFIG.totalDays + " days");
    setText("headerProgress", daysDone + " / " + CONFIG.totalDays + " days");
    setText("heroProgressNum", pct + "%");
    setText("heroProgressDetail", daysDone + " days · " + itemsDone + "/" + itemsTotal + " items done");
    const bar = document.getElementById("mainProgress");
    const heroBar = document.getElementById("heroProgressBar");
    if (bar) bar.style.width = pct + "%";
    if (heroBar) heroBar.style.width = pct + "%";
    updateContinueButton();
  }

  function getContinueDay() {
    for (const d of DAYS) {
      if (!STATE.done.has(d.day)) return d.day;
    }
    return DAYS[DAYS.length - 1].day;
  }

  function getActiveDay() {
    const day = STATE.activeDay || getContinueDay();
    return DAYS.some((d) => d.day === day) ? day : 1;
  }

  function isDayPaused(dayNum) {
    const limit = CONFIG.contentUpdatedThroughDay;
    return typeof limit === "number" && dayNum > limit;
  }

  function updateContinueButton() {
    const btn = document.getElementById("continueBtn");
    if (!btn) return;
    const day = getContinueDay();
    const dayData = DAYS.find((d) => d.day === day);
    const label = dayData ? `Continue Day ${day} — ${dayData.title.split("—")[0].trim()}` : "Continue learning";
    btn.textContent = label + " →";
    btn.dataset.day = String(day);
  }

  function updateDaySidebarActive(day) {
    document.querySelectorAll(".day-nav-btn").forEach((btn) => {
      const btnDay = parseInt(btn.dataset.day, 10);
      const isActive = btnDay === day;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-current", isActive ? "true" : "false");
    });
    const picker = document.getElementById("mobileDayPicker");
    if (picker) picker.value = String(day);
  }

  function getScrollOffsets(container) {
    const stickyTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height"), 10) || 64;
    const pin = container?.querySelector(".day-workspace-sticky") || document.querySelector(".day-workspace-sticky");
    const pinHeight = pin ? pin.offsetHeight : 0;
    return { stickyTop, pinHeight, total: stickyTop + pinHeight + 12 };
  }

  function scrollToDayContent(behavior) {
    const sticky = document.querySelector(".day-workspace-sticky");
    const target = sticky || document.querySelector(".day-workspace-header");
    if (!target) return;
    const { stickyTop } = getScrollOffsets();
    const top = target.getBoundingClientRect().top + window.scrollY - stickyTop;
    window.scrollTo({ top: Math.max(0, top), behavior: behavior || "smooth" });
  }

  function setActiveDay(day, options) {
    const opts = options || {};
    STATE.activeDay = day;
    saveState();
    updateDaySidebarActive(day);
    renderDayWorkspace(day);
    if (opts.scroll !== false) {
      requestAnimationFrame(() => scrollToDayContent(opts.scrollBehavior));
    }
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#day-" + day);
    }
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function tagClass(tag) {
    return { free: "lt-free", doc: "lt-doc", paid: "lt-paid", video: "lt-video" }[tag] || "lt-doc";
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function getStoryScene(d) {
    return d.storyScene || EXTRAS.STORY_SCENES?.[d.day] || "";
  }

  function getGlossary(d) {
    return d.glossary || EXTRAS.GLOSSARY?.[d.day] || [];
  }

  function getStoryRecap(d) {
    return d.storyRecap || EXTRAS.STORY_RECAPS?.[d.day] || "";
  }

  function getHandsOnSteps(d) {
    return d.handsOnSteps || EXTRAS.HANDS_ON_STEPS?.[d.day] || [];
  }

  function getDataSource(id) {
    return EXTRAS.DATA_SOURCES?.[id] || null;
  }

  function getDayDataSources(d) {
    const ids = EXTRAS.DAY_DATA_FILES?.[d.day] || [];
    return ids.map((id) => getDataSource(id)).filter(Boolean);
  }

  function renderDataSourceCard(source, compact) {
    if (!source) return "";
    const cols = source.columns || [];
    const val = source.validation || {};
    return `
      <article class="data-source-card${compact ? " data-source-card-compact" : ""}">
        <div class="data-source-header">
          <div>
            <h4 class="data-source-name">${escapeHtml(source.name)}</h4>
            <span class="data-source-meta">${escapeHtml(source.format || "CSV")} · Day ${source.firstUsedDay}+ · → ${escapeHtml(source.sacModel || "SAC model")}</span>
          </div>
          <a class="data-source-dl" href="${source.file}" download="${escapeHtml(source.downloadName || source.file.split("/").pop())}">Download ↓</a>
        </div>
        <p class="data-source-story">${source.story}</p>
        <dl class="data-source-facts">
          <dt>Grain</dt><dd>${source.grain}</dd>
          <dt>Period</dt><dd>${source.period || "—"}</dd>
          <dt>Connection</dt><dd>${source.connectionType || "Import"}</dd>
        </dl>
        ${val.totalRevenue || val.rowCount ? `
        <div class="data-source-validation">
          <strong>Nandan's validation puzzle</strong>
          <ul>
            ${val.rowCount ? `<li>Rows: ${val.rowCount}</li>` : ""}
            ${val.totalRevenue ? `<li>Total Revenue: ${val.totalRevenue}</li>` : ""}
            ${val.southRegionTotal ? `<li>South region: ${val.southRegionTotal}</li>` : ""}
            ${val.southAprilBeverages ? `<li>Spot-check: ${val.southAprilBeverages}</li>` : ""}
            ${val.diwaliSpike ? `<li>Seasonality: ${val.diwaliSpike}</li>` : ""}
            ${val.rule ? `<li>${val.rule}</li>` : ""}
          </ul>
        </div>` : ""}
        ${source.modelTip && !compact ? `<p class="data-source-model-tip"><strong>Model tip:</strong> ${source.modelTip}</p>` : ""}
        ${!compact && cols.length ? `
        <details class="data-source-columns" open>
          <summary>Column mapping cheat sheet (SAC import options)</summary>
          <table class="data-map-table">
            <thead><tr><th>CSV column</th><th>Maps to in SAC</th><th>Good for charts</th><th>Avoid</th></tr></thead>
            <tbody>
              ${cols.map((c) => `<tr>
                <td><code>${escapeHtml(c.name)}</code></td>
                <td>${c.mapsTo}</td>
                <td>${c.chartUse || "—"}</td>
                <td>${c.doNot ? escapeHtml(c.doNot) : "—"}</td>
              </tr>`).join("")}
            </tbody>
          </table>
        </details>` : ""}
      </article>`;
  }

  function renderDataSourceContext(d) {
    const sources = getDayDataSources(d);
    if (!sources.length) return "";
    return `
      <div class="data-source-context">
        <div class="data-source-context-label">Data files for today</div>
        ${sources.map((s) => renderDataSourceCard(s, true)).join("")}
      </div>`;
  }

  function renderDataSourcesLibrary() {
    const container = document.getElementById("dataSourcesLibrary");
    if (!container || !EXTRAS.DATA_SOURCES) return;
    const sources = Object.values(EXTRAS.DATA_SOURCES);
    container.innerHTML = `
      <p class="ref-content-intro">Download these CSVs and upload them to SAC <strong>Files</strong> on the days listed. Each file maps to a named SAC model in the hands-on steps.</p>
      <div class="data-source-grid">
        ${sources.map((s) => renderDataSourceCard(s, false)).join("")}
      </div>
      <div class="reference-callout reference-callout--tip">
        <strong>Production note (Day 12+)</strong>
        <p>In real RetailCo, sales would flow S/4HANA → Datasphere → SAC live. These CSVs are your <em>training wheels</em> — same column logic, different connection type.</p>
      </div>`;
  }

  function renderChartStoryGuide() {
    const container = document.getElementById("chartStoryGuide");
    const guide = EXTRAS.CHART_STORY_GUIDE;
    if (!container || !guide) return;

    const modelSteps = (guide.modelFirst || []).map((s) =>
      `<li><strong>Step ${s.step} — ${escapeHtml(s.title)}:</strong> ${s.detail}</li>`
    ).join("");

    const widgets = (guide.widgets || []).map((w) =>
      `<tr>
        <td><strong>${escapeHtml(w.type)}</strong><span class="chart-guide-day">Day ${w.day}</span></td>
        <td>${escapeHtml(w.question)}</td>
        <td><code>${escapeHtml(w.dimensions)}</code></td>
        <td><code>${escapeHtml(w.measures)}</code></td>
        <td>${w.retailCo}</td>
        <td class="chart-guide-avoid">${escapeHtml(w.avoid)}</td>
      </tr>`
    ).join("");

    container.innerHTML = `
      <p class="ref-content-intro">${guide.intro}</p>
      <div class="chart-guide-model">
        <h4 class="chart-guide-subtitle">Model before story — four steps</h4>
        <ol class="chart-guide-steps">${modelSteps}</ol>
      </div>
      <p class="ref-content-intro" style="margin-bottom:0.5rem">Scroll the table horizontally on smaller screens.</p>
      <div class="ref-table-scroll">
        <div class="table-wrap chart-guide-table-wrap">
          <table class="chart-guide-table">
            <thead>
              <tr>
                <th>Widget</th>
                <th>Question it answers</th>
                <th>Dimensions (Builder)</th>
                <th>Measures (Builder)</th>
                <th>RetailCo example</th>
                <th>Don't use when</th>
              </tr>
            </thead>
            <tbody>${widgets}</tbody>
          </table>
        </div>
      </div>`;
  }

  function renderOdeNavigationGuide() {
    const container = document.getElementById("odeNavigationGuide");
    const ode = L.ode;
    if (!container || !ode) return;

    const pathRows = Object.entries(ode.paths || {}).map(([key, val]) => {
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
      return `<tr><td>${escapeHtml(label)}</td><td><code>${escapeHtml(val)}</code></td></tr>`;
    }).join("");

    const panelRows = Object.entries(ode.panels || {}).map(([key, val]) =>
      `<tr><td><strong>${escapeHtml(key.replace(/([A-Z])/g, " $1"))}</strong></td><td>${val}</td></tr>`
    ).join("");

    const features = (ode.modernFeatures || []).map((f) =>
      `<li><strong>${escapeHtml(f.name)}</strong> — ${f.note}</li>`
    ).join("");

    const links = [L.helpODE, L.helpNavigate, L.helpJustAsk, L.helpDataPanel, L.classicDeprecation].filter(Boolean);

    container.innerHTML = `
      <p class="ref-content-intro">${ode.summary}</p>
      <div class="reference-callout reference-callout--tip">
        <strong>Classic deprecation</strong>
        <p>${ode.deprecation}</p>
      </div>
      <h4 class="chart-guide-subtitle">Menu path cheat sheet (use these in hands-on steps)</h4>
      <div class="ref-table-scroll"><div class="table-wrap"><table class="ode-path-table"><thead><tr><th>Task</th><th>Current SAC path</th></tr></thead><tbody>${pathRows}</tbody></table></div></div>
      <h4 class="chart-guide-subtitle" style="margin-top:1.25rem">Story editor panels (2026)</h4>
      <div class="ref-table-scroll"><div class="table-wrap"><table class="ode-path-table"><thead><tr><th>Panel</th><th>Purpose</th></tr></thead><tbody>${panelRows}</tbody></table></div></div>
      <h4 class="chart-guide-subtitle" style="margin-top:1.25rem">New features this portal teaches</h4>
      <ul class="ode-feature-list">${features}</ul>
      <div class="link-row" style="margin-top:1rem">${links.map((lnk) =>
        `<a class="resource-link" href="${lnk.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(lnk.label)}</a>`
      ).join("")}</div>`;
  }

  function renderGeoEnrichmentGuide() {
    const container = document.getElementById("geoEnrichmentGuide");
    const guide = EXTRAS.GEO_ENRICHMENT_GUIDE;
    if (!container || !guide) return;

    const methods = (guide.methods || []).map((m) => `
      <article class="geo-method-card">
        <h4>${escapeHtml(m.name)}</h4>
        <p><strong>When:</strong> ${m.when}</p>
        <ol>${(m.steps || []).map((s) => `<li>${s}</li>`).join("")}</ol>
        <p class="geo-method-note"><em>RetailCo:</em> ${m.storyUse}</p>
      </article>`).join("");

    const choropleth = (guide.choroplethSteps || []).map((s) => `<li>${s}</li>`).join("");
    const trouble = (guide.troubleshooting || []).map((t) =>
      `<tr><td>${escapeHtml(t.issue)}</td><td>${t.cause}</td><td>${t.fix}</td></tr>`
    ).join("");
    const paths = guide.retailCoPaths || {};
    const links = (guide.helpLinks || []).map((l) =>
      `<a class="resource-link" href="${l.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label)}</a>`
    ).join("");

    container.innerHTML = `
      <p class="ref-content-intro">${guide.intro}</p>
      <div class="reference-callout reference-callout--tip"><p>${guide.retailCoTrap}</p></div>
      <div class="geo-methods-grid">${methods}</div>
      <h4 class="chart-guide-subtitle">Choropleth in story (after enrichment)</h4>
      <ol class="chart-guide-steps">${choropleth}</ol>
      <h4 class="chart-guide-subtitle">RetailCo paths</h4>
      <ul class="ode-feature-list">
        <li><strong>India states:</strong> ${paths.indiaStates || ""}</li>
        <li><strong>US trial file:</strong> ${paths.usTrial || ""}</li>
        <li><strong>Sales regions only:</strong> ${paths.salesRegionsOnly || ""}</li>
      </ul>
      <h4 class="chart-guide-subtitle">Troubleshooting</h4>
      <div class="ref-table-scroll"><div class="table-wrap"><table class="ode-path-table"><thead><tr><th>Symptom</th><th>Cause</th><th>Fix</th></tr></thead><tbody>${trouble}</tbody></table></div></div>
      <div class="link-row" style="margin-top:1rem">${links}</div>`;
  }

  function countHandsOnSteps(d) {
    return getHandsOnSteps(d).reduce((n, g) => n + (g.steps?.length || 0), 0);
  }

  function countHandsOnDoneForDay(day) {
    const prefix = day + "-";
    return Object.entries(STATE.handsOnDone).filter(([k, v]) => v && k.startsWith(prefix)).length;
  }

  function getDayProgress(d) {
    const tasksTotal = d.tasks.length;
    const tasksDone = d.tasks.filter((_, i) => STATE.tasksDone[d.day + "-" + i]).length;
    const handsTotal = countHandsOnSteps(d);
    const handsDone = countHandsOnDoneForDay(d.day);
    const total = tasksTotal + handsTotal;
    const done = tasksDone + handsDone;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { tasksDone, tasksTotal, handsDone, handsTotal, done, total, pct };
  }

  function formatCombinedProgress(d) {
    const p = getDayProgress(d);
    if (!p.total) return "0/0 done";
    return p.done + "/" + p.total + " done";
  }

  function formatCombinedProgressDetail(d) {
    const p = getDayProgress(d);
    const parts = [];
    if (p.tasksTotal) parts.push("Tasks " + p.tasksDone + "/" + p.tasksTotal);
    if (p.handsTotal) parts.push("Hands-on " + p.handsDone + "/" + p.handsTotal);
    return parts.join(" · ");
  }

  function renderTaskRows(d, opts) {
    const compact = opts?.compact;
    return d.tasks.map((t, i) => {
      const tk = d.day + "-" + i;
      const done = STATE.tasksDone[tk] || false;
      return `<div class="task-check-row${compact ? " task-check-row-compact" : ""}">
        <button type="button" class="task-check-box ${done ? "done" : ""}" data-action="toggle-task" data-key="${tk}" aria-pressed="${done}" aria-label="Mark task ${i + 1} ${done ? "incomplete" : "complete"}">${done ? "✓" : ""}</button>
        <span class="task-text ${done ? "done" : ""}">${t}</span>
      </div>`;
    }).join("");
  }

  function renderTaskRail(d) {
    const p = getDayProgress(d);
    return `
      <aside class="lesson-task-rail" aria-label="Tasks for Day ${d.day}">
        <div class="task-rail-header">
          <strong>Today's tasks</strong>
          <span class="task-rail-count">${p.tasksDone}/${p.tasksTotal}</span>
        </div>
        <p class="task-rail-lead">Check off as you work in SAC — stays in sync with the Tasks tab.</p>
        <div class="task-rail-list">${renderTaskRows(d, { compact: true })}</div>
        <button type="button" class="task-rail-link" data-action="switch-tab" data-tab="tasks" data-day="${d.day}">Open full Tasks tab →</button>
      </aside>`;
  }

  function renderSidebarProgress(d) {
    const p = getDayProgress(d);
    if (!p.total) return "";
    return `
      <span class="day-nav-progress-wrap">
        <span class="day-nav-progress-track" aria-hidden="true"><span class="day-nav-progress-fill" style="width:${p.pct}%"></span></span>
        <span class="day-nav-progress-label">${p.done}/${p.total}</span>
      </span>`;
  }

  function updateDayProgressUI(day) {
    const d = DAYS.find((item) => item.day === day);
    if (!d) return;
    const p = getDayProgress(d);
    const panel = document.getElementById("dayPanel" + day);
    if (panel) {
      const progressEl = panel.querySelector(".day-combined-progress");
      if (progressEl) {
        progressEl.textContent = formatCombinedProgress(d);
        progressEl.title = formatCombinedProgressDetail(d);
      }
      const railCount = panel.querySelector(".task-rail-count");
      if (railCount) railCount.textContent = p.tasksDone + "/" + p.tasksTotal;
      const handsPill = panel.querySelector(".hands-on-progress-pill");
      if (handsPill) handsPill.textContent = p.handsDone + "/" + p.handsTotal + " steps done";
      const tabBtn = panel.querySelector('.dtab[data-tab="handsOn"]');
      if (tabBtn) tabBtn.textContent = handsOnTabLabel(d);
    }
    const navBtn = document.querySelector(`.day-nav-btn[data-day="${day}"]`);
    if (navBtn) {
      const fill = navBtn.querySelector(".day-nav-progress-fill");
      const label = navBtn.querySelector(".day-nav-progress-label");
      if (fill) fill.style.width = p.pct + "%";
      if (label) label.textContent = p.done + "/" + p.total;
    }
    updatePinHeightVariable();
  }

  function updatePinHeightVariable() {
    const sticky = document.querySelector(".day-workspace-sticky");
    if (sticky) {
      document.documentElement.style.setProperty("--day-pin-height", sticky.offsetHeight + "px");
    }
  }

  function initStickyCompact(container) {
    const sticky = container.querySelector(".day-workspace-sticky");
    const sentinel = container.querySelector(".day-sticky-sentinel");
    if (!sticky || !sentinel) return;
    if (sticky._compactObserver) sticky._compactObserver.disconnect();
    const headerH = getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim() || "64px";
    const observer = new IntersectionObserver(
      ([entry]) => {
        sticky.classList.toggle("is-compact", !entry.isIntersecting);
        updatePinHeightVariable();
      },
      { root: null, rootMargin: `-${headerH} 0px 0px 0px`, threshold: 0 }
    );
    observer.observe(sentinel);
    sticky._compactObserver = observer;
    updatePinHeightVariable();
  }

  function handsOnTabLabel(d) {
    const total = countHandsOnSteps(d);
    if (!total) return "Hands-on steps";
    const done = countHandsOnDoneForDay(d.day);
    return done > 0 ? `Hands-on steps (${done}/${total})` : "Hands-on steps";
  }

  function renderHandsOnPanel(d) {
    const guides = getHandsOnSteps(d);
    if (!guides.length) {
      return `<p class="panel-empty">No click-by-click SAC steps for this day yet. Use the Tasks tab for outcomes to verify.</p>`;
    }
    const total = countHandsOnSteps(d);
    const done = countHandsOnDoneForDay(d.day);
    return `
      ${renderDataSourceContext(d)}
      <div class="hands-on-intro">
        <strong>Story puzzle — follow each piece in order.</strong> Check off steps as you complete them in your SAC trial. Clues help when stuck; verify lines confirm you solved that piece.
        ${total ? `<span class="hands-on-progress-pill">${done}/${total} steps done</span>` : ""}
      </div>
      ${guides.map((guide, gi) => {
        const guideSource = guide.dataFile ? getDataSource(guide.dataFile) : null;
        return `
        <article class="hands-on-guide" aria-labelledby="hands-on-${d.day}-${gi}">
          <h4 class="hands-on-title" id="hands-on-${d.day}-${gi}">${escapeHtml(guide.title)}</h4>
          ${guide.goal ? `<p class="hands-on-goal">${guide.goal}</p>` : ""}
          ${guide.puzzle ? `<div class="hands-on-puzzle">${guide.puzzle}</div>` : ""}
          ${guideSource ? `<p class="hands-on-data-ref">Uses file: <a href="${guideSource.file}" download="${escapeHtml(guideSource.downloadName || "")}">${escapeHtml(guideSource.name)}</a> → ${escapeHtml(guideSource.sacModel || "SAC")}</p>` : ""}
          <ol class="hands-on-steps">
            ${(guide.steps || []).map((step, si) => {
              const key = d.day + "-" + gi + "-" + si;
              const stepDone = STATE.handsOnDone[key] || false;
              return `
              <li class="hands-on-step${stepDone ? " done" : ""}">
                <button type="button" class="hands-on-step-check ${stepDone ? "done" : ""}" data-action="toggle-hands-on" data-key="${key}" aria-pressed="${stepDone}" aria-label="Mark step ${si + 1} ${stepDone ? "incomplete" : "complete"}">${stepDone ? "✓" : ""}</button>
                <div class="hands-on-step-body">
                  ${step.piece ? `<span class="hands-on-piece">${escapeHtml(step.piece)}</span>` : ""}
                  <span class="hands-on-action">${escapeHtml(step.action)}</span>
                  ${step.menu ? `<code class="hands-on-menu">${escapeHtml(step.menu)}</code>` : ""}
                  ${step.detail ? `<span class="hands-on-detail">${step.detail}</span>` : ""}
                  ${step.verify ? `<span class="hands-on-verify"><strong>Verify:</strong> ${step.verify}</span>` : ""}
                  ${step.clue ? `<span class="hands-on-clue"><strong>Clue:</strong> ${step.clue}</span>` : ""}
                </div>
              </li>`;
            }).join("")}
          </ol>
          ${guide.tip ? `<p class="hands-on-tip"><strong>Tip:</strong> ${guide.tip}</p>` : ""}
        </article>`;
      }).join("")}`;
  }

  function renderHandsOnCallout(d) {
    if (!getHandsOnSteps(d).length) return "";
    const count = getHandsOnSteps(d).length;
    const totalSteps = countHandsOnSteps(d);
    return `
      <div class="hands-on-callout">
        <div class="hands-on-callout-text">
          <strong>Hands-on steps available</strong>
          <span>${count} guided walkthrough${count > 1 ? "s" : ""} · ${totalSteps} click-by-click steps for models, stories, planning, and more.</span>
        </div>
        <button type="button" class="hands-on-callout-btn" data-action="switch-tab" data-tab="handsOn" data-day="${d.day}">Open Hands-on steps →</button>
      </div>`;
  }

  function getAiPrompts(d) {
    return d.aiPrompts || EXTRAS.AI_PROMPTS?.[d.day] || [];
  }

  function getFlowCharts(d) {
    return d.flowCharts || EXTRAS.FLOW_CHARTS?.[d.day] || [];
  }

  function renderFlowTable(chart) {
    const headers = chart.headers || [];
    const rows = chart.rows || [];
    return `
      <figure class="flow-chart flow-chart-table" aria-label="${escapeHtml(chart.title)}">
        <figcaption class="flow-chart-title">${chart.title}</figcaption>
        <div class="flow-table-wrap">
          <table class="flow-table">
            <thead>
              <tr>${headers.map((h, i) => `<th scope="col">${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${rows.map((row) => {
                const cells = Array.isArray(row) ? row : row.cells;
                const hl = row.highlight ? " flow-table-highlight" : "";
                return `<tr class="${hl.trim()}">${cells.map((c, i) =>
                  `<td${i === 0 ? ' scope="row"' : ""}>${c}</td>`
                ).join("")}</tr>`;
              }).join("")}
            </tbody>
          </table>
        </div>
        ${chart.note ? `<p class="flow-chart-note">${chart.note}</p>` : ""}
      </figure>`;
  }

  function renderFlowCharts(charts) {
    if (!charts.length) return "";
    const collapse = CONFIG.collapseLessonSections;
    const inner = charts.map((chart) => {
      if (chart.type === "table") return renderFlowTable(chart);

      return `
      <figure class="flow-chart" aria-label="${escapeHtml(chart.title)}">
        <figcaption class="flow-chart-title">${chart.title}</figcaption>
        <div class="flow-chart-body ${chart.layout === "horizontal" ? "flow-horizontal" : ""}">
          ${chart.steps.map((step, i) => {
            const arrow = i < chart.steps.length - 1
              ? `<div class="flow-arrow" aria-hidden="true">${chart.layout === "horizontal" ? "→" : "↓"}</div>`
              : "";
            return `
              <div class="flow-step-wrap">
                <div class="flow-node${step.highlight ? " flow-node-highlight" : ""}">
                  <span class="flow-node-label">${step.label}</span>
                  ${step.sub ? `<span class="flow-node-sub">${step.sub}</span>` : ""}
                </div>
                ${arrow}
              </div>`;
          }).join("")}
        </div>
        ${chart.note ? `<p class="flow-chart-note">${chart.note}</p>` : ""}
      </figure>`;
    }).join("");

    if (!collapse) {
      return `<div class="flow-chart-section"><div class="section-label">📊 Diagrams & comparison tables</div>${inner}</div>`;
    }

    return `
      <details class="collapsible-section flow-chart-section">
        <summary class="collapsible-summary">📊 Diagrams & comparison tables <span class="collapsible-badge">${charts.length} items — click to expand</span></summary>
        <div class="collapsible-body">${inner}</div>
      </details>`;
  }

  function renderLessonCard(t, i) {
    const body = `
        <p class="lesson-story">${t.story}</p>
        ${t.example ? `<div class="lesson-example"><strong>💡 Example:</strong> ${t.example}</div>` : ""}
        ${t.technical ? `<div class="lesson-technical"><strong>⚙️ Technical detail:</strong> ${t.technical}</div>` : ""}
        <div class="lesson-cover">
          <div class="lesson-cover-label">What you should understand today</div>
          <ul>${t.cover.map((c) => `<li>${c}</li>`).join("")}</ul>
        </div>`;

    if (!CONFIG.collapseLessonSections) {
      return `
      <article class="lesson-card">
        <h4 class="lesson-title">${t.title}</h4>
        ${body}
      </article>`;
    }

    return `
      <details class="lesson-card lesson-collapsible"${i === 0 ? " open" : ""}>
        <summary class="lesson-title lesson-summary">${t.title}</summary>
        <div class="lesson-collapsible-body">${body}</div>
      </details>`;
  }

  function renderTopicsPanel(d) {
    const scene = getStoryScene(d);
    const sceneBlock = scene
      ? `<div class="story-scene"><div class="story-scene-label">🎬 Today's story</div><p>${scene}</p></div>`
      : "";
    const intro = d.dayIntro
      ? `<div class="day-intro"><strong>📖 Before you start Day ${d.day}:</strong> ${d.dayIntro}</div>`
      : "";
    const glossary = getGlossary(d);
    const glossaryBlock = glossary.length
      ? `<div class="day-glossary day-glossary-first"><div class="day-glossary-label">📚 Words to remember — read this first</div><dl>${glossary.map((g) => `<dt>${g.term}</dt><dd>${g.meaning}</dd>`).join("")}</dl></div>`
      : "";
    const context = d.contextBox
      ? `<div class="pbi-map">${d.contextBox}</div>`
      : "";
    const flowCharts = getFlowCharts(d);
    const flowBlock = flowCharts.length ? renderFlowCharts(flowCharts) : "";
    const lessons = (d.topicsDetailed || []).map((t, i) => renderLessonCard(t, i)).join("");
    const lessonOutline = CONFIG.collapseLessonSections && (d.topicsDetailed || []).length > 3
      ? `<nav class="lesson-outline" aria-label="Lesson outline">
          <span class="lesson-outline-label">Jump to lesson:</span>
          ${(d.topicsDetailed || []).map((t, i) => `<a href="#" class="lesson-outline-link" data-lesson-idx="${i}" data-day="${d.day}">${i + 1}. ${t.title.replace(/ — .*/, "")}</a>`).join("")}
        </nav>`
      : "";
    const recap = getStoryRecap(d);
    const recapBlock = recap
      ? `<div class="story-recap"><div class="story-recap-label">✨ End of Day ${d.day} — story recap</div><p>${recap}</p></div>`
      : "";
    return sceneBlock + intro + renderDataSourceContext(d) + renderHandsOnCallout(d) + glossaryBlock + context + flowBlock + lessonOutline + `<div class="lesson-list">${lessons}</div>` + recapBlock;
  }

  function renderAiPromptsPanel(d) {
    const prompts = getAiPrompts(d);
    if (!prompts.length) {
      return `<p style="font-size:13px;color:var(--color-text-secondary)">No prompts for this day yet.</p>`;
    }
    return `
      <div class="ai-prompt-intro">
        <strong>Stuck or curious?</strong> Copy any prompt below and paste it into ChatGPT, Claude, Gemini, or any AI chat. Add "I'm a beginner learning SAP Analytics Cloud" at the start if you like.
      </div>
      <div class="ai-prompt-list">
        ${prompts.map((p, i) => `
          <div class="ai-prompt-card">
            <p class="ai-prompt-text">${escapeHtml(p)}</p>
            <button type="button" class="copy-prompt-btn" data-day="${d.day}" data-idx="${i}" aria-label="Copy prompt ${i + 1}">📋 Copy prompt</button>
          </div>`).join("")}
      </div>`;
  }

  function getDayVideo(d) {
    if (d.videoId) {
      return { id: d.videoId, label: d.videoLabel || d.title };
    }
    return LINKS.dayVideos?.[d.day] || null;
  }

  function getDayImages(d) {
    if (d.imgs && d.imgs.length) return d.imgs;
    return LINKS.dayImages?.[d.day] || [];
  }

  function renderVideoPanel(d) {
    const video = getDayVideo(d);
    if (!video) {
      return `<p style="font-size:13px;color:var(--color-text-secondary)">No dedicated video for this day — use the Resources tab and SAP Help Viewer.</p>`;
    }
    return `
      <div class="video-embed">
        <iframe src="https://www.youtube.com/embed/${video.id}?rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" title="${escapeHtml(video.label)}"></iframe>
      </div>
      <p class="video-label">${escapeHtml(video.label)}</p>
      <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:var(--color-text-info);margin-top:8px;display:inline-block">Open on YouTube ↗</a>`;
  }

  function buildDayPanelHTML(d, isDone) {
    const tabs = ["topics"];
    if (getHandsOnSteps(d).length) tabs.push("handsOn");
    tabs.push("tasks", "resources", "ai", "notes", "case");
    if (!CONFIG.hideVideoTab) tabs.splice(1, 0, "video");
    if (!CONFIG.hideVisualTab) {
      const insertAt = tabs.indexOf("tasks");
      tabs.splice(insertAt >= 0 ? insertAt : 1, 0, "visual");
    }
    const tabLabels = {
      topics: "Lesson",
      handsOn: handsOnTabLabel(d),
      video: "Video",
      visual: "Visual",
      resources: "Resources",
      tasks: "Tasks",
      ai: "Ask AI",
      notes: "Notes",
      case: "Case"
    };
    const notePlaceholder = CONFIG.notePlaceholder || "Write your notes, questions, and key takeaways here...";
    const imgs = getDayImages(d);
    const paused = isDayPaused(d.day);
    const prog = getDayProgress(d);

    const tabButton = (tab, index) => {
      const selected = index === 0;
      return `<button class="dtab${selected ? " on" : ""}" id="tab-${d.day}-${tab}" role="tab" aria-selected="${selected}" aria-controls="dp${d.day}-${tab}" tabindex="${selected ? "0" : "-1"}" data-tab="${tab}" data-day="${d.day}">${tabLabels[tab]}</button>`;
    };
    const panelAttrs = (tab, selected = false) =>
      `id="dp${d.day}-${tab}" role="tabpanel" aria-labelledby="tab-${d.day}-${tab}"${selected ? "" : " hidden"}`;

    return `
<div class="day-sticky-sentinel" aria-hidden="true"></div>
<div class="day-workspace-sticky">
<header class="day-workspace-header">
  <div class="day-workspace-top">
    <div class="day-workspace-meta">
      <span class="day-num">Day ${d.day}</span>
      <span class="phase-pill ${d.pc}">${d.phase}</span>
      ${paused ? '<span class="day-status-badge in-progress">Content update in progress</span>' : ""}
    </div>
    <h3 class="day-workspace-title">${d.title}</h3>
    <p class="day-workspace-subtitle">${d.subtitle}</p>
  </div>
  <div class="day-workspace-actions">
    <button type="button" class="day-check ${isDone ? "done" : ""}" data-action="toggle-day" data-day="${d.day}" aria-pressed="${isDone}" aria-label="Mark day ${d.day} ${isDone ? "incomplete" : "complete"}">${isDone ? "✓" : ""}</button>
    <span class="day-action-label">${isDone ? "Day complete" : "Mark day complete"}</span>
    <span class="day-combined-progress" title="${escapeHtml(formatCombinedProgressDetail(d))}">${formatCombinedProgress(d)}</span>
  </div>
</header>
<nav class="day-tabs" role="tablist" aria-label="Day ${d.day} sections">
  ${tabs.map(tabButton).join("")}
</nav>
</div>
<div class="day-panels">
  <div class="dpanel on lesson-with-rail" ${panelAttrs("topics", true)}>
    <div class="lesson-main">${renderTopicsPanel(d)}</div>
    ${renderTaskRail(d)}
  </div>
  ${CONFIG.hideVideoTab ? "" : `<div class="dpanel" ${panelAttrs("video")}>${renderVideoPanel(d)}</div>`}
  ${CONFIG.hideVisualTab ? "" : `<div class="dpanel" ${panelAttrs("visual")}>
    <div class="img-grid">
      ${imgs.map((img) => `
        <figure class="img-card">
          <img src="${img.src}" alt="${img.cap}" loading="lazy" onerror="this.style.opacity='0.3'">
          <figcaption class="img-caption">${img.cap}</figcaption>
        </figure>`).join("")}
    </div>
    ${!imgs.length ? `<p class="panel-empty">Open the SAC Help Viewer and search for “${d.title.split("—")[0].trim()}” to see official UI screenshots.</p>` : ""}
  </div>`}
  ${getHandsOnSteps(d).length ? `<div class="dpanel" ${panelAttrs("handsOn")}>${renderHandsOnPanel(d)}</div>` : ""}
  <div class="dpanel" ${panelAttrs("tasks")}>
    <div class="section-label">Checklist — verify these outcomes in your SAC trial</div>
    ${renderTaskRows(d)}
  </div>
  <div class="dpanel" ${panelAttrs("resources")}>
    <div class="section-label">Verified resources (links tested)</div>
    <ul class="link-list">
      ${d.links.map((l) => `<li><a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}<span class="link-tag ${tagClass(l.tag)}">${l.tag}</span></a></li>`).join("")}
    </ul>
    <p class="link-note">Tip: If a Help page opens at the top level, use the search box inside Help Portal to find “${d.searchHint || d.title}”.</p>
    ${d.codeExample ? `<div class="section-label">Example formula / script</div><pre class="code-block">${escapeHtml(d.codeExample)}</pre>` : ""}
  </div>
  <div class="dpanel" ${panelAttrs("ai")}>${renderAiPromptsPanel(d)}</div>
  <div class="dpanel" ${panelAttrs("notes")}>
    <div class="section-label">Your notes for Day ${d.day}</div>
    <label class="sr-only" for="notes${d.day}">Notes for Day ${d.day}</label>
    <textarea class="notes-area" id="notes${d.day}" placeholder="${notePlaceholder}">${escapeHtml(STATE.notes[d.day] || "")}</textarea>
    <div class="notes-actions">
      <button class="save-note-btn" data-action="save-note" data-day="${d.day}" type="button">Save note</button>
      <span class="note-saved" id="noteSaved${d.day}">Saved</span>
    </div>
  </div>
  <div class="dpanel" ${panelAttrs("case")}>
    <div class="section-label">${CASE_STUDY.name} — today's business angle</div>
    <div class="case-block"><p>${d.caseNote}</p></div>
  </div>
</div>`;
  }

  function renderDaySidebar() {
    const sidebar = document.getElementById("daySidebar");
    if (!sidebar) return;
    const activeDay = getActiveDay();
    const throughDay = CONFIG.contentUpdatedThroughDay ?? CONFIG.totalDays;
    const sidebarSubtitle = throughDay < CONFIG.totalDays
      ? `Days 1–${throughDay} ready · Days ${throughDay + 1}–${CONFIG.totalDays} update in progress`
      : `All ${CONFIG.totalDays} days ready`;
    let html = `<div class="sidebar-header"><span class="sidebar-title">14-day path</span><span class="sidebar-subtitle">${sidebarSubtitle}</span></div>
      <div class="sidebar-mobile-picker">
        <label for="mobileDayPicker">Choose a lesson</label>
        <select id="mobileDayPicker">
          ${DAYS.map((d) => `<option value="${d.day}"${d.day === activeDay ? " selected" : ""}>Day ${d.day}: ${escapeHtml(d.title)}</option>`).join("")}
        </select>
      </div>`;

    PHASES.forEach((phase) => {
      const phaseDays = DAYS.filter((d) => d.pc === "p" + phase.id);
      if (!phaseDays.length) return;
      html += `<div class="sidebar-phase"><div class="sidebar-phase-label">${phase.name}</div><div class="sidebar-day-list">`;
      phaseDays.forEach((d) => {
        const isDone = STATE.done.has(d.day);
        const isActive = d.day === activeDay;
        const paused = isDayPaused(d.day);
        const hasHandsOn = getHandsOnSteps(d).length > 0;
        html += `
          <button type="button" class="day-nav-btn${isActive ? " active" : ""}${isDone ? " completed" : ""}${paused ? " paused" : ""}" data-day="${d.day}" aria-current="${isActive ? "true" : "false"}">
            <span class="day-nav-num">${d.day}</span>
            <span class="day-nav-text">
              <span class="day-nav-title">${d.title}${hasHandsOn ? '<span class="day-nav-hands" title="Hands-on steps available"></span>' : ""}</span>
              ${renderSidebarProgress(d)}
              ${paused ? '<span class="day-nav-badge">Update in progress</span>' : ""}
            </span>
            <span class="day-nav-status">${isDone ? "✓" : ""}</span>
          </button>`;
      });
      html += `</div></div>`;
    });

    sidebar.innerHTML = html;
    sidebar.querySelectorAll(".day-nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => setActiveDay(parseInt(btn.dataset.day, 10)));
    });
    sidebar.querySelector("#mobileDayPicker")?.addEventListener("change", (event) => {
      setActiveDay(parseInt(event.target.value, 10));
    });
  }

  function renderDayWorkspace(dayNum) {
    const workspace = document.getElementById("dayWorkspace");
    if (!workspace) return;
    const d = DAYS.find((item) => item.day === dayNum);
    if (!d) return;
    const isDone = STATE.done.has(d.day);
    workspace.innerHTML = `<article class="day-panel${isDone ? " completed" : ""}" id="dayPanel${d.day}">${buildDayPanelHTML(d, isDone)}</article>`;
    bindDayPanelEvents(workspace, d.day);
    initStickyCompact(workspace);
    updateDayProgressUI(d.day);
  }

  function renderLearningUI() {
    renderDaySidebar();
    renderDayWorkspace(getActiveDay());
  }

  function bindDayPanelEvents(container, day) {
    container.querySelector("[data-action='toggle-day']")?.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDay(day);
    });
    container.querySelectorAll(".dtab").forEach((btn) => {
      btn.addEventListener("click", () => switchDTab(day, btn.dataset.tab, btn));
      btn.addEventListener("keydown", handleTabKeydown);
    });
    container.querySelectorAll("[data-action='toggle-task']").forEach((el) => {
      el.addEventListener("click", () => toggleTask(el.dataset.key, el));
    });
    container.querySelector("[data-action='save-note']")?.addEventListener("click", () => saveNote(day));
    container.querySelectorAll(".copy-prompt-btn").forEach((btn) => {
      btn.addEventListener("click", () => copyPrompt(btn));
    });
    container.querySelectorAll("[data-action='switch-tab']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabBtn = container.querySelector(`.dtab[data-tab="${btn.dataset.tab}"]`);
        if (tabBtn) {
          switchDTab(day, btn.dataset.tab, tabBtn);
          requestAnimationFrame(() => scrollToDayContent());
        }
      });
    });
    container.querySelectorAll("[data-action='toggle-hands-on']").forEach((el) => {
      el.addEventListener("click", () => toggleHandsOnStep(el.dataset.key, el, day));
    });
    container.querySelectorAll(".lesson-outline-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const idx = link.dataset.lessonIdx;
        const cards = container.querySelectorAll(".lesson-collapsible");
        const card = cards[idx];
        if (card) {
          card.open = true;
          const { total } = getScrollOffsets(container);
          const top = card.getBoundingClientRect().top + window.scrollY - total;
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }
      });
    });
  }

  function copyPrompt(btn) {
    const day = parseInt(btn.getAttribute("data-day"), 10);
    const idx = parseInt(btn.getAttribute("data-idx"), 10);
    const dayData = DAYS.find((d) => d.day === day);
    const prompts = dayData ? getAiPrompts(dayData) : [];
    const text = prompts[idx];
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.textContent = "✓ Copied!";
      setTimeout(() => { btn.textContent = orig; }, 2000);
    }).catch(() => {
      window.prompt("Copy this prompt:", text);
    });
  }

  function toggleHandsOnStep(key, el, day) {
    STATE.handsOnDone[key] = !STATE.handsOnDone[key];
    const isDone = STATE.handsOnDone[key];
    el.classList.toggle("done", isDone);
    el.innerHTML = isDone ? "✓" : "";
    el.setAttribute("aria-pressed", isDone);
    el.setAttribute("aria-label", el.getAttribute("aria-label").replace(isDone ? "complete" : "incomplete", isDone ? "incomplete" : "complete"));
    el.closest(".hands-on-step")?.classList.toggle("done", isDone);
    saveState();
    updateDayProgressUI(day);
  }

  function switchDTab(day, tab, btn) {
    const panel = document.getElementById("dayPanel" + day);
    if (!panel) return;
    panel.querySelectorAll(".dpanel").forEach((p) => {
      p.classList.remove("on");
      p.hidden = true;
    });
    panel.querySelectorAll(".dtab").forEach((b) => {
      b.classList.remove("on");
      b.setAttribute("aria-selected", "false");
      b.tabIndex = -1;
    });
    const activePanel = document.getElementById("dp" + day + "-" + tab);
    if (activePanel) {
      activePanel.hidden = false;
      activePanel.classList.add("on");
    }
    btn.classList.add("on");
    btn.setAttribute("aria-selected", "true");
    btn.tabIndex = 0;
    const dayPanels = panel.querySelector(".day-panels");
    if (dayPanels) {
      const { total } = getScrollOffsets(panel);
      const panelTop = dayPanels.getBoundingClientRect().top + window.scrollY;
      if (dayPanels.getBoundingClientRect().top < total - 8) {
        window.scrollTo({ top: Math.max(0, panelTop - total), behavior: "smooth" });
      }
    }
  }

  function handleTabKeydown(event) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const tabs = [...event.currentTarget.closest('[role="tablist"]').querySelectorAll('[role="tab"]')];
    const currentIndex = tabs.indexOf(event.currentTarget);
    let nextIndex = currentIndex;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    event.preventDefault();
    tabs[nextIndex].focus();
    tabs[nextIndex].click();
  }

  function updateDaySidebarCompletion(day) {
    const btn = document.querySelector(`.day-nav-btn[data-day="${day}"]`);
    if (!btn) return;
    const isDone = STATE.done.has(day);
    btn.classList.toggle("completed", isDone);
    const status = btn.querySelector(".day-nav-status");
    if (status) status.textContent = isDone ? "✓" : "";
  }

  function toggleDay(day) {
    STATE.done.has(day) ? STATE.done.delete(day) : STATE.done.add(day);
    saveState();
    updateProgress();
    updateDaySidebarCompletion(day);
    const panel = document.getElementById("dayPanel" + day);
    if (!panel) return;
    const check = panel.querySelector(".day-check");
    const isDone = STATE.done.has(day);
    panel.classList.toggle("completed", isDone);
    check.classList.toggle("done", isDone);
    check.innerHTML = isDone ? "✓" : "";
    check.setAttribute("aria-pressed", isDone);
    check.setAttribute("aria-label", `Mark day ${day} ${isDone ? "incomplete" : "complete"}`);
    const label = panel.querySelector(".day-action-label");
    if (label) label.textContent = isDone ? "Day complete" : "Mark day complete";
  }

  function toggleTask(key, el) {
    STATE.tasksDone[key] = !STATE.tasksDone[key];
    const isDone = STATE.tasksDone[key];
    const panel = el.closest(".day-panel");
    panel?.querySelectorAll(`[data-action='toggle-task'][data-key="${key}"]`).forEach((box) => {
      box.classList.toggle("done", isDone);
      box.innerHTML = isDone ? "✓" : "";
      box.setAttribute("aria-pressed", isDone);
      const taskNumber = parseInt(key.split("-")[1], 10) + 1;
      box.setAttribute("aria-label", `Mark task ${taskNumber} ${isDone ? "incomplete" : "complete"}`);
      box.nextElementSibling?.classList.toggle("done", isDone);
    });
    saveState();
    updateProgress();
    const dayNum = parseInt(key.split("-")[0], 10);
    updateDayProgressUI(dayNum);
  }

  function saveNote(day) {
    const ta = document.getElementById("notes" + day);
    if (ta) STATE.notes[day] = ta.value;
    saveState();
    const saved = document.getElementById("noteSaved" + day);
    if (saved) {
      saved.style.display = "inline";
      setTimeout(() => { saved.style.display = "none"; }, 2000);
    }
  }

  function saveGlobalNotes() {
    const ta = document.getElementById("globalNotes");
    if (ta) STATE.globalNotes = ta.value;
    saveState();
    const saved = document.getElementById("globalNotesSaved");
    if (saved) {
      saved.style.display = "inline";
      setTimeout(() => { saved.style.display = "none"; }, 2000);
    }
  }

  function renderSubscriptions() {
    const grid = document.getElementById("setupCardsGrid");
    if (grid) {
      grid.innerHTML = SUBSCRIPTIONS.map((s, i) => `
        <article class="setup-card${s.priority <= 2 ? " setup-card--featured" : ""}">
          <div class="setup-card-top">
            <span class="setup-card-num">${String(i + 1).padStart(2, "0")}</span>
            ${s.priority <= 2 ? '<span class="fbadge">Start here</span>' : ""}
          </div>
          <h4 class="setup-card-title">${escapeHtml(s.tool)}</h4>
          <p class="setup-card-purpose">${s.purpose}</p>
          <div class="setup-card-footer">
            <span class="setup-card-cost${s.cost === "free" ? " setup-card-cost--free" : ""}">${escapeHtml(s.costLabel)}</span>
            <a class="setup-card-action" href="${s.action}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.actionLabel || "Open ↗")}</a>
          </div>
        </article>`).join("");
    } else {
      const tbody = document.getElementById("subsBody");
      if (tbody) {
        tbody.innerHTML = SUBSCRIPTIONS.map((s) => `
          <tr>
            <td><strong>${s.tool}</strong>${s.priority <= 2 ? ' <span class="fbadge">Start here</span>' : ""}</td>
            <td>${s.purpose}</td>
            <td>${s.cost === "free" ? `<span class="fbadge">${s.costLabel}</span>` : `<span class="pbadge">${s.costLabel}</span>`}</td>
            <td><a href="${s.action}" target="_blank" rel="noopener noreferrer">${s.actionLabel || "Open ↗"}</a></td>
          </tr>`).join("");
      }
    }

    const featuredWrap = document.getElementById("featuredVideosWrap");
    if (featuredWrap && CONFIG.hideFeaturedVideos) {
      featuredWrap.remove();
    } else {
      const featured = document.getElementById("featuredVideos");
      if (featured && LINKS.featuredVideos) {
        featured.innerHTML = LINKS.featuredVideos.map((v) => `
          <div>
            <div class="video-embed">
              <iframe src="https://www.youtube.com/embed/${v.id}?rel=0" allowfullscreen loading="lazy" title="${escapeHtml(v.label)}"></iframe>
            </div>
            <p class="video-label">${escapeHtml(v.label)}</p>
          </div>`).join("");
      }
    }
  }

  function renderResourceLibrary() {
    const container = document.getElementById("resourceLibrary");
    if (!container) return;
    const icons = ["📘", "🎓", "☁️", "👥"];
    container.innerHTML = `<div class="resource-panels-grid">${RESOURCE_LIBRARY.map((cat, idx) => `
      <section class="resource-panel-card">
        <header class="resource-panel-card-head">
          <span class="resource-panel-card-icon" aria-hidden="true">${icons[idx] || "📎"}</span>
          <h4>${escapeHtml(cat.category)}</h4>
        </header>
        <div class="resource-chips">
          ${cat.items.map((item) => `<a class="resource-chip" href="${item.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.label)}</a>`).join("")}
        </div>
      </section>`).join("")}</div>`;
  }

  function renderCaseStudy() {
    const container = document.getElementById("caseStudyContent");
    if (!container) return;
    container.innerHTML = `
      <div class="case-block" style="margin-bottom:1.25rem;padding:1.25rem">
        <p style="font-size:16px;font-weight:600;color:var(--color-text-primary);margin-bottom:10px">🏪 ${CASE_STUDY.name} — ${CASE_STUDY.tagline}</p>
        ${CASE_STUDY.storyOpening ? `<p style="margin-bottom:12px;font-size:13px;line-height:1.75;color:var(--color-text-primary)">${CASE_STUDY.storyOpening}</p>` : ""}
        <p style="margin-bottom:8px"><strong>Company:</strong> ${CASE_STUDY.company}</p>
        <p style="margin-bottom:8px"><strong>Your role:</strong> ${CASE_STUDY.role}</p>
        <p><strong>Business goal:</strong> ${CASE_STUDY.goal}</p>
      </div>
      ${CASE_STUDY.characters ? `
      <div class="info-card" style="margin-bottom:1.25rem">
        <h3>👥 Meet the team</h3>
        <div class="card-grid" style="margin-top:10px">
          ${CASE_STUDY.characters.map((c) => `
            <div style="padding:8px 0;border-bottom:0.5px solid var(--color-border-tertiary)${c.isYou ? ";background:var(--color-background-info);margin:0 -8px;padding:8px;border-radius:var(--border-radius-sm)" : ""}">
              <strong style="font-size:13px">${c.name}</strong>
              <span style="font-size:11px;color:var(--color-text-info);margin-left:6px">${c.role}</span>
              ${c.isYou ? `<span style="font-size:10px;font-weight:600;color:var(--sap-blue);margin-left:6px">← You</span>` : ""}
              <p style="font-size:12px;color:var(--color-text-secondary);margin-top:4px">${c.desc}</p>
            </div>`).join("")}
        </div>
      </div>` : ""}
      <div class="card-grid" style="margin-bottom:1.25rem">
        ${CASE_STUDY.phases.map((p) => `
          <div class="info-card"><h3>${p.days}</h3><p><strong>${p.title}</strong><br>${p.desc}</p></div>`).join("")}
      </div>
      <div class="info-card" style="margin-bottom:1.25rem">
        <h3>💰 ${CASE_STUDY.financeExample.title}</h3>
        <ol style="margin-top:10px;padding-left:1.25rem">
          ${CASE_STUDY.financeExample.steps.map((s) => `<li style="font-size:13px;color:var(--color-text-secondary);margin-bottom:6px">${s}</li>`).join("")}
        </ol>
      </div>
      ${!CONFIG.hideCaseStudyVideo && LINKS.caseStudyVideo ? `
        <div class="video-embed" style="max-width:720px">
          <iframe src="https://www.youtube.com/embed/${LINKS.caseStudyVideo.id}?rel=0" allowfullscreen loading="lazy" title="${escapeHtml(LINKS.caseStudyVideo.label)}"></iframe>
        </div>
        <p class="video-label">${escapeHtml(LINKS.caseStudyVideo.label)}</p>` : ""}`;
  }

  function renderComparison() {
    if (!showCompareTab || !PBI_COMPARISON) return;
    const tbody = document.getElementById("compareBody");
    if (!tbody) return;
    tbody.innerHTML = PBI_COMPARISON.map((r) => `
      <tr><td><strong>${r.feature}</strong></td><td>${r.pbi}</td><td class="compare-highlight">${r.sac}</td></tr>`).join("");
  }

  function renderPerformance() {
    const container = document.getElementById("perfGuide");
    if (!container) return;
    container.innerHTML = PERFORMANCE_GUIDE.map((r, i) => `
      <article class="perf-tip-card">
        <h4>${i + 1}. ${escapeHtml(r.rule)}</h4>
        <p>${r.detail}</p>
      </article>`).join("");
  }

  function initReferenceNav() {
    const nav = document.querySelector(".reference-nav");
    if (!nav) return;

    nav.querySelectorAll(".reference-nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const id = link.getAttribute("href")?.slice(1);
        const target = id && document.getElementById(id);
        if (!target) return;
        if (target.tagName === "DETAILS") target.open = true;
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        nav.querySelectorAll(".reference-nav-link").forEach((l) => l.classList.remove("is-active"));
        link.classList.add("is-active");
      });
    });

    const panels = nav.querySelectorAll(".reference-nav-link").length
      ? [...nav.querySelectorAll(".reference-nav-link")].map((l) => document.getElementById(l.getAttribute("href")?.slice(1) || "")).filter(Boolean)
      : [];

    if (panels.length && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          nav.querySelectorAll(".reference-nav-link").forEach((l) => {
            l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`);
          });
        });
      }, { rootMargin: "-20% 0px -60% 0px", threshold: 0 });
      panels.forEach((p) => observer.observe(p));
    }
  }

  function renderPhaseLegend() {
    const el = document.getElementById("phaseLegend");
    if (!el) return;
    el.innerHTML = PHASES.map((p) =>
      `<span class="legend-item"><span class="legend-dot" style="background:${p.color}"></span> ${p.name} (${p.days})</span>`
    ).join("");
  }

  function showView(id, btn) {
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach((b) => {
      b.classList.remove("active");
      b.removeAttribute("aria-current");
    });
    document.getElementById("view-" + id)?.classList.add("active");
    btn?.classList.add("active");
    btn?.setAttribute("aria-current", "page");
  }

  function goToLearn(day) {
    const targetDay = day || getContinueDay();
    showView("learn", document.querySelector('.nav-btn[data-view="learn"]'));
    setActiveDay(targetDay, { scrollBehavior: "smooth" });
  }

  function initNavigation() {
    document.querySelectorAll(".nav-btn[data-view]").forEach((btn) => {
      btn.addEventListener("click", () => showView(btn.dataset.view, btn));
    });
    document.getElementById("continueBtn")?.addEventListener("click", () => {
      goToLearn(getContinueDay());
    });
    document.getElementById("startBuildingBtn")?.addEventListener("click", () => {
      goToLearn(1);
    });
    if (!showCompareTab) {
      document.querySelector('.nav-btn[data-view="compare"]')?.remove();
      document.getElementById("view-compare")?.remove();
    }
  }

  function initDeepLink() {
    const match = window.location.hash.match(/^#day-(\d+)$/);
    if (match) {
      const day = parseInt(match[1], 10);
      if (DAYS.some((d) => d.day === day)) {
        STATE.activeDay = day;
        showView("learn", document.querySelector('.nav-btn[data-view="learn"]'));
      }
    }
  }

  function initGlobalNotes() {
    const ta = document.getElementById("globalNotes");
    if (ta) {
      ta.value = STATE.globalNotes;
      ta.placeholder = CONFIG.globalNotePlaceholder || ta.placeholder;
    }
    document.getElementById("saveGlobalNotes")?.addEventListener("click", saveGlobalNotes);
  }

  function applyPageMeta() {
    if (CONFIG.pageTitle) document.title = CONFIG.pageTitle;
    const heroTitle = document.getElementById("heroTitle");
    const heroDesc = document.getElementById("heroDesc");
    const brandSub = document.getElementById("brandSub");
    if (heroTitle && CONFIG.heroTitle) heroTitle.textContent = CONFIG.heroTitle;
    if (heroDesc && CONFIG.heroDescription) heroDesc.textContent = CONFIG.heroDescription;
    if (brandSub && CONFIG.brandSubtitle) brandSub.textContent = CONFIG.brandSubtitle;
    const versionBadge = document.getElementById("sacVersionBadge");
    if (versionBadge && CONFIG.sacVersionBadge) versionBadge.textContent = CONFIG.sacVersionBadge;
  }

  function init() {
    loadState();
    applyPageMeta();
    initDeepLink();
    renderLearningUI();
    renderSubscriptions();
    renderResourceLibrary();
    renderDataSourcesLibrary();
    renderOdeNavigationGuide();
    renderGeoEnrichmentGuide();
    renderChartStoryGuide();
    renderCaseStudy();
    renderComparison();
    renderPerformance();
    initNavigation();
    initGlobalNotes();
    initReferenceNav();
    updateProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.SACPortalApp = { showView, toggleDay, saveNote, updateProgress, setActiveDay, goToLearn };
})();
