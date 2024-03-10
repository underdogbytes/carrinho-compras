/**
 * Declaração de variáveis
 */
var quantidade = document.getElementsByClassName('quantidade');
var total = document.getElementsByClassName('total');
var errorMsg = document.getElementsByClassName('errorMsg');

var valorTotal = [0, 0];
var valorProduto = [50.00, 30.00];
var qtd = [0, 0];

/**
 * @function processaErros : processa erros
 * @param {Number} qtd: quantidade de itens a serem adicionados no carrinho
 * @param {Error, null} callback: callback para função
 * @returns se tiver erro vai retornar um erro, se não vai retorna null
 */
function processaErros(qtd, callback) {
  if (typeof (qtd) !== 'number') {
    return callback(new Error("Somente números são permitidos"))
  }

  if (qtd <= 0) {
    return callback(new Error("Sem itens para remover!"));
  }

  return callback(null)
}

/**
 * @function addItem : adiciona itens no carrinho
 * @param {number} item: quantidade de itens a serem adicionados no carrinho
 */
function addItem(item) {
  qtd[item] += 1;
  valorTotal[item] = Number.parseFloat(valorProduto[item] * qtd[item]);
  quantidade[item].innerHTML = qtd[item];
  total[item].innerHTML = valorTotal[item].toFixed(2);

  // Recalculando o valor total:
  valorCompra();
}


/**
 * @function removeItem : remove itens no carrinho
 * @param {number} item : quantidade de itens a serem removidos no carrinho
 * @returns 
 */
function removeItem(item) {
  let erro = processaErros(qtd[item], (error, result) => {
    if (error) {
      errorMsg[item].innerHTML = error.message;
      setTimeout(() => {
        errorMsg[item].innerHTML = "";
      }, 2000);

      return true;
    }
  });

  if (erro) return;

  qtd[item] -= 1;
  valorTotal[item] = Number.parseFloat(valorProduto[item] * qtd[item]);
  quantidade[item].innerHTML = qtd[item];
  total[item].innerHTML = valorTotal[item].toFixed(2);

  // Recalculando o valor total:
  valorCompra();
}

/**
 * @function valorCompra : retorna a soma do valor de todos os itens no carrinho
 */
function valorCompra() {
  var valorTotalCompra = document.getElementById('valorTotalCompra');
  var valor = 0;

  for (var i = 0;i < valorTotal.length;i++) {
    valor += valorTotal[i];
  }

  valorTotalCompra.innerHTML = valor;
}


/**
 * Trabalhando com Promise para simular pagamento
 */
function pagar() {
  return new Promise((resolve, reject) => {
    const sucesso = true;
    sucesso ? resolve("Pagamento efetuado!") : reject("Erro no pagamento! Tente mais tarde.");
  })
}