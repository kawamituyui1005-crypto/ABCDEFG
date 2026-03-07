/**
 * 太鼓リズムゲーム 楽曲データ設定
 * SONG_LIST, BGM_MELODIES, BEATMAPS, INSTRUMENT_STYLES を管理します。
 */

const SONG_LIST = [
    // ナムコオリジナル
    { id: 'matsuri', name: '夏祭り', bpm: 140, basePattern: 'matsuri' },
    { id: 'donchan', name: 'どんちゃん音頭', bpm: 120, basePattern: 'ondo' },
    { id: 'oni_drill', name: 'おにの試練', bpm: 180, basePattern: 'drill' },
    { id: 'denkou', name: '電光石火', bpm: 200, basePattern: 'techno' },
    { id: 'yuugen', name: '幽玄ノ乱', bpm: 285, basePattern: 'yuugen' },
    { id: 'ryougen', name: '燎原ノ舞', bpm: 208, basePattern: 'ryougen' },
    { id: 'senpuu', name: '旋風ノ舞', bpm: 160, basePattern: 'senpuu' },

    // ポップス
    { id: 'gurenge', name: '紅蓮華', bpm: 135, basePattern: 'gurenge' },
    { id: 'yoru', name: '夜に駆ける', bpm: 130, basePattern: 'yoru' },
    { id: 'zenzen', name: '前前前世', bpm: 190, basePattern: 'zenzen' },
    { id: 'marigold', name: 'マリーゴールド', bpm: 106, basePattern: 'marigold' },
    { id: 'lemon', name: 'Lemon', bpm: 87, basePattern: 'lemon' },
    { id: 'kanade', name: '奏', bpm: 76, basePattern: 'kanade' },

    // アニメ
    { id: 'genkai', name: '限界突破×サバイバー', bpm: 188, basePattern: 'genkai' },
    { id: 'angel', name: '残酷な天使のテーゼ', bpm: 128, basePattern: 'angel' },
    { id: 'weare', name: 'ウィーアー！', bpm: 168, basePattern: 'weare' },
    { id: 'peace', name: 'ピースサイン', bpm: 200, basePattern: 'peace' },

    // ボーカロイド
    { id: 'senbon', name: '千本桜', bpm: 154, basePattern: 'senbon' },
    { id: 'charles', name: 'シャルル', bpm: 145, basePattern: 'charles' },
    { id: 'roki', name: 'ロキ', bpm: 150, basePattern: 'roki' },
    { id: 'melt', name: 'メルト', bpm: 170, basePattern: 'melt' },

    // ゲームミュージック
    { id: 'mario', name: 'スーパーマリオBGM', bpm: 100, basePattern: 'mario' },
    { id: 'tetris', name: 'テトリス', bpm: 140, basePattern: 'tetris' },
    { id: 'pacman', name: 'パックマン', bpm: 120, basePattern: 'pacman' },
    { id: 'dq', name: 'ドラクエ序曲', bpm: 110, basePattern: 'dq' },
    { id: 'zelda', name: 'ゼルダの伝説', bpm: 120, basePattern: 'zelda' },

    // クラシック
    { id: 'william', name: 'ウィリアム・テル序曲', bpm: 180, basePattern: 'william' },
    { id: 'heaven', name: '天国と地獄', bpm: 190, basePattern: 'heaven' },
    { id: 'bee', name: '熊蜂の飛行', bpm: 220, basePattern: 'bee' },
    { id: 'turkish', name: 'トルコ行進曲', bpm: 125, basePattern: 'turkish' },
    { id: 'daiku', name: '第九', bpm: 135, basePattern: 'daiku' }
];

