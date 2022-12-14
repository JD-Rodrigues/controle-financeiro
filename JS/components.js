import { calculate, indicateProfitOrLoss, loadData, maskNumberToPtBr, validatePrice } from "./functions.js";
import {transactionsSummary} from "./index.js";


// It renders the table structure, containing the first row, the header.

function table() {
    transactionsSummary.innerHTML = 
    `<div class = 'c-summary__row  c-summary__row--header  c-summary__row--header-footer__text'>
        <div>Mercadoria</div> 
        <div>Valor</div>
    </div>`;
    item();
    tableFooterTotal();
}


// Renders a transitioned item row.

function item() {
    const data = loadData();
    data.map(transaction => {
        transactionsSummary.innerHTML += 
        `<div class = "c-summary__row">
            <div class = "c-summary__product">
                <div class = "c-in__out__sign">
                    ${transaction.type === "Compra" ? "-" : "+"}
                </div>
                <div class = "summary__product__name">
                    ${transaction.product}
                </div>
            </div> 
            <div class = "summary__product__price">
                R$ ${transaction.price}
            </div>
        </div>`;
    });
}


// Renders the balance, the last row of the table.

function tableFooterTotal() {
    transactionsSummary.innerHTML += 
    `<div class = "c-summary__row  c-summary__footer  c-summary__row--header-footer__text">
        <div>Total</div>
        <div>
            ${calculate() < 0 ? "-" : ""} 
            R$ ${maskNumberToPtBr(validatePrice(String(calculate())))}
        </div>
    </div>
    <div class = "c-summary__profit">
        ${indicateProfitOrLoss(calculate())}
    </div>`;
}


// Renders the information "There is no transactions".
function noTransactions() {
    transactionsSummary.innerHTML = 
    `<div class = 'c-no__transactions'>
        Nenhuma transação cadastrada
    </div>`;
}

export {table, tableFooterTotal, item, noTransactions}