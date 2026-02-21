
// DOM Elements
const lane = document.getElementById('lane');
const hitZone = document.getElementById('hit-zone');
const scoreEl = document.getElementById('score');
const finalScoreEl = document.getElementById('final-score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const comboDisplay = document.getElementById('combo-display');
const comboCountEl = document.getElementById('combo-count');
const judgmentDisplay = document.getElementById('judgment-display');
const maxComboEl = document.getElementById('max-combo');
const perfectCountEl = document.getElementById('perfect-count');
const goodCountEl = document.getElementById('good-count');
const missCountEl = document.getElementById('miss-count');
const restartBtn = document.getElementById('restart-btn');
const gaugeFillEl = document.getElementById('gauge-fill'); // Added

// Drum parts
const drumParts = {
    'd': document.getElementById('drum-left-ka'),
    'f': document.getElementById('drum-left-don'),
    'j': document.getElementById('drum-right-don'),
    'k': document.getElementById('drum-right-ka')
};

// Game Constants
const LANE_WIDTH = 800; // Approx visible width
const HIT_X = 145; // Hit zone center X relative to lane start
const NOTE_SPEED = 500; // Pixels per second
const SPAWN_X = 1000; // Spawn position off-screen

// Game State
let isGameActive = false;
let score = 0;
let combo = 0;
let maxCombo = 0;
let startTime = 0;
let animationFrameId;
let notes = [];
let noteIndex = 0;
let gauge = 0; // Added
const MAX_GAUGE = 100;
const CLEAR_THRESHOLD = 80;
const GAUGE_GAIN_PERFECT = 2;
const GAUGE_GAIN_GOOD = 1;
const GAUGE_LOSS_MISS = 3;

// Stats
let stats = {
    perfect: 0,
    good: 0,
    miss: 0
};

// Map Data
let mapData = [];

function generateMap(difficulty = 'normal') {
    mapData = [];

    // Difficulty Settings
    let bpm = 120;
    let prob4th = 0.8;
    let prob8th = 0;
    let prob16th = 0;
    let songLength = 100;

    switch (difficulty) {
        case 'easy': // Kantan
            bpm = 100;
            prob4th = 0.9;
            prob8th = 0.0;
            prob16th = 0.0;
            songLength = 80;
            break;
        case 'normal': // Futsuu
            bpm = 130;
            prob4th = 0.6;
            prob8th = 0.3;
            prob16th = 0.0;
            songLength = 120;
            break;
        case 'hard': // Muzukashii
            bpm = 150;
            prob4th = 0.4;
            prob8th = 0.5;
            prob16th = 0.05;
            songLength = 180;
            break;
        case 'oni': // Oni
            bpm = 180;
            prob4th = 0.1;
            prob8th = 0.5;
            prob16th = 0.4;
            songLength = 250;
            break;
    }

    const beatInterval = 60000 / bpm; // ms per beat
    let time = 2000; // Start delay

    // Create pattern
    for (let i = 0; i < songLength; i++) {
        const r = Math.random();
        let type = Math.random() > 0.45 ? 'don' : 'ka';

        if (r < prob4th) {
            mapData.push({ time: time, type: type });
        } else if (r < prob4th + prob8th) {
            mapData.push({ time: time, type: type });
            mapData.push({ time: time + (beatInterval / 2), type: Math.random() > 0.5 ? 'don' : 'ka' });
        } else if (r < prob4th + prob8th + prob16th) {
            for (let j = 0; j < 4; j++) {
                mapData.push({ time: time + (beatInterval / 4) * j, type: Math.random() > 0.5 ? 'don' : 'ka' });
            }
        }

        time += beatInterval;
    }
    // End marker
    mapData.push({ time: time + 2000, type: 'end' });
}

// Key mapping
const keyMap = {
    'd': 'ka',
    'f': 'don',
    'j': 'don',
    'k': 'ka'
};

// Sound Effects (Web Audio API)
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function createSound(type) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'don') {
        // Deeper, punchier kick-like sound
        osc.type = 'triangle'; // Triangle has more body than sine
        osc.frequency.setValueAtTime(120, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

        osc.stop(audioCtx.currentTime + 0.15);
    } else { // ka
        // Sharper, higher rim-shot like sound
        osc.type = 'square'; // Square rich harmonics for 'clack'
        // Filter to remove harsh highs
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 3000;

        osc.disconnect();
        osc.connect(filter);
        filter.connect(gainNode);

        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);

        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

        osc.stop(audioCtx.currentTime + 0.05);
    }

    osc.start();
}

