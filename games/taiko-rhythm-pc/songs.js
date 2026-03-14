/**
 * 太鼓リズムゲーム 楽曲データ設定 (特大ボリューム90曲版)
 * クラシック/童謡40曲 + ボカロ/アニメ/J-POP/ゲーム50曲
 */

const SONG_LIST = [
    // --- 既存の10曲 (PD) ---
    { id: 'william', name: 'ウィリアム・テル序曲', bpm: 180, basePattern: 'william', audioUrl: 'https://storage.googleapis.com/tfjs-examples/webcam-transfer-learning/william_tell.mp3' },
    { id: 'heaven', name: '天国と地獄', bpm: 190, basePattern: 'heaven', audioUrl: 'https://www.google.com/logos/2010/pacman10-i.mp3' }, // サンプルとしてパックマン音源
    { id: 'bee', name: '熊蜂の飛行', bpm: 220, basePattern: 'bee' },
    { id: 'turkish', name: 'トルコ行進曲', bpm: 125, basePattern: 'turkish' },
    { id: 'daiku', name: '第九', bpm: 135, basePattern: 'daiku' },
    { id: 'carmen', name: 'カルメン（闘牛士の歌）', bpm: 130, basePattern: 'carmen' },
    { id: 'twinkle', name: 'きらきら星', bpm: 100, basePattern: 'twinkle' },
    { id: 'mary', name: 'メリーさんの羊', bpm: 110, basePattern: 'mary' },
    { id: 'bear', name: '森のくまさん', bpm: 120, basePattern: 'bear' },
    { id: 'london', name: 'ロンドン橋落ちた', bpm: 115, basePattern: 'london' },

    // --- 新規追加のクラシック (10曲) ---
    { id: 'kanki', name: '歓喜の歌', bpm: 120, basePattern: 'kanki' },
    { id: 'wakare', name: '別れの曲', bpm: 70, basePattern: 'wakare' },
    { id: 'eine', name: 'アイネ・クライネ', bpm: 140, basePattern: 'eine' },
    { id: 'ave', name: 'アヴェ・マリア', bpm: 65, basePattern: 'ave' },
    { id: 'jupiter', name: '木星（ジュピター）', bpm: 85, basePattern: 'jupiter' },
    { id: 'ifu', name: '威風堂々', bpm: 110, basePattern: 'ifu' },
    { id: 'haru', name: '四季より「春」', bpm: 105, basePattern: 'haru' },
    { id: 'moldau', name: 'モルダウ', bpm: 115, basePattern: 'moldau' },
    { id: 'hakuco', name: '白鳥の湖', bpm: 125, basePattern: 'hakuco' },
    { id: 'radetzky', name: 'ラデツキー行進曲', bpm: 110, basePattern: 'radetzky' },

    // --- 新規追加の童謡・民謡 (20曲) ---
    { id: 'tokei', name: '大きな古時計', bpm: 90, basePattern: 'tokei' },
    { id: 'jingle', name: 'ジングルベル', bpm: 120, basePattern: 'jingle' },
    { id: 'kaeru', name: 'かえるの合唱', bpm: 115, basePattern: 'kaeru' },
    { id: 'alps', name: 'アルプス一万尺', bpm: 130, basePattern: 'alps' },
    { id: 'donguri', name: 'どんぐりころころ', bpm: 110, basePattern: 'donguri' },
    { id: 'chocho', name: 'ちょうちょう', bpm: 105, basePattern: 'chocho' },
    { id: 'haruno', name: '春の小川', bpm: 95, basePattern: 'haruno' },
    { id: 'hotaru', name: '蛍の光', bpm: 80, basePattern: 'hotaru' },
    { id: 'musunde', name: 'むすんでひらいて', bpm: 115, basePattern: 'musunde' },
    { id: 'bunbun', name: 'ぶんぶんぶん', bpm: 125, basePattern: 'bunbun' },
    { id: 'picnic', name: 'ピクニック', bpm: 135, basePattern: 'picnic' },
    { id: 'yuki', name: '雪', bpm: 100, basePattern: 'yuki' },
    { id: 'momotaro', name: '桃太郎', bpm: 120, basePattern: 'momotaro' },
    { id: 'usagi', name: 'うさぎとかめ', bpm: 110, basePattern: 'usagi' },
    { id: 'kisha', name: '汽車ポッポ', bpm: 140, basePattern: 'kisha' },
    { id: 'omatsuri', name: '村祭', bpm: 115, basePattern: 'omatsuri' },
    { id: 'koinobori', name: 'こいのぼり', bpm: 105, basePattern: 'koinobori' },
    { id: 'yuyake', name: '夕焼け小焼け', bpm: 85, basePattern: 'yuyake' },
    { id: 'katatsumuri', name: 'かたつむり', bpm: 90, basePattern: 'katatsumuri' },
    { id: 'syabon', name: 'しゃぼん玉', bpm: 95, basePattern: 'syabon' },

    // --- 追加: ボーカロイド (15曲) ---
    { id: 'senbon', name: '千本桜', bpm: 154, basePattern: 'vocaloid_fast' },
    { id: 'charles', name: 'シャルル', bpm: 145, basePattern: 'vocaloid_mid' },
    { id: 'roki', name: 'ロキ', bpm: 150, basePattern: 'rock_fast' },
    { id: 'melt', name: 'メルト', bpm: 170, basePattern: 'vocaloid_fast' },
    { id: 'vampire', name: 'ヴァンパイア', bpm: 164, basePattern: 'vocaloid_fast' },
    { id: 'kamippoi', name: '神っぽいな', bpm: 130, basePattern: 'vocaloid_mid' },
    { id: 'goodbye', name: 'グッバイ宣言', bpm: 170, basePattern: 'vocaloid_fast' },
    { id: 'otome', name: '乙女解剖', bpm: 130, basePattern: 'vocaloid_mid' },
    { id: 'phony', name: 'フォニイ', bpm: 160, basePattern: 'vocaloid_fast' },
    { id: 'romeo', name: 'ロミオとシンデレラ', bpm: 165, basePattern: 'vocaloid_fast' },
    { id: 'worldsend', name: 'ワールズエンド・ダンスホール', bpm: 175, basePattern: 'rock_fast' },
    { id: 'matryoshka', name: 'マトリョシカ', bpm: 155, basePattern: 'rock_fast' },
    { id: 'noushou', name: '脳漿炸裂ガール', bpm: 155, basePattern: 'vocaloid_fast' },
    { id: 'rokuchonen', name: '六兆年と一夜物語', bpm: 186, basePattern: 'rock_fast' },
    { id: 'asunoyozora', name: 'アスノヨゾラ哨戒班', bpm: 185, basePattern: 'rock_fast' },

    // --- 追加: アニメ・J-POP (20曲) ---
    { id: 'idol', name: 'アイドル', bpm: 166, basePattern: 'anime_pop' },
    { id: 'kickback', name: 'KICK BACK', bpm: 104, basePattern: 'rock_fast' }, // 実質ハーフ等で体感速い
    { id: 'gurenge', name: '紅蓮華', bpm: 135, basePattern: 'anime_rock' },
    { id: 'yoruni', name: '夜に駆ける', bpm: 130, basePattern: 'jpop_mid' },
    { id: 'zankoku', name: '残酷な天使のテーゼ', bpm: 128, basePattern: 'anime_pop' },
    { id: 'weare', name: 'ウィーアー！', bpm: 140, basePattern: 'anime_rock' },
    { id: 'peace', name: 'ピースサイン', bpm: 200, basePattern: 'anime_rock' },
    { id: 'zenzen', name: '前前前世', bpm: 190, basePattern: 'rock_fast' },
    { id: 'mixnut', name: 'ミックスナッツ', bpm: 150, basePattern: 'jpop_mid' },
    { id: 'kaiju', name: '怪獣の花唄', bpm: 150, basePattern: 'rock_fast' },
    { id: 'shinjidai', name: '新時代', bpm: 175, basePattern: 'anime_pop' },
    { id: 'yusha', name: '勇者', bpm: 110, basePattern: 'anime_pop' },
    { id: 'sho', name: '唱', bpm: 128, basePattern: 'jpop_mid' },
    { id: 'bansanka', name: '晩餐歌', bpm: 90, basePattern: 'jpop_slow' },
    { id: 'lemon', name: 'Lemon', bpm: 87, basePattern: 'jpop_slow' },
    { id: 'marigold', name: 'マリーゴールド', bpm: 106, basePattern: 'jpop_mid' },
    { id: 'dryflower', name: 'ドライフラワー', bpm: 74, basePattern: 'jpop_slow' },
    { id: 'genkai', name: '限界突破×サバイバー', bpm: 145, basePattern: 'anime_rock' },
    { id: 'kanade', name: '奏', bpm: 75, basePattern: 'jpop_slow' },
    { id: 'sugar', name: 'シュガーソングとビターステップ', bpm: 132, basePattern: 'anime_pop' },

    // --- 追加: ゲーム・バラエティ (15曲) ---
    { id: 'mario', name: 'スーパーマリオブラザーズ', bpm: 100, basePattern: 'game_8bit' },
    { id: 'tetris', name: 'テトリス (コロブチカ)', bpm: 140, basePattern: 'game_8bit' },
    { id: 'pacman', name: 'パックマン', bpm: 120, basePattern: 'game_8bit' },
    { id: 'dq', name: 'ドラゴンクエスト序曲', bpm: 110, basePattern: 'game_epic' },
    { id: 'zelda', name: 'ゼルダの伝説メインテーマ', bpm: 130, basePattern: 'game_epic' },
    { id: 'kirby', name: '星のカービィ', bpm: 140, basePattern: 'game_8bit' },
    { id: 'pokemon', name: 'ポケットモンスター', bpm: 145, basePattern: 'game_8bit' },
    { id: 'monhan', name: 'モンスターハンター（英雄の証）', bpm: 125, basePattern: 'game_epic' },
    { id: 'spla', name: 'スプラトゥーン（Splattack!）', bpm: 130, basePattern: 'game_rock' },
    { id: 'undertale', name: 'MEGALOVANIA（Undertale）', bpm: 120, basePattern: 'game_rock' },
    { id: 'badapple', name: 'Bad Apple!!（東方）', bpm: 138, basePattern: 'touhou' },
    { id: 'knight', name: 'ナイト・オブ・ナイツ（東方）', bpm: 180, basePattern: 'touhou' },
    { id: 'flan', name: '最終鬼畜妹フランドール・S', bpm: 200, basePattern: 'touhou' },
    { id: 'owen', name: 'U.N.オーエンは彼女なのか？', bpm: 155, basePattern: 'touhou' },
    { id: 'native', name: 'ネイティブフェイス', bpm: 145, basePattern: 'touhou' }
];

