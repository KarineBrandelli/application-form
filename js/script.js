const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector('.form');

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
})

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo));
});

function verificaCampo(campo){
  if (campo.name == "aniversario" && campo.value != "") {
    maiorDeIdade(campo);
  }
}

function maiorDeIdade(campo) {
  const dataNascimento = new Date(campo.value);
  if (!validaIdade(dataNascimento)){
    campo.setCustomValidity('O usuário não é maior de idade.')
  }
}

function validaIdade(data) {
  const dataAtual = new Date();
  const dataMais18 = new Date(
    data.getUFCFullYear() + 18,
    data.getUTCMonth(),
    data.getUTCDate());

  return dataAtual >= dataMais18
}
