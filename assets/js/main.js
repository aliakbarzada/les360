const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.control.prev');
const nextBtn = document.querySelector('.control.next');
let currentIndex = 0;
let sliderInterval;

if (slides.length) {
  const showSlide = (index) => {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });
    currentIndex = index;
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  };

  const startSlider = () => {
    sliderInterval = setInterval(nextSlide, 6000);
  };

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

      if (url) {
        window.location.href = url;
      }
    });
  });

  showSlide(0);
  startSlider();
}


const nav = document.querySelector('.main-nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (nav && navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* ============================= */
/* ===== EMAILJS (ESTABLE) ===== */
/* ============================= */

document.addEventListener("DOMContentLoaded", function () {

  emailjs.init("FKROXwG8610HmsaSQ");

  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_h289ntr",
      "template_h38gure",
      this,
      "FKROXwG8610HmsaSQ"
    ).then(
      () => {
        alert("✅ Correo enviado correctamente");
        form.reset();
      },
      (error) => {
        console.error("EmailJS Error:", error);
        alert("❌ Error al enviar el correo");
      }
    );
  });

});