// 基本となるBGMループ（ベースパターン）。長いメロディは書かず数小節のループとして軽量化。
const presetMelodies = {
    vocaloid_fast: [[440, 0.5], [523, 0.5], [587, 0.5], [659, 0.5], [698, 0.5], [659, 0.5], [587, 0.5], [523, 0.5]],
    vocaloid_mid: [[440, 1.0], [523, 1.0], [587, 1.0], [523, 1.0]],
    rock_fast: [[220, 0.5], [220, 0.5], [261, 0.5], [293, 0.5], [220, 0.5], [220, 0.5], [329, 0.5], [293, 0.5]],
    anime_pop: [[392, 0.5], [440, 0.5], [523, 1.0], [587, 0.5], [659, 1.0], [587, 0.5]],
    anime_rock: [[329, 0.5], [392, 0.5], [440, 1.0], [329, 0.5], [392, 0.5], [493, 1.0]],
    jpop_mid: [[261, 1.0], [329, 1.0], [392, 1.0], [329, 1.0]],
    jpop_slow: [[261, 2.0], [293, 2.0], [329, 2.0], [392, 2.0]],
    game_8bit: [[523, 0.5], [659, 0.5], [587, 0.5], [523, 2.0], [392, 0.5]],
    game_epic: [[261, 1.5], [392, 0.5], [523, 2.0], [659, 1.5], [784, 0.5], [1046, 2.0]],
    game_rock: [[220, 0.5], [261, 0.5], [293, 0.5], [329, 0.5], [349, 0.5], [329, 0.5], [293, 0.5], [261, 0.5]],
    touhou: [[440, 0.25], [523, 0.25], [587, 0.25], [659, 0.25], [698, 0.5], [659, 0.5], [587, 0.5], [523, 0.5]]
};

