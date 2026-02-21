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
    // ストリートピアノ風の音色（Web Audio APIによる簡易合成）

    // メインの音（やわらかいサイン波）
    const osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(frequency, startTime);

    // ピアノらしい明るさを足す倍音（トライアングル波）
    const osc2 = audioCtx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(frequency, startTime);

    // ハンマーが弦を叩くようなアタック音成分
    const attackOsc = audioCtx.createOscillator();
    attackOsc.type = 'sine';
    attackOsc.frequency.setValueAtTime(frequency * 2, startTime);

    const mainGain = audioCtx.createGain();
    const attackGain = audioCtx.createGain();

    // メインの余韻（ペダルを踏んだようなストリートピアノ感を出すために長めに鳴らす）
    mainGain.gain.setValueAtTime(0, startTime);
    mainGain.gain.linearRampToValueAtTime(0.3, startTime + 0.01); // 素早い立ち上がり
    mainGain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5); // ゆっくり自然減衰

    // アタック音のエンベロープ（一瞬だけ鳴る）
    attackGain.gain.setValueAtTime(0, startTime);
    attackGain.gain.linearRampToValueAtTime(0.1, startTime + 0.005);
    attackGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

    // 接続
    osc1.connect(mainGain);
    osc2.connect(mainGain);
    attackOsc.connect(attackGain);

    mainGain.connect(audioCtx.destination);
    attackGain.connect(audioCtx.destination);

    // 再生開始
    osc1.start(startTime);
    osc2.start(startTime);
    attackOsc.start(startTime);

    // 十分な余韻のあとに停止
    osc1.stop(startTime + 2.0);
    osc2.stop(startTime + 2.0);
    attackOsc.stop(startTime + 0.2);
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
