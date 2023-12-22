var coresClicadas = [];
var coresSequencia = [];
var cont = true, i = 0;
function animarBotao(cor) {

    tocarSom(cor);
    comportamentoBotao(cor);
}

function comportamentoBotao(cor) {
    cor = "#" + cor;
    $(cor).fadeOut(100);
    $(cor).addClass("pressionado");
    setTimeout(function () {
        $(cor).removeClass("pressionado");
    }, 100);
    $(cor).fadeIn(100);
}

function tocarSom(cor) {

    const audioMap = {
        "green": "#green-audio",
        "blue": "#blue-audio",
        "red": "#red-audio",
        "yellow": "#yellow-audio"
    }

    var audioElemento = $(audioMap[cor])[0];
    if (audioElemento) {
        console.log(audioElemento);
        audioElemento.play();
    }

}

function gerarCorAleatoria() {
    var cores = ["green", "blue", "yellow", "red"];
    var aleatoria = Math.floor(Math.random() * cores.length);
    var corAleatoria = cores[aleatoria];
    return corAleatoria;
}

function jogar() {
    $("h1").text("Rodada " + (i + 1));
    var cor = gerarCorAleatoria();
    coresSequencia.push(cor);
    mostrarSequencia(coresSequencia);
    cont = false;
}

function mostrarSequencia(vetor) {

    (function (index) {
        setTimeout(() => {
            animarBotao(vetor[index]);
        }, 300 * (index + 1));
    })(i);

}

function verificarResposta(level) {
    if (coresSequencia[level] === coresClicadas[level]) {
        if (coresClicadas.length === coresSequencia.length) {
            i++;
            setTimeout(function () {
                jogar();
            }, 300);
            coresClicadas = [];
        }
    }
    else {
        cont = true;

        var erro = new Audio("sounds/wrong.mp3");
        erro.play();

        $("h1").text(" Pressione A para recomeçar");
        coresSequencia = [];
        coresClicadas = [];

        i = 0;

        $("body").css("background", "red");
        setTimeout(function () {
            $("body").css("background", "#011F3F");
        }, 100);
        $(".btn-start").show();
    }
}

$(".btn").click(function () {
    if (cont != true) {
        var novaCor = $(this).attr("id");
        coresClicadas.push(novaCor);
        animarBotao(novaCor);
        verificarResposta(coresClicadas.length - 1);
    }

});


$(".btn-start").click(function () {
    $(this).hide();
    jogar();
});

$(document).ready(function () {
    $(document).keydown(function (event) {
        if ((event.key === "a") && (cont === true)) { //verifica se a tecla A foi clicada
            jogar();
        }
    });
});










