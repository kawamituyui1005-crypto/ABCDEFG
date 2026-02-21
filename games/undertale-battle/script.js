const player = document.getElementById('player');
const battleBox = document.getElementById('battle-box');
const gameOverScreen = document.getElementById('game-over');
const startScreen = document.getElementById('start-screen');
const restartBtn = document.getElementById('restart-btn');
const dialogText = document.getElementById('dialog-text');
const hpText = document.getElementById('hp-text');

let isGameActive = false;
let playerPos = { x: 125, y: 125 }; // 箱の中心に配置
let playerSpeed = 3;
let keys = {};
let bullets = [];
let frameId;
let frameCount = 0;

// 残機（HP）と無敵時間（Invincibility）の管理用
let playerHP = 3;
let isInvincible = false;
let invincibilityFrames = 0;

// 難易度設定
let currentDifficulty = 'normal';
const difficultySettings = {
    easy: { bulletSpeedMult: 0.6, spawnRateMult: 1.5, laserDelay: 120, hasHoming: false },
    normal: { bulletSpeedMult: 1.0, spawnRateMult: 1.0, laserDelay: 90, hasHoming: true },
    hard: { bulletSpeedMult: 1.5, spawnRateMult: 0.6, laserDelay: 60, hasHoming: true }
};

let currentAttackPattern = 0;

function hitPlayer() {
    if (isInvincible) return; // 無敵中はダメージを受けない

    playerHP--;

    // 残機表示の更新
    if (hpText) {
        let heartStr = '';
        for (let j = 0; j < playerHP; j++) heartStr += '♥';
        for (let j = playerHP; j < 3; j++) heartStr += '♡';
        hpText.innerText = heartStr;
        hpText.style.color = playerHP === 1 ? 'yellow' : 'red';
    }

    if (playerHP <= 0) {
        gameOver();
    } else {
        // ヒット時のエフェクト（画面揺れなど）
        battleBox.style.transform = 'translate(0px, 10px)';
        setTimeout(() => battleBox.style.transform = 'translate(10px, -5px)', 50);
        setTimeout(() => battleBox.style.transform = 'translate(-10px, 5px)', 100);
        setTimeout(() => battleBox.style.transform = 'none', 150);

        // 無敵時間（約1秒 = 60フレーム）
        isInvincible = true;
        invincibilityFrames = 60;
    }
}

function initEvent() {
    window.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    restartBtn.addEventListener('click', () => {
        gameOverScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    });

    // 難易度選択ボタンのイベント
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentDifficulty = e.target.dataset.level;
            startGame();
        });
    });

    // 初期メッセージ
    dialogText.innerHTML = "* あなたの 前に 新たな敵が 現れた。<br>* 十字キーかWASDで ハートを動かせ！";
}

function startGame() {
    isGameActive = true;
    playerPos = { x: 125, y: 125 };

    gameOverScreen.classList.add('hidden');
    startScreen.classList.add('hidden');

    playerHP = 3;
    isInvincible = false;
    invincibilityFrames = 0;
    player.style.opacity = '1';
    player.style.left = playerPos.x + 'px';
    player.style.top = playerPos.y + 'px';

    if (hpText) {
        hpText.innerText = '♥♥♥';
        hpText.style.color = 'red';
    }

    // 古い弾をすべて消す
    bullets.forEach(b => b.element.remove());
    bullets = [];

    frameCount = 0;
    currentAttackPattern = 0;
    dialogText.innerText = "* 用心して 避けろ！";

    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(gameLoop);
}

// 弾生成関数
function createBullet(type = 'normal', data) {
    const el = document.createElement('div');
    el.className = 'bullet';

    // タイプに応じたクラスやスタイルの割り当て
    if (type === 'homing' || type === 'star') {
        el.className = 'bullet bullet-star';
    } else if (type === 'bone_v') {
        el.className = 'bullet bullet-bone-v';
        data.width = 8;
        data.height = 60;
    } else if (type === 'bone_h') {
        el.className = 'bullet bullet-bone-h';
        data.width = 60;
        data.height = 8;
    }

    el.style.left = data.x + 'px';
    el.style.top = data.y + 'px';
    battleBox.appendChild(el);

    bullets.push({ type, element: el, ...data });
}

// ====== 攻撃パターンの生成 ======

// 丸い弾（通常弾とサークルバースト）は廃止し、すべて骨か星に置き換える