const BGM_MELODIES = {
    // --- 既存の10曲 ---
    william: [[330, 0.25], [330, 0.25], [330, 0.5], [330, 0.25], [330, 0.25], [330, 0.5], [330, 0.25], [330, 0.25], [440, 0.5], [523, 0.5]],
    heaven: [[784, 0.25], [698, 0.25], [659, 0.25], [587, 0.25], [523, 0.5], [587, 0.5], [659, 0.5], [523, 0.5], [493, 0.25], [523, 0.25], [587, 0.5]],
    bee: [[880, 0.1], [830, 0.1], [784, 0.1], [740, 0.1], [698, 0.1], [659, 0.1], [622, 0.1], [587, 0.1]],
    turkish: [[493, 0.25], [440, 0.25], [415, 0.25], [440, 0.25], [523, 0.5], [0, 0.5], [587, 0.25], [523, 0.25], [493, 0.25], [523, 0.25], [659, 0.5]],
    daiku: [[330, 0.5], [330, 0.5], [349, 0.5], [392, 0.5], [392, 0.5], [349, 0.5], [330, 0.5], [294, 0.5], [261, 0.5], [261, 0.5], [294, 0.5], [330, 0.5]],
    carmen: [[523, 0.5], [493, 0.25], [523, 0.25], [392, 1.0], [523, 0.5], [493, 0.25], [523, 0.25], [349, 1.0], [440, 0.5], [392, 0.25], [440, 0.25], [294, 1.0]],
    twinkle: [[261, 1.0], [261, 1.0], [392, 1.0], [392, 1.0], [440, 1.0], [440, 1.0], [392, 2.0], [349, 1.0], [349, 1.0], [330, 1.0], [330, 1.0], [294, 1.0], [294, 1.0], [261, 2.0]],
    mary: [[330, 1.0], [294, 1.0], [261, 1.0], [294, 1.0], [330, 1.0], [330, 1.0], [330, 2.0], [294, 1.0], [294, 1.0], [294, 2.0], [330, 1.0], [392, 1.0], [392, 2.0]],
    bear: [[392, 0.5], [330, 0.5], [261, 0.5], [330, 0.5], [392, 1.0], [392, 0.5], [392, 0.5], [392, 0.5], [349, 0.5], [294, 0.5], [349, 0.5], [330, 2.0]],
    london: [[392, 1.5], [440, 0.5], [392, 1.0], [349, 1.0], [330, 1.0], [349, 1.0], [392, 2.0], [294, 1.0], [330, 1.0], [349, 2.0], [330, 1.0], [349, 1.0], [392, 2.0]],

    // --- 新規追加のクラシック ---
    kanki: [[330, 1.0], [330, 1.0], [349, 1.0], [392, 1.0], [392, 1.0], [349, 1.0], [330, 1.0], [294, 1.0], [261, 1.0], [261, 1.0], [294, 1.0], [330, 1.0], [330, 1.5], [294, 0.5], [294, 2.0]],
    wakare: [[330, 2.0], [349, 1.0], [392, 2.0], [523, 1.0], [493, 2.0], [392, 1.0], [440, 2.0], [349, 1.0], [330, 2.0]],
    eine: [[392, 1.0], [294, 1.0], [392, 1.0], [294, 1.0], [392, 0.5], [493, 0.5], [587, 0.5], [784, 0.5], [784, 1.0], [0, 1.0]],
    ave: [[330, 2.0], [392, 2.0], [523, 3.0], [493, 1.0], [440, 2.0], [349, 2.0], [294, 3.0], [330, 1.0]],
    jupiter: [[330, 1.5], [392, 0.5], [440, 1.0], [523, 1.0], [493, 1.5], [392, 0.5], [440, 1.0], [330, 1.0]],
    ifu: [[392, 2.0], [392, 1.0], [440, 1.0], [493, 2.0], [493, 1.0], [392, 1.0], [440, 2.0], [294, 2.0]],
    haru: [[330, 0.5], [330, 0.5], [330, 1.0], [330, 0.5], [294, 0.25], [261, 0.25], [294, 1.0], [392, 1.0]],
    moldau: [[330, 1.0], [440, 1.0], [523, 1.0], [493, 0.5], [440, 0.5], [392, 1.0], [330, 1.0], [440, 2.0]],
    hakuco: [[330, 1.0], [440, 1.0], [523, 1.0], [659, 2.0], [587, 0.5], [523, 0.5], [493, 2.0]],
    radetzky: [[392, 0.5], [523, 0.5], [523, 0.5], [523, 1.0], [392, 0.5], [523, 0.5], [523, 0.5], [523, 1.0]],

    // --- 新規追加の童謡・民謡 ---
    tokei: [[392, 1.0], [523, 1.0], [493, 1.0], [523, 1.0], [587, 1.0], [659, 1.0], [587, 1.0], [523, 1.0]],
    jingle: [[330, 1.0], [330, 1.0], [330, 2.0], [330, 1.0], [330, 1.0], [330, 2.0], [330, 1.0], [392, 1.0], [261, 1.5], [294, 0.5], [330, 4.0]],
    kaeru: [[261, 1.0], [294, 1.0], [330, 1.0], [349, 1.0], [330, 1.0], [294, 1.0], [261, 2.0]],
    alps: [[392, 0.5], [392, 0.5], [440, 0.5], [392, 0.5], [330, 1.0], [261, 1.0], [294, 0.5], [294, 0.5], [330, 0.5], [294, 0.5], [261, 2.0]],
    donguri: [[392, 1.0], [392, 1.0], [330, 0.5], [392, 0.5], [440, 1.0], [523, 1.0], [523, 1.0], [392, 2.0]],
    chocho: [[392, 1.0], [330, 1.0], [330, 2.0], [349, 1.0], [294, 1.0], [294, 2.0]],
    haruno: [[330, 1.0], [392, 1.0], [440, 1.0], [392, 1.0], [330, 1.0], [392, 1.0], [523, 2.0]],
    hotaru: [[261, 1.0], [349, 1.5], [349, 0.5], [349, 1.0], [440, 1.0], [392, 1.5], [349, 0.5], [392, 1.0], [440, 1.0]],
    musunde: [[330, 1.0], [330, 1.0], [294, 1.0], [294, 1.0], [261, 2.0], [392, 2.0]],
    bunbun: [[392, 1.0], [392, 1.0], [392, 1.0], [523, 1.0], [493, 0.5], [440, 0.5], [392, 0.5], [349, 0.5], [330, 2.0]],
    picnic: [[261, 1.0], [261, 1.0], [349, 1.0], [349, 1.0], [440, 1.0], [440, 1.0], [523, 2.0]],
    yuki: [[261, 1.0], [261, 1.0], [392, 1.0], [392, 1.0], [440, 0.5], [392, 0.5], [349, 0.5], [330, 0.5], [294, 2.0]],
    momotaro: [[392, 1.0], [392, 1.0], [330, 1.0], [261, 1.0], [294, 1.0], [294, 1.0], [261, 2.0]],
    usagi: [[261, 1.0], [261, 1.0], [330, 1.5], [349, 0.5], [392, 1.0], [392, 1.0], [392, 2.0]],
    kisha: [[330, 1.0], [392, 1.0], [523, 1.0], [523, 1.0], [440, 0.5], [392, 0.5], [349, 0.5], [440, 0.5], [392, 2.0]],
    omatsuri: [[392, 1.0], [392, 1.0], [440, 1.0], [440, 1.0], [392, 0.5], [330, 0.5], [294, 0.5], [330, 0.5], [261, 2.0]],
    koinobori: [[261, 1.5], [294, 0.5], [330, 1.0], [392, 1.0], [523, 1.5], [493, 0.5], [440, 2.0]],
    yuyake: [[392, 1.0], [392, 1.0], [440, 1.0], [523, 1.0], [440, 1.0], [392, 1.0], [330, 2.0]],
    katatsumuri: [[392, 1.0], [330, 1.0], [261, 2.0], [392, 1.0], [330, 1.0], [261, 2.0]],
    syabon: [[330, 1.0], [392, 1.0], [392, 2.0], [349, 1.0], [349, 1.0], [330, 2.0]],

    // 追加50曲分の共通プリセット割り当て
    vocaloid_fast: presetMelodies.vocaloid_fast,
    vocaloid_mid: presetMelodies.vocaloid_mid,
    rock_fast: presetMelodies.rock_fast,
    anime_pop: presetMelodies.anime_pop,
    anime_rock: presetMelodies.anime_rock,
    jpop_mid: presetMelodies.jpop_mid,
    jpop_slow: presetMelodies.jpop_slow,
    game_8bit: presetMelodies.game_8bit,
    game_epic: presetMelodies.game_epic,
    game_rock: presetMelodies.game_rock,
    touhou: presetMelodies.touhou
};

