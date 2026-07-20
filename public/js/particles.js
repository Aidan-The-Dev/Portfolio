const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

window.addEventListener("resize", resize);

resize();

for (let i = 0; i < (innerWidth < 700 ? 50 : 150); i++) {
  particles.push({
    x: Math.random() * canvas.width,

    y: Math.random() * canvas.height,

    r: Math.random() * 2,

    vx: (Math.random() - 0.5) * 0.4,

    vy: (Math.random() - 0.5) * 0.4,
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    ctx.beginPath();

    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

    ctx.fillStyle = "#5a8cff";

    ctx.fill();

    particles.forEach((p2) => {
      let distance = Math.hypot(p.x - p2.x, p.y - p2.y);

      if (distance < 120) {
        ctx.beginPath();

        ctx.moveTo(p.x, p.y);

        ctx.lineTo(p2.x, p2.y);

        ctx.strokeStyle = "rgba(90,140,255,.15)";

        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(animate);
}

animate();
