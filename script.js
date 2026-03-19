const SIGNS = [
  { name: '牡羊座',  emoji: '🐏' },
  { name: '牡牛座',  emoji: '🐂' },
  { name: '双子座',  emoji: '👯' },
  { name: '蟹座',    emoji: '🦀' },
  { name: '獅子座',  emoji: '🦁' },
  { name: '乙女座',  emoji: '🌸' },
  { name: '天秤座',  emoji: '⚖️' },
  { name: '蠍座',    emoji: '🦂' },
  { name: '射手座',  emoji: '🏹' },
  { name: '山羊座',  emoji: '🐐' },
  { name: '水瓶座',  emoji: '🫧' },
  { name: '魚座',    emoji: '🐠' },
];

const MESSAGES = {
  overall: [
    'キラキラとした運気があなたを包んでいます。積極的に動くことで、思いがけないチャンスをつかめそうな一日よ。今日は直感を信じて、ためらわずに一歩踏み出してみて！',
    'ゆったりとした流れの一日になりそう💖 焦らず自分のペースで過ごすことが大切よ。心に余白を作ることで、大切にすべきものが自然と見えてくるはずよ。',
    'ハプニングがチャンスに変わる予感がある日✨ 予定外の出来事も笑顔で受け入れてみて。柔軟に対応することが、今日の運気をぐんと引き上げるカギになるよ。',
    '自分の気持ちに素直になることが大切な一日。心の声にしっかり耳を傾けると、迷いがすっと晴れていくはず。正直な行動が、新しい扉をひらいてくれるよ🌟',
    'ちょっと立ち止まって周りを見渡してみて🌷 あわただしい毎日の中に、見落としていた大切なものが隠れているかも。丁寧に過ごすことで、温かな発見がありそうよ。',
    '努力の積み重ねが花開く予感がする日🌸 コツコツ続けてきたことが、今日ついに実を結びそう。自信を持って堂々と前に進んでいいよ、あなたならきっと大丈夫！',
    '人とのつながりが幸運を呼び込む日💫 気になる人に積極的に話しかけてみて。笑顔と言葉のキャッチボールが、思わぬ素敵なご縁につながることがありそうよ。',
    '内なる声に耳を傾けると、大事なことが見えてくるよ🌙 ひとりの時間を大切にすることで、心がしっかりリチャージされていく。静かな時間の中で自分と向き合うのが今日の吉行動！',
  ],
  love: [
    '相手の気持ちを受け取る準備が、今日のあなたにはできています💕 飾らない素直な言葉が、相手の心をじんわりと動かしてくれるよ。今日は思っていることをそのまま伝えてみてね。',
    '深い会話があなたの関係をより豊かにしてくれる日✨ いつもより少しだけ踏み込んだ話題に触れてみて。本音でぶつかることで、お互いの理解がぐっと深まるはずよ。',
    'ときめきの予感がいっぱいの一日🎀 日常の小さな幸せに目を向けると、心がほっこりしてくるよ。素敵な出来事は案外、いつもの場所にそっと転がっているものよ。',
    '関係をもっと深めるなら今日がチャンス！勇気を出して一歩踏み出してね💖 思い切って気持ちを伝えることで、関係が新しいステージへ進めそうよ。タイミングは今がベストなのよ！',
    'ひとり時間をしっかり楽しむことで、本当に求めているものが見えてくる🌸 自分を大切にすることが、素敵な縁を引き寄せる第一歩になるよ。焦らず自分のペースで、理想の関係を育てていこう。',
    '笑顔がご縁を引き寄せてくれる日🌟 明るくオープンに過ごすことで、素敵な出会いが舞い込んでくるかも。今日は少し外に出て、新しい風を感じてみてね！',
    '思いやりの気持ちを大切にする日💕 小さな気遣いや優しい言葉が、相手の心に深く刻まれるよ。日常のさりげないひとことが、大きな信頼と絆を生んでいくものよ。',
    'パートナーとの時間をたっぷり大切にしてね🌷 何気ない日常のひとコマが、かけがえのない大切な思い出になっていく。今日は特別なことをしなくても、一緒にいるだけで幸せを感じられるはずよ。',
  ],
  work: [
    'アイデアがどんどん湧き出てくる日✨ 心に浮かんだことを臆せずシェアしてみよう！思い切った提案が周りの心を動かし、思わぬ大きな流れにつながるかも。',
    '丁寧に取り組むことが成功への近道になる日🌟 細かいところにまでこだわることで、仕上がりのクオリティがぐんとアップするよ。地道な積み重ねが、後で大きな差として返ってくるはずよ。',
    'チームワークで大きな力が生まれる日💪 ひとりで抱え込まず、周りと力を合わせて進もう。みんなの強みをうまく活かすことで、思いがけない素晴らしい成果が生まれるはずよ！',
    '計画通りにいかなくても焦らなくて大丈夫💖 その場の状況に合わせた柔軟な対応が、むしろ好結果を生んでくれるよ。アドリブ力と適応力が、今日のあなたの最大の武器になるわ！',
    '集中力が高まるゴールデンタイムが訪れる日💫 難しい課題にチャレンジするなら今日がベストタイミング！深く集中することで、いつもよりぐんと捗ることを実感できそうよ。',
    '新しいスキルにトライする絶好のチャンスが来ている🎀 失敗を恐れずに思い切って挑戦してみて。今日の経験は必ず未来のあなたの大切な財産になっていくはずよ！',
    'コミュニケーションを丁寧にとることが大切な日💕 大事なことはひとこと確認するだけでトラブルを未然に防げるよ。相手の立場に立った言葉選びが、職場の雰囲気をぐっと明るくしてくれるわ。',
    '積み上げてきた努力がついに認められる兆しが見えてきたよ🌸 今日は自信を持って、堂々と自分の成果を示していいよ。コツコツ頑張ってきたあなたを、きっと周りは見てくれているはずよ！',
  ],
  money: [
    '計画的にお金を使うことで、後々ゆとりが自然と生まれてくるよ💰 今日は衝動的な出費を控えて、一つひとつの選択を丁寧に意識してみて。賢いお金の使い方が、着実な貯蓄への一番の近道よ。',
    '衝動買いには要注意な一日🌷 欲しいと思ったら、本当に必要かどうかを一呼吸おいて考えてみて。少し時間をおくことで冷静な判断ができて、後悔のない選択ができるようになるよ。',
    '小さな節約の積み重ねが力を発揮する日✨ 固定費の見直しや日々の無駄遣いをチェックしてみて。コツコツ続けることが、将来の大きな余裕と安心感につながっていくよ。',
    '予想外の臨時収入が舞い込む暗示がある日💫 思いがけないところから、ラッキーなお金の流れがやってくるかも。感謝の気持ちを忘れずに、その恵みをしっかり上手に活かしてね！',
    '今日は貯蓄を優先するのがベストの選択🍀 安定を大切にする判断が、長期的な豊かさと安心感をもたらしてくれるよ。堅実な選択こそが、今日のあなたにとって一番の吉行動よ。',
    'お金の流れを整理するのに最適なタイミングが来ているよ💖 家計簿をつけたり、不要なサブスクを見直したりしてみて。お金としっかり向き合う時間が、豊かな未来への大切な第一歩になるわ。',
    '誰かへのプレゼントや食事への投資は、巡り巡って必ず返ってくるよ✨ 気前よく使うことで、良い縁と温かいエネルギーが自然と循環していく。今日の思いやりのお金は、きっと幸運の種になるはず！',
    '収入アップのヒントが身近なところに転がっている日🌟 日常の何気ない会話や出来事の中に、大きなチャンスが隠れているかも。アンテナを高く張って、小さなサインを見逃さないようにしてね。',
  ],
};