const BGM_MELODIES = {
    matsuri: [
        [523, 0.5], [523, 0.5], [659, 0.5], [784, 0.5],
        [784, 0.5], [659, 0.5], [523, 0.5], [440, 0.5],
        [493, 0.5], [523, 0.5], [587, 0.5], [659, 1.0],
        [523, 0.5], [440, 0.5], [392, 0.5], [523, 1.0]
    ],
    ondo: [
        [392, 1.0], [440, 0.5], [493, 0.5], [523, 1.0],
        [440, 0.5], [493, 0.5], [392, 1.0], [330, 1.0],
        [349, 0.5], [392, 0.5], [440, 0.5], [493, 0.5], [523, 2.0],
        [392, 0.5], [349, 0.5], [330, 0.5], [294, 1.5]
    ],
    sakura: [
        [293, 1.0], [329, 1.0], [349, 2.0],
        [293, 1.0], [261, 1.0], [293, 2.0],
        [261, 1.0], [293, 1.0], [329, 0.5], [349, 0.5], [329, 1.0],
        [293, 1.0], [261, 1.0], [220, 2.0]
    ],
    drill: [
        [523, 0.25], [587, 0.25], [659, 0.25], [698, 0.25],
        [784, 0.5], [698, 0.25], [659, 0.25],
        [587, 0.25], [523, 0.25], [493, 0.25], [440, 0.25],
        [523, 1.0], [523, 0.25], [587, 0.25], [659, 0.5]
    ],
    techno: [
        [880, 0.25], [880, 0.25], [1047, 0.25], [880, 0.25],
        [784, 0.25], [880, 0.25], [784, 0.25], [698, 0.25],
        [784, 0.5], [880, 0.25], [784, 0.25],
        [698, 0.25], [659, 0.25], [698, 0.25], [784, 0.5]
    ],
    yuugen: [
        [587, 0.25], [523, 0.25], [493, 0.25], [440, 0.25], [493, 0.5], [440, 0.25], [392, 0.25],
        [440, 0.25], [493, 0.25], [587, 0.25], [659, 0.25], [698, 0.5], [659, 0.25], [587, 0.25]
    ],
    ryougen: [
        [440, 0.25], [440, 0.25], [523, 0.25], [587, 0.25], [659, 0.5], [587, 0.25], [523, 0.25],
        [440, 0.5], [392, 0.25], [440, 0.25], [523, 0.5], [587, 0.5], [659, 1.0]
    ],
    senpuu: [
        [523, 0.5], [659, 0.5], [784, 0.5], [880, 0.5], [784, 1.0], [659, 0.5], [523, 0.5],
        [587, 0.5], [523, 0.5], [440, 0.5], [392, 0.5], [440, 1.0]
    ],

    // ポップス
    gurenge: [
        [330, 0.5], [330, 0.5], [330, 0.5], [349, 0.5], [392, 1.0], [349, 0.5], [330, 0.5],
        [294, 1.0], [261, 1.0], [294, 2.0]
    ],
    yoru: [
        [698, 0.25], [784, 0.25], [880, 0.25], [1047, 0.25], [880, 0.5], [784, 0.25], [698, 0.25],
        [784, 0.5], [698, 0.25], [587, 0.25], [698, 1.0]
    ],
    zenzen: [
        [523, 0.25], [523, 0.25], [587, 0.25], [659, 0.5], [587, 0.25], [523, 0.25], [440, 0.25],
        [523, 1.0], [587, 1.0], [659, 1.0]
    ],
    marigold: [
        [392, 0.5], [440, 0.5], [493, 0.5], [523, 1.0], [493, 0.5], [440, 0.5], [392, 1.0],
        [349, 1.0], [330, 1.0], [294, 1.0]
    ],
    lemon: [
        [440, 0.5], [440, 0.5], [493, 0.5], [523, 0.5], [440, 1.0], [392, 1.0],
        [349, 0.5], [349, 0.5], [392, 0.5], [440, 0.5], [330, 1.0]
    ],
    kanade: [
        [261, 1.0], [294, 1.0], [330, 1.0], [349, 1.0], [330, 2.0], [294, 2.0],
        [261, 4.0]
    ],

    // アニメ
    genkai: [
        [440, 0.25], [440, 0.25], [523, 0.25], [587, 0.25], [659, 0.25], [587, 0.25], [523, 0.25],
        [587, 0.5], [659, 0.5], [784, 1.0]
    ],
    angel: [
        [440, 0.5], [440, 0.5], [493, 0.5], [523, 0.5], [587, 1.0], [523, 0.5], [493, 0.5],
        [440, 1.0], [392, 1.0], [440, 2.0]
    ],
    weare: [
        [392, 0.5], [392, 0.5], [440, 0.5], [493, 0.5], [523, 1.0], [587, 1.0], [659, 1.0]
    ],
    peace: [
        [523, 0.25], [523, 0.25], [587, 0.25], [659, 0.25], [784, 0.5], [659, 0.5], [523, 1.0]
    ],

    // ボーカロイド
    senbon: [
        [440, 0.25], [493, 0.25], [523, 0.25], [587, 0.25], [659, 0.5], [587, 0.5], [523, 1.0],
        [440, 1.0], [392, 1.0], [440, 2.0]
    ],
    charles: [
        [698, 0.5], [659, 0.5], [587, 0.5], [523, 0.5], [587, 1.0], [440, 1.0]
    ],
    roki: [
        [440, 0.25], [440, 0.25], [392, 0.25], [440, 0.5], [440, 0.25], [523, 0.25], [587, 0.5]
    ],
    melt: [
        [523, 0.5], [587, 0.5], [659, 0.5], [698, 0.5], [784, 1.0], [523, 1.0]
    ],

    // ゲームミュージック
    mario: [
        [659, 0.12], [659, 0.12], [0, 0.12], [659, 0.12], [0, 0.12], [523, 0.12], [659, 0.12], [0, 0.12],
        [784, 0.12], [0, 0.36], [392, 0.12]
    ],
    tetris: [
        [659, 0.5], [493, 0.25], [523, 0.25], [587, 0.5], [523, 0.25], [493, 0.25], [440, 0.5],
        [440, 0.25], [523, 0.25], [659, 0.5], [587, 0.25], [523, 0.25], [493, 0.75]
    ],
    pacman: [
        [493, 0.12], [987, 0.12], [739, 0.12], [493, 0.12], [739, 0.12], [987, 0.12], [493, 0.24]
    ],
    dq: [
        [392, 0.5], [392, 0.25], [392, 0.25], [392, 1.0], [392, 1.0], [523, 1.0], [587, 1.0], [659, 2.0]
    ],
    zelda: [
        [440, 1.5], [330, 0.5], [440, 0.5], [493, 0.5], [523, 0.5], [587, 0.5], [659, 2.0]
    ],

    // クラシック
    william: [
        [330, 0.25], [330, 0.25], [330, 0.5], [330, 0.25], [330, 0.25], [330, 0.5], [330, 0.25], [330, 0.25], [440, 0.5], [523, 0.5]
    ],
    heaven: [
        [784, 0.25], [698, 0.25], [659, 0.25], [587, 0.25], [523, 0.5], [587, 0.5], [659, 0.5], [523, 0.5]
    ],
    bee: [
        [880, 0.1], [830, 0.1], [784, 0.1], [740, 0.1], [698, 0.1], [659, 0.1], [622, 0.1], [587, 0.1]
    ],
    turkish: [
        [493, 0.25], [440, 0.25], [415, 0.25], [440, 0.25], [523, 0.5]
    ],
    daiku: [
        [330, 0.5], [330, 0.5], [349, 0.5], [392, 0.5], [392, 0.5], [349, 0.5], [330, 0.5], [294, 0.5]
    ]
};

