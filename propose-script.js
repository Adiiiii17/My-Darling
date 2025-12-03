const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const bgMusic = document.getElementById('bgMusic');
const confettiContainer = document.getElementById('confettiContainer');

let noScale = 1;
let yesScale = 1;
let musicStarted = false;

function startMusic() {
    if (!musicStarted) {
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        musicStarted = true;
    }
}

document.body.addEventListener('click', startMusic, { once: true });

yesBtn.addEventListener('click', () => {
    startMusic();
    createConfetti();

    setTimeout(() => {
        window.location.href = 'celebrate.html';
    }, 1000);
});

noBtn.addEventListener('click', (e) => {
    startMusic();
    e.preventDefault();

    noScale -= 0.1;
    yesScale += 0.15;

    if (noScale < 0.3) {
        noScale = 0.3;
    }

    noBtn.style.transform = `scale(${noScale})`;
    yesBtn.style.transform = `scale(${yesScale})`;

    const container = document.querySelector('.propose-page');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.3s ease';

    createHearts();

    if (yesScale >= 3) {
        yesBtn.style.position = 'fixed';
        yesBtn.style.top = '50%';
        yesBtn.style.left = '50%';
        yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
        yesBtn.style.zIndex = '1000';

        setTimeout(() => {
            window.location.href = 'celebrate.html';
        }, 1500);
    }
});

function createConfetti() {
    const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#ffd700'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confettiContainer.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 30);
    }
}

function createHearts() {
    const heartsContainer = document.querySelector('.hearts-background');
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'absolute';
    heart.style.fontSize = '2em';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    heart.style.animation = 'fadeOut 1s ease-out forwards';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);