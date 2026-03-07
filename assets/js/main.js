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


const serviceCards = document.querySelectorAll('.service-card');
const serviceModal = document.getElementById('serviceModal');

if (serviceCards.length && serviceModal) {
  const modalTitle = document.getElementById('serviceModalTitle');
  const modalLead = document.getElementById('serviceModalLead');
  const modalList = document.getElementById('serviceModalList');
  const modalImage = document.getElementById('serviceModalImage');
  const modalCloseControls = serviceModal.querySelectorAll('[data-close-modal]');
  let lastTrigger = null;

  const openServiceModal = (card, trigger) => {
    const title = card.querySelector('h3')?.textContent?.trim() || '';
    const lead = card.querySelector('.service-lead')?.textContent?.trim() || '';
    const image = card.querySelector('.service-media img');
    const items = Array.from(card.querySelectorAll('.service-list li')).map((item) => item.textContent.trim());

    modalTitle.textContent = title;
    modalLead.textContent = lead;
    modalImage.src = image?.src || '';
    modalImage.alt = image?.alt || title;
    modalList.innerHTML = items.map((item) => `<li>${item}</li>`).join('');

    serviceModal.hidden = false;
    serviceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lastTrigger = trigger;
  };

  const closeServiceModal = () => {
    serviceModal.setAttribute('aria-hidden', 'true');
    serviceModal.hidden = true;
    document.body.style.overflow = '';
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  };

  serviceCards.forEach((card) => {
    card.addEventListener('click', (event) => {
      const trigger = card.querySelector('.service-trigger');
      if (!trigger) return;
      if (event.target.closest('.service-trigger') || event.target.closest('.service-media') || event.target.closest('.service-text')) {
        openServiceModal(card, trigger);
      }
    });

    const trigger = card.querySelector('.service-trigger');
    if (trigger) {
      trigger.addEventListener('click', (event) => {
        event.stopPropagation();
        openServiceModal(card, trigger);
      });
    }
  });

  modalCloseControls.forEach((control) => {
    control.addEventListener('click', closeServiceModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && serviceModal.getAttribute('aria-hidden') === 'false') {
      closeServiceModal();
    }
  });
}
