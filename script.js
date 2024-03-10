/**
 * Declaração de variáveis
 */
var carrinho = [];

/**
 * Usando API fakestoreapi para preencher itens do carrinho
 */
function start() {
  fetch('https://fakestoreapi.com/products?limit=4')
    .then(res => res.json())
    .then(data => {
      preencherCarrinho(data)
    })
    .catch((error) => {
      alert("Ocorreu um erro na fakestoreapi: ", error)
    })
}

function preencherCarrinho(produtos) {
  produtos.forEach(data => {
    adicionarAoCarrinho(data);
  });

  atualizarCarrinho();
}

function adicionarAoCarrinho({ title, image, description, price }) {
  carrinho.push({
    "nome": title,
    "imgLink": image,
    "descricao": description,
    "preco": Number.parseFloat(price),
    "quantidade": 1,
    "total": Number.parseFloat(price),
  });
}

function atualizarCarrinho() {
  let carrinhoHTML = document.getElementById("itensCarrinho");

  carrinhoHTML.innerHTML = carrinho.map((produto, index) => `
    <tr id="produto${index}">
      <td>
        <img src="${produto.imgLink}" alt="${produto.nome}" />
      </td>
      <td>R$ ${produto.preco.toFixed(2)}</td>
      <td>
        <span onclick="addItem(${index})">+</span>
        <span class="quantidade">${produto.quantidade}</span>
        <span onclick="removeItem(${index})">-</span>
        <br>
        <span class="errorMsg msg--error"></span>
      </td>
      <td class="total">R$ ${produto.preco.toFixed(2)}</td>
    </tr>
  `).join('');
}

/**
 * @function processaErros : processa erros
 * @param {Number} qtd: quantidade de itens a serem adicionados no carrinho
 * @param {Error, null} callback: callback para função
 * @returns se tiver erro vai retornar um erro, se não vai retorna null
 */
function processaErros(qtd, callback) {
  if (typeof (qtd) !== 'number' || qtd <= 0) {
    return callback(new Error("Quantidade inválida. Insira um valor positivo."));
  }

  return callback(null);
}

/**
 * @function addItem : adiciona itens no carrinho
 * @param {number} index: quantidade de itens a serem adicionados no carrinho
 */
function addItem(index) {
  // Atualizando a quantidade no JSON:
  let produto = carrinho[index];
  produto.quantidade += 1;

  // Atualizando a quantidade no HTML:
  let qtd = document.getElementsByClassName("quantidade")[index];
  qtd.innerHTML = produto.quantidade;

  // Atualizando subvalor:
  let spanValorTotalProduto = document.getElementsByClassName("total")[index];
  let novoTotal = produto.preco * produto.quantidade;
  spanValorTotalProduto.innerHTML = `R$ ${novoTotal.toFixed(2)}`;

  // Recalculando o valor total:
  atualizaValorFinal();
}

/**
 * @function removeItem : remove itens no carrinho
 * @param {number} item : quantidade de itens a serem removidos no carrinho
 * @returns 
 */
function removeItem(index) {
  let erro = processaErros(carrinho[index].quantidade, (error, result) => {
    let errorMsg = document.getElementsByClassName("errorMsg")[index];

    if (error) {
      errorMsg.innerHTML = error.message;
      setTimeout(() => {
        errorMsg.innerHTML = "";
      }, 2000);

      return true;
    }
  });

  if (erro) return;

  let qtdProduto = document.getElementsByClassName("quantidade")[index];
  let produto = carrinho[index];

  produto.quantidade -= 1;
  qtdProduto.innerHTML = produto.quantidade;

  // Atualizando subvalor:
  let spanValorTotalProduto = document.getElementsByClassName("total")[index];
  let novoTotal = produto.preco * produto.quantidade;
  spanValorTotalProduto.innerHTML = `R$ ${novoTotal.toFixed(2)}`;

  // Recalculando o valor total:
  atualizaValorFinal();
}

/**
 * @function atualizaValorFinal : exibe o valor total da compra
 */
function atualizaValorFinal() {
  let valor = 0;
  let valoresTotaisPorProduto = document.getElementsByClassName("total");

  for (var i = 0;i < valoresTotaisPorProduto.length;i++) {
    let valorTexto = valoresTotaisPorProduto[i].textContent.replace(/[^\d.,]/g, '');

    valor += Number.parseFloat(valorTexto);
  }

  // Atribuindo valor calculado para exibição em tela:
  let valorTotalCompra = document.getElementById('valorTotalCompra');
  valorTotalCompra.innerHTML = `R$ ${valor.toFixed(2)}`;
}

// Iniciando:
start();

/**
 * TODO: Trabalhando com Promise para simular pagamento
 */
function pagar() {
  return new Promise((resolve, reject) => {
    const sucesso = true;
    sucesso ? resolve("Pagamento efetuado!") : reject("Erro no pagamento! Tente mais tarde.");
  })
}
