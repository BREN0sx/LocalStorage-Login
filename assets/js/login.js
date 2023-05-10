//Notificação evento

document.addEventListener('DOMContentLoaded', function () {
    const registered = localStorage.getItem('registered');
    const loggedOut = localStorage.getItem('loggedOut');
    if (registered !== null) {
        showToast('success', 'Conta cadastrada');
        localStorage.removeItem('registered');
    }
    if (loggedOut !== null) {
        showToast('success', 'Conta desconectada');
        localStorage.removeItem('loggedOut')
    }
});

//Conecta Conta

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const usuario = document.getElementById('loginUsuario').value;
    const senha = document.getElementById('loginSenha').value;
    const cadastro = JSON.parse(localStorage.getItem(usuario));
    
    if (!usuario || !senha) {
        return showToast('error', 'Campos incompletos');
    } else if ((cadastro === null) || (CryptoJS.SHA256(senha).toString() !== cadastro.senha)) {
        showToast('error', 'Usuário ou senha incorreta');
    } else {
        localStorage.setItem('activeUser', usuario);
        localStorage.setItem('logged', true);
        window.location.href = '../';
        loginForm.reset();
    }
});