function spawnBoneAttack() {
    const settings = difficultySettings[currentDifficulty];
    const speed = 3 * settings.bulletSpeedMult;
    const isVertical = Math.random() > 0.5;

    if (isVertical) {
        if (Math.random() > 0.5) {
            let isRight = Math.random() > 0.5;
            let x = isRight ? 270 : -20;
            let vx = isRight ? -speed : speed;
            createBullet('bone_v', { x: x, y: 236, vx: vx, vy: 0 }); // 床を這う骨
        } else {
            let x = Math.random() * 230 + 10;
            createBullet('bone_v', { x: x, y: 270, vx: 0, vy: -speed });
        }
    } else {
        let y = Math.random() * 230 + 10;
        createBullet('bone_h', { x: 270, y: y, vx: -speed, vy: 0 });
    }
}

function spawnHomingBullet() {
    const settings = difficultySettings[currentDifficulty];
    if (!settings.hasHoming) return;

    const x = Math.random() * 250;
    const y = -10;
    const speed = 2 * settings.bulletSpeedMult;
    createBullet('homing', { x, y, vx: 0, vy: 1, speed: speed });
}

// ====== ゲーム全体更新 ======

function updatePlayer() {
    if (keys['ArrowUp'] || keys['w'] || keys['W']) playerPos.y -= playerSpeed;
    if (keys['ArrowDown'] || keys['s'] || keys['S']) playerPos.y += playerSpeed;
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) playerPos.x -= playerSpeed;
    if (keys['ArrowRight'] || keys['d'] || keys['D']) playerPos.x += playerSpeed;

    // Bounds check (box is 250x250, player is 16x16)
    if (playerPos.x < 8) playerPos.x = 8;
    if (playerPos.y < 8) playerPos.y = 8;
    if (playerPos.x > 242) playerPos.x = 242;
    if (playerPos.y > 242) playerPos.y = 242;

    player.style.left = playerPos.x + 'px';
    player.style.top = playerPos.y + 'px';

    // 無敵のフレーム管理と点滅処理
    if (isInvincible) {
        invincibilityFrames--;
        if (invincibilityFrames % 10 < 5) {
            player.style.opacity = '0.3';
        } else {
            player.style.opacity = '1';
        }

        if (invincibilityFrames <= 0) {
            isInvincible = false;
            player.style.opacity = '1';
        }
    }
}

function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];

        if (b.type === 'laser') {
            b.life--;
            // 当たり判定
            if (b.life > 0) {
                let hit = false;
                if (b.isVertical) {
                    if (Math.abs(playerPos.x - b.x) < 20) hit = true;
                } else {
                    if (Math.abs(playerPos.y - b.y) < 20) hit = true;
                }
                if (hit) hitPlayer();
            } else {
                b.element.remove();
                bullets.splice(i, 1);
            }
            continue;
        }

        if (b.type === 'homing') {
            const dx = playerPos.x - b.x;
            const dy = playerPos.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0) {
                b.vx += (dx / dist) * 0.05;
                b.vy += (dy / dist) * 0.05;

                const currentSpeed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
                if (currentSpeed > b.speed) {
                    b.vx = (b.vx / currentSpeed) * b.speed;
                    b.vy = (b.vy / currentSpeed) * b.speed;
                }
            }
        }

        b.x += b.vx;
        b.y += b.vy;
        b.element.style.left = b.x + 'px';
        b.element.style.top = b.y + 'px';

        // 形状に応じた当たり判定の処理
        let hit = false;
        if (b.type === 'bone_v') {
            if (Math.abs(playerPos.x - b.x) < 8 && Math.abs(playerPos.y - b.y) < 30) hit = true;
        } else if (b.type === 'bone_h') {
            if (Math.abs(playerPos.x - b.x) < 30 && Math.abs(playerPos.y - b.y) < 8) hit = true;
        } else if (b.type === 'star' || b.type === 'homing') {
            const dx = b.x - playerPos.x;
            const dy = b.y - playerPos.y;
            if (Math.sqrt(dx * dx + dy * dy) < 10) hit = true;
        } else {
            const dx = b.x - playerPos.x;
            const dy = b.y - playerPos.y;
            if (Math.sqrt(dx * dx + dy * dy) < 8) hit = true;
        }

        if (hit) hitPlayer();

        // 削除判定
        if (b.x < -30 || b.x > 280 || b.y < -30 || b.y > 280) {
            b.element.remove();
            bullets.splice(i, 1);
        }
    }
}

