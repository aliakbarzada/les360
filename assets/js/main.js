const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.control.prev');
const nextBtn = document.querySelector('.control.next');
let currentIndex = 0;
let sliderInterval;

if (slides.length) {
  const showSlide = (index) => {
    slides.forEach((slide, idx) => slide.classList.toggle('active', idx === index));
    currentIndex = index;
  };

  const nextSlide = () => showSlide((currentIndex + 1) % slides.length);
  const prevSlide = () => showSlide((currentIndex - 1 + slides.length) % slides.length);
  const startSlider = () => (sliderInterval = setInterval(nextSlide, 6000));
  const resetSlider = () => {
    clearInterval(sliderInterval);
    startSlider();
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetSlider();
    });
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetSlider();
    });
  }

  slides.forEach((slide) => {
    const target = slide.dataset.target;
    const url = slide.dataset.url;
    slide.addEventListener('click', () => {
      if (target) {
        const targetEl = document.querySelector(target);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      if (url) window.location.href = url;
    });
  });

  showSlide(0);
  startSlider();
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const serviceToggles = document.querySelectorAll('.service-toggle');
serviceToggles.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.service-card');
    if (!card) return;
    const isOpen = card.classList.toggle('is-open');
    button.textContent = isOpen ? 'Ocultar información' : 'Ver información';
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

const modalLinks = document.querySelectorAll('[data-modal-target]');
const overlay = document.getElementById('modal-overlay');
const closeModal = () => {
  document.querySelectorAll('.modal').forEach((modal) => (modal.hidden = true));
  if (overlay) overlay.hidden = true;
};

modalLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const modalId = link.getAttribute('data-modal-target');
    const modal = modalId ? document.getElementById(modalId) : null;
    if (!modal) return;
    modal.hidden = false;
    if (overlay) overlay.hidden = false;
  });
});

if (overlay) overlay.addEventListener('click', closeModal);
document.querySelectorAll('.modal-close').forEach((btn) => btn.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

document.addEventListener('DOMContentLoaded', () => {
  if (typeof emailjs === 'undefined') return;
  emailjs.init('FKROXwG8610HmsaSQ');

  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    emailjs.sendForm('service_h289ntr', 'template_h38gure', this, 'FKROXwG8610HmsaSQ').then(
      () => {
        alert('✅ Correo enviado correctamente');
        form.reset();
      },
      (error) => {
        console.error('EmailJS Error:', error);
        alert('❌ Error al enviar el correo');
      }
    );
  });
});
