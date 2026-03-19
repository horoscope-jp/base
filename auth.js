// ── Supabase 認証 ──
const SUPABASE_URL = 'https://npiixivwxtfzabsydwdu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5waWl4aXZ3eHRmemFic3lkd2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4OTcxNzEsImV4cCI6MjA4OTQ3MzE3MX0.0bEPSwnLz-ITC7oizDBecpAdo3ZzAbxwP2ilOuDz6P4';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const authScreen   = document.getElementById('auth-screen');
const appContainer = document.querySelector('.container');

const LS_KEY = 'auth_email';

function showApp() {
  authScreen.hidden = true;
  appContainer.hidden = false;
}

function showAuthScreen() {
  authScreen.hidden = false;
  appContainer.hidden = true;
}

// ページ読み込み時: localStorageに保存済みメールがあればそのままアプリを表示
if (localStorage.getItem(LS_KEY)) {
  showApp();
} else {
  showAuthScreen();
}

// ── メール入力フォーム ──
const submitBtn  = document.getElementById('auth-submit-btn');
const emailInput = document.getElementById('auth-email');
const errorMsg   = document.getElementById('auth-error');

async function signIn() {
  const email = emailInput.value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorMsg.textContent = '正しいメールアドレスを入力してください';
    errorMsg.hidden = false;
    return;
  }

  errorMsg.hidden = true;
  submitBtn.disabled = true;
  submitBtn.textContent = '処理中…';

  // Supabaseへの登録を試みる（失敗してもアプリには遷移する）
  try {
    await supabaseClient.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
  } catch (_) {
    // 接続エラーは無視
  }

  // localStorageに保存して即アプリへ
  localStorage.setItem(LS_KEY, email);
  showApp();
}

submitBtn.addEventListener('click', signIn);

emailInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') signIn();
});
