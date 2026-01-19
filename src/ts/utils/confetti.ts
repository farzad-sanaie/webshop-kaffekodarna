const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "9999";

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

type Confetti = {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocityX: number;
  velocityY: number;
  opacity: number;
};

const colors = ["#166479", "#77c0d4", "#e33f6d", "#e46a8c"];
const confetti: Confetti[] = [];

const centerX = canvas.width / 2;
const startY = canvas.height * 0.65;


for (let i = 0; i < 240; i++) {
  confetti.push({
    x: centerX,
    y: startY,
    radius: Math.random() * 4 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    velocityX: (Math.random() - 0.5) * 7,     
    velocityY: Math.random() * -9 - 8,       
    opacity: 1,
  });
}

const gravity = 0.16;       
const fadeSpeed = 0.002;    
const ceiling = canvas.height * 0.08; 

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((c) => {
    c.velocityY += gravity;
    c.x += c.velocityX;
    c.y += c.velocityY;

    // osynligt tak
    if (c.y < ceiling) {
      c.y = ceiling;
      c.velocityY *= -0.25;
    }

    c.opacity -= fadeSpeed;

    ctx.globalAlpha = Math.max(c.opacity, 0);
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();
  });

  ctx.globalAlpha = 1;

  if (confetti.some((c) => c.opacity > 0)) {
    requestAnimationFrame(animate);
  }
};

animate();

setTimeout(() => {
  canvas.remove();
}, 10000);
