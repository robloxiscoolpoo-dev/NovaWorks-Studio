// ------------------------------
// CONSTELLATION BACKGROUND
// ------------------------------
const canvas = document.getElementById("constellation");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let mouse = { x: null, y: null };

for (let i = 0; i < 120; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3
    });
}

document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
        s.x += s.speedX;
        s.y += s.speedY;

        if (mouse.x && Math.abs(mouse.x - s.x) < 150 && Math.abs(mouse.y - s.y) < 150) {
            s.x += (mouse.x - s.x) * 0.01;
            s.y += (mouse.y - s.y) * 0.01;
        }

        if (s.x < 0 || s.x > canvas.width) s.speedX *= -1;
        if (s.y < 0 || s.y > canvas.height) s.speedY *= -1;

        ctx.fillStyle = "#00eaff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animateStars);
}
animateStars();

// ------------------------------
// SCROLL REVEAL ANIMATIONS
// ------------------------------
const sections = document.querySelectorAll(".section");

function revealOnScroll() {
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            sec.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ------------------------------
// SMOOTH PAGE TRANSITIONS
// ------------------------------
document.querySelectorAll(".smooth-link").forEach(link => {
    link.addEventListener("click", e => {
        if (link.href.includes("#")) return;
        e.preventDefault();
        document.body.style.opacity = "0";
        setTimeout(() => window.location = link.href, 400);
    });
});
