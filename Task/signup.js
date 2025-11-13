function showToast(message, type) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'show ' + (type === 'error' ? 'error' : 'success');

  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
  }, 3000);
}

const form = document.getElementById('signupForm');
const emailInput = document.getElementById('email');
const pwInput = document.getElementById('password');

const gmailRegex = /^[^\s@]+@gmail\.com$/;
const strongPwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*\-]).{8,}$/;

form.addEventListener('submit', e => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = emailInput.value.trim();
  const password = pwInput.value;

  if (!gmailRegex.test(email)) {
    showToast('Please use a valid Gmail address (ending in @gmail.com).', 'error');
    return;
  }

  if (!strongPwRegex.test(password)) {
    showToast('Password must be at least 8 chars and include uppercase, lowercase, number & symbol.', 'error');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (users.some(u => u.username === username)) {
    showToast('Username already taken. Please choose another.', 'error');
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('registeredEmail', email);

  showToast('Signed up successfully!', 'success');
  form.reset();

  setTimeout(() => window.location.href = 'login.html', 2000);
});
