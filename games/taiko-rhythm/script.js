
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
const gaugeSegments = document.querySelectorAll('.gauge-segment');
const songListContainer = document.getElementById('song-list-container');
const songSelection = document.getElementById('song-selection');
const difficultySelection = document.getElementById('difficulty-selection');
const backToSongsBtn = document.getElementById('back-to-songs');

// Drum parts
const drumParts = {
    'd': document.getElementById('drum-left-ka'),
    'f': document.getElementById('drum-left-don'),
    'j': document.getElementById('drum-right-don'),
    'k': document.getElementById('drum-right-ka')
};

// Game Constants
const LANE_WIDTH = 800;
const HIT_X = 145;
const NOTE_SPEED = 500;
const SPAWN_X = 1000;

// Game State
let isGameActive = false;
let score = 0;
let combo = 0;
let maxCombo = 0;
let startTime = 0;
let animationFrameId;
let notes = [];
let noteIndex = 0;
let gauge = 0;
const MAX_GAUGE = 100;
const CLEAR_THRESHOLD = 80;

// Difficulty-based Gauge Settings
const GAUGE_SETTINGS = {
    easy: { perfect: 5.0, good: 2.5, miss: 2.0 },
    normal: { perfect: 4.0, good: 2.0, miss: 5.0 },
    hard: { perfect: 0.625, good: 0.3, miss: 10.0 },
    oni: { perfect: 0.33, good: 0.15, miss: 20.0 }
};
let currentGaugeConfig = GAUGE_SETTINGS.normal;

// Stats
let stats = {
    perfect: 0,
    good: 0,
    miss: 0
};

// 楽曲データは songs.js に移行されました。
let currentSong = SONG_LIST[0];
let bgmIntervalId = null;

// Map Data
let mapData = [];

