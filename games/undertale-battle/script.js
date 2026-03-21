const player = document.getElementById('player');
const battleBox = document.getElementById('battle-box');
const gameOverScreen = document.getElementById('game-over');
const startScreen = document.getElementById('start-screen');
const restartBtn = document.getElementById('restart-btn');
const dialogText = document.getElementById('dialog-text');
const hpText = document.getElementById('hp-text');
const clearScreen = document.getElementById('game-clear');
const scoreText = document.getElementById('score-text');
const finalScoreText = document.getElementById('final-score');
const clearRestartBtn = document.getElementById('clear-restart-btn');
const enemySprite = document.getElementById('enemy-sprite');

let isGameActive = false;
let isIntroActive = false;
let playerPos = { x: 200, y: 200 }; // 400x400のボックスの中心
let playerSpeed = 3;
let keys = {};
let bullets = [];
let frameId;
let frameCount = 0;

let score = 0;
const CLEAR_SCORE = 20000;

// 残機（HP）と無敵時間（Invincibility）の管理用
let playerHP = 20;
const MAX_HP = 20;
let isInvincible = false;
let invincibilityFrames = 0;

// アイテム管理用
let items = [];
let playerBaseSpeed = 3;
let speedBoostTimer = 0;

// 難易度設定
let currentDifficulty = 'normal';
const difficultySettings = {
    easy: { bulletSpeedMult: 0.6, spawnRateMult: 1.5, laserDelay: 120, hasHoming: false },
    normal: { bulletSpeedMult: 1.0, spawnRateMult: 1.0, laserDelay: 90, hasHoming: true },
    hard: { bulletSpeedMult: 1.5, spawnRateMult: 0.6, laserDelay: 60, hasHoming: true }
};

let currentAttackPattern = 0;

// ストーリーデータ
const storyData = [
    "* おや・・・？",
    "* 迷い込んできたのかい？",
    "* ここは 君のような者が 来る場所じゃない。",
    "* ボクの 名前は「ゴースト」。",
    "* 君の「ケツイ」を見せてもらうよ！"
];
let storyIndex = 0;

function updateHPUI() {
    const hpBarFill = document.getElementById('hp-bar-fill');
    const hpText = document.getElementById('hp-text');
    if (hpBarFill) {
        const percent = (playerHP / MAX_HP) * 100;
        hpBarFill.style.width = percent + '%';
    }
    if (hpText) {
        hpText.innerText = `${playerHP} / ${MAX_HP}`;
    }
}

function hitPlayer() {
    if (isInvincible) return; // 無敵中はダメージを受けない

    playerHP -= 4; // 1回でHP4減少 (MAX 20)
    if (playerHP < 0) playerHP = 0;

    // HP表示の更新
    updateHPUI();

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

    const bindDPad = (id, key) => {
        const el = document.getElementById(id);
        if (!el) return;
        const press = (e) => { if (e.cancelable) e.preventDefault(); keys[key] = true; };
        const release = (e) => { if (e.cancelable) e.preventDefault(); keys[key] = false; };

        el.addEventListener('touchstart', press, { passive: false });
        el.addEventListener('touchend', release, { passive: false });
        el.addEventListener('mousedown', press);
        el.addEventListener('mouseup', release);
        el.addEventListener('mouseleave', release);
    };

    bindDPad('d-up', 'ArrowUp');
    bindDPad('d-down', 'ArrowDown');
    bindDPad('d-left', 'ArrowLeft');
    bindDPad('d-right', 'ArrowRight');

    restartBtn.addEventListener('click', () => {
        gameOverScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    });

    clearRestartBtn.addEventListener('click', () => {
        clearScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    });

    // 難易度選択ボタンのイベント
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentDifficulty = e.target.dataset.level;
            startIntro(); // 直接 startGame ではなく Intro を開始
        });
    });

    // 会話を進めるためのクリックイベント
    window.addEventListener('mousedown', () => {
        if (isIntroActive) showNextDialogue();
    });

    // 初期メッセージ
    dialogText.innerHTML = "* あなたの 前に 新たな敵が 現れた。<br>* 十字キーかWASDで ハートを動かせ！";
}

function startIntro() {
    isIntroActive = true;
    isGameActive = false;
    storyIndex = 0;

    startScreen.classList.add('hidden');
    enemySprite.classList.remove('hidden');
    battleBox.classList.add('hidden'); // 会話中はボックスを隠す

    showNextDialogue();
}

