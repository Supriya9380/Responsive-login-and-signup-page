function showToast(message, type) {
  const toast = document.getElementById('toast');
  toast.textContent = message;

  toast.className = 'toast'; // Reset
  toast.classList.add('show', type);

  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}

const loginForm = document.getElementById('loginForm');
const forgotLink = document.getElementById('forgotLink');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userFound = users.find(u => u.username === username && u.password === password);

  if (userFound) {
    localStorage.setItem('loggedInUser', username);
    localStorage.setItem('userEmail', userFound.email);

    showToast('Login Successful!', 'success');
  
  }
}
);

const modal = document.getElementById('resetModal');
const closeModal = document.getElementById('closeModal');
const resetBtn = document.getElementById('resetBtn');

forgotLink.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

resetBtn.addEventListener('click', () => {
  const email = document.getElementById('resetEmail').value.trim();
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userFound = users.find(u => u.email === email);

  if (email && email.includes('@')) {
    if (userFound) {
      showToast('Reset link sent to your registered email!', 'success');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 2000);
    } else {
      showToast('Email not registered. Please sign up first.', 'error');
    }
  } else {
    showToast('Please enter a valid email.', 'error');
  }
});
