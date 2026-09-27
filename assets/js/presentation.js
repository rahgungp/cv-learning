/**
 * COM Computer Vision Learning
 * Presentation Engine — Fullscreen Slide Mode
 */

const Presentation = {
  slides: [],
  current: 0,
  isActive: false,
  overlay: null,
  touchStartX: 0,

  init(slidesData) {
    this.slides = slidesData;
    this.current = 0;
  },

  start() {
    if (!this.slides || this.slides.length === 0) {
      alert("Tidak ada slide untuk ditampilkan.");
      return;
    }
    this.isActive = true;
    this._buildOverlay();
    this._renderSlide(0);
    this._requestFS();
    this._bindKeys();
    this._bindSwipe();
  },

  _buildOverlay() {
    if (document.getElementById("pres-overlay")) document.getElementById("pres-overlay").remove();
    const overlay = document.createElement("div");
    overlay.id = "pres-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Presentation Mode");
    overlay.innerHTML = `
      <div class="pres-header">
        <div class="pres-brand"><span class="pres-logo">COM</span> Computer Vision</div>
        <div class="pres-progress-bar-wrap">
          <div class="pres-progress-bar" id="pres-bar"></div>
        </div>
        <div class="pres-counter" id="pres-counter">1 / ${this.slides.length}</div>
        <button class="pres-close-btn" onclick="Presentation.stop()" title="Exit (Esc)">✕</button>
      </div>
      <div class="pres-slide-container">
        <div class="pres-slide" id="pres-slide" tabindex="0"></div>
      </div>
      <div class="pres-nav">
        <button class="pres-btn pres-btn-back" id="pres-back" onclick="Presentation.prev()" aria-label="Previous slide">
          ← Sebelumnya
        </button>
        <div class="pres-dots" id="pres-dots"></div>
        <button class="pres-btn pres-btn-next" id="pres-next" onclick="Presentation.next()" aria-label="Next slide">
          Berikutnya →
        </button>
      </div>`;
    document.body.appendChild(overlay);
    this.overlay = overlay;
    this._buildDots();
    document.body.style.overflow = "hidden";
  },

  _buildDots() {
    const container = document.getElementById("pres-dots");
    if (!container) return;
    container.innerHTML = this.slides.map((_, i) =>
      `<button class="pres-dot ${i===0?"active":""}" onclick="Presentation.goTo(${i})" aria-label="Slide ${i+1}"></button>`
    ).join("");
  },

  _renderSlide(index) {
    const slide = this.slides[index];
    if (!slide) return;
    const el = document.getElementById("pres-slide");
    if (!el) return;

    el.classList.add("fading");
    setTimeout(() => {
      el.innerHTML = `
        <div class="slide-inner slide-type-${slide.type || 'content'}">
          ${slide.eyebrow ? `<div class="slide-eyebrow">${slide.eyebrow}</div>` : ""}
          <h1 class="slide-title">${slide.title}</h1>
          ${slide.subtitle ? `<p class="slide-subtitle">${slide.subtitle}</p>` : ""}
          ${slide.body ? `<div class="slide-body">${slide.body}</div>` : ""}
          ${slide.visual ? `<div class="slide-visual">${slide.visual}</div>` : ""}
          ${slide.footer ? `<div class="slide-footer-note">${slide.footer}</div>` : ""}
        </div>`;
      el.classList.remove("fading");
      el.focus();
    }, 150);

    // Update counter & bar
    const counter = document.getElementById("pres-counter");
    if (counter) counter.textContent = `${index+1} / ${this.slides.length}`;
    const bar = document.getElementById("pres-bar");
    if (bar) bar.style.width = `${((index+1)/this.slides.length)*100}%`;

    // Update dots
    document.querySelectorAll(".pres-dot").forEach((d,i) => d.classList.toggle("active", i===index));

    // Update nav buttons
    const back = document.getElementById("pres-back");
    const next = document.getElementById("pres-next");
    if (back) back.disabled = index === 0;
    if (next) next.textContent = index === this.slides.length-1 ? "Selesai ✓" : "Berikutnya →";

    this.current = index;
  },

  next() {
    if (this.current < this.slides.length - 1) {
      this._renderSlide(this.current + 1);
    } else {
      this.stop();
    }
  },

  prev() {
    if (this.current > 0) this._renderSlide(this.current - 1);
  },

  goTo(index) {
    if (index >= 0 && index < this.slides.length) this._renderSlide(index);
  },

  stop() {
    this.isActive = false;
    const overlay = document.getElementById("pres-overlay");
    if (overlay) overlay.remove();
    document.body.style.overflow = "";
    this._unbindKeys();
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  },

  _requestFS() {
    const el = document.getElementById("pres-overlay");
    if (el && el.requestFullscreen) {
      el.requestFullscreen().catch(() => {}); // graceful fail
    }
  },

  _boundKeyHandler: null,
  _bindKeys() {
    this._unbindKeys();
    this._boundKeyHandler = (e) => {
      if (!this.isActive) return;
      switch(e.key) {
        case "ArrowRight": case " ": e.preventDefault(); this.next(); break;
        case "ArrowLeft": e.preventDefault(); this.prev(); break;
        case "Escape": this.stop(); break;
        case "Home": e.preventDefault(); this._renderSlide(0); break;
        case "End": e.preventDefault(); this._renderSlide(this.slides.length-1); break;
      }
    };
    document.addEventListener("keydown", this._boundKeyHandler);
  },

  _unbindKeys() {
    if (this._boundKeyHandler) {
      document.removeEventListener("keydown", this._boundKeyHandler);
      this._boundKeyHandler = null;
    }
  },

  _bindSwipe() {
    const overlay = document.getElementById("pres-overlay");
    if (!overlay) return;
    overlay.addEventListener("touchstart", (e) => { this.touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    overlay.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].screenX - this.touchStartX;
      if (Math.abs(dx) > 50) { if (dx < 0) this.next(); else this.prev(); }
    }, { passive: true });
  }
};

// Listen for fullscreen exit via browser button
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement && Presentation.isActive) {
    // Don't stop — just stay in overlay mode without fullscreen
  }
});
