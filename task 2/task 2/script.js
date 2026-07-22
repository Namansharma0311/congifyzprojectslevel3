document.addEventListener('DOMContentLoaded', () => {

  /* ========== SHAKE LETTERS ========== */
  document.querySelectorAll('.shake-line').forEach(line => {
    const text = line.getAttribute('data-text');
    line.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.className = 'shake-letter';
      span.style.animationDelay = (Math.random() * 2) + 's';
      line.appendChild(span);
    }
  });

  /* ========== GRID OVERLAY ========== */
  const grid = document.getElementById('grid-overlay');
  if (grid) {
    const cellSize = 40;
    const cols = Math.ceil(window.innerWidth / cellSize);
    const rows = Math.ceil(window.innerHeight / cellSize);
    grid.style.setProperty('--cols', cols);
    grid.style.setProperty('--rows', rows);
    const colors = ['#e74c3c', '#3aa8d8', '#2ecc71'];
    const cells = [];
    for (let i = 0; i < cols * rows; i++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      grid.appendChild(cell);
      cells.push(cell);
    }
    let activeCells = new Map();
    document.addEventListener('mousemove', (e) => {
      const col = Math.floor(e.clientX / cellSize);
      const row = Math.floor(e.clientY / cellSize);
      const idx = row * cols + col;
      if (cells[idx]) {
        cells[idx].style.transition = 'none';
        cells[idx].style.background = colors[Math.floor(Math.random() * colors.length)];
        if (activeCells.has(idx)) clearTimeout(activeCells.get(idx));
        const timer = setTimeout(() => {
          cells[idx].style.transition = 'background 0.6s ease';
          cells[idx].style.background = 'transparent';
          activeCells.delete(idx);
        }, 1500);
        activeCells.set(idx, timer);
      }
    });
  }

  /* ========== INFINITE BELT SCROLL ========== */
  const belts = document.querySelectorAll('.belt');
  belts.forEach(function(belt) {
    belt.innerHTML += belt.innerHTML;
    var pos = 0;
    var speed = 1.2;
    function scrollBelt() {
      pos -= speed;
      if (Math.abs(pos) >= belt.scrollWidth / 2) pos = 0;
      belt.style.transform = 'translateX(' + pos + 'px)';
      requestAnimationFrame(scrollBelt);
    }
    requestAnimationFrame(scrollBelt);
  });

  /* ========== STATS SCROLL ========== */
  var statsSlide = document.querySelector('.stats-slide');
  if (statsSlide) {
    statsSlide.innerHTML += statsSlide.innerHTML;
  }

  /* ========== SCROLL REVEAL ========== */
  const revealEls = document.querySelectorAll('.section, .stats-section, .internships-section, .testimonials-section, .timeline-section, .faq-section, .cta-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  /* ========== TIMELINE ITEM REVEAL ========== */
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const delay = Array.from(timelineItems).indexOf(item) * 150;
        setTimeout(() => {
          item.classList.add('revealed');
        }, delay);
        timelineObserver.unobserve(item);
      }
    });
  }, { threshold: 0.15 });
  timelineItems.forEach(item => timelineObserver.observe(item));

  /* ========== COUNTER ANIMATION ========== */
  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => counterObserver.observe(el));

  /* ========== MOBILE NAV TOGGLE ========== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  /* ========== NAV HIDE/SHOW ON SCROLL ========== */
  let lastScroll = 0;
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 100) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
      lastScroll = current;
    }, { passive: true });
  }

  /* ========== INTERNSHIP FILTER ========== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.internship-card');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ========== FAQ HORIZONTAL DRAG SCROLL ========== */
  const faqScroll = document.querySelector('.faq-scroll');
  if (faqScroll) {
    let isDragging = false;
    let startX;
    let scrollLeft;
    faqScroll.addEventListener('mousedown', (e) => {
      isDragging = true;
      faqScroll.style.cursor = 'grabbing';
      startX = e.pageX - faqScroll.offsetLeft;
      scrollLeft = faqScroll.scrollLeft;
    });
    faqScroll.addEventListener('mouseleave', () => {
      isDragging = false;
      faqScroll.style.cursor = 'grab';
    });
    faqScroll.addEventListener('mouseup', () => {
      isDragging = false;
      faqScroll.style.cursor = 'grab';
    });
    faqScroll.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - faqScroll.offsetLeft;
      const walk = (x - startX) * 1.5;
      faqScroll.scrollLeft = scrollLeft - walk;
    });
    faqScroll.style.cursor = 'grab';
  }

  /* ========== TESTIMONIALS CAROUSEL ========== */
  const track = document.querySelector('.testimonial-track');
  const allCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.carousel-dots');
  let currentSlide = 0;
  const totalSlides = allCards.length;

  if (track && dotsContainer && totalSlides > 0) {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    function goToSlide(index) {
      currentSlide = index;
      track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      document.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
    });

    let autoPlay = setInterval(() => {
      goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
    }, 5000);

    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
      carousel.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
          goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
        }, 5000);
      });
    }
  }

  /* ========== SMOOTH SCROLL ========== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ========== HERO PARALLAX ========== */
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const s = window.scrollY;
      if (s < window.innerHeight) {
        hero.style.transform = 'translateY(' + (s * 0.3) + 'px)';
        hero.style.opacity = 1 - s / window.innerHeight;
      }
    }, { passive: true });
  }

});
