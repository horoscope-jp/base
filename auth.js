const authScreen   = document.getElementById('auth-screen');
const appContainer = document.querySelector('.container');

const LS_KEY = 'auth_email';

function showApp() {
  authScreen.style.display = 'none';
  appContainer.hidden = false;
}

function showAuthScreen() {
  authScreen.style.display = 'flex';
  appContainer.hidden = true;
}

// ページ読み込み時の認証確認
if (localStorage.getItem(LS_KEY)) {
  showApp();
} else {
  showAuthScreen();
}

// ── メール入力フォーム ──
const submitBtn  = document.getElementById('auth-submit-btn');
const emailInput = document.getElementById('auth-email');
const errorMsg   = document.getElementById('auth-error');

function signIn() {
  const email = emailInput.value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorMsg.textContent = '正しいメールアドレスを入力してください';
    errorMsg.hidden = false;
    return;
  }

  localStorage.setItem(LS_KEY, email);
  showApp();
}

submitBtn.addEventListener('click', signIn);

emailInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') signIn();
});
