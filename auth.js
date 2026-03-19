// ── Supabase 認証 ──
const SUPABASE_URL = 'https://npiixivwxtfzabsydwdu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5waWl4aXZ3eHRmemFic3lkd2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4OTcxNzEsImV4cCI6MjA4OTQ3MzE3MX0.0bEPSwnLz-ITC7oizDBecpAdo3ZzAbxwP2ilOuDz6P4';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    flowType: 'pkce'
  }
});

const authScreen   = document.getElementById('auth-screen');
const appContainer = document.querySelector('.container');

let appShown = false;

function showApp() {
  if (appShown) return;
  appShown = true;
  history.replaceState(null, '', window.location.pathname);
  authScreen.hidden = true;
  appContainer.hidden = false;
}

function showAuthScreen() {
  authScreen.hidden = false;
  appContainer.hidden = true;
}

// 認証状態の変化を監視
supabaseClient.auth.onAuthStateChange((event, session) => {
  if (session) {
    showApp();
  } else if (event === 'SIGNED_OUT') {
    appShown = false;
    showAuthScreen();
  }
});

// ページ読み込み時の認証フロー
(async () => {
  // Step 1: URLの ?code= を確認（PKCEフロー）
  const code = new URLSearchParams(window.location.search).get('code');
  if (code) {
    const { data: { session }, error } = await supabaseClient.auth.exchangeCodeForSession(code);
    if (!error && session) {
      showApp();
      return;
    }
  }

  // Step 2: 既存セッションを確認
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) {
    showApp();
    return;
  }

  // Step 3: セッションもコードもなければログイン画面を表示
  showAuthScreen();
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

  const rawPath = window.location.origin + window.location.pathname;
  const redirectTo = rawPath.endsWith('/') ? rawPath : rawPath + '/';

  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: true,
    },
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
