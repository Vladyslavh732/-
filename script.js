const buttons = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');
const heartsContainer = document.body;

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabIndex = btn.getAttribute('data-tab');

    // Переключаем активные классы
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    contents.forEach(c => {
      c.classList.remove('active');
      if (c.getAttribute('data-content') === tabIndex) {
        c.classList.add('active');
      }
    });

    // Добавление нот или микрофонов
    const randomElement = Math.random() < 0.5 ? '🎶' : '🎤';
    const elementType = randomElement === '🎶' ? 'note' : 'microphone';
    const element = document.createElement('span');
    element.classList.add(elementType);
    element.innerText = randomElement;
    element.style.left = `${Math.random() * window.innerWidth}px`;
    element.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(element);
    setTimeout(() => element.remove(), 2500);

    // Добавление сердечек
    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = `${Math.random() * window.innerWidth}px`;
    heart.style.top = `${Math.random() * window.innerHeight}px`;
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);

    // Эффект сердца из огоньков
    createHeart(window.innerWidth / 2, window.innerHeight / 2);
  });
});

// ==== Canvas-эффект сердца ====
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createHeart(x, y) {
  particles = [];
  const numParticles = 200;

  for (let i = 0; i < numParticles; i++) {
    const t = Math.PI - (i / numParticles) * 2 * Math.PI;
    const px = 16 * Math.pow(Math.sin(t), 3);
    const py =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    particles.push({
      x: x + px * 15,
      y: y - py * 15,
      alpha: 1,
      size: 2 + Math.random() * 2,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
      color: `hsl(${Math.random() * 40 + 330}, 100%, 70%)`
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;
    p.alpha -= 0.01;
  });

  particles = particles.filter((p) => p.alpha > 0);

  requestAnimationFrame(animate);
}
animate();