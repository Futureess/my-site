// ========== HEADER SCROLL ==========
const header = document.getElementById('header');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        backTop.classList.add('show');
    } else {
        header.classList.remove('scrolled');
        backTop.classList.remove('show');
    }
});

backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== RANDOM HERO BACKGROUNDS ==========
const heroBgImages = [
    'images/slide1.jpg',
    'images/slide2.jpg',
    'images/slide3.jpg',
    'images/slide4.jpg'
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function setRandomHeroBackgrounds() {
    const slides = document.querySelectorAll('.hero-slide');
    const shuffledImages = shuffle([...heroBgImages]);
    slides.forEach((slide, index) => {
        slide.style.backgroundImage = `url('${shuffledImages[index]}')`;
    });
}

setRandomHeroBackgrounds();

// ========== BURGER MENU ==========
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
});

// Close nav on link click
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('open');
    });
});

// ========== HERO SLIDER ==========
const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.getElementById('heroDots');
let currentSlide = 0;
let slideInterval;

// Create dots
slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.hero-dots .dot');

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
}

document.getElementById('heroRight').addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

document.getElementById('heroLeft').addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 6000);
}

slideInterval = setInterval(nextSlide, 6000);

// ========== COUNTER ANIMATION ==========
const statNums = document.querySelectorAll('.stat-num');
let counted = false;

function animateCounters() {
    statNums.forEach(num => {
        const target = +num.getAttribute('data-target');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                num.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(update);
            } else {
                num.textContent = target.toLocaleString();
            }
        };
        update();
    });
}

// Intersection Observer for counters
const statsSection = document.querySelector('.parallax');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
}

// ========== SMOOTH REVEAL ON SCROLL ==========
const revealElements = document.querySelectorAll(
    '.product-card, .farm-card, .testimonial, .gallery-item, .intro-img, .intro-text, .experience-img, .experience-text, .contact-info, .contact-form'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ========== FORM HANDLING ==========
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#4CAF50';
        btn.style.borderColor = '#4CAF50';
        setTimeout(() => {
            btn.textContent = 'Send Message';
            btn.style.background = '';
            btn.style.borderColor = '';
            form.reset();
        }, 3000);
    });
}

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    nav.querySelectorAll('a').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = '#c8a96e';
        }
    });
});
// ===== PARALLAX ЭФФЕКТ ПРИ СКРОЛЛЕ =====
(function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const slides = document.querySelectorAll('.hero-slide');
    const heroHeight = hero.offsetHeight;
    
    // Работаем только пока hero виден на экране
    if (scrolled < heroHeight) {
      // Считаем прогресс скролла: 0 (вверху) → 1 (внизу hero)
      const progress = scrolled / heroHeight;
      
      // Фокус фото движется от 30% до 70% по вертикали
      const focusY = 30 + progress * 40;
      
      slides.forEach(slide => {
        slide.style.backgroundPosition = `center ${focusY}%`;
      });

      // Контент уплывает вверх и исчезает
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - progress * 1.5;
      }
    }
    
    ticking = false;
  }

  // requestAnimationFrame для плавности (работает и на мобильных)
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
})(); 