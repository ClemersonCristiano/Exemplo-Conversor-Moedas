
let inputValor = document.getElementById('valor');

let input1 = document.getElementById('moeda1');

let input2 = document.getElementById('moeda2');

let botao = document.getElementById('botaoForm');

let resultado = document.getElementById('resultado');

const formulario = document.getElementById('formulario');


document.addEventListener('DOMContentLoaded', function() {

    formulario.addEventListener('submit', function(event) {
      event.preventDefault();
    });

});

botao.addEventListener('click', 
    function() {

        let valor = inputValor.value;
        let moeda1 = input1.value;
        let moeda2 = input2.value;        
        
        const url = ` https://economia.awesomeapi.com.br/last/${moeda1}-${moeda2}`;

        if(valor == 0){
            alert('O Campo Valor não deve ficar em branco!');
        }

        if(valor.value != 0 && moeda1 == moeda2){
            alert('Não se pode converter valores pela mesma moeda. Escolha moedas diferentes!');
        }
        
        fetch(url)
        .then(response => {
            if (!response.ok) {
                console.log('Erro na resposta da api');
            }
            return response.json();
        })
        .then(data => {
            
            let conversao = moeda1+moeda2;
            let nomeObjson = Object.keys(data)[0];

            let stringRetornada = data[nomeObjson].bid;
            
            let stringTonumber = parseFloat(stringRetornada);

            let valorFormatado = stringTonumber.toFixed(2);

            let saida;

            if (conversao == nomeObjson) {

                saida = (valorFormatado * valor);

                let resultFinal = moeda2 + ': ' + saida.toFixed(2);

                resultado.textContent = resultFinal;

            } else{
                resultado.textContent = 'Erro na Conversão';
            }

        })
    }
)