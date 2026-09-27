# COM – Computer Vision Learning Platform

Platform pembelajaran Computer Vision berbasis web untuk **Program Studi Teknik Komputer, Universitas Warmadewa**.

[![Static HTML](https://img.shields.io/badge/stack-HTML%2FCSS%2FJS-blue)](.)
[![No Build Step](https://img.shields.io/badge/build-none%20required-green)](.)
[![GitHub Pages Ready](https://img.shields.io/badge/deploy-GitHub%20Pages-brightgreen)](.)

---

## 🚀 Demo & Deployment

Deploy langsung ke GitHub Pages — tidak perlu server, database, atau build tool.

```
URL GitHub Pages: https://<username>.github.io/<repo-name>/
```

---

## 📁 Struktur Proyek

```
cv-learning/
├── index.html                  # Halaman beranda
├── about.html                  # Tentang platform
├── references.html             # Referensi & sumber belajar
│
├── materials/
│   ├── material-01.html        # Pengantar Computer Vision        ✅ Published
│   ├── material-02.html        # Pengolahan Gambar & Color Space  ✅ Published
│   ├── material-03.html        # Filtering & Konvolusi            ✅ Published
│   ├── material-04.html        # Arsitektur CNN                   ✅ Published
│   ├── material-05.html        # Transfer Learning & Fine-Tuning  ✅ Published
│   ├── material-06.html        # Vision Transformers (ViT)        🔒 Coming Soon
│   ├── material-07.html        # CLIP & Multimodal Vision         🔒 Coming Soon
│   ├── material-08.html        # GANs & Diffusion Models          🔒 Coming Soon
│   ├── material-09.html        # Object Detection                 🔒 Coming Soon
│   ├── material-10.html        # Image Segmentation               🔒 Coming Soon
│   ├── material-11.html        # Video Understanding              🔒 Coming Soon
│   ├── material-12.html        # 3D Vision & Depth Estimation     🔒 Coming Soon
│   ├── material-13.html        # Model Optimization               🔒 Coming Soon
│   ├── material-14.html        # CV in Production                 🔒 Coming Soon
│   ├── material-15.html        # Medical & Scientific CV          🔒 Coming Soon
│   └── material-16.html        # Ethics & Bias in CV              🔒 Coming Soon
│
├── practical/
│   ├── practical-01.html       # Eksplorasi Gambar dengan Python  ✅ Published
│   ├── practical-02.html       # Color Space & Augmentasi         ✅ Published
│   ├── practical-03.html       # Filter & Edge Detection          ✅ Published
│   ├── practical-04.html       # CNN dengan CIFAR-10              ✅ Published
│   ├── practical-05.html       # Transfer Learning ResNet-50      ✅ Published
│   └── practical-06 … 16.html  # Coming Soon                      🔒 Coming Soon
│
├── assets/
│   ├── css/
│   │   └── style.css           # Stylesheet utama (CSS Variables + Dark Mode)
│   ├── js/
│   │   ├── course-config.js    # Konfigurasi 16 materi & helper functions
│   │   ├── progress.js         # Progress tracking (localStorage)
│   │   ├── quiz.js             # Quiz engine + soal 5 materi
│   │   ├── presentation.js     # Fullscreen Presentation Mode
│   │   └── main.js             # Theme, sidebar, search, copy-code
│   └── img/
│       └── logo-TKOM.png       # Logo institusi (letakkan file di sini)
│
└── svg/  (inline dalam HTML)
    ├── computer-vision-pipeline.svg
    ├── image-pixel.svg
    ├── cnn-architecture.svg
    └── transfer-learning.svg
```

---

## ✨ Fitur Utama

| Fitur | Keterangan |
|---|---|
| 🖥️ **Presentation Mode** | Fullscreen slideshow per materi. Keyboard: `→` / `Space` = Next, `←` = Back, `Esc` = Keluar, `Home` / `End` = Awal/Akhir |
| 🌙 **Dark Mode** | Toggle tema terang/gelap, preferensi tersimpan di `localStorage` |
| 🔍 **Search** | Pencarian real-time seluruh materi dari header |
| 📊 **Progress Tracking** | Teori ✓, Praktikum ✓, Kuis ✓ per minggu — tersimpan di `localStorage` |
| 🧠 **Kuis Interaktif** | 5 soal per materi, pass ≥ 60%, dengan penjelasan jawaban |
| 📋 **Copy Code** | Tombol copy satu klik di setiap code block |
| 📱 **Mobile Responsive** | Sidebar menjadi drawer di layar ≤768px |

---

## 🛠️ Cara Menjalankan Lokal

Karena semua file adalah static HTML, cukup buka dengan browser **atau** jalankan server lokal sederhana:

```bash
# Python 3
cd cv-learning
python -m http.server 8080
# Buka: http://localhost:8080

# Node.js (npx)
npx serve .
# Buka: http://localhost:3000
```

> ⚠️ Jangan buka `index.html` langsung dengan `file://` — beberapa browser memblokir pemuatan JS dari path lokal.

---

## 🚢 Deploy ke GitHub Pages

1. Buat repository baru di GitHub
2. Upload seluruh isi folder `cv-learning/` ke branch `main`
3. Pergi ke **Settings → Pages → Source: Deploy from branch → main → / (root)**
4. Tunggu ~1 menit, site aktif di `https://<username>.github.io/<repo>/`

---

## 🖼️ Menambahkan Logo

Letakkan file logo institusi di:
```
assets/img/logo-TKOM.png
```
Disarankan ukuran **200×200px** atau lebih, format PNG dengan background transparan.
Semua `<img>` logo menggunakan `onerror="this.style.display='none'"` sehingga site tetap berfungsi meski file belum ada.

---

## 📝 Menambahkan Materi Baru (Materi 06–16)

Untuk membuka kunci materi yang masih "Coming Soon":

1. **Edit `assets/js/course-config.js`** — ubah `material: false` menjadi `material: true` untuk minggu yang ingin dipublish:
   ```js
   week06: {
     num: '06', title: 'Vision Transformers (ViT)',
     material: true,   // ← ubah dari false ke true
     ...
   }
   ```

2. **Ganti konten `materials/material-06.html`** — hapus blok coming-soon dan isi dengan konten materi sesungguhnya (ikuti struktur `material-01.html` sebagai template).

3. **Buat `practical/practical-06.html`** — ikuti struktur `practical-01.html`.

4. **Tambah soal kuis di `assets/js/quiz.js`** — tambahkan entry `Quiz.register('week06', [...])`.

---

## 🏗️ Stack Teknologi

| Komponen | Teknologi | Alasan |
|---|---|---|
| Frontend | HTML5, CSS3, Vanilla JS | Tanpa build step, deploy mudah |
| Styling | CSS Custom Properties | Dark mode bawaan |
| Syntax Highlight | Prism.js (CDN) | Ringan, tanpa dependensi |
| Font | Inter + JetBrains Mono (Google Fonts) | Profesional, readable |
| Hosting | GitHub Pages | Gratis, reliable |
| Praktikum | Google Colab Notebooks | GPU gratis untuk mahasiswa |

---

## 📚 Referensi Utama

- [Hugging Face Computer Vision Course](https://huggingface.co/learn/computer-vision-course) — sumber utama
- [CS231n Stanford](https://cs231n.stanford.edu/) — fondasi CNN
- [Deep Learning Book](https://www.deeplearningbook.org/) — Goodfellow et al.
- [Computer Vision: Algorithms and Applications](https://szeliski.org/Book/) — Szeliski

---

## 📄 Lisensi

Bebas digunakan untuk keperluan **edukasi non-komersial**.
Konten bersifat *open educational resource*.

---

*Program Studi Teknik Komputer — Universitas Warmadewa, Denpasar, Bali*