// 楽器プリセットの定義
const defaultClassicVoice = { melody: { type: 'sine', gain: 0.22, attack: 0.05, decay: 1.0 }, bass: { type: 'sine', gain: 0.18, attack: 0.05, decay: 0.8 }, drum: { kickFreq: [90, 30], hihatFreq: [400, 200], kickGain: 0.4, hihatGain: 0.1 } };
const defaultFolkVoice = { melody: { type: 'triangle', gain: 0.18, attack: 0.02, decay: 0.7 }, bass: { type: 'sine', gain: 0.15, attack: 0.02, decay: 0.7 }, drum: { kickFreq: [100, 40], hihatFreq: [300, 150], kickGain: 0.3, hihatGain: 0.1 } };

const presetInstruments = {
    vocaloid_fast: { melody: { type: 'square', gain: 0.15, attack: 0.01, decay: 0.5 }, bass: { type: 'sawtooth', gain: 0.15, attack: 0.05, decay: 0.6 }, drum: { kickFreq: [150, 40], hihatFreq: [800, 300], kickGain: 0.5, hihatGain: 0.3 } },
    vocaloid_mid: { melody: { type: 'triangle', gain: 0.15, attack: 0.02, decay: 0.8 }, bass: { type: 'sawtooth', gain: 0.15, attack: 0.05, decay: 0.6 }, drum: { kickFreq: [120, 40], hihatFreq: [600, 200], kickGain: 0.4, hihatGain: 0.2 } },
    rock_fast: { melody: { type: 'sawtooth', gain: 0.15, attack: 0.01, decay: 0.4 }, bass: { type: 'square', gain: 0.15, attack: 0.02, decay: 0.5 }, drum: { kickFreq: [180, 50], hihatFreq: [1000, 400], kickGain: 0.6, hihatGain: 0.4 } },
    anime_pop: { melody: { type: 'square', gain: 0.18, attack: 0.02, decay: 0.7 }, bass: { type: 'triangle', gain: 0.2, attack: 0.05, decay: 0.8 }, drum: { kickFreq: [100, 35], hihatFreq: [500, 200], kickGain: 0.35, hihatGain: 0.15 } },
    anime_rock: { melody: { type: 'sawtooth', gain: 0.18, attack: 0.01, decay: 0.5 }, bass: { type: 'square', gain: 0.15, attack: 0.01, decay: 0.4 }, drum: { kickFreq: [160, 45], hihatFreq: [900, 300], kickGain: 0.5, hihatGain: 0.35 } },
    jpop_mid: { melody: { type: 'triangle', gain: 0.2, attack: 0.05, decay: 1.0 }, bass: { type: 'sine', gain: 0.2, attack: 0.05, decay: 1.0 }, drum: { kickFreq: [90, 30], hihatFreq: [400, 150], kickGain: 0.3, hihatGain: 0.1 } },
    jpop_slow: { melody: { type: 'sine', gain: 0.25, attack: 0.1, decay: 2.0 }, bass: { type: 'sine', gain: 0.25, attack: 0.1, decay: 1.5 }, drum: { kickFreq: [80, 20], hihatFreq: [300, 100], kickGain: 0.2, hihatGain: 0.05 } },
    game_8bit: { melody: { type: 'square', gain: 0.12, attack: 0.01, decay: 0.3 }, bass: { type: 'square', gain: 0.15, attack: 0.01, decay: 0.4 }, drum: { kickFreq: [150, 50], hihatFreq: [3000, 1000], kickGain: 0.4, hihatGain: 0.3 } },
    game_epic: { melody: { type: 'sawtooth', gain: 0.2, attack: 0.05, decay: 1.0 }, bass: { type: 'sawtooth', gain: 0.2, attack: 0.05, decay: 0.8 }, drum: { kickFreq: [100, 30], hihatFreq: [500, 200], kickGain: 0.5, hihatGain: 0.2 } },
    game_rock: { melody: { type: 'sawtooth', gain: 0.18, attack: 0.01, decay: 0.3 }, bass: { type: 'square', gain: 0.2, attack: 0.01, decay: 0.4 }, drum: { kickFreq: [180, 50], hihatFreq: [900, 400], kickGain: 0.6, hihatGain: 0.4 } },
    touhou: { melody: { type: 'square', gain: 0.15, attack: 0.01, decay: 0.2 }, bass: { type: 'sawtooth', gain: 0.15, attack: 0.01, decay: 0.3 }, drum: { kickFreq: [200, 60], hihatFreq: [1200, 500], kickGain: 0.7, hihatGain: 0.5 } }
};

