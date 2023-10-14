//Notificação evento

document.addEventListener('DOMContentLoaded', function () {
  const logged = localStorage.getItem('logged');
  if (logged !== null) {
      showToast('success', 'Conta conectada');
      localStorage.removeItem('logged');
  }
});

//Informações de conta

const usernameEl = document.getElementById('username');
const usernameDash = document.getElementById('username-dash');
const dateCreated = document.getElementById('created-dash');

const userData = localStorage.getItem(activeUser);
let creationDateAccount = ''
if (userData !== null) {
  const userObj = JSON.parse(userData);
  const creationDate = userObj.dataCadastro;

  const data = new Date(creationDate);
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear().toString()
  creationDateAccount = `${dia}/${mes}/${ano}`;
}

if (activeUser) {
  usernameDash.value = activeUser
  usernameEl.textContent = activeUser;
  dateCreated.value = creationDateAccount
} else {
  window.location.href = 'login';
}

//Atualiza senha

const passwordUpdate = document.getElementById('passwordUpdate');
const accountInfo = document.getElementById('accountInfo');

accountInfo.addEventListener('submit', function (event) {
  event.preventDefault();

  let oldPass = document.getElementById('oldPass').value;
  let newPass = document.getElementById('newPass').value;
  let confirmNewPass = document.getElementById('confirmNewPass').value;

  const usuario = localStorage.getItem('activeUser');
  const senhaSalva = JSON.parse(localStorage.getItem(usuario)).senha;
  if (!oldPass || !newPass || !confirmNewPass) {
    return showToast('error', 'Campos incompletos');
  } else if (CryptoJS.SHA256(oldPass).toString() !== senhaSalva) {
    return showToast('error', 'Senha incorreta');
  } else if (newPass !== confirmNewPass) {
    return showToast('error', 'As senhas não coincidem');
  } else if (oldPass == newPass) {
    return showToast('error', 'Sem alteração');
  }

  const novoCadastro = JSON.parse(localStorage.getItem(usuario));
  novoCadastro.senha = CryptoJS.SHA256(newPass).toString();
  localStorage.setItem(usuario, JSON.stringify(novoCadastro));

  showToast('success', 'Sua senha foi alterada');
  accountInfo.reset()
})

//Desconecta Conta

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', function() {
  localStorage.removeItem('activeUser');
  localStorage.setItem('loggedOut', true);
  window.location.href = 'login';
});

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

  /* setTimeout(() => {
    toastContainer.removeChild(toast);
    toasts.splice(toasts.indexOf(toast), 1);
  }, 4000); */
};