const BEATMAPS = {
    matsuri: {
        easy: [
            { at: 0, t: 'd' }, { at: 1, t: 'd' }, { at: 2, t: 'k' }, { at: 3, t: 'd' },
            { at: 4, t: 'd' }, { at: 5, t: 'k' }, { at: 6, t: 'd' }, { at: 7, t: 'k' },
            { at: 8, t: 'd' }, { at: 9, t: 'd' }, { at: 10, t: 'k' }, { at: 11, t: 'd' },
            { at: 12, t: 'd' }, { at: 13, t: 'd' }, { at: 14, t: 'k' }, { at: 15, t: 'k' }
        ],
        normal: [
            { at: 0, t: 'd' }, { at: 0.5, t: 'd' }, { at: 1, t: 'k' }, { at: 2, t: 'd' },
            { at: 2.5, t: 'k' }, { at: 3, t: 'd' }, { at: 4, t: 'd' }, { at: 4.5, t: 'd' },
            { at: 5, t: 'k' }, { at: 5.5, t: 'k' }, { at: 6, t: 'd' }, { at: 7, t: 'd' },
            { at: 8, t: 'd' }, { at: 8.5, t: 'd' }, { at: 9, t: 'k' }, { at: 10, t: 'd' },
            { at: 10.5, t: 'k' }, { at: 11, t: 'd' }, { at: 12, t: 'd' }, { at: 12.5, t: 'd' },
            { at: 13, t: 'k' }, { at: 14, t: 'd' }, { at: 15, t: 'd' }, { at: 15.5, t: 'd' }
        ],
        hard: [
            { at: 0, t: 'd' }, { at: 0.5, t: 'd' }, { at: 0.75, t: 'k' }, { at: 1, t: 'd' }, { at: 1.5, t: 'k' },
            { at: 2, t: 'd' }, { at: 2.25, t: 'd' }, { at: 2.5, t: 'd' }, { at: 2.75, t: 'k' }, { at: 3, t: 'd' },
            { at: 4, t: 'd' }, { at: 4.25, t: 'd' }, { at: 4.5, t: 'd' }, { at: 4.75, t: 'd' },
            { at: 5, t: 'd' }, { at: 5.25, t: 'd' }, { at: 5.5, t: 'd' }, { at: 5.75, t: 'd' },
            { at: 6, t: 'k' }, { at: 6.5, t: 'd' }, { at: 7, t: 'd' }, { at: 7.5, t: 'k' },
            { at: 8, t: 'd' }, { at: 8.5, t: 'd' }, { at: 8.75, t: 'k' }, { at: 9, t: 'd' }, { at: 9.5, t: 'k' },
            { at: 10, t: 'd' }, { at: 10.25, t: 'd' }, { at: 10.5, t: 'd' }, { at: 11, t: 'd' },
            { at: 12, t: 'k' }, { at: 12.25, t: 'k' }, { at: 12.5, t: 'k' }, { at: 12.75, t: 'k' },
            { at: 13, t: 'k' }, { at: 13.25, t: 'k' },
            { at: 13.5, t: 'd' }, { at: 14, t: 'd' }, { at: 14.5, t: 'k' }, { at: 15, t: 'd' }
        ],
        oni: [
            { at: 0, t: 'd' }, { at: 0.25, t: 'd' }, { at: 0.5, t: 'd' }, { at: 0.75, t: 'k' },
            { at: 1, t: 'd' }, { at: 1.25, t: 'k' }, { at: 1.5, t: 'd' }, { at: 1.75, t: 'd' },
            { at: 2, t: 'd' }, { at: 2.25, t: 'd' }, { at: 2.5, t: 'k' }, { at: 2.75, t: 'k' }, { at: 3, t: 'd' },
            { at: 3.25, t: 'd' }, { at: 3.5, t: 'k' }, { at: 3.75, t: 'd' },
            { at: 4, t: 'd' }, { at: 4.25, t: 'd' }, { at: 4.5, t: 'd' }, { at: 4.75, t: 'd' },
            { at: 5, t: 'd' }, { at: 5.25, t: 'd' }, { at: 5.5, t: 'd' }, { at: 5.75, t: 'd' },
            { at: 6, t: 'd' }, { at: 6.25, t: 'd' }, { at: 6.5, t: 'd' }, { at: 6.75, t: 'd' },
            { at: 7, t: 'k' }, { at: 7.25, t: 'k' }, { at: 7.5, t: 'd' }, { at: 7.75, t: 'd' },
            { at: 8, t: 'd' }, { at: 8.25, t: 'd' }, { at: 8.5, t: 'd' }, { at: 8.75, t: 'k' },
            { at: 9, t: 'd' }, { at: 9.25, t: 'k' }, { at: 9.5, t: 'd' }, { at: 9.75, t: 'd' },
            { at: 10, t: 'd' }, { at: 10.25, t: 'd' }, { at: 10.5, t: 'k' }, { at: 10.75, t: 'k' },
            { at: 11, t: 'd' }, { at: 11.25, t: 'd' }, { at: 11.5, t: 'k' }, { at: 11.75, t: 'd' },
            { at: 12, t: 'k' }, { at: 12.25, t: 'k' }, { at: 12.5, t: 'k' }, { at: 12.75, t: 'k' },
            { at: 13, t: 'k' }, { at: 13.25, t: 'k' }, { at: 13.5, t: 'k' }, { at: 13.75, t: 'k' },
            { at: 14, t: 'd' }, { at: 14.25, t: 'd' }, { at: 14.5, t: 'k' }, { at: 14.75, t: 'd' },
            { at: 15, t: 'd' }, { at: 15.25, t: 'd' }, { at: 15.5, t: 'd' }, { at: 15.75, t: 'd' }
        ]
    },
    donchan: {
        easy: [
            { at: 0, t: 'd' }, { at: 1, t: 'd' }, { at: 2, t: 'k' }, { at: 3, t: 'd' },
            { at: 4, t: 'k' }, { at: 5, t: 'd' }, { at: 6, t: 'd' }, { at: 7, t: 'k' },
            { at: 8, t: 'd' }, { at: 9, t: 'd' }, { at: 10, t: 'k' }, { at: 11, t: 'd' },
            { at: 12, t: 'k' }, { at: 13, t: 'd' }, { at: 14, t: 'd' }, { at: 15, t: 'd' }
        ],
        normal: [
            { at: 0, t: 'd' }, { at: 0.5, t: 'k' }, { at: 1, t: 'd' }, { at: 2, t: 'd' },
            { at: 3, t: 'k' }, { at: 3.5, t: 'd' }, { at: 4, t: 'd' }, { at: 4.5, t: 'k' },
            { at: 5, t: 'd' }, { at: 6, t: 'k' }, { at: 6.5, t: 'd' }, { at: 7, t: 'd' },
            { at: 8, t: 'd' }, { at: 8.5, t: 'k' }, { at: 9, t: 'd' }, { at: 10, t: 'd' },
            { at: 11, t: 'k' }, { at: 11.5, t: 'd' }, { at: 12, t: 'd' }, { at: 12.5, t: 'k' },
            { at: 13, t: 'd' }, { at: 14, t: 'k' }, { at: 14.5, t: 'd' }, { at: 15, t: 'd' }
        ],
        hard: [
            { at: 0, t: 'd' }, { at: 0.5, t: 'k' }, { at: 0.75, t: 'd' }, { at: 1, t: 'd' }, { at: 1.5, t: 'k' },
            { at: 2, t: 'd' }, { at: 2.5, t: 'd' }, { at: 2.75, t: 'k' }, { at: 3, t: 'd' },
            { at: 3.5, t: 'k' }, { at: 3.75, t: 'k' }, { at: 4, t: 'd' }, { at: 4.5, t: 'd' },
            { at: 5, t: 'k' }, { at: 5.5, t: 'd' }, { at: 5.75, t: 'd' }, { at: 6, t: 'd' },
            { at: 6.5, t: 'k' }, { at: 7, t: 'd' }, { at: 7.5, t: 'k' }, { at: 7.75, t: 'd' },
            { at: 8, t: 'd' }, { at: 8.5, t: 'k' }, { at: 8.75, t: 'd' }, { at: 9, t: 'd' },
            { at: 9.5, t: 'd' }, { at: 9.75, t: 'k' }, { at: 10, t: 'd' }, { at: 10.5, t: 'k' },
            { at: 11, t: 'd' }, { at: 11.5, t: 'd' }, { at: 11.75, t: 'k' }, { at: 12, t: 'd' },
            { at: 12.5, t: 'k' }, { at: 13, t: 'd' }, { at: 13.5, t: 'd' }, { at: 13.75, t: 'd' },
            { at: 14, t: 'k' }, { at: 14.5, t: 'd' }, { at: 15, t: 'd' }, { at: 15.5, t: 'k' }
        ],
        oni: [
            { at: 0, t: 'd' }, { at: 0.25, t: 'k' }, { at: 0.5, t: 'd' }, { at: 0.75, t: 'd' },
            { at: 1, t: 'k' }, { at: 1.25, t: 'd' }, { at: 1.5, t: 'k' }, { at: 1.75, t: 'd' },
            { at: 2, t: 'd' }, { at: 2.25, t: 'd' }, { at: 2.5, t: 'k' }, { at: 2.75, t: 'k' },
            { at: 3, t: 'd' }, { at: 3.25, t: 'd' }, { at: 3.5, t: 'k' }, { at: 3.75, t: 'd' },
            { at: 4, t: 'd' }, { at: 4.25, t: 'k' }, { at: 4.5, t: 'd' }, { at: 4.75, t: 'd' },
            { at: 5, t: 'k' }, { at: 5.25, t: 'd' }, { at: 5.5, t: 'd' }, { at: 5.75, t: 'k' },
            { at: 6, t: 'd' }, { at: 6.25, t: 'd' }, { at: 6.5, t: 'k' }, { at: 6.75, t: 'd' },
            { at: 7, t: 'k' }, { at: 7.25, t: 'k' }, { at: 7.5, t: 'd' }, { at: 7.75, t: 'd' },
            { at: 8, t: 'd' }, { at: 8.25, t: 'k' }, { at: 8.5, t: 'd' }, { at: 8.75, t: 'd' },
            { at: 9, t: 'k' }, { at: 9.25, t: 'd' }, { at: 9.5, t: 'k' }, { at: 9.75, t: 'd' },
            { at: 10, t: 'd' }, { at: 10.25, t: 'd' }, { at: 10.5, t: 'k' }, { at: 10.75, t: 'k' },
            { at: 11, t: 'd' }, { at: 11.25, t: 'd' }, { at: 11.5, t: 'k' }, { at: 11.75, t: 'd' },
            { at: 12, t: 'd' }, { at: 12.25, t: 'k' }, { at: 12.5, t: 'd' }, { at: 12.75, t: 'd' },
            { at: 13, t: 'd' }, { at: 13.25, t: 'k' }, { at: 13.5, t: 'd' }, { at: 13.75, t: 'k' },
            { at: 14, t: 'd' }, { at: 14.25, t: 'd' }, { at: 14.5, t: 'k' }, { at: 14.75, t: 'd' },
            { at: 15, t: 'd' }, { at: 15.25, t: 'd' }, { at: 15.5, t: 'd' }, { at: 15.75, t: 'k' }
        ]
    },
    sakura: {
        easy: [
            { at: 0, t: 'd' }, { at: 2, t: 'd' }, { at: 4, t: 'k' }, { at: 6, t: 'd' },
            { at: 8, t: 'd' }, { at: 10, t: 'k' }, { at: 12, t: 'd' }, { at: 14, t: 'd' }
        ],
        normal: [
            { at: 0, t: 'd' }, { at: 1, t: 'd' }, { at: 2, t: 'k' }, { at: 4, t: 'd' },
            { at: 5, t: 'd' }, { at: 6, t: 'k' }, { at: 7, t: 'd' }, { at: 8, t: 'd' },
            { at: 9, t: 'k' }, { at: 10, t: 'd' }, { at: 11, t: 'd' }, { at: 12, t: 'k' },
            { at: 13, t: 'd' }, { at: 14, t: 'd' }, { at: 15, t: 'd' }
        ],
        hard: [
            { at: 0, t: 'd' }, { at: 0.5, t: 'd' }, { at: 1, t: 'k' }, { at: 2, t: 'd' },
            { at: 2.5, t: 'k' }, { at: 3, t: 'd' }, { at: 4, t: 'd' }, { at: 4.5, t: 'd' },
            { at: 5, t: 'k' }, { at: 6, t: 'd' }, { at: 6.5, t: 'k' }, { at: 7, t: 'd' },
            { at: 8, t: 'd' }, { at: 8.5, t: 'd' }, { at: 9, t: 'k' }, { at: 10, t: 'd' },
            { at: 10.5, t: 'k' }, { at: 11, t: 'd' }, { at: 12, t: 'd' }, { at: 12.5, t: 'd' },
            { at: 13, t: 'k' }, { at: 14, t: 'd' }, { at: 14.5, t: 'k' }, { at: 15, t: 'd' }
        ],
        oni: [
            { at: 0, t: 'd' }, { at: 0.5, t: 'k' }, { at: 1, t: 'd' }, { at: 1.5, t: 'd' },
            { at: 2, t: 'k' }, { at: 2.5, t: 'd' }, { at: 3, t: 'd' }, { at: 3.5, t: 'k' },
            { at: 4, t: 'd' }, { at: 4.5, t: 'd' }, { at: 5, t: 'k' }, { at: 5.5, t: 'd' },
            { at: 6, t: 'k' }, { at: 6.5, t: 'k' }, { at: 7, t: 'd' }, { at: 7.5, t: 'd' },
            { at: 8, t: 'd' }, { at: 8.5, t: 'k' }, { at: 9, t: 'd' }, { at: 9.5, t: 'd' },
            { at: 10, t: 'k' }, { at: 10.5, t: 'd' }, { at: 11, t: 'd' }, { at: 11.5, t: 'k' },
            { at: 12, t: 'd' }, { at: 12.5, t: 'd' }, { at: 13, t: 'k' }, { at: 13.5, t: 'd' },
            { at: 14, t: 'k' }, { at: 14.5, t: 'k' }, { at: 15, t: 'd' }, { at: 15.5, t: 'd' }
        ]
    },
    oni_drill: {
        easy: [
            { at: 0, t: 'd' }, { at: 1, t: 'k' }, { at: 2, t: 'd' }, { at: 3, t: 'd' },
            { at: 4, t: 'k' }, { at: 5, t: 'd' }, { at: 6, t: 'k' }, { at: 7, t: 'd' },
            { at: 8, t: 'd' }, { at: 9, t: 'k' }, { at: 10, t: 'd' }, { at: 11, t: 'd' },
            { at: 12, t: 'k' }, { at: 13, t: 'd' }, { at: 14, t: 'd' }, { at: 15, t: 'k' }
        ],
        normal: [
            { at: 0, t: 'd' }, { at: 0.5, t: 'd' }, { at: 1, t: 'k' }, { at: 1.5, t: 'd' },
            { at: 2, t: 'd' }, { at: 2.5, t: 'k' }, { at: 3, t: 'd' }, { at: 3.5, t: 'k' },
            { at: 4, t: 'd' }, { at: 4.5, t: 'd' }, { at: 5, t: 'k' }, { at: 5.5, t: 'd' },
            { at: 6, t: 'd' }, { at: 6.5, t: 'k' }, { at: 7, t: 'd' }, { at: 7.5, t: 'd' },
            { at: 8, t: 'd' }, { at: 8.5, t: 'd' }, { at: 9, t: 'k' }, { at: 9.5, t: 'd' },
            { at: 10, t: 'd' }, { at: 10.5, t: 'k' }, { at: 11, t: 'd' }, { at: 11.5, t: 'k' },
            { at: 12, t: 'd' }, { at: 12.5, t: 'd' }, { at: 13, t: 'k' }, { at: 13.5, t: 'd' },
            { at: 14, t: 'k' }, { at: 14.5, t: 'k' }, { at: 15, t: 'd' }, { at: 15.5, t: 'd' }
        ],
        hard: [
            { at: 0, t: 'd' }, { at: 0.25, t: 'd' }, { at: 0.5, t: 'k' }, { at: 0.75, t: 'd' }, { at: 1, t: 'k' },
            { at: 1.5, t: 'd' }, { at: 1.75, t: 'd' }, { at: 2, t: 'k' }, { at: 2.5, t: 'd' }, { at: 2.75, t: 'k' },
            { at: 3, t: 'd' }, { at: 3.5, t: 'd' }, { at: 3.75, t: 'd' }, { at: 4, t: 'k' }, { at: 4.25, t: 'k' },
            { at: 4.5, t: 'd' }, { at: 4.75, t: 'd' }, { at: 5, t: 'k' }, { at: 5.5, t: 'd' }, { at: 5.75, t: 'k' },
            { at: 6, t: 'd' }, { at: 6.25, t: 'd' }, { at: 6.5, t: 'k' }, { at: 6.75, t: 'd' }, { at: 7, t: 'd' },
            { at: 7.5, t: 'k' }, { at: 7.75, t: 'k' }, { at: 8, t: 'd' }, { at: 8.25, t: 'd' }, { at: 8.5, t: 'd' },
            { at: 8.75, t: 'k' }, { at: 9, t: 'd' }, { at: 9.5, t: 'd' }, { at: 9.75, t: 'k' }, { at: 10, t: 'd' },
            { at: 10.25, t: 'd' }, { at: 10.5, t: 'k' }, { at: 10.75, t: 'd' }, { at: 11, t: 'k' },
            { at: 11.5, t: 'd' }, { at: 11.75, t: 'd' }, { at: 12, t: 'k' }, { at: 12.25, t: 'k' },
            { at: 12.5, t: 'd' }, { at: 12.75, t: 'd' }, { at: 13, t: 'd' }, { at: 13.5, t: 'k' },
            { at: 13.75, t: 'd' }, { at: 14, t: 'd' }, { at: 14.25, t: 'k' }, { at: 14.5, t: 'd' },
            { at: 14.75, t: 'd' }, { at: 15, t: 'k' }, { at: 15.25, t: 'd' }, { at: 15.5, t: 'd' }
        ],
        oni: [
            { at: 0, t: 'd' }, { at: 0.25, t: 'd' }, { at: 0.5, t: 'k' }, { at: 0.75, t: 'k' },
            { at: 1, t: 'd' }, { at: 1.25, t: 'd' }, { at: 1.5, t: 'k' }, { at: 1.75, t: 'd' },
            { at: 2, t: 'd' }, { at: 2.25, t: 'k' }, { at: 2.5, t: 'd' }, { at: 2.75, t: 'd' },
            { at: 3, t: 'k' }, { at: 3.25, t: 'k' }, { at: 3.5, t: 'd' }, { at: 3.75, t: 'd' },
            { at: 4, t: 'd' }, { at: 4.25, t: 'd' }, { at: 4.5, t: 'k' }, { at: 4.75, t: 'k' },
            { at: 5, t: 'd' }, { at: 5.25, t: 'd' }, { at: 5.5, t: 'd' }, { at: 5.75, t: 'k' },
            { at: 6, t: 'd' }, { at: 6.25, t: 'k' }, { at: 6.5, t: 'd' }, { at: 6.75, t: 'd' },
            { at: 7, t: 'k' }, { at: 7.25, t: 'd' }, { at: 7.5, t: 'd' }, { at: 7.75, t: 'k' },
            { at: 8, t: 'd' }, { at: 8.25, t: 'd' }, { at: 8.5, t: 'k' }, { at: 8.75, t: 'k' },
            { at: 9, t: 'd' }, { at: 9.25, t: 'd' }, { at: 9.5, t: 'd' }, { at: 9.75, t: 'k' },
            { at: 10, t: 'd' }, { at: 10.25, t: 'k' }, { at: 10.5, t: 'd' }, { at: 10.75, t: 'd' },
            { at: 11, t: 'k' }, { at: 11.25, t: 'k' }, { at: 11.5, t: 'd' }, { at: 11.75, t: 'd' },
            { at: 12, t: 'd' }, { at: 12.25, t: 'd' }, { at: 12.5, t: 'k' }, { at: 12.75, t: 'k' },
            { at: 13, t: 'd' }, { at: 13.25, t: 'd' }, { at: 13.5, t: 'k' }, { at: 13.75, t: 'k' },
            { at: 14, t: 'd' }, { at: 14.25, t: 'd' }, { at: 14.5, t: 'd' }, { at: 14.75, t: 'k' },
            { at: 15, t: 'd' }, { at: 15.25, t: 'k' }, { at: 15.5, t: 'd' }, { at: 15.75, t: 'd' }
        ]
    },
    denkou: {
        easy: [
            { at: 0, t: 'd' }, { at: 1, t: 'd' }, { at: 2, t: 'k' }, { at: 3, t: 'k' },
            { at: 4, t: 'd' }, { at: 5, t: 'd' }, { at: 6, t: 'k' }, { at: 7, t: 'd' },
            { at: 8, t: 'd' }, { at: 9, t: 'k' }, { at: 10, t: 'd' }, { at: 11, t: 'd' },
            { at: 12, t: 'k' }, { at: 13, t: 'k' }, { at: 14, t: 'd' }, { at: 15, t: 'd' }
        ],
        normal: [
            { at: 0, t: 'd' }, { at: 0.5, t: 'd' }, { at: 1, t: 'k' }, { at: 1.5, t: 'k' },
            { at: 2, t: 'd' }, { at: 2.5, t: 'd' }, { at: 3, t: 'k' }, { at: 3.5, t: 'd' },
            { at: 4, t: 'd' }, { at: 4.5, t: 'k' }, { at: 5, t: 'd' }, { at: 5.5, t: 'd' },
            { at: 6, t: 'k' }, { at: 6.5, t: 'k' }, { at: 7, t: 'd' }, { at: 7.5, t: 'd' },
            { at: 8, t: 'd' }, { at: 8.5, t: 'd' }, { at: 9, t: 'k' }, { at: 9.5, t: 'k' },
            { at: 10, t: 'd' }, { at: 10.5, t: 'd' }, { at: 11, t: 'k' }, { at: 11.5, t: 'd' },
            { at: 12, t: 'd' }, { at: 12.5, t: 'k' }, { at: 13, t: 'd' }, { at: 13.5, t: 'd' },
            { at: 14, t: 'k' }, { at: 14.5, t: 'k' }, { at: 15, t: 'd' }, { at: 15.5, t: 'd' }
        ],
        hard: [
            { at: 0, t: 'd' }, { at: 0.25, t: 'd' }, { at: 0.5, t: 'k' }, { at: 0.75, t: 'k' }, { at: 1, t: 'd' },
            { at: 1.25, t: 'd' }, { at: 1.5, t: 'k' }, { at: 1.75, t: 'd' }, { at: 2, t: 'd' }, { at: 2.25, t: 'k' },
            { at: 2.5, t: 'd' }, { at: 2.75, t: 'd' }, { at: 3, t: 'k' }, { at: 3.25, t: 'k' }, { at: 3.5, t: 'd' },
            { at: 3.75, t: 'd' }, { at: 4, t: 'd' }, { at: 4.25, t: 'k' }, { at: 4.5, t: 'd' }, { at: 4.75, t: 'k' },
            { at: 5, t: 'd' }, { at: 5.25, t: 'd' }, { at: 5.5, t: 'k' }, { at: 5.75, t: 'd' }, { at: 6, t: 'd' },
            { at: 6.25, t: 'k' }, { at: 6.5, t: 'd' }, { at: 6.75, t: 'k' }, { at: 7, t: 'd' }, { at: 7.25, t: 'd' },
            { at: 7.5, t: 'k' }, { at: 7.75, t: 'k' }, { at: 8, t: 'd' }, { at: 8.25, t: 'd' }, { at: 8.5, t: 'k' },
            { at: 8.75, t: 'k' }, { at: 9, t: 'd' }, { at: 9.25, t: 'd' }, { at: 9.5, t: 'k' }, { at: 9.75, t: 'd' },
            { at: 10, t: 'd' }, { at: 10.25, t: 'k' }, { at: 10.5, t: 'd' }, { at: 10.75, t: 'd' }, { at: 11, t: 'k' },
            { at: 11.25, t: 'k' }, { at: 11.5, t: 'd' }, { at: 11.75, t: 'd' }, { at: 12, t: 'd' }, { at: 12.25, t: 'k' },
            { at: 12.5, t: 'd' }, { at: 12.75, t: 'k' }, { at: 13, t: 'd' }, { at: 13.25, t: 'd' }, { at: 13.5, t: 'k' },
            { at: 13.75, t: 'd' }, { at: 14, t: 'd' }, { at: 14.25, t: 'd' }, { at: 14.5, t: 'k' }, { at: 14.75, t: 'k' },
            { at: 15, t: 'd' }, { at: 15.25, t: 'd' }, { at: 15.5, t: 'k' }, { at: 15.75, t: 'd' }
        ],
        oni: [
            { at: 0, t: 'd' }, { at: 0.25, t: 'k' }, { at: 0.5, t: 'd' }, { at: 0.75, t: 'k' },
            { at: 1, t: 'd' }, { at: 1.25, t: 'd' }, { at: 1.5, t: 'k' }, { at: 1.75, t: 'k' },
            { at: 2, t: 'd' }, { at: 2.25, t: 'd' }, { at: 2.5, t: 'd' }, { at: 2.75, t: 'k' },
            { at: 3, t: 'd' }, { at: 3.25, t: 'k' }, { at: 3.5, t: 'd' }, { at: 3.75, t: 'd' },
            { at: 4, t: 'k' }, { at: 4.25, t: 'd' }, { at: 4.5, t: 'k' }, { at: 4.75, t: 'k' },
            { at: 5, t: 'd' }, { at: 5.25, t: 'd' }, { at: 5.5, t: 'k' }, { at: 5.75, t: 'd' },
            { at: 6, t: 'd' }, { at: 6.25, t: 'k' }, { at: 6.5, t: 'd' }, { at: 6.75, t: 'd' },
            { at: 7, t: 'k' }, { at: 7.25, t: 'k' }, { at: 7.5, t: 'd' }, { at: 7.75, t: 'd' },
            { at: 8, t: 'd' }, { at: 8.25, t: 'k' }, { at: 8.5, t: 'd' }, { at: 8.75, t: 'k' },
            { at: 9, t: 'd' }, { at: 9.25, t: 'd' }, { at: 9.5, t: 'k' }, { at: 9.75, t: 'k' },
            { at: 10, t: 'd' }, { at: 10.25, t: 'd' }, { at: 10.5, t: 'd' }, { at: 10.75, t: 'k' },
            { at: 11, t: 'k' }, { at: 11.25, t: 'k' }, { at: 11.5, t: 'd' }, { at: 11.75, t: 'd' },
            { at: 12, t: 'd' }, { at: 12.25, t: 'k' }, { at: 12.5, t: 'd' }, { at: 12.75, t: 'k' },
            { at: 13, t: 'd' }, { at: 13.25, t: 'd' }, { at: 13.5, t: 'k' }, { at: 13.75, t: 'k' },
            { at: 14, t: 'd' }, { at: 14.25, t: 'k' }, { at: 14.5, t: 'd' }, { at: 14.75, t: 'd' },
            { at: 15, t: 'k' }, { at: 15.25, t: 'k' }, { at: 15.5, t: 'd' }, { at: 15.75, t: 'k' }
        ]
    },
    // ナムコオリジナル追加
    ryougen: {
        easy: [{ at: 0, t: 'd' }, { at: 1, t: 'd' }, { at: 2, t: 'k' }, { at: 3, t: 'd' }, { at: 4, t: 'd' }, { at: 5, t: 'k' }, { at: 6, t: 'd' }, { at: 7, t: 'k' }],
        normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'd' }, { at: 1, t: 'k' }, { at: 1.5, t: 'd' }, { at: 2, t: 'd' }, { at: 2.5, t: 'k' }, { at: 3, t: 'd' }, { at: 3.5, t: 'k' }],
        hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }, { at: 0.5, t: 'k' }, { at: 0.75, t: 'd' }, { at: 1, t: 'd' }, { at: 1.25, t: 'k' }, { at: 1.5, t: 'd' }, { at: 1.75, t: 'k' }, { at: 2, t: 'd' }, { at: 2.25, t: 'd' }, { at: 2.5, t: 'k' }, { at: 2.75, t: 'k' }],
        oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'k' }, { at: 0.5, t: 'd' }, { at: 0.75, t: 'k' }, { at: 1, t: 'd' }, { at: 1.25, t: 'd' }, { at: 1.5, t: 'k' }, { at: 1.75, t: 'd' }, { at: 2, t: 'k' }, { at: 2.25, t: 'k' }, { at: 2.5, t: 'd' }, { at: 2.75, t: 'd' }]
    },
    senpuu: {
        easy: [{ at: 0, t: 'd' }, { at: 2, t: 'd' }, { at: 4, t: 'k' }, { at: 6, t: 'd' }],
        normal: [{ at: 0, t: 'd' }, { at: 1, t: 'd' }, { at: 2, t: 'k' }, { at: 3, t: 'd' }],
        hard: [{ at: 0, t: 'd' }, { at: 0.5, t: 'd' }, { at: 1, t: 'k' }, { at: 1.5, t: 'd' }],
        oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }, { at: 0.5, t: 'k' }, { at: 0.75, t: 'k' }]
    },

    // ポップス
    gurenge: {
        easy: [{ at: 0, t: 'd' }, { at: 1, t: 'd' }, { at: 2, t: 'k' }, { at: 3, t: 'd' }],
        normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'd' }, { at: 1, t: 'k' }, { at: 2, t: 'd' }],
        hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }, { at: 0.5, t: 'k' }, { at: 1, t: 'd' }],
        oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }, { at: 0.5, t: 'k' }, { at: 0.75, t: 'k' }]
    },
    yoru: { easy: [{ at: 0, t: 'd' }, { at: 1, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'k' }], oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }, { at: 0.5, t: 'k' }, { at: 0.75, t: 'k' }] },
    zenzen: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'k' }, { at: 0.5, t: 'd' }, { at: 0.75, t: 'k' }] },
    marigold: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 1, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.5, t: 'k' }], oni: [{ at: 0, t: 'd' }, { at: 0.5, t: 'd' }, { at: 1, t: 'k' }, { at: 1.5, t: 'k' }] },
    lemon: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 2, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 1, t: 'k' }], oni: [{ at: 0, t: 'd' }, { at: 0.5, t: 'd' }, { at: 1, t: 'k' }, { at: 1.5, t: 'd' }] },
    kanade: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }], hard: [{ at: 0, t: 'd' }, { at: 2, t: 'k' }], oni: [{ at: 0, t: 'd' }, { at: 1, t: 'd' }, { at: 2, t: 'k' }, { at: 3, t: 'k' }] },

    // アニメ
    genkai: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'k' }, { at: 0.5, t: 'd' }, { at: 0.75, t: 'k' }] },
    angel: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.125, t: 'd' }, { at: 0.25, t: 'k' }, { at: 0.375, t: 'k' }] },
    weare: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'k' }] },
    peace: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'k' }] },

    // ボーカロイド
    senbon: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.125, t: 'k' }, { at: 0.25, t: 'd' }, { at: 0.375, t: 'k' }] },
    charles: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'k' }] },
    roki: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'k' }] },
    melt: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'k' }] },

    // ゲームミュージック
    mario: { easy: [{ at: 0, t: 'd' }, { at: 1, t: 'k' }], normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'd' }, { at: 1, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }, { at: 0.5, t: 'k' }], oni: [{ at: 0, t: 'd' }, { at: 0.125, t: 'd' }, { at: 0.25, t: 'k' }] },
    tetris: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'k' }] },
    pacman: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'k' }], oni: [{ at: 0, t: 'd' }, { at: 0.125, t: 'd' }] },
    dq: { easy: [{ at: 0, t: 'd' }, { at: 2, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 1, t: 'd' }], hard: [{ at: 0, t: 'd' }, { at: 0.5, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }, { at: 0.5, t: 'k' }] },
    zelda: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }], hard: [{ at: 0, t: 'd' }, { at: 1, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.5, t: 'd' }, { at: 1, t: 'd' }] },

    // クラシック
    william: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'd' }], hard: [{ at: 0, t: 'd' }, { at: 0.33, t: 'd' }, { at: 0.66, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }, { at: 0.5, t: 'd' }, { at: 0.75, t: 'd' }] },
    heaven: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.5, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'k' }, { at: 0.5, t: 'd' }, { at: 0.75, t: 'k' }] },
    bee: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }], hard: [{ at: 0, t: 'd' }, { at: 0.125, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.06, t: 'd' }, { at: 0.12, t: 'd' }, { at: 0.18, t: 'd' }] },
    turkish: { easy: [{ at: 0, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 0.33, t: 'k' }], hard: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }, { at: 0.5, t: 'k' }], oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'k' }] },
    daiku: { easy: [{ at: 0, t: 'd' }, { at: 2, t: 'd' }], normal: [{ at: 0, t: 'd' }, { at: 1, t: 'd' }], hard: [{ at: 0, t: 'd' }, { at: 0.5, t: 'd' }], oni: [{ at: 0, t: 'd' }, { at: 0.25, t: 'd' }] }
};