const LUCKY_COLORS = [
  'ローズピンク🌸', 'ラベンダー💜', 'スカイブルー💙', 'ミントグリーン🌿',
  'コーラルピンク🌺', 'ゴールド✨', 'ホワイト🤍', 'ベビーピンク🎀',
  'パールホワイト🌙', 'シルバー💫', 'ライラック💐', 'パウダーブルー🦋',
];

const LUCKY_NUMBERS = [3, 5, 7, 8, 11, 12, 15, 21, 24, 33, 7, 9];

const PAGES = ['page-top', 'page-overall', 'page-love', 'page-work', 'page-money'];

function seededRand(seed) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function getDailySeed(signIndex) {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate() + signIndex * 997;
}

function pickRandom(arr, rand) {
  return arr[Math.floor(rand() * arr.length)];
}

function starsHTML(count) {
  return '⭐'.repeat(count) + '🌑'.repeat(5 - count);
}

function getStarCount(rand) {
  const r = rand();
  if (r < 0.08) return 2;
  if (r < 0.25) return 3;
  if (r < 0.65) return 4;
  return 5;
}

function formatDate(d) {
  const week = ['日', '月', '火', '水', '木', '金', '土'];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${week[d.getDay()]}）`;
}

function showPage(pageId) {
  PAGES.forEach(id => {
    const el = document.getElementById(id);
    el.hidden = (id !== pageId);
    if (id === pageId) el.classList.add('page-enter');
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const CATEGORY_LABELS = {
  overall: '今日の総合運',
  love:    '今日の恋愛運',
  work:    '今日の仕事運',
  money:   '今日の金運',
};

function fillSignHeader(prefix, sign) {
  document.getElementById(`${prefix}-title`).textContent =
    `${sign.emoji} ${sign.name}の${CATEGORY_LABELS[prefix]}`;
}

function showFortune(signIndex) {
  const sign = SIGNS[signIndex];
  const rand = seededRand(getDailySeed(signIndex));

  const categories = ['overall', 'love', 'work', 'money'];
  const data = {};
  categories.forEach(key => {
    data[key] = {
      stars: getStarCount(rand),
      text: pickRandom(MESSAGES[key], rand),
    };
  });
  const luckyColor  = pickRandom(LUCKY_COLORS, rand);
  const luckyNumber = pickRandom(LUCKY_NUMBERS, rand);

  // 総合運
  fillSignHeader('overall', sign);
  document.getElementById('stars-overall').textContent = starsHTML(data.overall.stars);
  document.getElementById('text-overall').textContent  = data.overall.text;

  // 恋愛運
  fillSignHeader('love', sign);
  document.getElementById('stars-love').textContent = starsHTML(data.love.stars);
  document.getElementById('text-love').textContent  = data.love.text;

  // 仕事運
  fillSignHeader('work', sign);
  document.getElementById('stars-work').textContent = starsHTML(data.work.stars);
  document.getElementById('text-work').textContent  = data.work.text;

  // 金運
  fillSignHeader('money', sign);
  document.getElementById('stars-money').textContent  = starsHTML(data.money.stars);
  document.getElementById('text-money').textContent   = data.money.text;
  document.getElementById('lucky-color').textContent  = luckyColor;
  document.getElementById('lucky-number').textContent = luckyNumber;

  showPage('page-overall');
}

// ── PWAインストールバナー ──
(function () {
  // すでにスタンドアロン（インストール済み）なら何もしない
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    navigator.standalone === true;
  if (isStandalone) return;

  // セッション内で閉じたら再表示しない
  if (sessionStorage.getItem('installBannerDismissed')) return;

  const banner      = document.getElementById('install-banner');
  const installBtn  = document.getElementById('install-btn');
  const closeBtn    = document.getElementById('install-close');

  const overlay     = document.getElementById('ios-popup-overlay');
  const popup       = document.getElementById('ios-popup');
  const popupClose  = document.getElementById('ios-popup-close');

  function showBanner() { banner.hidden = false; }
  function hideBanner() {
    banner.hidden = true;
    sessionStorage.setItem('installBannerDismissed', '1');
  }

  function openIosPopup() {
    overlay.hidden = false;
    popup.hidden   = false;
  }
  function closeIosPopup() {
    overlay.hidden = true;
    popup.hidden   = true;
  }

  closeBtn.addEventListener('click', hideBanner);
  overlay.addEventListener('click', closeIosPopup);
  popupClose.addEventListener('click', closeIosPopup);

  // ── Android (beforeinstallprompt) ──
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    showBanner();

    installBtn.addEventListener('click', async () => {
      hideBanner();
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
    });
  });

  // ── iOS ──
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  if (isIos) {
    document.getElementById('install-banner-text').textContent =
      'ホーム画面に追加してアプリとして使えるよ！';
    installBtn.textContent = '追加方法を見る';
    showBanner();

    installBtn.addEventListener('click', openIosPopup);
  }
})();

// 日付表示
document.getElementById('today-date').textContent = formatDate(new Date());

// 星座ボタン生成
const grid = document.getElementById('sign-grid');
SIGNS.forEach((sign, i) => {
  const btn = document.createElement('button');
  btn.className = 'sign-btn';
  btn.innerHTML = `<span class="btn-emoji">${sign.emoji}</span><span class="btn-name">${sign.name}</span>`;
  btn.addEventListener('click', () => showFortune(i));
  grid.appendChild(btn);
});

// ナビゲーション
document.getElementById('overall-back').addEventListener('click', () => showPage('page-top'));
document.getElementById('overall-next').addEventListener('click', () => showPage('page-love'));

document.getElementById('love-back').addEventListener('click', () => showPage('page-overall'));
document.getElementById('love-next').addEventListener('click', () => showPage('page-work'));

document.getElementById('work-back').addEventListener('click', () => showPage('page-love'));
document.getElementById('work-next').addEventListener('click', () => showPage('page-money'));

document.getElementById('money-back').addEventListener('click', () => showPage('page-work'));
document.getElementById('money-next').addEventListener('click', () => showPage('page-top'));
