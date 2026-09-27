/**
 * COM Computer Vision Learning
 * Quiz Engine
 */

const Quiz = {
  _quizzes: {},

  register(week, questions) {
    this._quizzes[week] = questions;
  },

  render(week, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const qs = this._quizzes[week];
    if (!qs || qs.length === 0) { container.innerHTML = "<p>Tidak ada quiz tersedia.</p>"; return; }

    let html = `<div class="quiz-container" id="quiz-${week}">
      <div class="quiz-header">
        <h4>📝 Quiz — Materi ${String(week.replace("week","")).padStart(2,"0")}</h4>
        <p class="quiz-subtitle">${qs.length} pertanyaan · Pilih jawaban terbaik</p>
      </div>
      <form class="quiz-form" id="quiz-form-${week}" onsubmit="Quiz.submit('${week}'); return false;">`;

    qs.forEach((q, i) => {
      html += `<div class="quiz-question" id="qq-${week}-${i}">
        <p class="question-text"><span class="q-num">${i+1}.</span> ${q.question}</p>
        <div class="quiz-options">`;
      q.options.forEach((opt, j) => {
        const val = String.fromCharCode(65+j);
        html += `<label class="quiz-option">
          <input type="radio" name="q${i}" value="${j}" required>
          <span class="opt-letter">${val}</span>
          <span class="opt-text">${opt}</span>
        </label>`;
      });
      html += `</div></div>`;
    });

    html += `<div class="quiz-footer">
        <button type="submit" class="btn btn-primary quiz-submit-btn">
          <span>Submit Jawaban</span>
        </button>
      </div>
    </form>
    <div class="quiz-result" id="quiz-result-${week}" style="display:none;"></div>
    </div>`;

    container.innerHTML = html;
  },

  submit(week) {
    const qs = this._quizzes[week];
    const form = document.getElementById(`quiz-form-${week}`);
    const resultEl = document.getElementById(`quiz-result-${week}`);
    if (!form || !resultEl) return;

    let correct = 0;
    let feedback = "";

    qs.forEach((q, i) => {
      const selected = form.querySelector(`input[name="q${i}"]:checked`);
      const selectedVal = selected ? parseInt(selected.value) : -1;
      const isCorrect = selectedVal === q.correct;
      if (isCorrect) correct++;

      const qqEl = document.getElementById(`qq-${week}-${i}`);
      if (qqEl) {
        qqEl.classList.toggle("correct", isCorrect);
        qqEl.classList.toggle("incorrect", !isCorrect);
      }

      feedback += `<div class="fb-item ${isCorrect ? 'fb-correct' : 'fb-wrong'}">
        <span class="fb-icon">${isCorrect ? "✓" : "✗"}</span>
        <div><strong>Soal ${i+1}:</strong> ${isCorrect ? "Benar!" : "Salah."}
        <em>${q.explanation}</em></div></div>`;
    });

    const pct = Math.round((correct / qs.length) * 100);
    const passed = pct >= 60;

    resultEl.style.display = "block";
    resultEl.innerHTML = `
      <div class="quiz-score ${passed ? 'passed' : 'failed'}">
        <div class="score-circle">
          <span class="score-num">${pct}%</span>
          <span class="score-label">${passed ? "PASSED ✓" : "TRY AGAIN"}</span>
        </div>
        <div class="score-detail">
          <p>Benar: <strong>${correct} / ${qs.length}</strong></p>
          <p>${passed ? "Selamat! Kamu lulus quiz ini." : "Pelajari kembali materi dan coba lagi."}</p>
        </div>
      </div>
      <div class="quiz-feedback">${feedback}</div>
      <button class="btn btn-outline quiz-retry" onclick="Quiz.retry('${week}')">
        🔄 Coba Lagi
      </button>`;

    if (passed) {
      Progress.mark(week, "quiz");
    }

    resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
  },

  retry(week) {
    const form = document.getElementById(`quiz-form-${week}`);
    const resultEl = document.getElementById(`quiz-result-${week}`);
    if (form) { form.reset(); form.querySelectorAll(".quiz-question").forEach(q => { q.classList.remove("correct","incorrect"); }); }
    if (resultEl) resultEl.style.display = "none";
    form && form.scrollIntoView({ behavior: "smooth" });
  }
};