function gameLoop(time) {
    if (!isGameActive) return;

    updatePlayer();
    updateBullets();

    frameCount++;
    const settings = difficultySettings[currentDifficulty];

    // パターンの切り替え
    if (frameCount % 600 === 0) {
        currentAttackPattern = (currentAttackPattern + 1) % 5;
    }

    if (currentAttackPattern === 4) {
        if (frameCount % 600 === 0) dialogText.innerText = "* 強力な 光線が くるぞ！\n* (赤い警告線に 注意しろ！)";

        const cycle = frameCount % Math.floor(settings.laserDelay);
        if (cycle === 0) {
            const isVertical = Math.random() > 0.5;
            const targetPos = Math.random() > 0.3 ? (isVertical ? playerPos.x : playerPos.y) : (Math.random() * 250);

            const warningEl = document.createElement('div');
            warningEl.className = 'bullet';
            warningEl.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
            warningEl.style.borderRadius = '0';
            warningEl.style.boxShadow = 'none';
            warningEl.dataset.isWarning = 'true';

            if (isVertical) {
                warningEl.style.width = '2px';
                warningEl.style.height = '250px';
                warningEl.style.left = targetPos + 'px';
                warningEl.style.top = '0px';
                warningEl.style.transform = 'translate(-50%, 0)';
            } else {
                warningEl.style.width = '250px';
                warningEl.style.height = '2px';
                warningEl.style.left = '0px';
                warningEl.style.top = targetPos + 'px';
                warningEl.style.transform = 'translate(0, -50%)';
            }

            battleBox.appendChild(warningEl);
            const warningTimeMs = currentDifficulty === 'hard' ? 500 : 1000;

            setTimeout(() => {
                if (!isGameActive) return;
                warningEl.dataset.isWarning = 'false';
                warningEl.style.backgroundColor = '#ffffff';
                warningEl.style.boxShadow = '0 0 10px #ff0000, 0 0 20px #ff0000';

                if (isVertical) { warningEl.style.width = '40px'; }
                else { warningEl.style.height = '40px'; }

                bullets.push({
                    type: 'laser',
                    element: warningEl,
                    x: isVertical ? targetPos : 0,
                    y: isVertical ? 0 : targetPos,
                    isVertical: isVertical,
                    vx: 0,
                    vy: 0,
                    life: 30
                });
            }, warningTimeMs);
        }
    }

    // 丸い弾を廃止し、骨と星だけで構成される攻撃パターン
    if (currentAttackPattern === 0) {
        if (frameCount % 600 === 0) dialogText.innerText = "* 骨が 迫ってくるぞ！\n* (十字キー または WASD)";
        let baseRate = 30 - Math.floor((frameCount % 600) / 40);
        if (baseRate < 15) baseRate = 15;
        let spawnRate = Math.floor(baseRate * settings.spawnRateMult);
        if (frameCount % spawnRate === 0) spawnBoneAttack();
    } else if (currentAttackPattern === 1) {
        if (frameCount % 600 === 0) dialogText.innerText = "* 激しい 骨の 攻撃だ！";
        if (frameCount % Math.floor(20 * settings.spawnRateMult) === 0) spawnBoneAttack();
    } else if (currentAttackPattern === 2) {
        if (frameCount % 600 === 0) dialogText.innerText = "* 星が 追尾してくるぞ！\n* (黄色い星に 注意)";
        if (frameCount % Math.floor(60 * settings.spawnRateMult) === 0) spawnHomingBullet();
        if (frameCount % Math.floor(35 * settings.spawnRateMult) === 0) spawnBoneAttack();
    } else if (currentAttackPattern === 3) {
        if (frameCount % 600 === 0) dialogText.innerText = "* 敵の ケツイが みなぎっている！\n* 猛攻を しのげ！";
        if (frameCount % Math.floor(40 * settings.spawnRateMult) === 0) spawnHomingBullet();
        if (frameCount % Math.floor(15 * settings.spawnRateMult) === 0) spawnBoneAttack();
    }

    frameId = requestAnimationFrame(gameLoop);
}

function gameOver() {
    isGameActive = false;
    cancelAnimationFrame(frameId);
    gameOverScreen.classList.remove('hidden');
}

// 初期化（DOMロード時に実行）
document.addEventListener('DOMContentLoaded', initEvent);
