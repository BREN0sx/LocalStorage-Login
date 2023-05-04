//Verificar conta ativa

if (window.location.href !== 'index.html') {
  const activeUser = localStorage.getItem('activeUser');
  if (activeUser) {
    console.log('aqui')
    window.location.href = '../';
  }
}

//Visibilidade de senha

const passwordInputs = document.querySelectorAll('input[type="password"]');
passwordInputs.forEach(input => {
  const icon = document.createElement('i');
  icon.classList.add('fa', 'fa-eye-slash', 'toggle-password');
  
  input.parentNode.insertBefore(icon, input.nextSibling);

  icon.addEventListener('click', () => {
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    icon.classList.toggle('fa-eye-slash');
    icon.classList.toggle('fa-eye');
  });
});

//Notificações

const toasts = [];
const showToast = (type, message) => {
  const toast = document.createElement('sp-toast');
  toast.setAttribute('open', true);
  toast.setAttribute('variant', type);
  toast.innerHTML = `${type === 'success' ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>'} ${message}`;

  const toastContainer = document.getElementById('toast-container');
  toastContainer.appendChild(toast);
  toasts.push(toast);
  

  if (toasts.length > 5) {
    const oldToast = toasts.shift();
    toastContainer.removeChild(oldToast);
  }

  setTimeout(() => {
    toastContainer.removeChild(toast);
    toasts.splice(toasts.indexOf(toast), 1);
  }, 4000);
};
