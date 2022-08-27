import { noTransactions, table } from "./components.js";
import {inputPrice, inputProduct, select} from "./global_and_listeners.js"


// ======================================================= //
//                      VALIDAÇÕES                         // 
// ======================================================= //

// Captura o número inserido no campo de preço e o devolve ao mesmo campo, fomrmatado em pt-BR.

function fillInputPrice() {
    const price = validatePrice(inputPrice.value);
    const maskedPrice = maskNumberToPtBr(price);
    inputPrice.value = maskedPrice;
}


//Retorna true se todos os campos do formulário estão preenchidos. Do contrário, retorna false.

function validateRequiredFields() {
    if(inputPrice.value.length === 0 || inputProduct.value.length === 0) {
        alert("Preencha todos os campos!");
        return false;
    } else {
        return true;
    }
}


// Recebe uma string e a retorna filtrada por caracteres de "1" a "9".

function validatePrice(price) {
    const validPrice = price.replace(/[^"1""2""3""4""5""6""7""8""9""0"]/g, "");
    return validPrice;
}


//Recebe uma string de algarismos e a retorna formatada em pt-BR: os milhares separados com "." e os decimais com ",".

function maskNumberToPtBr(value) {
    if(value.length>2) {
        let formattedValue = [value.slice(0, value.length-2), ",", value.slice(value.length-2)].join("");

        let count = (formattedValue.length-3)-3;

        for(let i = formattedValue.length-3; i>0;i--) {
            if(i === count) {
                formattedValue = [formattedValue.slice(0,count),".",formattedValue.slice(count)].join("");
                count = count - 3;
            }
        }

        return formattedValue;
    }else {
        return value;
    }
}


// ======================================================= //
//            SALVAMENTO E RECUPERAÇÃO DE DADOS            // 
// ======================================================= //

//Recebe um array de objetos contendo as transações e o salva no localStorage.

function saveData(data) {
    const dataString = JSON.stringify(data);
    localStorage.setItem("transactions", dataString);
}


//Retorna o array de objetos contendo as transações, recuperado do localStorage. Caso o localStorage esteja vazio, retorna um array vazio.

function loadData() {
    if (localStorage.getItem("transactions") !== null) {
        const data = JSON.parse(localStorage.getItem("transactions"));
        return data;
    } else {
        return [];
    }
}


// Adiciona uma nova transação à base de dados, a partir das informações inseridas no formulário. 

function submitTransaction() {
    const data = loadData();
    const transaction = {
        type: select.value,
        product: inputProduct.value,
        price: inputPrice.value
    };
    data.push(transaction);
    saveData(data);
    calculate();
}


// ======================================================= //
//                      CÁLCULO                            // 
// ======================================================= //

// Retorna o saldo de todas as transações.

function calculate() {
    let total = 0;
    const data = loadData();
    data.map((transaction) => {
        if (transaction.type === "Compra") {
            total -= Number(validatePrice(transaction.price));
        } else {
            total += Number(validatePrice(transaction.price));
        }
    })
    return total;
}


// Recebe o saldo das transações e retorna a informação de lucro ou prejuízo.

function indicateProfitOrLoss(value) {
    if(value > 0) {
        return "[LUCRO]";
    } else if (value < 0) {
        return "[PREJUÍZO]";
    } else {
        return "";
    }
}


// ======================================================= //
//                PREENCHIMENTO DO RELATÓRIO               // 
// ======================================================= //

// Retorna a tabela de transações. Caso não haja transações, retorna o componente "não há transações".

function fillTransactionsArea() {
    const database = loadData();
    database.length > 0 ? table() : noTransactions();
}





export {fillInputPrice, fillTransactionsArea, validatePrice, validateRequiredFields, maskNumberToPtBr, saveData, loadData, submitTransaction, calculate, indicateProfitOrLoss}