/**
 * COM Computer Vision Learning
 * Course Configuration
 *
 * Untuk mengaktifkan materi:
 * Ubah material: false → material: true
 * Ubah practice: false → practice: true
 * Kemudian git add . && git commit -m "..." && git push
 */

const courseConfig = {
  week01: { title: "Introduction to Computer Vision", material: true,  practice: true,  icon: "👁️",  badge: "Fundamentals" },
  week02: { title: "Image Processing Fundamentals",   material: true,  practice: true,  icon: "🖼️",  badge: "Fundamentals" },
  week03: { title: "Image Filtering & Feature Extraction", material: true, practice: true, icon: "🔍", badge: "Fundamentals" },
  week04: { title: "Convolutional Neural Networks",   material: true,  practice: true,  icon: "🧠",  badge: "Deep Learning" },
  week05: { title: "Transfer Learning & Pretrained Vision Models", material: true, practice: true, icon: "🔄", badge: "Deep Learning" },
  week06: { title: "Vision Transformers",             material: false, practice: false, icon: "⚡",  badge: "Advanced" },
  week07: { title: "Multimodal Computer Vision",      material: false, practice: false, icon: "🌐",  badge: "Advanced" },
  week08: { title: "UTS / Midterm Examination",       material: false, practice: false, icon: "📝",  badge: "Evaluation" },
  week09: { title: "Generative Computer Vision",      material: false, practice: false, icon: "🎨",  badge: "Generative" },
  week10: { title: "Basic Computer Vision Tasks",     material: false, practice: false, icon: "📦",  badge: "Tasks" },
  week11: { title: "Video & Video Processing",        material: false, practice: false, icon: "🎥",  badge: "Video" },
  week12: { title: "3D Vision & Scene Reconstruction", material: false, practice: false, icon: "🧊", badge: "3D Vision" },
  week13: { title: "Model Optimization & Deployment", material: false, practice: false, icon: "🚀",  badge: "Deployment" },
  week14: { title: "Synthetic Data & Zero-Shot Computer Vision", material: false, practice: false, icon: "🔮", badge: "Advanced" },
  week15: { title: "Ethics, Bias & Responsible Computer Vision", material: false, practice: false, icon: "⚖️", badge: "Ethics" },
  week16: { title: "UAS / Final Computer Vision Project", material: false, practice: false, icon: "🏆", badge: "Final" }
};

// Helper functions
function isMaterialAvailable(week) {
  return courseConfig[week] && courseConfig[week].material === true;
}
function isPracticeAvailable(week) {
  return courseConfig[week] && courseConfig[week].practice === true;
}
function getWeekKey(num) {
  return "week" + String(num).padStart(2, "0");
}
