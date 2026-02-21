// BGM生成用 (Web Audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let bgmOscillator = null;
let bgmGainNode = null;
let isPlayingBgm = false;
let nextNoteTime = 0;
let currentNoteIndex = 0;
let bgmIntervalId = null;

// メガロバニア風のイントロメロディ（音階と長さ）
// 音階: D(レ), D, D(1オクターブ上), A(ソ#なし、ラのフラット=Ab または A), Ab, G, F, D, F, G
// 今回は簡易的なDマイナーペンタトニック系のフレーズ
const scaleFreqs = {
    'D3': 146.83,
    'F3': 174.61,
    'G3': 196.00,
    'Ab3': 207.65,
    'A3': 220.00,
    'C4': 261.63,
    'D4': 293.66,
    'F4': 349.23,
    'G4': 392.00,
};

const bgmMelody = [
    { note: 'D3', length: 1 }, // 16分音符単位のようなイメージ
    { note: 'D3', length: 1 },
    { note: 'D4', length: 2 },
    { note: 'A3', length: 3 },
    { note: null, length: 1 }, // 休符
    { note: 'Ab3', length: 2 },
    { note: 'G3', length: 2 },
    { note: 'F3', length: 2 },
    { note: 'D3', length: 1 },
    { note: 'F3', length: 1 },
    { note: 'G3', length: 1 },
];

const TEMPO = 140; // BPM
const TENTH_SEC = (60 / TEMPO) / 4; // 1拍の1/4の長さ（秒単位）

function playNote(frequency, startTime, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // 8ビット風の音色（矩形波）
    osc.type = 'square';
    osc.frequency.setValueAtTime(frequency, startTime);

    // 少しデチューンさせて厚みを出す
    const detuneOsc = audioCtx.createOscillator();
    detuneOsc.type = 'square';
    detuneOsc.frequency.setValueAtTime(frequency, startTime);
    detuneOsc.detune.setValueAtTime(10, startTime); // 少しピッチをズラす

    // ボリューム設定 (少し小さめにする)
    gain.gain.setValueAtTime(0.04, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.05); // 音の切れ目をはっきりさせる

    osc.connect(gain);
    detuneOsc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
    detuneOsc.start(startTime);
    detuneOsc.stop(startTime + duration);
}

function scheduler() {
    // 現在の時間が次のノートの再生時間より前（予約の余裕がある範囲）なら予約する
    while (nextNoteTime < audioCtx.currentTime + 0.1) {
        const currentNote = bgmMelody[currentNoteIndex];
        const duration = currentNote.length * TENTH_SEC;

        if (currentNote.note !== null) {
            playNote(scaleFreqs[currentNote.note], nextNoteTime, duration);
        }

        nextNoteTime += duration;
        currentNoteIndex = (currentNoteIndex + 1) % bgmMelody.length;
    }
}

function startBGM() {
    if (isPlayingBgm) return;
    isPlayingBgm = true;

    // ブラウザの制約対応: 初回クリック時にResumeさせる
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    currentNoteIndex = 0;
    nextNoteTime = audioCtx.currentTime + 0.1; // 少し余裕を持って開始
    bgmIntervalId = setInterval(scheduler, 25); // こまめにスケジュールをチェック
}

function stopBGM() {
    if (!isPlayingBgm) return;
    isPlayingBgm = false;
    clearInterval(bgmIntervalId);
}
