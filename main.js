var vetor = [];
var input;
var resultado;
var errors;
var body;
var analise;
var container;

var tiposDeErros = [
    { erro: "Adicione ao menos um valor!" },
    { erro: "O campo não pode ficar vazio <br/>por favor selecione um número de 1 a 100" },
    { erro: "O número tem de estar entre 1 e 100" },
    { erro: "Informe apenas números inteiros!" }
]



window.onload = function() {
    input = document.getElementsByClassName("input")[0];
    resultado = document.getElementsByClassName("resultado")[0];
    errors = document.getElementsByClassName("errors")[0];
    body = document.getElementsByClassName("container")[0];
    analise = document.getElementsByClassName("analise")[0];
    container = document.getElementsByClassName("util")[0];
}


function setError(estado, cod = -1) {
    if (estado == true) {
        input.style.borderStyle = "solid";
        input.style.borderWidth = "1.5px";
        input.style.borderColor = "#ff261b";

        try {
            errors.innerHTML = tiposDeErros[cod].erro;
        } finally {
            // TO DO..
        }


    } else {
        errors.innerHTML = "";
        input.style.borderWidth = "0";
    }

}

function Adicionar() {
    var numero = Number(input.value);

    if (!Number.isInteger(numero)) {
        setError(true, 3);
    } else if (vetor.indexOf(numero) >= 0) {
        errors.innerHTML = `O número <strong>${numero}</strong> já existe no vetor`;
        setError(true);
    } else if (Math.sign(numero) == 1 && (numero >= 1 && numero <= 100)) {
        vetor.push(numero);
        input.value = undefined;
        resultado.innerHTML += `<div class="item"><span>${numero}</span></div>`;
        setError(false);
    } else if (numero == undefined || numero == null || numero == NaN || numero == "") {
        setError(true, 1);
    } else if (numero > 100 || numero < 1) {
        setError(true, 2);
    }
}

function Analisar() {
    if (vetor == '') {
        setError(true, 0)
        return;
    }
    var btn1 = document.getElementsByClassName("button")[0];
    var btn2 = document.getElementsByClassName("button")[1];

    btn1.disabled = true;
    btn2.disabled = true;

    container.classList.remove("animated", "fadeInLeft");
    container.classList.add("animated", "fadeOutLeft");

    setTimeout(() => {
        container.style.display = "none";
        container.classList.remove("animated", "fadeOutLeft")
    }, 800);

    setTimeout(() => {
        analise.classList.add("animated", "fadeInRight");
        analise.style.display = "block"

    }, 800)

    analise.innerHTML = `<div class="valores">${vetor}</div>
                <br/>
                <p>O vetor possui <strong>${vetor.length}</strong> elementos<br>
                O maior valor do vetor é <strong>${MaiorValor()}</strong><br>
                O menor valor do vetor é <strong>${MenorValor()}</strong><br>
                Somando todos os valores do vetor temos <strong>${SomaEMedia('soma')}</strong><br>
                A média dos valores do vetor é de <strong>${SomaEMedia().toFixed(2)}</strong></p><br>
                <div class="button back" onclick="GoBack()"><span><</span>VOLTAR</div>`;

}

function MaiorValor() {
    let maior = 0;
    for (let pos in vetor) {
        if (vetor[pos] > maior) {
            maior = vetor[pos];
        }
    }

    return maior;
}

function MenorValor() {
    let menor = 101;
    for (let pos in vetor) {
        if (vetor[pos] < menor) {
            menor = vetor[pos];
        }
    }

    return menor;
}

function SomaEMedia(parametro) {
    let soma = 0;

    for (let pos in vetor) {
        soma += vetor[pos]
    }

    if (parametro == 'soma') {
        return soma;
    } else {
        return (soma / vetor.length);
    }
}

function GoBack() {
    // TO DO ...    

    analise.classList.remove("animated", "fadeInRight");
    var btn1 = document.getElementsByClassName("button")[0];
    var btn2 = document.getElementsByClassName("button")[1];

    btn1.disabled = false;
    btn2.disabled = false;

    analise.classList.add("animated", "fadeOutRight");

    setTimeout(() => {
        analise.style.display = "none";
        analise.classList.remove("animated", "fadeOutRight");
    }, 800);

    setTimeout(() => {
        container.classList.add("animated", "fadeInLeft");
        container.style.display = "block"
    }, 800)

    container.classList.remove("animated", "fadeInLeft");
}

function Reset() {
    vetor = [];
    analise.innerHTML = "";
    resultado.innerHTML = "";
    setError(false);
    alert("O Vetor foi resetado");
}