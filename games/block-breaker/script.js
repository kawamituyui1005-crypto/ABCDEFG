const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const winScreen = document.getElementById('winScreen');
const finalScoreElement = document.getElementById('finalScore');
const winScoreElement = document.getElementById('winScore');
const restartBtn = document.getElementById('restartBtn');
const restartBtnWin = document.getElementById('restartBtnWin');

// Game constants
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const BALL_RADIUS = 8;
const BRICK_ROW_COUNT = 5;
const BRICK_COLUMN_COUNT = 8;
const BRICK_PADDING = 10;
const BRICK_OFFSET_TOP = 50;
const BRICK_OFFSET_LEFT = 35;
const BRICK_WIDTH = (canvas.width - (BRICK_OFFSET_LEFT * 2) - (BRICK_PADDING * (BRICK_COLUMN_COUNT - 1))) / BRICK_COLUMN_COUNT;
const BRICK_HEIGHT = 20;

// Game variables
let score = 0;
let lives = 3;
let gameRunning = false;
let animationId;

// Paddle
const paddle = {
    x: canvas.width / 2 - PADDLE_WIDTH / 2,
    y: canvas.height - 40,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dx: 8,
    color: '#00f3ff'
};

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    dx: 4, // Intentionally constant speed for X
    dy: -4,
    radius: BALL_RADIUS,
    speed: 6, // Base speed
    color: '#ffffff'
};

// Bricks
const bricks = [];
const brickColors = ['#bc13fe', '#00f3ff', '#ffe600', '#ff0055', '#7000ff'];

function initBricks() {
    for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
        bricks[c] = [];
        for (let r = 0; r < BRICK_ROW_COUNT; r++) {
            bricks[c][r] = {
                x: 0,
                y: 0,
                status: 1,
                color: brickColors[r % brickColors.length]
            };
        }
    }
}

// Input handling
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (e.key === ' ' && !gameRunning) {
        // Space to start
        if (!startScreen.classList.contains('hidden')) {
            startGame();
        }
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.width / 2;

        // Clamp paddle to canvas
        if (paddle.x < 0) paddle.x = 0;
        if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
    }
}

// Game Logic
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.shadowBlur = 10;
    ctx.shadowColor = ball.color;
    ctx.closePath();
    ctx.shadowBlur = 0;
}

function drawPaddle() {
    ctx.beginPath();
    ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 5);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.shadowBlur = 15;
    ctx.shadowColor = paddle.color;
    ctx.closePath();
    ctx.shadowBlur = 0;
}

function drawBricks() {
    for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
        for (let r = 0; r < BRICK_ROW_COUNT; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = (c * (BRICK_WIDTH + BRICK_PADDING)) + BRICK_OFFSET_LEFT;
                const brickY = (r * (BRICK_HEIGHT + BRICK_PADDING)) + BRICK_OFFSET_TOP;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.roundRect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT, 2);
                ctx.fillStyle = bricks[c][r].color;
                ctx.fill();
                ctx.shadowBlur = 5;
                ctx.shadowColor = bricks[c][r].color;
                ctx.closePath();
                ctx.shadowBlur = 0;
            }
        }
    }
}

function collisionDetection() {
    let activeBricks = 0;

    for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
        for (let r = 0; r < BRICK_ROW_COUNT; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                activeBricks++;
                if (ball.x > b.x && ball.x < b.x + BRICK_WIDTH && ball.y > b.y && ball.y < b.y + BRICK_HEIGHT) {
                    ball.dy = -ball.dy;
                    b.status = 0;
                    score += 100;
                    scoreElement.innerText = score;

                    // Increase speed slightly
                    // ball.speed *= 1.02; 
                }
            }
        }
    }

    if (activeBricks === 0) {
        gameWin();
    }
}

function draw() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    // Ball movement
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        // Paddle collision check
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            // Calculate hit position relative to center of paddle
            let hitPoint = ball.x - (paddle.x + paddle.width / 2);
            // Normalize hit point (-1 to 1)
            hitPoint = hitPoint / (paddle.width / 2);

            // Adjust angle based on hit point
            let angle = hitPoint * (Math.PI / 3); // Max 60 degrees

            ball.dx = ball.speed * Math.sin(angle);
            ball.dy = -ball.speed * Math.cos(angle);

            // Ensure minimum vertical speed so it doesn't get stuck moving horizontally
            // if (Math.abs(ball.dy) < 2) ball.dy = ball.dy < 0 ? -2 : 2;

        } else {
            // Missed paddle
            lives--;
            livesElement.innerText = lives;
            if (!lives) {
                gameOver();
            } else {
                resetBall();
            }
        }
    }

    // Paddle movement
    if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.dx;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }

    animationId = requestAnimationFrame(draw);
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 50;
    ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = -4;
    paddle.x = canvas.width / 2 - PADDLE_WIDTH / 2;
}

function startGame() {
    gameRunning = true;
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    winScreen.classList.add('hidden');
    score = 0;
    lives = 3;
    scoreElement.innerText = score;
    livesElement.innerText = lives;
    initBricks();
    resetBall();
    draw();
}

function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    finalScoreElement.innerText = score;
    gameOverScreen.classList.remove('hidden');
}

function gameWin() {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    winScoreElement.innerText = score;
    winScreen.classList.remove('hidden');
}

// Event Listeners for UI
startScreen.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
restartBtnWin.addEventListener('click', startGame);

// Initialize
initBricks();
// Initial draw (static)
drawBricks();
drawPaddle();
drawBall();
