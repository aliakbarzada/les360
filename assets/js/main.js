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

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const layoutButtons = document.querySelectorAll('.layout-btn');
const bodyEl = document.body;
const layoutStorageKey = 'lex360-hero-layout';

if (layoutButtons.length && bodyEl) {
  const applyLayout = (mode) => {
    const safeMode = mode === 'compact' ? 'compact' : 'full';
    bodyEl.classList.remove('layout-full', 'layout-compact');
    bodyEl.classList.add(`layout-${safeMode}`);
    layoutButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.layout === safeMode);
    });
  };

  const savedLayout = localStorage.getItem(layoutStorageKey);
  if (savedLayout) {
    applyLayout(savedLayout);
  } else {
    const initial = bodyEl.classList.contains('layout-compact') ? 'compact' : 'full';
    applyLayout(initial);
  }

  layoutButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const mode = button.dataset.layout;
      applyLayout(mode);
      localStorage.setItem(layoutStorageKey, mode);
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