function playSound(type) {
    // Only verify audio context exists
    if (!audioCtx) initAudio();
    createSound(type);
}

// Game Loop
function startGame(difficulty = 'normal') {
    initAudio(); // Initialize audio on start interaction
    generateMap(difficulty);
    isGameActive = true;
    score = 0;
    combo = 0;
    maxCombo = 0;
    stats = { perfect: 0, good: 0, miss: 0 };
    noteIndex = 0;
    notes = [];
    startTime = performance.now();

    // UI Reset
    scoreEl.innerText = '0';
    comboDisplay.classList.add('hidden');
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    // Clear lane
    const existingNotes = document.querySelectorAll('.note');
    existingNotes.forEach(n => n.remove());

    // Initialize gauge
    gauge = 0;
    updateGauge(0);

    requestAnimationFrame(update);
}

function update(timestamp) {
    if (!isGameActive) return;

    const currentTime = timestamp - startTime;

    // spawn notes
    while (noteIndex < mapData.length && mapData[noteIndex].time - 1500 <= currentTime) {
        if (mapData[noteIndex].type === 'end') {
            if (notes.length === 0) {
                endGame();
                return;
            }
        } else {
            createNote(mapData[noteIndex]);
        }
        noteIndex++;
    }

    // Move notes
    for (let i = notes.length - 1; i >= 0; i--) {
        const note = notes[i];

        const timeDiff = note.data.time - currentTime;
        const x = HIT_X + (timeDiff / 1000) * NOTE_SPEED;

        // Offset by half note width (35px) to center visually
        note.element.style.transform = `translate(${x - 35}px, -50%)`;
        note.currentX = x;

        // Miss check (時間ベースで正確に判定, goodWindow外に出たらミス)
        if (timeDiff < -200) {
            showJudgment('不可');
            combo = 0;
            updateCombo();
            note.element.remove();
            notes.splice(i, 1);
            stats.miss++;
            updateGauge(-GAUGE_LOSS_MISS);
        }
    }

    requestAnimationFrame(update);
}

function createNote(data) {
    const el = document.createElement('div');
    el.className = `note ${data.type}`;
    el.style.transform = `translate(1000px, -50%)`;
    lane.appendChild(el);

    notes.push({
        data: data,
        element: el,
        hit: false
    });
}

function handleInput(key) {
    if (!isGameActive) return;

    const type = keyMap[key];
    if (!type) return;

    // Visual feedback
    const drumPart = drumParts[key];
    if (drumPart) {
        drumPart.classList.remove('active');
        void drumPart.offsetWidth; // Force reflow
        drumPart.classList.add('active');
        setTimeout(() => drumPart.classList.remove('active'), 100);
    }

    playSound(type);

    // Hit detection - Time based
    const currentTime = performance.now() - startTime;

    // Latency Compensation (ms)
    // A negative value shifts the window earlier (compensating for audio/visual delay)
    // "Feels late" -> hit needs to be earlier relative to music? Or note needs to be visual earlier?
    // If "hit is center but counts as miss or late":
    // Users often hit slightly late due to visual/audio travel time.
    // We want to shift the "Target Time" to match user's perceived "Now".
    // Or shift user's input time.
    // Let's add an offset to the difference calculation.
    // Latency Compensation (ms)
    const LATENCY_OFFSET = 0;

    // Hit windows (ms)
    const perfectWindow = 100;
    const goodWindow = 200;

    let hitNoteIndex = -1;

    // Search for closest note
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        if (note.data.type !== type || note.hit) continue;

        // Apply latency compensation to the difference
        const rawDiff = note.data.time - currentTime;
        const timeDiff = Math.abs(rawDiff + LATENCY_OFFSET);

        if (timeDiff < goodWindow) {
            hitNoteIndex = i;
            break;
        }
    }

    if (hitNoteIndex !== -1) {
        const note = notes[hitNoteIndex];
        const rawDiff = note.data.time - currentTime;
        const timeDiff = Math.abs(rawDiff + LATENCY_OFFSET);

        note.hit = true;
        note.element.remove();
        notes.splice(hitNoteIndex, 1);

        // Trigger Hit Flash Animation
        const hitZoneCircle = hitZone.querySelector('.hit-circle');
        hitZoneCircle.classList.remove('hit-animation');
        void hitZoneCircle.offsetWidth; // Force Reflow
        hitZoneCircle.classList.add('hit-animation');

        if (timeDiff < perfectWindow) {
            score += 1000 + (combo * 10);
            showJudgment('良');
            combo++;
            stats.perfect++;
            updateGauge(GAUGE_GAIN_PERFECT);
        } else {
            score += 500 + (combo * 5);
            showJudgment('可');
            combo++;
            stats.good++;
            updateGauge(GAUGE_GAIN_GOOD);
        }
        updateCombo();
        scoreEl.innerText = score.toLocaleString();
    }
}