// ─── Quiz data per week ────────────────────────────────────────────────────
Quiz.register("week01", [
  { question: "Apa yang dimaksud dengan Computer Vision?", options: ["Kemampuan komputer untuk memproses audio","Bidang AI yang memungkinkan komputer menginterpretasikan informasi visual","Teknik enkripsi data gambar","Sistem pengolahan bahasa alami"], correct: 1, explanation: "Computer Vision adalah bidang AI yang memungkinkan mesin melihat, memahami, dan menginterpretasikan data visual seperti gambar dan video." },
  { question: "Berapa jumlah channel pada gambar RGB?", options: ["1","2","3","4"], correct: 2, explanation: "Gambar RGB memiliki 3 channel: Red, Green, dan Blue." },
  { question: "Nilai pixel pada gambar grayscale berkisar antara...", options: ["0–100","0–255","1–256","-128–127"], correct: 1, explanation: "Nilai pixel grayscale berkisar 0 (hitam) hingga 255 (putih)." },
  { question: "Apa perbedaan utama Computer Vision dan Image Processing?", options: ["Tidak ada perbedaan","CV berfokus pada pemahaman makna, IP berfokus pada manipulasi piksel","IP lebih canggih dari CV","CV hanya untuk video"], correct: 1, explanation: "Image Processing fokus pada manipulasi piksel, CV berfokus pada pemahaman semantik/makna dari gambar." },
  { question: "Manakah yang BUKAN aplikasi Computer Vision?", options: ["Deteksi wajah","Pengenalan tulisan tangan","Kompresi audio","Mobil otonom"], correct: 2, explanation: "Kompresi audio adalah domain pemrosesan sinyal audio, bukan Computer Vision." }
]);

Quiz.register("week02", [
  { question: "Apa itu resolusi gambar?", options: ["Jumlah warna dalam gambar","Jumlah pixel dalam dimensi gambar (lebar × tinggi)","Kecerahan rata-rata gambar","Format file gambar"], correct: 1, explanation: "Resolusi gambar mengacu pada jumlah pixel dalam dimensi gambar, misalnya 1920×1080." },
  { question: "Color space HSV terdiri dari komponen...", options: ["Height, Saturation, Value","Hue, Saturation, Value","Hue, Sharpness, Volume","Height, Sharpness, Variance"], correct: 1, explanation: "HSV = Hue (rona warna), Saturation (kejenuhan), Value (kecerahan/brightness)." },
  { question: "Operasi image resizing mengubah...", options: ["Warna gambar","Jumlah channel gambar","Dimensi gambar (lebar dan tinggi)","Nilai piksel individual"], correct: 2, explanation: "Resizing mengubah dimensi gambar — lebar (width) dan tinggi (height) — sesuai ukuran yang diinginkan." },
  { question: "Histogram gambar menampilkan...", options: ["Distribusi posisi piksel","Distribusi nilai intensitas piksel","Distribusi warna berdasarkan lokasi","Distribusi tepi gambar"], correct: 1, explanation: "Histogram gambar menunjukkan distribusi frekuensi nilai intensitas piksel dari 0 hingga 255." },
  { question: "Normalisasi gambar biasanya mengubah nilai piksel menjadi...", options: ["0–255","0–100","0.0–1.0","−1.0–1.0 atau 0.0–1.0"], correct: 3, explanation: "Normalisasi umumnya mengubah nilai piksel ke rentang 0.0–1.0 atau −1.0–1.0 untuk mempermudah proses pelatihan model." }
]);

Quiz.register("week03", [
  { question: "Apa itu kernel dalam konteks image filtering?", options: ["Ukuran file gambar","Matriks kecil yang digunakan dalam operasi konvolusi","Lapisan dalam jaringan saraf","Nilai threshold edge detection"], correct: 1, explanation: "Kernel adalah matriks kecil (misal 3×3) yang diaplikasikan pada gambar melalui operasi konvolusi untuk menghasilkan berbagai efek filter." },
  { question: "Gaussian blur berfungsi untuk...", options: ["Mempertajam tepi gambar","Mendeteksi tepi gambar","Menghaluskan gambar dengan mengurangi noise","Meningkatkan kontras gambar"], correct: 2, explanation: "Gaussian blur menghaluskan gambar menggunakan distribusi Gaussian, efektif mengurangi noise dan detail berlebih." },
  { question: "Operator Canny digunakan untuk...", options: ["Blur gambar","Deteksi tepi (edge detection) yang presisi","Konversi grayscale","Histogram equalization"], correct: 1, explanation: "Canny edge detector adalah algoritma multi-tahap untuk mendeteksi tepi dengan akurasi tinggi dan noise rendah." },
  { question: "Apa perbedaan Gaussian filter dan Median filter?", options: ["Tidak ada perbedaan","Gaussian menggunakan rata-rata tertimbang, Median menggunakan nilai median","Median lebih cepat selalu","Gaussian untuk deteksi tepi"], correct: 1, explanation: "Gaussian filter menggunakan rata-rata tertimbang berbentuk distribusi Gaussian; Median filter menggunakan nilai tengah (median) dari piksel sekitar, lebih baik untuk noise salt-and-pepper." },
  { question: "Operator Sobel mendeteksi tepi dengan cara...", options: ["Mencari piksel bernilai 0","Menghitung gradien intensitas piksel","Mengubah warna menjadi hitam-putih","Membagi gambar menjadi segmen"], correct: 1, explanation: "Sobel operator menghitung gradien intensitas (perubahan nilai piksel) pada arah horizontal dan vertikal untuk mendeteksi tepi." }
]);