function showNextDialogue() {
    if (storyIndex < storyData.length) {
        dialogText.innerText = storyData[storyIndex];
        storyIndex++;
    } else {
        isIntroActive = false;
        startGame();
    }
}

function startGame() {
    isGameActive = true;
    isIntroActive = false;
    playerPos = { x: 200, y: 200 };

    gameOverScreen.classList.add('hidden');
    startScreen.classList.add('hidden');
    enemySprite.classList.remove('hidden');
    battleBox.classList.remove('hidden');

    playerHP = MAX_HP;
    isInvincible = false;
    invincibilityFrames = 0;
    player.style.opacity = '1';
    player.style.left = playerPos.x + 'px';
    player.style.top = playerPos.y + 'px';

    score = 0;
    if (scoreText) scoreText.innerText = 'SCORE: 0';

    updateHPUI();

    // 古い弾とアイテムをすべて消す
    bullets.forEach(b => b.element.remove());
    bullets = [];
    items.forEach(item => item.element.remove());
    items = [];

    playerSpeed = playerBaseSpeed;
    speedBoostTimer = 0;

    frameCount = 0;
    currentAttackPattern = 0;
    dialogText.innerText = "* 用心して 避けろ！";

    // BGM開始
    if (typeof startBGM === 'function') {
        startBGM();
    }

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
            let x = isRight ? 420 : -20;
            let vx = isRight ? -speed : speed;
            createBullet('bone_v', { x: x, y: 386, vx: vx, vy: 0 }); // 床を這う骨
        } else {
            let x = Math.random() * 380 + 10;
            createBullet('bone_v', { x: x, y: 420, vx: 0, vy: -speed });
        }
    } else {
        let x = Math.random() * 380 + 10;
        let isTop = Math.random() > 0.5;
        let y = isTop ? -20 : 420;
        let vy = isTop ? speed : -speed;
        createBullet('bone_h', { x: x, y: y, vx: 0, vy: vy });
    }
}

function spawnHomingBullet() {
    const settings = difficultySettings[currentDifficulty];
    if (!settings.hasHoming) return;

    const x = Math.random() * 400;
    const y = -10;
    const speed = 2 * settings.bulletSpeedMult;
    createBullet('homing', { x, y, vx: 0, vy: 1, speed: speed });
}

function spawnRectAttack() {
    const settings = difficultySettings[currentDifficulty];
    const speed = 2 * settings.bulletSpeedMult;
    const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let x, y, vx, vy, w, h;

    if (side === 0) { // top
        x = Math.random() * 360 + 20; y = -40; vx = 0; vy = speed; w = 40; h = 80;
    } else if (side === 1) { // right
        x = 440; y = Math.random() * 360 + 20; vx = -speed; vy = 0; w = 80; h = 40;
    } else if (side === 2) { // bottom
        x = Math.random() * 360 + 20; y = 440; vx = 0; vy = -speed; w = 40; h = 80;
    } else { // left
        x = -40; y = Math.random() * 360 + 20; vx = speed; vy = 0; w = 80; h = 40;
    }

    const el = document.createElement('div');
    el.className = 'bullet bullet-rect';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.width = w + 'px';
    el.style.height = h + 'px';
    battleBox.appendChild(el);

    bullets.push({ type: 'rect', element: el, x, y, vx, vy, width: w, height: h });
}

function spawnItem() {
    // 回復が必要な時ほど出やすくする
    const hpRatio = playerHP / MAX_HP;
    const spawnChance = 0.005 + (1 - hpRatio) * 0.01;
    if (Math.random() > spawnChance) return;

    const type = Math.random() > 0.3 ? 'heal' : 'speed';
    const x = Math.random() * 360 + 20;
    const y = Math.random() * 360 + 20;

    const el = document.createElement('div');
    el.className = `item item-${type}`;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    battleBox.appendChild(el);

    items.push({ type, element: el, x, y, life: 300 }); // 5秒で消える
}

function updateItems() {
    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.life--;

        // 当たり判定
        const dx = item.x - playerPos.x;
        const dy = item.y - playerPos.y;
        if (Math.sqrt(dx * dx + dy * dy) < 15) {
            if (item.type === 'heal') {
                playerHP = Math.min(MAX_HP, playerHP + 4);
                updateHPUI();
                dialogText.innerText = "* HPが 回復した！";
            } else if (item.type === 'speed') {
                playerSpeed = playerBaseSpeed * 1.5;
                speedBoostTimer = 180; // 3秒間
                dialogText.innerText = "* スピードが 上がった！";
            }
            item.element.remove();
            items.splice(i, 1);
            continue;
        }

        if (item.life <= 0) {
            item.element.remove();
            items.splice(i, 1);
        }
    }
}

