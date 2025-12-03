let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlideIndex) {
            slide.classList.add('active');
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === currentSlideIndex) {
            dot.classList.add('active');
        }
    });
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

function goToSlide(index) {
    showSlide(index);
}

// Auto-play carousel every 3.5 seconds
let autoPlayInterval = setInterval(() => {
    changeSlide(1);
}, 3500);

// Pause auto-play when user interacts
function pauseAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
        changeSlide(1);
    }, 3500);
}

showSlide(0);

const celebrateMusic = document.getElementById('celebrateMusic');
document.body.addEventListener('click', () => {
    celebrateMusic.play().catch(e => console.log('Audio play failed:', e));
}, { once: true });