function generateMap(difficulty = 'normal') {
    mapData = [];

    const bpm = currentSong.bpm;
    const beatInterval = 60000 / bpm;
    const startDelay = 2000;

    mapData.push({ time: 0, type: 'start_bgm' });

    const songId = currentSong.id;
    const beatmapSet = BEATMAPS[songId];
    const pattern = beatmapSet ? (beatmapSet[difficulty] || beatmapSet.normal) : null;

    if (pattern) {
        const loops = difficulty === 'oni' ? 8 : difficulty === 'hard' ? 6 : 5;
        const beatsPerLoop = 16;
        for (let loop = 0; loop < loops; loop++) {
            pattern.forEach(note => {
                const timeMs = startDelay + (loop * beatsPerLoop * beatInterval) + (note.at * beatInterval);
                mapData.push({ time: timeMs, type: note.t === 'd' ? 'don' : 'ka' });
            });
        }
    } else {
        let time = startDelay;
        const songLength = difficulty === 'oni' ? 100 : difficulty === 'hard' ? 70 : 40;
        for (let i = 0; i < songLength; i++) {
            const type = Math.random() > 0.4 ? 'don' : 'ka';
            mapData.push({ time, type });
            time += beatInterval;
        }
    }

    mapData.sort((a, b) => a.time - b.time);

    const lastNote = mapData[mapData.length - 1];
    const endTime = (lastNote ? lastNote.time : startDelay) + 2000;
    mapData.push({ time: endTime, type: 'end' });
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

function startBGM(bpm) {
    if (!audioCtx) initAudio();

    const beatSec = 60 / bpm;
    const melodyKey = currentSong.basePattern;
    const melodyNotes = BGM_MELODIES[melodyKey] || BGM_MELODIES.matsuri;

    let noteIndex = 0;
    let currentBeatTime = audioCtx.currentTime + 0.1;

    function scheduleMelody() {
        if (!isGameActive) return;
        while (currentBeatTime < audioCtx.currentTime + 0.5) {
            const [freq, durBeats] = melodyNotes[noteIndex % melodyNotes.length];
            const durSec = durBeats * beatSec;
            playMelodyNote(freq, currentBeatTime, durSec * 0.8);
            currentBeatTime += durSec;
            noteIndex++;
        }
        setTimeout(scheduleMelody, 150);
    }

    let drumTime = audioCtx.currentTime + 0.1;
    function scheduleDrum() {
        if (!isGameActive) return;
        while (drumTime < audioCtx.currentTime + 0.5) {
            const beat = Math.round((drumTime - audioCtx.currentTime) / beatSec) % 4;
            createBgmDrum('low', drumTime);
            if (beat % 2 === 1) createBgmDrum('high', drumTime + beatSec * 0.5);
            drumTime += beatSec;
        }
        setTimeout(scheduleDrum, 150);
    }

    let bassTime = audioCtx.currentTime + 0.1;
    function scheduleBass() {
        if (!isGameActive) return;
        while (bassTime < audioCtx.currentTime + 0.5) {
            const bassFreq = 110;
            playBassNote(bassFreq, bassTime, beatSec * 0.7);
            bassTime += beatSec * 2;
        }
        setTimeout(scheduleBass, 150);
    }

    scheduleMelody();
    scheduleDrum();
    scheduleBass();
}

function playMelodyNote(freq, time, dur) {
    const melodyKey = currentSong.basePattern;
    const style = (INSTRUMENT_STYLES[melodyKey] || INSTRUMENT_STYLES.matsuri).melody;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    let destination = audioCtx.destination;

    if (style.filter) {
        const filter = audioCtx.createBiquadFilter();
        filter.type = style.filter.type;
        filter.frequency.value = style.filter.freq;
        filter.connect(audioCtx.destination);
        destination = filter;
    }

    osc.connect(gain);
    gain.connect(destination);
    osc.type = style.type;
    osc.frequency.setValueAtTime(freq, time);

    if (style.pitchSlide) {
        osc.frequency.exponentialRampToValueAtTime(freq * 0.98, time + dur * 0.3);
    }

    if (style.harmonics) {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.connect(gain2);
        gain2.connect(destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 2, time);
        gain2.gain.setValueAtTime(style.gain * 0.4, time);
        gain2.gain.exponentialRampToValueAtTime(0.001, time + dur * 0.6);
        osc2.start(time);
        osc2.stop(time + dur);
    }

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(style.gain, time + style.attack);
    gain.gain.exponentialRampToValueAtTime(0.001, time + Math.min(dur * style.decay, dur));
    osc.start(time);
    osc.stop(time + dur);
}

function playBassNote(freq, time, dur) {
    const melodyKey = currentSong.basePattern;
    const style = (INSTRUMENT_STYLES[melodyKey] || INSTRUMENT_STYLES.matsuri).bass;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    let destination = audioCtx.destination;

    if (style.filter) {
        const filter = audioCtx.createBiquadFilter();
        filter.type = style.filter.type;
        filter.frequency.value = style.filter.freq;
        filter.connect(audioCtx.destination);
        destination = filter;
    }

    osc.connect(gain);
    gain.connect(destination);
    osc.type = style.type;
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(style.gain, time + style.attack);
    gain.gain.exponentialRampToValueAtTime(0.001, time + Math.min(dur * style.decay, dur));
    osc.start(time);
    osc.stop(time + dur);
}

function createBgmDrum(type, time) {
    const style = INSTRUMENT_STYLES[currentSong.basePattern] || INSTRUMENT_STYLES.matsuri;
    const drumStyle = style.drum;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'low') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(drumStyle.kickFreq[0], time);
        osc.frequency.exponentialRampToValueAtTime(drumStyle.kickFreq[1], time + 0.12);
        gainNode.gain.setValueAtTime(drumStyle.kickGain, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
    } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(drumStyle.hihatFreq[0], time);
        osc.frequency.exponentialRampToValueAtTime(drumStyle.hihatFreq[1], time + 0.06);
        gainNode.gain.setValueAtTime(drumStyle.hihatGain, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
    }

    osc.start(time);
    osc.stop(time + 0.18);
}

function createSound(type) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'don') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.8, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    } else {
        osc.type = 'square';
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 1000;
        osc.disconnect();
        osc.connect(filter);
        filter.connect(gainNode);
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    }
}

function playSound(type) {
    if (!audioCtx) initAudio();
    createSound(type);
}

function startGame(difficulty = 'normal') {
    initAudio();
    generateMap(difficulty);
    currentGaugeConfig = GAUGE_SETTINGS[difficulty] || GAUGE_SETTINGS.normal;
    isGameActive = true;
    score = 0;
    combo = 0;
    maxCombo = 0;
    stats = { perfect: 0, good: 0, miss: 0 };
    noteIndex = 0;
    notes = [];
    startTime = performance.now();

    scoreEl.innerText = '0';
    comboDisplay.classList.add('hidden');
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    gauge = 0;
    updateGauge(0);

    startBGM(currentSong.bpm);

    const existingNotes = document.querySelectorAll('.note');
    existingNotes.forEach(n => n.remove());

    requestAnimationFrame(update);
}

