import { calculate, indicateProfitOrLoss, loadData, maskNumberToPtBr, validatePrice } from "./functions.js";
import {transactionsSummary} from "./global_and_listeners.js";


// Renderiza a estrutura da tabela

function table() {
    transactionsSummary.innerHTML = "<div class = 'c-summary__row  c-summary__row--header  c-summary__row--header-footer__text'> <div>Mercadoria</div> <div>Valor</div> </div>";
    item();
    tableFooterTotal();
}


//Renderiza um item transacionado

function item() {
    const data = loadData();
    data.map(transaction => {
        transactionsSummary.innerHTML += `<div class = "c-summary__row">      <div class = "c-summary__product">
        <div class = "c-in__out__sign">${transaction.type === "Compra" ? "-" : "+"}</div>
        <div class = "summary__product__name">${transaction.product}</div>
        </div> <div class = "summary__product__price">R$ ${transaction.price}</div>
        </div>`;
    });
}


//Renderiza a última linha da tabela, contendo o saldo das transações.

function tableFooterTotal() {
    transactionsSummary.innerHTML += `<div class = "c-summary__row  c-summary__footer  c-summary__row--header-footer__text">
    <div>Total</div>
    <div>${calculate() < 0 ? "-" : ""} R$ ${maskNumberToPtBr(validatePrice(String(calculate())))}</div>
</div>
<div class = "c-summary__profit">${indicateProfitOrLoss(calculate())}</div>`;
}


//Renderiza a informação de que não há transações

function noTransactions() {
    transactionsSummary.innerHTML = "<div class = 'c-no__transactions'>Nenhuma transação cadastrada</div>";
}

export {table, tableFooterTotal, item, noTransactions}