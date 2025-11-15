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

const heroModeButtons = document.querySelectorAll('[data-hero-mode]');
if (heroModeButtons.length) {
  const bodyEl = document.body;
  const heroModeClasses = ['hero-mode-full', 'hero-mode-compact'];

  const applyHeroMode = (mode) => {
    const normalizedMode = mode === 'full' ? 'full' : 'compact';
    heroModeClasses.forEach((cls) => bodyEl.classList.remove(cls));
    bodyEl.classList.add(`hero-mode-${normalizedMode}`);
    heroModeButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.heroMode === normalizedMode);
    });
  };

  const getStoredMode = () => {
    try {
      return localStorage.getItem('lex360-hero-mode');
    } catch (error) {
      return null;
    }
  };

  const setStoredMode = (mode) => {
    try {
      localStorage.setItem('lex360-hero-mode', mode);
    } catch (error) {
      /* ignore */
    }
  };

  const initialMode = getStoredMode() || (bodyEl.classList.contains('hero-mode-full') ? 'full' : 'compact');
  applyHeroMode(initialMode);

  heroModeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const mode = button.dataset.heroMode;
      applyHeroMode(mode);
      setStoredMode(mode);
    });
  });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
