// ── Supabase 認証 ──
const SUPABASE_URL = 'https://npiixivwxtfzabsydwdu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_8wfXw_lukw4-6nHJr5sGfA_pqsJs_QJ';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const authScreen   = document.getElementById('auth-screen');
const appContainer = document.querySelector('.container');

function showApp() {
  authScreen.hidden = true;
  appContainer.hidden = false;
}

function showAuthScreen() {
  authScreen.hidden = false;
  appContainer.hidden = true;
}

// 認証状態の変化を監視
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    // 認証済み → アプリを表示
    localStorage.setItem('horoscope_authed', '1');
    showApp();
  }
});

// 初期チェック
(async function initAuth() {
  // URLにsupabaseのトークンが含まれているか確認（マジックリンクコールバック）
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const queryParams = new URLSearchParams(window.location.search);
  const hasToken = hashParams.get('access_token') || queryParams.get('token') || queryParams.get('code');

  if (hasToken) {
    // Supabaseがトークンを自動処理するのを待つ
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // URLのトークンパラメータを除去してクリーンなURLに戻す
      history.replaceState(null, '', window.location.pathname);
      return; // onAuthStateChange が showApp() を呼ぶ
    }
  }

  // 既存セッションの確認
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    showApp();
  } else {
    showAuthScreen();
  }
})();

// メール送信フォーム
const submitBtn   = document.getElementById('auth-submit-btn');
const emailInput  = document.getElementById('auth-email');
const errorMsg    = document.getElementById('auth-error');
const formArea    = document.getElementById('auth-form-area');
const sentArea    = document.getElementById('auth-sent-area');
const resendBtn   = document.getElementById('auth-resend-btn');

async function sendMagicLink() {
  const email = emailInput.value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorMsg.textContent = '正しいメールアドレスを入力してください';
    errorMsg.hidden = false;
    return;
  }

  errorMsg.hidden = true;
  submitBtn.disabled = true;
  submitBtn.textContent = '送信中…';

  const redirectTo = window.location.origin + window.location.pathname;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo },
  });

  if (error) {
    errorMsg.textContent = 'エラーが発生しました。もう一度お試しください。';
    errorMsg.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = '✉️ リンクを送る';
    return;
  }

  formArea.hidden = true;
  sentArea.hidden = false;
}

submitBtn.addEventListener('click', sendMagicLink);

emailInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMagicLink();
});

resendBtn.addEventListener('click', () => {
  formArea.hidden = false;
  sentArea.hidden = true;
  submitBtn.disabled = false;
  submitBtn.textContent = '✉️ リンクを送る';
  errorMsg.hidden = true;
});
