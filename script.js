// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn?.addEventListener("click", () => nav.classList.toggle("open"));
document.addEventListener("click", (e) => {
  if (!nav || !menuBtn) return;
  const inside = nav.contains(e.target) || menuBtn.contains(e.target);
  if (!inside) nav.classList.remove("open");
});

// Hero background rotation (mimic modern homepage feel)
const heroBg = document.getElementById("heroBg");
const bgImages = [
  "images/s14.jpeg",
  "images/s1.jpeg",
  "images/s11.jpeg",
  "images/s3.jpeg"
];
let bgIndex = 0;
setInterval(() => {
  bgIndex = (bgIndex + 1) % bgImages.length;
  heroBg.style.backgroundImage = `url("${bgImages[bgIndex]}")`;
}, 5000);

// Modal "Watch Now"
const watchBtn = document.getElementById("watchBtn");
const videoModal = document.getElementById("videoModal");
const closeModal = document.getElementById("closeModal");

watchBtn?.addEventListener("click", () => {
  videoModal.classList.add("open");
  videoModal.setAttribute("aria-hidden", "false");
});
closeModal?.addEventListener("click", () => {
  videoModal.classList.remove("open");
  videoModal.setAttribute("aria-hidden", "true");
});
videoModal?.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    videoModal.classList.remove("open");
    videoModal.setAttribute("aria-hidden", "true");
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    videoModal?.classList.remove("open");
    videoModal?.setAttribute("aria-hidden", "true");
  }
});

// EmailJS (optional real sending)
// Replace these with your EmailJS values if you want live sending:
const EMAILJS_PUBLIC_KEY = "PASTE_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "PASTE_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "PASTE_TEMPLATE_ID";

function emailjsReady(){
  return window.emailjs &&
    !EMAILJS_PUBLIC_KEY.includes("PASTE_") &&
    !EMAILJS_SERVICE_ID.includes("PASTE_") &&
    !EMAILJS_TEMPLATE_ID.includes("PASTE_");
}

try { if (window.emailjs) emailjs.init(EMAILJS_PUBLIC_KEY); } catch (_) {}

// Discovery form
const discoveryForm = document.getElementById("discoveryForm");
const formNote = document.getElementById("formNote");

discoveryForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!emailjsReady()) {
    formNote.textContent = "Email sending not set yet. Paste EmailJS keys in script.js.";
    return;
  }
  formNote.textContent = "Sending...";
  try {
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, discoveryForm);
    formNote.textContent = "✅ Request sent. We will contact you soon.";
    discoveryForm.reset();
  } catch {
    formNote.textContent = "❌ Failed to send. Please try again or WhatsApp us.";
  }
});

// Contact form
const quoteForm = document.getElementById("quoteForm");
const quoteNote = document.getElementById("quoteNote");

quoteForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!emailjsReady()) {
    quoteNote.textContent = "Email sending not set yet. Paste EmailJS keys in script.js.";
    return;
  }
  quoteNote.textContent = "Sending...";
  try {
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, quoteForm);
    quoteNote.textContent = "✅ Message sent successfully!";
    quoteForm.reset();
  } catch {
    quoteNote.textContent = "❌ Failed to send. Please try again or WhatsApp us.";
  }
});