const INSTRUMENT_STYLES = {
    william: { melody: { type: 'sine', gain: 0.2, attack: 0.01, decay: 0.5, pitchSlide: true }, bass: { type: 'triangle', gain: 0.18, attack: 0.02, decay: 0.6 }, drum: { kickFreq: [120, 40], hihatFreq: [600, 300], kickGain: 0.4, hihatGain: 0.15 } },
    heaven: { melody: { type: 'sine', gain: 0.22, attack: 0.005, decay: 0.4 }, bass: { type: 'sine', gain: 0.2, attack: 0.01, decay: 0.5 }, drum: { kickFreq: [130, 45], hihatFreq: [700, 400], kickGain: 0.5, hihatGain: 0.2 } },
    bee: { melody: { type: 'sine', gain: 0.18, attack: 0.001, decay: 0.2 }, bass: { type: 'sine', gain: 0.16, attack: 0.001, decay: 0.2 }, drum: { kickFreq: [140, 50], hihatFreq: [800, 500], kickGain: 0.55, hihatGain: 0.25 } },
    turkish: { melody: { type: 'sine', gain: 0.2, attack: 0.01, decay: 0.6, harmonics: true }, bass: { type: 'triangle', gain: 0.18, attack: 0.02, decay: 0.8 }, drum: { kickFreq: [110, 35], hihatFreq: [500, 200], kickGain: 0.35, hihatGain: 0.1 } },
    daiku: { melody: { type: 'sine', gain: 0.24, attack: 0.05, decay: 1.5 }, bass: { type: 'sine', gain: 0.2, attack: 0.05, decay: 1.2 }, drum: { kickFreq: [90, 25], hihatFreq: [400, 150], kickGain: 0.3, hihatGain: 0.08 } },
    carmen: { melody: { type: 'triangle', gain: 0.25, attack: 0.02, decay: 0.7, harmonics: true }, bass: { type: 'sawtooth', gain: 0.18, attack: 0.05, decay: 0.8 }, drum: { kickFreq: [110, 35], hihatFreq: [550, 250], kickGain: 0.45, hihatGain: 0.12 } },
    twinkle: { melody: { type: 'sine', gain: 0.2, attack: 0.05, decay: 1.2 }, bass: { type: 'triangle', gain: 0.15, attack: 0.05, decay: 1.0 }, drum: { kickFreq: [80, 20], hihatFreq: [300, 100], kickGain: 0.2, hihatGain: 0.05 } },
    mary: { melody: { type: 'triangle', gain: 0.18, attack: 0.02, decay: 0.8 }, bass: { type: 'sine', gain: 0.18, attack: 0.02, decay: 0.8 }, drum: { kickFreq: [90, 25], hihatFreq: [400, 150], kickGain: 0.25, hihatGain: 0.08 } },
    bear: { melody: { type: 'square', gain: 0.12, attack: 0.02, decay: 0.6, filter: { type: 'lowpass', freq: 1200 } }, bass: { type: 'triangle', gain: 0.16, attack: 0.02, decay: 0.7 }, drum: { kickFreq: [100, 30], hihatFreq: [450, 200], kickGain: 0.3, hihatGain: 0.1 } },
    london: { melody: { type: 'sine', gain: 0.2, attack: 0.02, decay: 0.7, harmonics: true }, bass: { type: 'sine', gain: 0.15, attack: 0.02, decay: 0.7 }, drum: { kickFreq: [95, 25], hihatFreq: [400, 150], kickGain: 0.25, hihatGain: 0.08 } },

    kanki: defaultClassicVoice, wakare: defaultClassicVoice, eine: defaultClassicVoice, ave: defaultClassicVoice, jupiter: defaultClassicVoice,
    ifu: defaultClassicVoice, haru: defaultClassicVoice, moldau: defaultClassicVoice, hakuco: defaultClassicVoice, radetzky: defaultClassicVoice,
    tokei: defaultFolkVoice, jingle: defaultFolkVoice, kaeru: defaultFolkVoice, alps: defaultFolkVoice, donguri: defaultFolkVoice,
    chocho: defaultFolkVoice, haruno: defaultFolkVoice, hotaru: defaultFolkVoice, musunde: defaultFolkVoice, bunbun: defaultFolkVoice,
    picnic: defaultFolkVoice, yuki: defaultFolkVoice, momotaro: defaultFolkVoice, usagi: defaultFolkVoice, kisha: defaultFolkVoice,
    omatsuri: defaultFolkVoice, koinobori: defaultFolkVoice, yuyake: defaultFolkVoice, katatsumuri: defaultFolkVoice, syabon: defaultFolkVoice,

    vocaloid_fast: presetInstruments.vocaloid_fast,
    vocaloid_mid: presetInstruments.vocaloid_mid,
    rock_fast: presetInstruments.rock_fast,
    anime_pop: presetInstruments.anime_pop,
    anime_rock: presetInstruments.anime_rock,
    jpop_mid: presetInstruments.jpop_mid,
    jpop_slow: presetInstruments.jpop_slow,
    game_8bit: presetInstruments.game_8bit,
    game_epic: presetInstruments.game_epic,
    game_rock: presetInstruments.game_rock,
    touhou: presetInstruments.touhou
};