const INSTRUMENT_STYLES = {
    matsuri: {
        melody: { type: 'sine', gain: 0.2, attack: 0.02, decay: 0.9 },
        bass: { type: 'triangle', gain: 0.25, attack: 0.05, decay: 0.8 },
        drum: { kickFreq: [120, 35], hihatFreq: [300, 150], kickGain: 0.4, hihatGain: 0.12 }
    },
    ondo: {
        melody: { type: 'sawtooth', gain: 0.12, attack: 0.01, decay: 0.4, filter: { type: 'highpass', freq: 200 } },
        bass: { type: 'sawtooth', gain: 0.18, attack: 0.01, decay: 0.5 },
        drum: { kickFreq: [100, 30], hihatFreq: [400, 200], kickGain: 0.35, hihatGain: 0.1 }
    },
    sakura: {
        melody: { type: 'sine', gain: 0.22, attack: 0.001, decay: 1.5, pitchSlide: true },
        bass: { type: 'sine', gain: 0.2, attack: 0.001, decay: 1.2 },
        drum: { kickFreq: [80, 25], hihatFreq: [250, 120], kickGain: 0.25, hihatGain: 0.08 }
    },
    drill: {
        melody: { type: 'triangle', gain: 0.18, attack: 0.005, decay: 0.7, harmonics: true },
        bass: { type: 'sine', gain: 0.22, attack: 0.005, decay: 0.8 },
        drum: { kickFreq: [150, 40], hihatFreq: [500, 300], kickGain: 0.5, hihatGain: 0.15 }
    },
    techno: {
        melody: { type: 'square', gain: 0.1, attack: 0.001, decay: 0.3, filter: { type: 'lowpass', freq: 1500 } },
        bass: { type: 'sawtooth', gain: 0.2, attack: 0.001, decay: 0.5, filter: { type: 'lowpass', freq: 400 } },
        drum: { kickFreq: [200, 50], hihatFreq: [600, 400], kickGain: 0.6, hihatGain: 0.2 }
    },
    yuugen: {
        melody: { type: 'sawtooth', gain: 0.15, attack: 0.001, decay: 0.5, filter: { type: 'highpass', freq: 400 } },
        bass: { type: 'square', gain: 0.18, attack: 0.001, decay: 0.4 },
        drum: { kickFreq: [180, 45], hihatFreq: [800, 500], kickGain: 0.55, hihatGain: 0.25 }
    },
    ryougen: {
        melody: { type: 'sawtooth', gain: 0.15, attack: 0.01, decay: 0.6, harmonics: true },
        bass: { type: 'sine', gain: 0.25, attack: 0.02, decay: 0.8 },
        drum: { kickFreq: [140, 40], hihatFreq: [600, 300], kickGain: 0.5, hihatGain: 0.15 }
    },
    senpuu: {
        melody: { type: 'square', gain: 0.12, attack: 0.005, decay: 0.4, pitchSlide: true },
        bass: { type: 'triangle', gain: 0.2, attack: 0.01, decay: 0.5 },
        drum: { kickFreq: [130, 35], hihatFreq: [700, 400], kickGain: 0.45, hihatGain: 0.2 }
    },

    // ポップス・アニソン共通（明るめシンセ/ピアノ）
    gurenge: { melody: { type: 'sawtooth', gain: 0.12, attack: 0.01, decay: 0.7 }, bass: { type: 'sine', gain: 0.2, attack: 0.02, decay: 0.8 }, drum: { kickFreq: [120, 40], hihatFreq: [500, 200], kickGain: 0.4, hihatGain: 0.1 } },
    yoru: { melody: { type: 'square', gain: 0.1, attack: 0.001, decay: 0.4, filter: { type: 'lowpass', freq: 2000 } }, bass: { type: 'sawtooth', gain: 0.15, attack: 0.01, decay: 0.5 }, drum: { kickFreq: [110, 35], hihatFreq: [600, 300], kickGain: 0.45, hihatGain: 0.15 } },
    zenzen: { melody: { type: 'sawtooth', gain: 0.13, attack: 0.005, decay: 0.5 }, bass: { type: 'sine', gain: 0.22, attack: 0.01, decay: 1.0 }, drum: { kickFreq: [130, 45], hihatFreq: [550, 250], kickGain: 0.5, hihatGain: 0.12 } },
    marigold: { melody: { type: 'sine', gain: 0.2, attack: 0.05, decay: 1.2, harmonics: true }, bass: { type: 'triangle', gain: 0.18, attack: 0.05, decay: 1.0 }, drum: { kickFreq: [100, 30], hihatFreq: [400, 200], kickGain: 0.35, hihatGain: 0.08 } },
    lemon: { melody: { type: 'sine', gain: 0.18, attack: 0.02, decay: 1.0, pitchSlide: true }, bass: { type: 'sine', gain: 0.2, attack: 0.03, decay: 1.0 }, drum: { kickFreq: [90, 30], hihatFreq: [450, 150], kickGain: 0.3, hihatGain: 0.07 } },
    kanade: { melody: { type: 'sine', gain: 0.25, attack: 0.1, decay: 2.0, harmonics: true }, bass: { type: 'sine', gain: 0.15, attack: 0.1, decay: 1.5 }, drum: { kickFreq: [70, 20], hihatFreq: [300, 100], kickGain: 0.2, hihatGain: 0.05 } },
    genkai: { melody: { type: 'sawtooth', gain: 0.15, attack: 0.005, decay: 0.4 }, bass: { type: 'square', gain: 0.18, attack: 0.01, decay: 0.4 }, drum: { kickFreq: [150, 50], hihatFreq: [800, 400], kickGain: 0.6, hihatGain: 0.2 } },
    angel: { melody: { type: 'sawtooth', gain: 0.14, attack: 0.01, decay: 0.6, filter: { type: 'lowpass', freq: 1500 } }, bass: { type: 'sawtooth', gain: 0.15, attack: 0.01, decay: 0.6 }, drum: { kickFreq: [130, 40], hihatFreq: [500, 250], kickGain: 0.4, hihatGain: 0.12 } },
    weare: { melody: { type: 'square', gain: 0.12, attack: 0.01, decay: 0.5 }, bass: { type: 'triangle', gain: 0.22, attack: 0.02, decay: 0.8 }, drum: { kickFreq: [120, 35], hihatFreq: [600, 300], kickGain: 0.45, hihatGain: 0.15 } },
    peace: { melody: { type: 'sawtooth', gain: 0.13, attack: 0.005, decay: 0.4 }, bass: { type: 'sawtooth', gain: 0.16, attack: 0.01, decay: 0.5 }, drum: { kickFreq: [140, 45], hihatFreq: [700, 350], kickGain: 0.55, hihatGain: 0.18 } },

    // ボーカロイド（高音・ピコピコ）
    senbon: { melody: { type: 'square', gain: 0.1, attack: 0.001, decay: 0.3 }, bass: { type: 'square', gain: 0.12, attack: 0.001, decay: 0.3 }, drum: { kickFreq: [160, 50], hihatFreq: [900, 500], kickGain: 0.5, hihatGain: 0.22 } },
    charles: { melody: { type: 'square', gain: 0.11, attack: 0.005, decay: 0.4 }, bass: { type: 'sawtooth', gain: 0.14, attack: 0.01, decay: 0.4 }, drum: { kickFreq: [130, 40], hihatFreq: [600, 300], kickGain: 0.4, hihatGain: 0.15 } },
    roki: { melody: { type: 'sawtooth', gain: 0.14, attack: 0.001, decay: 0.3, filter: { type: 'highpass', freq: 500 } }, bass: { type: 'square', gain: 0.18, attack: 0.001, decay: 0.4 }, drum: { kickFreq: [150, 45], hihatFreq: [800, 400], kickGain: 0.6, hihatGain: 0.25 } },
    melt: { melody: { type: 'square', gain: 0.09, attack: 0.001, decay: 0.5 }, bass: { type: 'sine', gain: 0.2, attack: 0.01, decay: 0.8 }, drum: { kickFreq: [120, 35], hihatFreq: [500, 200], kickGain: 0.4, hihatGain: 0.12 } },

    // ゲーム（矩形波・VGM風）
    mario: { melody: { type: 'square', gain: 0.1, attack: 0.001, decay: 0.2 }, bass: { type: 'triangle', gain: 0.18, attack: 0.001, decay: 0.3 }, drum: { kickFreq: [100, 30], hihatFreq: [400, 100], kickGain: 0.3, hihatGain: 0.05 } },
    tetris: { melody: { type: 'square', gain: 0.1, attack: 0.001, decay: 0.4 }, bass: { type: 'square', gain: 0.12, attack: 0.001, decay: 0.4 }, drum: { kickFreq: [120, 40], hihatFreq: [500, 200], kickGain: 0.4, hihatGain: 0.1 } },
    pacman: { melody: { type: 'square', gain: 0.08, attack: 0.001, decay: 0.1 }, bass: { type: 'square', gain: 0.1, attack: 0.001, decay: 0.1 }, drum: { kickFreq: [200, 100], hihatFreq: [1000, 500], kickGain: 0.4, hihatGain: 0.15 } },
    dq: { melody: { type: 'square', gain: 0.12, attack: 0.01, decay: 0.8, harmonics: true }, bass: { type: 'triangle', gain: 0.2, attack: 0.02, decay: 1.0 }, drum: { kickFreq: [110, 30], hihatFreq: [400, 200], kickGain: 0.35, hihatGain: 0.1 } },
    zelda: { melody: { type: 'square', gain: 0.11, attack: 0.02, decay: 1.2, filter: { type: 'lowpass', freq: 1200 } }, bass: { type: 'sine', gain: 0.22, attack: 0.05, decay: 1.0 }, drum: { kickFreq: [100, 35], hihatFreq: [500, 250], kickGain: 0.4, hihatGain: 0.12 } },

    // クラシック（サイン波・ストリングス/フルート風）
    william: { melody: { type: 'sine', gain: 0.2, attack: 0.01, decay: 0.5, pitchSlide: true }, bass: { type: 'triangle', gain: 0.18, attack: 0.02, decay: 0.6 }, drum: { kickFreq: [120, 40], hihatFreq: [600, 300], kickGain: 0.4, hihatGain: 0.15 } },
    heaven: { melody: { type: 'sine', gain: 0.22, attack: 0.005, decay: 0.4 }, bass: { type: 'sine', gain: 0.2, attack: 0.01, decay: 0.5 }, drum: { kickFreq: [130, 45], hihatFreq: [700, 400], kickGain: 0.5, hihatGain: 0.2 } },
    bee: { melody: { type: 'sine', gain: 0.18, attack: 0.001, decay: 0.2 }, bass: { type: 'sine', gain: 0.16, attack: 0.001, decay: 0.2 }, drum: { kickFreq: [140, 50], hihatFreq: [800, 500], kickGain: 0.55, hihatGain: 0.25 } },
    turkish: { melody: { type: 'sine', gain: 0.2, attack: 0.01, decay: 0.6, harmonics: true }, bass: { type: 'triangle', gain: 0.18, attack: 0.02, decay: 0.8 }, drum: { kickFreq: [110, 35], hihatFreq: [500, 200], kickGain: 0.35, hihatGain: 0.1 } },
    daiku: { melody: { type: 'sine', gain: 0.24, attack: 0.05, decay: 1.5 }, bass: { type: 'sine', gain: 0.2, attack: 0.05, decay: 1.2 }, drum: { kickFreq: [90, 25], hihatFreq: [400, 150], kickGain: 0.3, hihatGain: 0.08 } }
};
