const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector('.form');
console.log(camposDoFormulario)

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
})

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo));
});

// validação de idade

function verificaCampo(campo){
  if (campo.name == "aniversario" && campo.value != "") {
    maiorDeIdade(campo);
  }
};

function maiorDeIdade(campo) {
  const dataNascimento = new Date(campo.value);
  const erroAniversario = document.querySelector('.error-message-aniversario');
  if (!validaIdade(dataNascimento)){
    erroAniversario.innerHTML = 'O usuário não é maior de idade.';
  }
};

function validaIdade(data) {
  const dataAtual = new Date();
  const dataMais18 = new Date(
    data.getUTCFullYear() + 18,
    data.getUTCMonth(),
    data.getUTCDate());

  return dataAtual >= dataMais18
};

// validação de cpf

