/**
 * COM Computer Vision Learning
 * Progress Tracker (localStorage-based)
 */

const Progress = {
  _key: "cvl_progress",

  _load() {
    try { return JSON.parse(localStorage.getItem(this._key) || "{}"); }
    catch(e) { return {}; }
  },

  _save(data) {
    try { localStorage.setItem(this._key, JSON.stringify(data)); } catch(e) {}
  },

  mark(week, type) {       // type: 'theory' | 'practice' | 'quiz'
    const d = this._load();
    if (!d[week]) d[week] = {};
    d[week][type] = true;
    this._save(d);
    this._refreshUI(week);
  },

  isMarked(week, type) {
    const d = this._load();
    return !!(d[week] && d[week][type]);
  },

  getPercent(week) {
    const d = this._load();
    const w = d[week] || {};
    const done = ["theory","practice","quiz"].filter(t => w[t]).length;
    return Math.round((done / 3) * 100);
  },

  _refreshUI(week) {
    const pct = this.getPercent(week);
    // Update progress bars in sidebar
    document.querySelectorAll(`[data-progress-week="${week}"]`).forEach(el => {
      el.style.width = pct + "%";
      el.setAttribute("aria-valuenow", pct);
    });
    // Update percentage text
    document.querySelectorAll(`[data-progress-pct="${week}"]`).forEach(el => {
      el.textContent = pct + "%";
    });
    // Update checkmarks
    ["theory","practice","quiz"].forEach(type => {
      document.querySelectorAll(`[data-progress-check="${week}-${type}"]`).forEach(el => {
        el.classList.toggle("checked", this.isMarked(week, type));
        el.innerHTML = this.isMarked(week, type) ? "✓" : "○";
      });
    });
  },

  initPage(week) {
    // Delay to let DOM settle
    setTimeout(() => this._refreshUI(week), 100);
  },

  totalStats() {
    const d = this._load();
    let total = 0, done = 0;
    Object.keys(courseConfig).forEach(week => {
      if (courseConfig[week].material) {
        total += 3;
        const w = d[week] || {};
        done += ["theory","practice","quiz"].filter(t => w[t]).length;
      }
    });
    return { total, done, pct: total ? Math.round((done/total)*100) : 0 };
  }
};
