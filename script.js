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

// 🔥 Активируем первый слайд сразу
if (slides.length > 0) {
    slides[0].classList.add('active');
}

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
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = '#c8a96e';
        }
    });
});



// ========== BACK TO TOP BUTTON ==========
const backTopBtn = document.getElementById('backTop');
if (backTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backTopBtn.classList.add('show');
        } else {
            backTopBtn.classList.remove('show');
        }
    });

    backTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// ========== PARALLAX ДЛЯ СЕКЦИИ "OUR COMMITMENT" ==========
(function() {
    const section = document.querySelector('section.parallax');
    if (!section) {
        console.log('❌ Секция .parallax не найдена');
        return;
    }

    let ticking = false;

    function updateParallax() {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.bottom >= 0 && rect.top <= windowHeight) {
            const totalDistance = windowHeight + rect.height;
            const scrolled = windowHeight - rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / totalDistance));

            const focusY = 15 + progress * 70;

            section.style.backgroundPosition = `center ${focusY}%`;
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    updateParallax();
    console.log('✅ Параллакс Our Commitment активирован');
})();
// ========== PARALLAX ДЛЯ HERO СЛАЙДОВ ==========
(function() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length === 0) {
        console.log('❌ Hero слайды не найдены');
        return;
    }

    let ticking = false;

    function updateHeroParallax() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Применяем эффект только пока hero виден на экране
        const hero = document.querySelector('.hero');
        if (!hero) { ticking = false; return; }

        const rect = hero.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > windowHeight) {
            ticking = false;
            return;
        }

        // Прогресс скролла по hero: 0 (начало) → 1 (конец)
        const progress = Math.max(0, Math.min(1, scrollY / hero.offsetHeight));

        // Двигаем фон слайдов от 20% до 80% (как у курицы)
        const focusY = 20 + progress * 60;

        heroSlides.forEach(slide => {
            slide.style.backgroundPosition = `center ${focusY}%`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeroParallax);
            ticking = true;
        }
    }, { passive: true });

    updateHeroParallax();
    console.log('✅ Параллакс Hero-слайдов активирован');
})();