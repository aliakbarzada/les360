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
/* ===== EMAILJS (FORMULARIOS) = */
/* ============================= */

document.addEventListener("DOMContentLoaded", function () {

  emailjs.init("FKROXwG8610HmsaSQ");

  const setFormMessage = (form, message, type = "success") => {
    let feedback = form.querySelector('.form-feedback');

    if (!feedback) {
      feedback = document.createElement('p');
      feedback.className = 'form-feedback';
      feedback.setAttribute('role', 'status');
      feedback.setAttribute('aria-live', 'polite');
      form.appendChild(feedback);
    }

    feedback.textContent = message;
    feedback.style.color = type === 'success' ? '#0f7b43' : '#b42318';
    feedback.style.fontWeight = '600';
    feedback.style.marginTop = '0.75rem';
  };

  /* ============================= */
  /* ===== FORMULARIO INDEX ====== */
  /* ============================= */

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs.sendForm(
        "service_h289ntr",
        "template_h38gure",
        this
      ).then(
        () => {
          setFormMessage(contactForm, "✅ Correo enviado correctamente. Te contactaremos pronto.");
          contactForm.reset();
          setTimeout(() => {
            window.location.reload();
          }, 1800);
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setFormMessage(contactForm, "❌ No se pudo enviar el correo. Inténtalo nuevamente.", "error");
        }
      );
    });
  }


  /* ============================= */
  /* ===== FORMULARIO AREAS ====== */
  /* ============================= */

  const leadForm = document.getElementById("leadForm");

  if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs.sendForm(
        "service_h289ntr",
        "template_xg6p48k",
        this
      ).then(
        () => {
          setFormMessage(leadForm, "✅ Correo enviado correctamente. Te contactaremos pronto.");
          leadForm.reset();
          setTimeout(() => {
            window.location.reload();
          }, 1800);
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setFormMessage(leadForm, "❌ No se pudo enviar el correo. Inténtalo nuevamente.", "error");
        }
      );
    });
  }

});


const serviceCards = document.querySelectorAll('.service-card');
const serviceModal = document.getElementById('serviceModal');

if (serviceCards.length && serviceModal) {
  const modalTitle = document.getElementById('serviceModalTitle');
  const modalLead = document.getElementById('serviceModalLead');
  const modalList = document.getElementById('serviceModalList');
  const modalImage = document.getElementById('serviceModalImage');
  const modalCloseControls = serviceModal.querySelectorAll('[data-close-modal]');
  const focusableSelector = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');
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
    trigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    lastTrigger = trigger;

    const initialFocusTarget = serviceModal.querySelector('.service-modal__close');
    if (initialFocusTarget) {
      initialFocusTarget.focus();
    }
  };

  const closeServiceModal = () => {
    serviceModal.setAttribute('aria-hidden', 'true');
    serviceModal.hidden = true;
    document.body.style.overflow = '';
    if (lastTrigger) {
      lastTrigger.setAttribute('aria-expanded', 'false');
      lastTrigger.focus();
      lastTrigger = null;
    }
  };

  serviceCards.forEach((card) => {
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
    const isOpen = serviceModal.getAttribute('aria-hidden') === 'false';
    if (!isOpen) {
      return;
    }

    if (event.key === 'Escape') {
      closeServiceModal();
      return;
    }

    if (event.key === 'Tab') {
      const focusableElements = Array.from(serviceModal.querySelectorAll(focusableSelector));
      if (!focusableElements.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });
}