Quiz.register("week04", [
  { question: "CNN adalah singkatan dari...", options: ["Central Neural Network","Convolutional Neural Network","Compressed Node Network","Cyclic Neuron Net"], correct: 1, explanation: "CNN = Convolutional Neural Network, arsitektur deep learning yang dirancang khusus untuk memproses data visual." },
  { question: "Apa fungsi operasi Pooling pada CNN?", options: ["Meningkatkan resolusi feature map","Mengurangi dimensi spasial feature map sambil mempertahankan informasi penting","Menambah jumlah filter","Menghitung loss function"], correct: 1, explanation: "Pooling (Max/Average) mengurangi dimensi spasial feature map, mengurangi parameter, dan membantu model lebih tahan terhadap variasi posisi." },
  { question: "Fungsi aktivasi ReLU didefinisikan sebagai...", options: ["f(x) = x²","f(x) = max(0, x)","f(x) = 1/(1+e⁻ˣ)","f(x) = tanh(x)"], correct: 1, explanation: "ReLU (Rectified Linear Unit): f(x) = max(0, x). Mengubah nilai negatif menjadi 0, mempertahankan nilai positif." },
  { question: "Feature Map dalam CNN adalah...", options: ["Peta lokasi objek dalam gambar","Output dari operasi konvolusi yang merepresentasikan fitur terdeteksi","File konfigurasi model","Daftar label klasifikasi"], correct: 1, explanation: "Feature map adalah output dari layer konvolusi, berisi representasi fitur-fitur yang terdeteksi filter/kernel pada input gambar." },
  { question: "Fully Connected Layer pada CNN berfungsi untuk...", options: ["Mengekstrak fitur lokal","Melakukan operasi konvolusi","Menggabungkan semua fitur dan menghasilkan prediksi akhir","Mengurangi overfitting"], correct: 2, explanation: "Fully Connected Layer (FC Layer) menerima fitur dari lapisan sebelumnya dan menghasilkan output akhir (skor kelas) untuk klasifikasi." }
]);

Quiz.register("week05", [
  { question: "Transfer Learning adalah...", options: ["Melatih model dari nol","Menggunakan pengetahuan dari model yang telah terlatih untuk tugas baru","Mentransfer data antar device","Mengubah arsitektur model"], correct: 1, explanation: "Transfer Learning memanfaatkan pengetahuan (bobot) yang telah dipelajari model pada dataset besar untuk diaplikasikan ke tugas/dataset baru." },
  { question: "Pretrained model seperti ResNet dan VGG dilatih menggunakan dataset...", options: ["MNIST","CIFAR-10","ImageNet","Pascal VOC"], correct: 2, explanation: "Model populer seperti ResNet, VGG, EfficientNet umumnya dilatih pada ImageNet (1.2 juta gambar, 1000 kelas)." },
  { question: "Fine-tuning berbeda dari Feature Extraction karena...", options: ["Feature Extraction lebih akurat","Fine-tuning memperbarui (update) bobot pretrained model, Feature Extraction membekukan (freeze) bobot tersebut","Feature Extraction menggunakan optimizer berbeda","Tidak ada perbedaan"], correct: 1, explanation: "Fine-tuning melatih ulang sebagian/semua bobot pretrained model pada data baru; Feature Extraction membekukan bobot pretrained dan hanya melatih layer baru." },
  { question: "Confusion Matrix digunakan untuk...", options: ["Mengukur kecepatan model","Mengevaluasi performa model klasifikasi secara detail per kelas","Menghitung jumlah parameter model","Memilih learning rate"], correct: 1, explanation: "Confusion Matrix menampilkan distribusi prediksi benar/salah per kelas, memudahkan analisis kesalahan klasifikasi." },
  { question: "Mengapa Transfer Learning lebih efisien dari training from scratch?", options: ["Karena menggunakan GPU lebih sedikit","Karena tidak perlu data sama sekali","Karena memanfaatkan fitur yang sudah dipelajari dari dataset besar, sehingga butuh data dan waktu lebih sedikit","Karena model lebih kecil"], correct: 2, explanation: "Transfer Learning efisien karena model sudah 'belajar' mengenali fitur umum (tepi, tekstur, bentuk) dari dataset besar — kita hanya perlu mengadaptasikan untuk tugas spesifik kita." }
]);
