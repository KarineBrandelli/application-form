const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector(".form");
const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputDataNascimento = document.querySelector("#aniversario");
const inputCPF = document.querySelector("#cpf");
const inputCEP = document.querySelector("#cep");
let usuarioCadastrado = JSON.parse(localStorage.getItem("usuario"));

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo));
});

inputCEP.addEventListener("focusout", () => buscaEndereco(inputCEP.value));

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputsValidados = [
    nomeTemNumero(),
    dataEhInvalida(),
    cpfEhValido(),
    cepEhValido(),
    verificaCPFcadastrado(inputCPF),
  ];

  const listaValidada = inputsValidados.every((validado) => validado);

  if (listaValidada) {
    window.location.href = "/cadastro-concluido.html";
  }

  const nome = event.target[1];
  const email = event.target[2];
  const aniversario = event.target[3];
  const cpf = event.target[4];
  const cep = event.target[5];
  const estado = event.target[6];
  const cidade = event.target[7];
  const bairro = event.target[8];
  const rua = event.target[9];
  const complemento = event.target[10];

  const informacoesPreenchidas = {
    "nome": nome.value,
    "email": email.value,
    "aniversario": aniversario.value,
    "cpf": cpf.value,
    "cep": cep.value,
    "estado": estado.value,
    "cidade": cidade.value,
    "bairro": bairro.value,
    "rua": rua.value,
    "complemento": complemento.value
  };

  localStorage.setItem("usuario", JSON.stringify(informacoesPreenchidas));
});

function verificaCPFcadastrado(inputCPF) {
  if (usuarioCadastrado.cpf != inputCPF.value) {
    return true;
  } else {
    alert("Esse CPF já está cadastrado!");
    return false;
  }
};

function nomeTemNumero() {
  const regex = /[a-zA-Z\s]+$/;
  const resultado = regex.test(inputNome.value);

  return resultado;
}

function dataEhInvalida() {
  const dataNascimento = new Date(inputDataNascimento.value);

  return validaIdade(dataNascimento);
}

function cpfEhValido() {
  const cpf = inputCPF.value.replace(/\.|-/g, "");
  const cpfValidado = [
    !validaPrimeiroDigito(cpf),
    !validaSegundoDigito(cpf),
    cpf.length === 11
  ];

  return cpfValidado.every((validado) => validado);
}

function cepEhValido() {
  const contemClasse = inputCEP.classList.contains("validate-cep");

  return contemClasse;
}

function verificaCampo(campo) {
  if (campo.name == "aniversario" && campo.value != "") {
    maiorDeIdade(campo);
  }

  if (campo.name == "cpf" && campo.value.length >= 11) {
    validaCPF(campo);
  }

  if (campo.name == "cpf" && campo.value === "") {
    cpfVazio(campo);
  }

  if (campo.name == "nome" && campo.value === "") {
    validaNome(campo);
  }

  if (campo.name == "nome" && campo.value != "") {
    verificaNome(campo);
  }

  if (campo.name == "email" && campo.value === "") {
    validaEmail(campo);
  }

  if (campo.name == "email" && campo.value != "") {
    verificaEmail(campo);
  }
}

// validação de nome
function validaNome(campo) {
  const erroNome = document.querySelector(".error-message-name");
  erroNome.innerHTML = "Esse campo é obrigatório.";
};

function verificaNome(campo) {
  const erroNome = document.querySelector(".error-message-name");
  const valorNome = inputNome.value;

  const myRegex = /[a-zA-Z\s]+$/;
  const result = myRegex.test(valorNome);
  if (!result) {
    erroNome.innerHTML =
      'Números e caracteres especiais (",!,@,#,$,%,&,*) não são permitidos.';
  } else {
    erroNome.innerHTML = "";
  }
};

// validação de e-mail
function validaEmail(campo) {
  const erroEmail = document.querySelector(".error-message-email");
  erroEmail.innerHTML = "Esse campo é obrigatório.";
};

function verificaEmail(campo) {
  const erroEmail = document.querySelector(".error-message-email");
  const valorEmail = inputEmail.value;

  const myRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const result = myRegex.test(valorEmail);
  if (!result) {
    erroEmail.innerHTML = "Preencha um e-mail válido (usuario@domínio.com)";
  } else {
    erroEmail.innerHTML = "";
  }
};

// validação de idade
function maiorDeIdade(campo) {
  const dataNascimento = new Date(campo.value);
  const erroAniversario = document.querySelector(".error-message-aniversario");

  if (!validaIdade(dataNascimento)) {
    erroAniversario.innerHTML =
      "É preciso ser maior de idade para se cadastrar.";
  } else {
    erroAniversario.innerHTML = "";
  }
};

function validaIdade(data) {
  const dataAtual = new Date();
  const dataMais18 = new Date(
    data.getUTCFullYear() + 18,
    data.getUTCMonth(),
    data.getUTCDate()
  );

  return dataAtual >= dataMais18;
};

// validação de cpf
function cpfVazio(campo) {
  const erroCPF = document.querySelector(".error-message-cpf");
  const valorCPF = inputCPF.value;

  if (valorCPF === "") {
    erroCPF.innerHTML = "Esse campo é obrigatório.";
  } else {
    erroCPF.innerHTML = "";
  }
};

function validaCPF(campo) {
  const cpf = campo.value.replace(/\.|-/g, "");
  const erroCPF = document.querySelector(".error-message-cpf");

  if (
    validaNumerosRepetidos(cpf) ||
    validaPrimeiroDigito(cpf) ||
    validaSegundoDigito(cpf)) {
    erroCPF.innerHTML = "O CPF informado não é válido.";
  } else {
    erroCPF.innerHTML = "";
  }
};

function validaNumerosRepetidos(cpf) {
  const numerosRepetidos = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999"
  ];

  return numerosRepetidos.includes(cpf);
};

function validaPrimeiroDigito(cpf) {
  let soma = 0;
  let multiplicador = 10;

  for (let tamanho = 0; tamanho < 9; tamanho++) {
    soma += cpf[tamanho] * multiplicador;
    multiplicador--;
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
    multiplicador--;
  }

  soma = (soma * 10) % 11;

  if (soma == 10 || soma == 11) {
    soma = 0;
  }

  return soma != cpf[10];
};

// validação de cep
async function buscaEndereco(inputCep) {
  const erroCEP = document.querySelector(".error-message-cep");
  erroCEP.innerHTML = "";

  try {
    let consultaCEP = await fetch(`https://viacep.com.br/ws/${inputCep}/json`);
    let consultaCEPConvertida = await consultaCEP.json();

    if (consultaCEPConvertida.erro) {
      throw Error();
    }

    let estado = document.getElementById("state");
    let cidade = document.getElementById("city");
    let bairro = document.getElementById("bairro");
    let logradouro = document.getElementById("rua");

    estado.value = consultaCEPConvertida.uf;
    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    bairro.value = consultaCEPConvertida.bairro;

    let newCEP = inputCEP.classList.add("validate-cep");
    return newCEP;
  } catch (erro) {
    erroCEP.innerHTML = "CEP inválido! Tente novamente.";
    console.log(erro);
  }
};
