const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector('.form');
console.log(camposDoFormulario)

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
})

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => 
    verificaCampo(campo));
});

// validação de idade
function verificaCampo(campo){
  if (campo.name == "aniversario" && campo.value != "") {
    maiorDeIdade(campo);
  }

  if (campo.name == "cpf" && campo.value.length >= 11) {
    validaCPF(campo);
  }
};

function maiorDeIdade(campo) {
  const dataNascimento = new Date(campo.value);
  const erroAniversario = document.querySelector('.error-message-aniversario');
  if (!validaIdade(dataNascimento)){
    erroAniversario.innerHTML = 'É preciso ser maior de idade para se cadastrar.';
  } else {
    erroAniversario.innerHTML = '';
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
function validaCPF(campo) {
  const cpf = campo.value.replace(/\.|-/g, "");
  const erroCPF = document.querySelector('.error-message-cpf');

  if (
    validaNumerosRepetidos(cpf) ||
    validaPrimeiroDigito(cpf) ||
    validaSegundoDigito(cpf)) {
    erroCPF.innerHTML = 'O CPF informado não é válido.';
  } else {
    erroCPF.innerHTML = '';
  }
};

function validaNumerosRepetidos(cpf) {
  const numerosRepetidos = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999'
  ]

  return numerosRepetidos.includes(cpf)
};

function validaPrimeiroDigito(cpf) {
  let soma = 0;
  let multiplicador = 10;
  
  for (let tamanho = 0; tamanho < 9; tamanho++) {
    soma += cpf[tamanho] * multiplicador;
    multiplicador--
  }

  soma = (soma * 10) % 11;

  if (soma == 10 || soma == 11) {
    soma = 0;
  }

  return soma != cpf[9];
};

function validaSegundoDigito(cpf) {
  let soma = 0;
  let multiplicador = 11;

  for (let tamanho = 0; tamanho < 10; tamanho++) {
      soma += cpf[tamanho] * multiplicador;
      multiplicador--
  }

  soma = (soma * 10) % 11;

  if (soma == 10 || soma == 11) {
      soma = 0;
  }

  return soma != cpf[10];
};
