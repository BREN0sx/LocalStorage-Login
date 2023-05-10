//Registra Conta

const cadastroForm = document.getElementById('cadastroForm');
cadastroForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;
  const senhaArmazenada = localStorage.getItem(usuario);

  if (!usuario || !senha || !confirmarSenha) {
    return showToast('error', 'Campos incompletos');
  } else if (senhaArmazenada !== null) {
    return showToast('error', 'Nome de usuário indisponível');
  } else if (senha !== confirmarSenha) {
    return showToast('error', 'As senhas não coincidem');
  } else if (senha.length < 6) {
    return showToast('error', 'Senha muito curta');
  }

  const dataCadastro = new Date();
  const timestamp = dataCadastro.getTime();
  const cadastro = {
    senha: CryptoJS.SHA256(senha).toString(),
    dataCadastro: timestamp,
  };

  localStorage.setItem(usuario, JSON.stringify(cadastro));
  localStorage.setItem('registered', true);

  cadastroForm.reset();

  window.location.href = "../login";
});
