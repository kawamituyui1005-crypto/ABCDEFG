const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const finalScoreEl = document.getElementById('final-score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const gameTitle = document.querySelector('.game-title');

// Game Constants
const GRAVITY = 0.6;
const JUMP_FORCE = -11; // Slightly stronger jump
const SPEED = 6;
const GROUND_HEIGHT = 100;

let frameId;
let score = 0;
let isGameActive = false;
let obstacles = [];
let particles = [];
let gameSpeed = SPEED;

// Resize Canvas
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Player Class
class Player {
    constructor() {
        this.size = 40;
        this.x = 100;
        this.y = canvas.height - GROUND_HEIGHT - this.size;
        this.vy = 0;
        this.rotation = 0;
        this.isGrounded = true;
        this.color = '#F7DF1E'; // Default JS yellow
    }

    jump() {
        if (this.isGrounded) {
            this.vy = JUMP_FORCE;
            this.isGrounded = false;
            createParticles(this.x + this.size / 2, this.y + this.size, 10, '#fff');
        }
    }

    update() {
        // Physics
        this.vy += GRAVITY;
        this.y += this.vy;

        // Ground Collision
        if (this.y + this.size > canvas.height - GROUND_HEIGHT) {
            this.y = canvas.height - GROUND_HEIGHT - this.size;
            this.vy = 0;
            if (!this.isGrounded) {
                // Landed
                createParticles(this.x + this.size / 2, this.y + this.size, 5, '#64ffda');
            }
            this.isGrounded = true;

            // Snap rotation to nearest 90 degrees on ground
            this.rotation = Math.round(this.rotation / (Math.PI / 2)) * (Math.PI / 2);
        } else {
            // Rotate while jumping
            this.rotation += 0.1;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctx.rotate(this.rotation);

        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;

        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);

        // Inner detail
        ctx.fillStyle = '#000';
        ctx.fillRect(-this.size / 4, -this.size / 4, this.size / 2, this.size / 2);

        ctx.restore();
    }
}

// Obstacle Class
class Obstacle {
    constructor(x, type) {
        this.x = x;
        this.type = type; // 'spike' or 'block'
        this.size = 40;
        this.markedForDeletion = false;
        this.color = type === 'spike' ? '#ff0055' : '#00ffff';
    }

    update() {
        this.x -= gameSpeed;
        if (this.x + this.size < 0) this.markedForDeletion = true;
    }

    draw() {
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;

        if (this.type === 'spike') {
            ctx.beginPath();
            ctx.moveTo(this.x, canvas.height - GROUND_HEIGHT);
            ctx.lineTo(this.x + this.size / 2, canvas.height - GROUND_HEIGHT - this.size);
            ctx.lineTo(this.x + this.size, canvas.height - GROUND_HEIGHT);
            ctx.closePath();
            ctx.fill();
        } else {
            ctx.fillRect(this.x, canvas.height - GROUND_HEIGHT - this.size, this.size, this.size);
        }
        ctx.shadowBlur = 0;
    }
}

// Particle System
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.color = color;
        this.life = 1; // opacity
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.05;
    }
    draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.globalAlpha = 1;
    }
}

function createParticles(x, y, count, color) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, color));
    }
}

// Game Logic
const player = new Player();

function spawnObstacle() {
    const minGap = 400; // Minimum distance between obstacles
    const maxGap = 800;

    let lastX = 0;
    if (obstacles.length > 0) {
        lastX = obstacles[obstacles.length - 1].x;
    } else {
        lastX = canvas.width;
    }

    // Only spawn if safe distance
    if (lastX < canvas.width + 100) { // Keep buffer
        // logic is handled inside update loop for dynamic spawning
    }
}

let nextSpawn = 0;

