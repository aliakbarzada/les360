(function () {
  'use strict';

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  const slides = $$('.slide');
  const prevBtn = $('.control.prev');
  const nextBtn = $('.control.next');
  let currentIndex = 0;
  let sliderInterval = null;

  if (slides.length) {
    const showSlide = (index) => {
      slides.forEach((slide, idx) => slide.classList.toggle('active', idx === index));
      currentIndex = index;
    };

    const nextSlide = () => showSlide((currentIndex + 1) % slides.length);
    const prevSlide = () => showSlide((currentIndex - 1 + slides.length) % slides.length);
    const startSlider = () => { sliderInterval = window.setInterval(nextSlide, 6000); };
    const resetSlider = () => {
      window.clearInterval(sliderInterval);
      startSlider();
    };

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        prevSlide();
        resetSlider();
      });
      nextBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        nextSlide();
        resetSlider();
      });
    }

    slides.forEach((slide) => {
      slide.addEventListener('click', () => {
        const target = slide.dataset.target;
        const url = slide.dataset.url;
        if (target) {
          const targetEl = $(target);
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

  const nav = $('.main-nav');
  const navToggle = $('.nav-toggle');
  const navMenu = $('#nav-menu');

  if (nav && navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
    });

    $$('a', navMenu).forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const setFormMessage = (form, message, type = 'success') => {
    let feedback = $('.form-feedback', form);
    if (!feedback) {
      feedback = document.createElement('p');
      feedback.className = 'form-feedback';
      feedback.setAttribute('role', 'status');
      feedback.setAttribute('aria-live', 'polite');
      form.appendChild(feedback);
    }
    feedback.textContent = message;
    feedback.dataset.type = type;
  };

  const sendForm = async (form, formType) => {
    const submitButton = $('button[type="submit"]', form);
    const formData = new FormData(form);
    const payload = { formType };
    formData.forEach((value, key) => { payload[key] = String(value || '').trim(); });

    try {
      if (submitButton) submitButton.disabled = true;
      const response = await fetch('api/send-mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.message || 'No se pudo enviar el correo.');
      setFormMessage(form, result.message || 'Correo enviado correctamente. Te contactaremos pronto.');
      form.reset();
    } catch (error) {
      console.error('LEX360 form error:', error);
      setFormMessage(form, error.message || 'No se pudo enviar el correo. Inténtalo nuevamente.', 'error');
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  };

  const contactForm = $('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      sendForm(contactForm, 'contact');
    });
  }

  const leadForm = $('#leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (event) => {
      event.preventDefault();
      sendForm(leadForm, 'lead');
    });
  }

  const serviceCards = $$('.service-card');
  const serviceModal = $('#serviceModal');

  if (serviceCards.length && serviceModal) {
    const modalTitle = $('#serviceModalTitle');
    const modalLead = $('#serviceModalLead');
    const modalList = $('#serviceModalList');
    const modalImage = $('#serviceModalImage');
    const modalCloseControls = $$('[data-close-modal]', serviceModal);
    const focusableSelector = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');
    let lastTrigger = null;

    const openServiceModal = (card, trigger) => {
      const title = $('h3', card)?.textContent?.trim() || '';
      const lead = $('.service-lead', card)?.textContent?.trim() || '';
      const image = $('.service-media img', card);
      const items = $$('.service-list li', card).map((item) => item.textContent.trim());

      if (modalTitle) modalTitle.textContent = title;
      if (modalLead) modalLead.textContent = lead;
      if (modalImage) {
        modalImage.setAttribute('src', image?.getAttribute('src') || '');
        modalImage.setAttribute('alt', image?.getAttribute('alt') || title);
      }
      if (modalList) {
        modalList.textContent = '';
        items.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item;
          modalList.appendChild(li);
        });
      }

      serviceModal.hidden = false;
      serviceModal.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      lastTrigger = trigger;
      $('.service-modal__close', serviceModal)?.focus();
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
      const trigger = $('.service-trigger', card);
      if (trigger) {
        trigger.addEventListener('click', (event) => {
          event.stopPropagation();
          openServiceModal(card, trigger);
        });
      }
    });

    modalCloseControls.forEach((control) => control.addEventListener('click', closeServiceModal));

    document.addEventListener('keydown', (event) => {
      if (serviceModal.getAttribute('aria-hidden') !== 'false') return;
      if (event.key === 'Escape') {
        closeServiceModal();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusableElements = $$(focusableSelector, serviceModal);
      if (!focusableElements.length) return;

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
    });
  }
}());