// ====== ゲーム全体更新 ======

function updatePlayer() {
    if (keys['ArrowUp'] || keys['w'] || keys['W']) playerPos.y -= playerSpeed;
    if (keys['ArrowDown'] || keys['s'] || keys['S']) playerPos.y += playerSpeed;
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) playerPos.x -= playerSpeed;
    if (keys['ArrowRight'] || keys['d'] || keys['D']) playerPos.x += playerSpeed;

    // Bounds check (box is 400x400, player is 16x16)
    if (playerPos.x < 8) playerPos.x = 8;
    if (playerPos.y < 8) playerPos.y = 8;
    if (playerPos.x > 392) playerPos.x = 392;
    if (playerPos.y > 392) playerPos.y = 392;

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

    // スピードアップのタイマー管理
    if (speedBoostTimer > 0) {
        speedBoostTimer--;
        player.style.boxShadow = '0 0 10px #00ffff'; // スピードアップ中のエフェクト
        if (speedBoostTimer <= 0) {
            playerSpeed = playerBaseSpeed;
            player.style.boxShadow = '0 0 5px rgba(255, 0, 0, 0.8)';
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
                    if (Math.abs(playerPos.x - b.x) < 40) hit = true;
                } else {
                    if (Math.abs(playerPos.y - b.y) < 40) hit = true;
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
        } else if (b.type === 'rect') {
            if (Math.abs(playerPos.x - b.x) < b.width / 2 + 4 && Math.abs(playerPos.y - b.y) < b.height / 2 + 4) hit = true;
        } else {
            const dx = b.x - playerPos.x;
            const dy = b.y - playerPos.y;
            if (Math.sqrt(dx * dx + dy * dy) < 8) hit = true;
        }

        if (hit) hitPlayer();

        // 削除判定
        if (b.x < -100 || b.x > 500 || b.y < -100 || b.y > 500) {
            b.element.remove();
            bullets.splice(i, 1);
        }
    }
}

function gameLoop(time) {
    if (!isGameActive) return;

    updatePlayer();
    updateBullets();
    updateItems();
    spawnItem();

    // スコア加算
    score += 10;
    if (scoreText) scoreText.innerText = 'SCORE: ' + score;

    if (score >= CLEAR_SCORE) {
        gameClear();
        return;
    }

    frameCount++;
    const settings = difficultySettings[currentDifficulty];

    // パターンの切り替え
    if (frameCount % 600 === 0) {
        currentAttackPattern = (currentAttackPattern + 1) % 6;
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
                warningEl.style.height = '400px';
                warningEl.style.left = targetPos + 'px';
                warningEl.style.top = '0px';
                warningEl.style.transform = 'translate(-50%, 0)';
            } else {
                warningEl.style.width = '400px';
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

                if (isVertical) { warningEl.style.width = '80px'; }
                else { warningEl.style.height = '80px'; }

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
    } else if (currentAttackPattern === 5) {
        if (frameCount % 600 === 0) dialogText.innerText = "* 枠の外から 強力な攻撃が！\n* 四方八方に 注意しろ！";
        if (frameCount % Math.floor(45 * settings.spawnRateMult) === 0) spawnRectAttack();
        if (frameCount % Math.floor(80 * settings.spawnRateMult) === 0) spawnBoneAttack();
    }

    frameId = requestAnimationFrame(gameLoop);
}

function gameOver() {
    isGameActive = false;
    cancelAnimationFrame(frameId);
    gameOverScreen.classList.remove('hidden');
    enemySprite.classList.add('hidden');

    // BGM停止
    if (typeof stopBGM === 'function') {
        stopBGM();
    }
}

function gameClear() {
    isGameActive = false;
    cancelAnimationFrame(frameId);
    if (finalScoreText) finalScoreText.innerText = score;
    clearScreen.classList.remove('hidden');
    enemySprite.classList.add('hidden');

    // BGM停止
    if (typeof stopBGM === 'function') {
        stopBGM();
    }
}

// 初期化（DOMロード時に実行）
document.addEventListener('DOMContentLoaded', initEvent);