function handleObstacles() {
    if (Date.now() > nextSpawn) {
        const type = Math.random() > 0.5 ? 'spike' : 'block';
        obstacles.push(new Obstacle(canvas.width + 100, type));

        // Randomize next spawn time based on speed
        // faster speed = shorter interval
        const minTime = 1000;
        const maxTime = 2500;
        nextSpawn = Date.now() + Math.random() * (maxTime - minTime) + minTime;
    }

    obstacles.forEach((obs, index) => {
        obs.update();
        obs.draw();

        // Collision Detection
        // Simple AABB / Hitbox for spikes (triangle approximation)
        let collision = false;

        // Shrink hitbox slightly for forgiveness
        const pPadding = 10;
        const playerRight = player.x + player.size - pPadding;
        const playerLeft = player.x + pPadding;
        const playerBottom = player.y + player.size - pPadding;
        const playerTop = player.y + pPadding;

        const obsLeft = obs.x + 5;
        const obsRight = obs.x + obs.size - 5;
        const obsTop = canvas.height - GROUND_HEIGHT - obs.size + 5;

        if (
            playerRight > obsLeft &&
            playerLeft < obsRight &&
            playerBottom > obsTop
        ) {
            // Hit!
            endGame();
        }

        if (obs.markedForDeletion) {
            obstacles.splice(index, 1);
            score++;
            scoreEl.textContent = score;

            // Speed up slightly
            if (score % 5 === 0) gameSpeed += 0.5;
        }
    });
}

function drawGround() {
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#64ffda';
    ctx.fillRect(0, canvas.height - GROUND_HEIGHT, canvas.width, 3);

    // Grid lines for "speed" effect
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    const scrollOffset = (Date.now() / 2 * (gameSpeed / SPEED)) % 100;

    for (let i = 0; i < canvas.width; i += 100) {
        // Perspective effect lines
        // Drawing vertical-ish lines on the floor part
        // Simplified: just moving lines
        ctx.beginPath();
        const xPos = i - scrollOffset;
        ctx.moveTo(xPos, canvas.height - GROUND_HEIGHT);
        ctx.lineTo(xPos - 50, canvas.height); // angle left
        ctx.stroke();
    }
    ctx.shadowBlur = 0;
}

function drawBackground() {
    // Basic parallax stars
    // (Optional enhancement)
}

function animate() {
    if (!isGameActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGround();

    player.update();
    player.draw();

    handleObstacles();

    // Handle particles
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(index, 1);
    });

    frameId = requestAnimationFrame(animate);
}

function startGame() {
    score = 0;
    gameSpeed = SPEED;
    scoreEl.textContent = score;
    obstacles = [];
    particles = [];
    isGameActive = true;
    startScreen.classList.remove('active');
    gameOverScreen.classList.remove('active');
    gameTitle.style.opacity = '0.2'; // Fade title

    // Reset player
    player.y = canvas.height - GROUND_HEIGHT - player.size;
    player.vy = 0;
    player.isGrounded = true;

    nextSpawn = Date.now() + 1000;

    animate();
}

function endGame() {
    isGameActive = false;
    cancelAnimationFrame(frameId);

    // Explosion effect
    createParticles(player.x + player.size / 2, player.y + player.size / 2, 50, '#ff0000');
    // Draw one last frame to show explosion
    particles.forEach(p => { p.update(); p.draw(); });

    finalScoreEl.textContent = score;
    gameOverScreen.classList.add('active');
    gameTitle.style.opacity = '0.8';
}

// Input Handlers
function handleInput(e) {
    if ((e.code === 'Space' || e.type === 'click' || e.type === 'touchstart') && isGameActive) {
        e.preventDefault();
        player.jump();
    }

    // Start game on input if at start screen
    if ((e.code === 'Space' || e.type === 'click') && startScreen.classList.contains('active')) {
        startGame();
    }
}

window.addEventListener('keydown', handleInput);
window.addEventListener('touchstart', handleInput, { passive: false }); // passive false to prevent scrolling
canvas.addEventListener('mousedown', handleInput);

startBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent immediate jump
    startGame();
});

restartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    startGame();
});

// Initial draw
resize();
drawGround();
player.draw();
