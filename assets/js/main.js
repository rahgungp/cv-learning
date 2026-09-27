/**
 * COM Computer Vision Learning
 * Main JavaScript
 */

// ─── Dark Mode ──────────────────────────────────────────────────────────────
const Theme = {
  _key: "cvl_theme",
  init() {
    const saved = localStorage.getItem(this._key) || "light";
    this.apply(saved);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", () => this.toggle());
  },
  apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = theme === "dark" ? "☀ Light" : "🌙 Dark";
    localStorage.setItem(this._key, theme);
  },
  toggle() {
    const cur = document.documentElement.getAttribute("data-theme") || "light";
    this.apply(cur === "dark" ? "light" : "dark");
  }
};

// ─── Sidebar ────────────────────────────────────────────────────────────────
function buildSidebar() {
  const container = document.getElementById("sidebar-nav");
  if (!container || typeof courseConfig === "undefined") return;

  const titles = {
    week01:"Introduction to Computer Vision",
    week02:"Image Processing Fundamentals",
    week03:"Image Filtering & Feature Extraction",
    week04:"Convolutional Neural Networks",
    week05:"Transfer Learning",
    week06:"Vision Transformers",
    week07:"Multimodal CV",
    week08:"UTS / Midterm",
    week09:"Generative CV",
    week10:"Basic CV Tasks",
    week11:"Video Processing",
    week12:"3D Vision",
    week13:"Model Optimization",
    week14:"Synthetic Data & Zero-Shot",
    week15:"Ethics & Bias",
    week16:"UAS / Final Project"
  };

  let html = "";
  Object.keys(courseConfig).forEach((week, i) => {
    const num = String(i+1).padStart(2,"0");
    const cfg = courseConfig[week];
    const locked = !cfg.material;
    const title = titles[week] || cfg.title;
    const href = locked ? "#" : `../materials/material-${num}.html`;
    const cls = locked ? "sidebar-item locked" : "sidebar-item";
    const icon = locked ? "🔒" : cfg.icon || "📖";
    html += `<a href="${href}" class="${cls}" ${locked ? 'aria-disabled="true"' : ""}>
      <span class="sidebar-num">${num}</span>
      <span class="sidebar-icon">${icon}</span>
      <span class="sidebar-title">${title}</span>
    </a>`;
  });
  container.innerHTML = html;

  // Highlight active
  const cur = window.location.pathname;
  container.querySelectorAll("a[href]").forEach(a => {
    if (cur.includes(a.getAttribute("href").replace("../",""))) {
      a.classList.add("active");
    }
  });
}

// ─── Copy Code ──────────────────────────────────────────────────────────────
function initCopyButtons() {
  document.querySelectorAll(".code-block").forEach(block => {
    if (block.querySelector(".copy-btn")) return;
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.setAttribute("aria-label", "Copy code");
    btn.onclick = () => {
      const code = block.querySelector("code") || block;
      navigator.clipboard.writeText(code.textContent.trim()).then(() => {
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 2000);
      });
    };
    block.style.position = "relative";
    block.appendChild(btn);
  });
}

// ─── Search ─────────────────────────────────────────────────────────────────
const searchData = [
  { num:"01", title:"Introduction to Computer Vision", keys:"pixel rgb grayscale pipeline aplikasi digital image", url:"materials/material-01.html", available:true },
  { num:"02", title:"Image Processing Fundamentals", keys:"resize crop rotate hsv histogram normalization enhancement", url:"materials/material-02.html", available:true },
  { num:"03", title:"Image Filtering & Feature Extraction", keys:"kernel convolution gaussian sobel laplacian canny edge detection blur", url:"materials/material-03.html", available:true },
  { num:"04", title:"Convolutional Neural Networks", keys:"cnn deep learning feature map relu pooling fully connected classification", url:"materials/material-04.html", available:true },
  { num:"05", title:"Transfer Learning & Pretrained Vision Models", keys:"vgg resnet fine-tuning feature extraction pretrained model evaluation", url:"materials/material-05.html", available:true },
  { num:"06", title:"Vision Transformers", keys:"transformer attention vit patch embedding positional encoding", url:"materials/material-06.html", available:false },
  { num:"07", title:"Multimodal Computer Vision", keys:"clip multimodal vision language image text similarity retrieval", url:"materials/material-07.html", available:false },
  { num:"08", title:"UTS / Midterm Examination", keys:"uts ujian tengah semester evaluasi", url:"materials/material-08.html", available:false },
  { num:"09", title:"Generative Computer Vision", keys:"gan diffusion generative models image generation", url:"materials/material-09.html", available:false },
  { num:"10", title:"Basic Computer Vision Tasks", keys:"detection segmentation object detection instance semantic", url:"materials/material-10.html", available:false },
  { num:"11", title:"Video & Video Processing", keys:"video frame fps temporal tracking classification", url:"materials/material-11.html", available:false },
  { num:"12", title:"3D Vision & Scene Reconstruction", keys:"3d depth point cloud rendering reconstruction", url:"materials/material-12.html", available:false },
  { num:"13", title:"Model Optimization & Deployment", keys:"quantization onnx openvino tensorrt edge ai deployment", url:"materials/material-13.html", available:false },
  { num:"14", title:"Synthetic Data & Zero-Shot Computer Vision", keys:"synthetic data augmentation zero-shot classification vision language", url:"materials/material-14.html", available:false },
  { num:"15", title:"Ethics, Bias & Responsible Computer Vision", keys:"bias fairness privacy responsible ai ethics facial recognition", url:"materials/material-15.html", available:false },
  { num:"16", title:"UAS / Final Computer Vision Project", keys:"final project uas object detection segmentation report presentation", url:"materials/material-16.html", available:false }
];

function initSearch() {
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  if (!input || !results) return;

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ""; results.style.display = "none"; return; }

    const matches = searchData.filter(d =>
      d.title.toLowerCase().includes(q) || d.keys.includes(q)
    );

    if (matches.length === 0) {
      results.innerHTML = `<div class="search-empty">Tidak ada hasil untuk "<strong>${q}</strong>"</div>`;
    } else {
      results.innerHTML = matches.map(m => `
        <a class="search-item ${m.available ? "" : "search-locked"}"
           href="${m.available ? m.url : "#"}"
           ${m.available ? "" : 'aria-disabled="true"'}>
          <span class="search-num">${m.num}</span>
          <span class="search-title">${m.title}</span>
          ${m.available ? "" : '<span class="search-badge">🔒 Coming Soon</span>'}
        </a>`).join("");
    }
    results.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#search-wrapper")) {
      results.style.display = "none";
    }
  });
}

// ─── Mobile Sidebar Toggle ───────────────────────────────────────────────────
function initMobileSidebar() {
  const toggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  if (toggle && sidebar) {
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      toggle.setAttribute("aria-expanded", sidebar.classList.contains("open"));
    });
  }
}

// ─── Mark Theory Complete ────────────────────────────────────────────────────
function markTheoryRead(week) {
  if (typeof Progress !== "undefined") {
    Progress.mark(week, "theory");
    const btn = document.getElementById("btn-mark-theory");
    if (btn) { btn.textContent = "✓ Materi Dibaca"; btn.disabled = true; btn.classList.add("completed"); }
  }
}

// ─── Init ────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  Theme.init();
  buildSidebar();
  initCopyButtons();
  initSearch();
  initMobileSidebar();

  // Syntax highlighting
  if (typeof Prism !== "undefined") Prism.highlightAll();
});
