// ── Supabase 認証 ──
const SUPABASE_URL = 'https://npiixivwxtfzabsydwdu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_8wfXw_lukw4-6nHJr5sGfA_pqsJs_QJ';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const authScreen   = document.getElementById('auth-screen');
const appContainer = document.querySelector('.container');

// マジックリンクからの遷移かどうか（初期化時に一度だけ評価）
const hasAuthToken = (() => {
  const h = window.location.hash;
  const s = window.location.search;
  return h.includes('access_token') ||
         h.includes('type=') ||
         s.includes('code=') ||
         s.includes('token=');
})();

let appShown = false;

function showApp() {
  if (appShown) return;
  appShown = true;
  // URLに残ったトークン情報を除去
  history.replaceState(null, '', window.location.pathname);
  authScreen.hidden = true;
  appContainer.hidden = false;
}

function showAuthScreen() {
  authScreen.hidden = false;
  appContainer.hidden = true;
}

// ── Step 1: onAuthStateChange を最初に登録 ──
// SIGNED_IN または既存セッション検出でアプリを表示
// SIGNED_OUT でログイン画面に戻す
supabaseClient.auth.onAuthStateChange((event, session) => {
  if (session) {
    showApp();
  } else if (event === 'SIGNED_OUT') {
    appShown = false;
    showAuthScreen();
  }
});

// ── Step 2: 初期セッション確認 ──
// getSession() を呼ぶことで PKCE フローの ?code= 交換を確実にトリガーする
(async () => {
  const { data: { session } } = await supabaseClient.auth.getSession();

  if (session) {
    // 既存セッション or トークン処理済み
    showApp();
  } else if (!hasAuthToken) {
    // トークンなし・セッションなし → ログイン画面を表示
    showAuthScreen();
  } else {
    // トークンはあるが getSession() がまだ null
    // → onAuthStateChange の SIGNED_IN を待つ
    // 5秒経っても認証が完了しなければログイン画面にフォールバック
    setTimeout(() => {
      if (!appShown) showAuthScreen();
    }, 5000);
  }
})();

// ── メール送信フォーム ──
const submitBtn  = document.getElementById('auth-submit-btn');
const emailInput = document.getElementById('auth-email');
const errorMsg   = document.getElementById('auth-error');
const formArea   = document.getElementById('auth-form-area');
const sentArea   = document.getElementById('auth-sent-area');
const resendBtn  = document.getElementById('auth-resend-btn');

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

  const { error } = await supabaseClient.auth.signInWithOtp({
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
