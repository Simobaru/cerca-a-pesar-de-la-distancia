/**
 * Motor de Confeti de Corazones y Florecitas
 * Desarrollado con Canvas API nativo sin dependencias externas
 */

(function () {
  let canvas = null;
  let ctx = null;
  let particles = [];
  let animationId = null;
  let isRunning = false;

  function initCanvas() {
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "confetti-canvas";
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "99999";
      document.body.appendChild(canvas);
      ctx = canvas.getContext("2d");

      window.addEventListener("resize", resizeCanvas);
    }
    resizeCanvas();
  }

  function resizeCanvas() {
    if (canvas) {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }

  const COLORS = [
    "#FF4D6D", // Rosa intenso
    "#FF758F", // Rosa pastel
    "#FF8FA3", // Rosa suave
    "#FFB3C1", // Rosa claro
    "#FFF0F3", // Nieve rosada
    "#F43F5E", // Carmín romántico
    "#FB7185", // Rosa vibrante
    "#A78BFA", // Lavanda suave
    "#FDE047", // Oro brillante
    "#F472B6"  // Magenta suave
  ];

  class Particle {
    constructor(x, y, type = "heart") {
      this.x = x || window.innerWidth / 2;
      this.y = y || window.innerHeight / 2;
      this.type = type; // 'heart', 'flower', 'star', 'circle'
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 4; // Impulso hacia arriba
      
      this.gravity = 0.18;
      this.friction = 0.98;
      this.size = Math.random() * 14 + 10;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 10;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.1 + 0.05;
      
      this.opacity = 1;
      this.decay = Math.random() * 0.015 + 0.008;
    }

    update() {
      this.vx *= this.friction;
      this.vy += this.gravity;
      this.vy *= this.friction;
      
      this.x += this.vx + Math.sin(this.wobble) * 0.8;
      this.y += this.vy;
      this.wobble += this.wobbleSpeed;
      this.rotation += this.rotationSpeed;
      this.opacity -= this.decay;
    }

    draw(ctx) {
      if (this.opacity <= 0) return;
      
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;

      if (this.type === "heart") {
        this.drawHeart(ctx, this.size);
      } else if (this.type === "flower") {
        this.drawFlower(ctx, this.size);
      } else if (this.type === "star") {
        this.drawStar(ctx, this.size / 1.5);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    drawHeart(ctx, size) {
      const s = size / 16;
      ctx.beginPath();
      ctx.moveTo(0, s * 3);
      ctx.bezierCurveTo(-s * 5, -s * 5, -s * 12, s * 2, 0, s * 13);
      ctx.bezierCurveTo(s * 12, s * 2, s * 5, -s * 5, 0, s * 3);
      ctx.closePath();
      ctx.fill();
    }

    drawFlower(ctx, size) {
      const petals = 5;
      const r = size / 2;
      ctx.beginPath();
      for (let i = 0; i < petals; i++) {
        const theta = (i * 2 * Math.PI) / petals;
        const px = Math.cos(theta) * r;
        const py = Math.sin(theta) * r;
        ctx.arc(px, py, r * 0.6, 0, Math.PI * 2);
      }
      ctx.fill();
      // Centro dorado
      ctx.fillStyle = "#FDE047";
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    drawStar(ctx, size) {
      const spikes = 5;
      const outerRadius = size;
      const innerRadius = size / 2;
      let rot = (Math.PI / 2) * 3;
      let x = 0;
      let y = 0;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outerRadius;
        y = Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(0, -outerRadius);
      ctx.closePath();
      ctx.fill();
    }
  }

  function loop() {
    if (!ctx) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.opacity <= 0 || p.y > window.innerHeight + 50) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      animationId = requestAnimationFrame(loop);
    } else {
      isRunning = false;
      if (canvas && canvas.parentNode) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    }
  }

  /**
   * Dispara una explosión de confeti de corazones y florecitas
   * @param {Object} options - Opciones de configuración
   */
  window.triggerConfetti = function (options = {}) {
    initCanvas();

    const count = options.count || 85;
    const originX = options.x !== undefined ? options.x : window.innerWidth / 2;
    const originY = options.y !== undefined ? options.y : window.innerHeight * 0.4;
    const types = ["heart", "heart", "flower", "flower", "star", "circle"];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      particles.push(new Particle(originX, originY, type));
    }

    if (!isRunning) {
      isRunning = true;
      loop();
    }
  };

  /**
   * Lluvia suave continua de corazones
   */
  window.triggerHeartShower = function (durationMs = 3000) {
    initCanvas();
    const interval = 80;
    const endTime = Date.now() + durationMs;

    const showerInterval = setInterval(() => {
      if (Date.now() > endTime) {
        clearInterval(showerInterval);
        return;
      }
      const x = Math.random() * window.innerWidth;
      const type = Math.random() > 0.3 ? "heart" : "flower";
      const p = new Particle(x, -20, type);
      p.vy = Math.random() * 2 + 2; // Caída suave
      particles.push(p);

      if (!isRunning) {
        isRunning = true;
        loop();
      }
    }, interval);
  };
})();
