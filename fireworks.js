// fireworks.js
// Simple fireworks effect
(function () {
  const particles = [];
  const colors = ['#ff4b4b', '#ffa64b', '#ffff4b', '#4bff4b', '#4bffff', '#4b4bff', '#ff4bff'];

  class Particle {
    constructor(x, y, vx, vy, color) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.alpha = 1;
      this.life = 60; // frames
      this.color = color;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.02; // gravity
      this.alpha -= 0.016;
      this.life--;
    }
    draw(ctx) {
      ctx.globalAlpha = Math.max(this.alpha, 0);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function createFirework(x, y) {
    const count = 30;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = Math.random() * 2 + 1;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(x, y, vx, vy, color));
    }
  }

  function ensureCanvas() {
    let canvas = document.getElementById('fireworks-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'fireworks-canvas';
      document.body.appendChild(canvas);
    }
    canvas.style.position = 'fixed';
    canvas.style.pointerEvents = 'none';
    canvas.style.top = 0;
    canvas.style.left = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
    return canvas;
  }

  function update(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.life <= 0 || p.alpha <= 0) {
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(() => update(ctx, canvas));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const canvas = ensureCanvas();
    const ctx = canvas.getContext('2d');
    document.addEventListener('click', (e) => {
      createFirework(e.clientX, e.clientY);
    });
    // initial firework
    createFirework(canvas.width / 2, canvas.height / 2);
    update(ctx, canvas);
  });
})();