function updateCombo() {
    if (combo > 0) {
        comboCountEl.innerText = combo;
        comboDisplay.classList.remove('hidden');
        comboCountEl.style.transform = 'scale(1.5)';
        setTimeout(() => comboCountEl.style.transform = 'scale(1)', 100);
    } else {
        comboDisplay.classList.add('hidden');
    }
    if (combo > maxCombo) maxCombo = combo;
}

function updateGauge(amount) {
    gauge += amount;
    if (gauge > MAX_GAUGE) gauge = MAX_GAUGE;
    if (gauge < 0) gauge = 0;

    if (gaugeFillEl) {
        gaugeFillEl.style.width = `${gauge}%`;

        if (gauge === MAX_GAUGE) {
            gaugeFillEl.className = 'gauge-fill max';
        } else if (gauge >= CLEAR_THRESHOLD) {
            gaugeFillEl.className = 'gauge-fill cleared';
        } else {
            gaugeFillEl.className = 'gauge-fill';
        }
    }
}

function showJudgment(text) {
    judgmentDisplay.innerText = text;
    judgmentDisplay.className = '';
    void judgmentDisplay.offsetWidth;

    // Assign class based on text content for coloring
    if (text === '良') judgmentDisplay.className = 'judgment-perfect';
    else if (text === '可') judgmentDisplay.className = 'judgment-good';
    else if (text === '不可') judgmentDisplay.className = 'judgment-miss';
}

function endGame() {
    isGameActive = false;
    finalScoreEl.innerText = score.toLocaleString();
    maxComboEl.innerText = maxCombo;
    perfectCountEl.innerText = stats.perfect;
    goodCountEl.innerText = stats.good;
    missCountEl.innerText = stats.miss;

    // Add Clear Result to Game Over Screen
    let resultTitle = document.querySelector('#game-over-screen h2');
    if (gauge >= CLEAR_THRESHOLD) {
        resultTitle.innerText = "クリア成功！";
        resultTitle.style.color = "#ffeb3b";
    } else {
        resultTitle.innerText = "クリア失敗...";
        resultTitle.style.color = "#888";
    }

    gameOverScreen.classList.remove('hidden');
}

// Event Listeners
const mainStartBtn = document.getElementById('main-start-btn');
if (mainStartBtn) {
    mainStartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startGame('normal');
    });
}

window.addEventListener('keydown', (e) => {
    if (e.repeat) return; // キー長押しによる連続入力（意図しない多重判定）を防止
    if (e.key === ' ' && !isGameActive && !startScreen.classList.contains('hidden')) {
        startGame('normal');
        return;
    }
    if (keyMap[e.key]) {
        handleInput(e.key);
    }
});

// Difficulty Selection
document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const difficulty = btn.dataset.diff;
        startGame(difficulty);
    });
});

restartBtn.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    startScreen.classList.add('active');
});
