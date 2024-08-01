
let inputValor = document.getElementById('valor');

let input1 = document.getElementById('moeda1');

let input2 = document.getElementById('moeda2');

let botao = document.getElementById('botaoForm');

let resultado = document.getElementById('resultado');

const formulario = document.getElementById('formulario');


document.addEventListener('DOMContentLoaded', function () {

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
    });

});

botao.addEventListener('click',
    function () {

        let valor = inputValor.value;
        let moeda1 = input1.value;
        let moeda2 = input2.value;

        if (valor <= 0) {
            alert('O Campo "Valor" não deve ficar em branco ou ser um valor negativo!');
            resultado.textContent = 'Erro na Conversão';
        } else {

            if (valor > 0 && moeda1 == moeda2 || moeda1 == 'null' || moeda2 == 'null') {
                alert('Escolha moedas diferentes para realizar a conversão!');
                resultado.textContent = 'Erro na Conversão';
            }
        }

        if (valor > 0 && moeda1 != moeda2 && moeda1 != 'null' && moeda2 != 'null') {

            const url = ` https://economia.awesomeapi.com.br/last/${moeda1}-${moeda2}`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        console.log('Erro na resposta da api');
                    }
                    return response.json();
                })
                .then(data => {

                    let conversao = moeda1 + moeda2;
                    let nomeObjson = Object.keys(data)[0];
                    let stringRetornada = data[nomeObjson].bid;
                    let calculoConversao;
                    let resultFinal;

                    if (conversao == nomeObjson) {

                        calculoConversao = (stringRetornada * valor);

                        resultFinal = moeda2 + ': ' + calculoConversao.toFixed(2);

                        resultado.textContent = resultFinal;

                    } else {
                        resultado.textContent = 'Api não permite essa Conversão';
                    }
                })
        }

    }
)