function update(timestamp) {
    if (!isGameActive) return;

    const currentTime = timestamp - startTime;

    while (noteIndex < mapData.length && mapData[noteIndex].time - 1500 <= currentTime) {
        if (mapData[noteIndex].type === 'end') {
            if (notes.length === 0) {
                endGame();
                return;
            }
        } else if (mapData[noteIndex].type === 'start_bgm') {
            // Handled in startGame already
        } else {
            createNote(mapData[noteIndex]);
        }
        noteIndex++;
    }

    for (let i = notes.length - 1; i >= 0; i--) {
        const note = notes[i];
        const timeDiff = note.data.time - currentTime;
        const x = HIT_X + (timeDiff / 1000) * NOTE_SPEED;

        note.element.style.transform = `translate(${x - 35}px, -50%)`;
        note.currentX = x;

        if (timeDiff < -200) {
            showJudgment('不可');
            combo = 0;
            updateCombo();
            note.element.remove();
            notes.splice(i, 1);
            stats.miss++;
            updateGauge(-currentGaugeConfig.miss);
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

    const drumPart = drumParts[key];
    if (drumPart) {
        drumPart.classList.remove('active');
        void drumPart.offsetWidth;
        drumPart.classList.add('active');
        setTimeout(() => drumPart.classList.remove('active'), 100);
    }

    const currentTime = performance.now() - startTime;
    const LATENCY_OFFSET = -30;
    const perfectWindow = 100;
    const goodWindow = 200;

    let hitNoteIndex = -1;
    let minTimeDiff = Infinity;

    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        if (note.data.type !== type || note.hit) continue;

        const rawDiff = note.data.time - currentTime;
        const timeDiff = Math.abs(rawDiff + LATENCY_OFFSET);

        if (timeDiff < goodWindow && timeDiff < minTimeDiff) {
            minTimeDiff = timeDiff;
            hitNoteIndex = i;
        }
    }

    if (hitNoteIndex !== -1) {
        const note = notes[hitNoteIndex];
        const rawDiff = note.data.time - currentTime;
        const timeDiff = Math.abs(rawDiff + LATENCY_OFFSET);

        note.hit = true;
        note.element.remove();
        notes.splice(hitNoteIndex, 1);

        const hitZoneCircle = hitZone.querySelector('.hit-circle');
        hitZoneCircle.classList.remove('hit-animation');
        void hitZoneCircle.offsetWidth;
        hitZoneCircle.classList.add('hit-animation');

        if (timeDiff < perfectWindow) {
            score += 1000 + (combo * 10);
            showJudgment('良');
            combo++;
            stats.perfect++;
            updateGauge(currentGaugeConfig.perfect);
        } else {
            score += 500 + (combo * 5);
            showJudgment('可');
            combo++;
            stats.good++;
            updateGauge(currentGaugeConfig.good);
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

    const activeCount = Math.floor(gauge / 5);

    gaugeSegments.forEach((segment, index) => {
        if (index < activeCount) {
            segment.classList.add('active');
            if (gauge === MAX_GAUGE) {
                segment.className = 'gauge-segment active max';
            } else if (gauge >= CLEAR_THRESHOLD) {
                segment.className = 'gauge-segment active cleared';
            } else {
                segment.className = 'gauge-segment active';
            }
        } else {
            segment.classList.remove('active');
            segment.className = 'gauge-segment';
        }
    });
}

function showJudgment(text) {
    judgmentDisplay.innerText = text;
    judgmentDisplay.className = '';
    void judgmentDisplay.offsetWidth;

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

    const clearStatusEl = document.getElementById('clear-status');
    if (clearStatusEl) {
        if (gauge >= CLEAR_THRESHOLD) {
            clearStatusEl.innerText = "ノルマ達成！";
            clearStatusEl.className = "clear-status-text status-clear";
        } else {
            clearStatusEl.innerText = "ノルマ未達成...";
            clearStatusEl.className = "clear-status-text status-fail";
        }
    }

    gameOverScreen.classList.remove('hidden');
}

function initSongList() {
    songListContainer.innerHTML = '';
    SONG_LIST.forEach(song => {
        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `
            <span class="song-name">${song.name}</span>
            <span class="song-bpm">BPM: ${song.bpm}</span>
        `;
        card.onclick = () => selectSong(song);
        songListContainer.appendChild(card);
    });
}

function selectSong(song) {
    currentSong = song;
    songSelection.classList.add('hidden');
    difficultySelection.classList.remove('hidden');
}

backToSongsBtn.onclick = () => {
    difficultySelection.classList.add('hidden');
    songSelection.classList.remove('hidden');
};

initSongList();

window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    if (e.key === ' ' && !isGameActive && !startScreen.classList.contains('hidden')) {
        startGame('normal');
        return;
    }
    if (keyMap[e.key]) {
        handleInput(e.key);
    }
});

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
