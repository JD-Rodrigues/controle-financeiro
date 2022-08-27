import { noTransactions, table } from "./components.js";

function fillInputPrice() {
    const inputPrice = document.querySelector("#form__price");
    const price = validatePrice(inputPrice.value);
    const maskedPrice = maskNumberToPtBr(price);
    inputPrice.value = maskedPrice;
}

function validateRequiredFields() {
    const inputPrice = document.querySelector("#form__price");
    const inputProduct = document.querySelector("#form__product-name");

    if(inputPrice.value.length === 0 || inputProduct.value.length === 0) {
        alert("Preencha todos os campos!");
        return false;
    } else {
        return true;
    }
}

function validatePrice(price) {
    const validPrice = price.replace(/[^"1""2""3""4""5""6""7""8""9""0"]/g, "");
    return validPrice;
}

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

function saveData(data) {
    const dataString = JSON.stringify(data);
    localStorage.setItem("transactions", dataString);
}

function loadData() {
    if (localStorage.getItem("transactions") !== null) {
        const data = JSON.parse(localStorage.getItem("transactions"));
        return data;
    } else {
        return [];
    }
}

function submitTransaction() {
    const inputPrice = document.querySelector("#form__price");
    const inputProduct = document.querySelector("#form__product-name");
    const select = document.querySelector("select");

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

function indicateProfitOrLoss(value) {
    if(value > 0) {
        return "[LUCRO]";
    } else if (value < 0) {
        return "[PREJUÍZO]";
    } else {
        return "";
    }
}

function fillTransactionsArea() {
    const database = loadData();
    database.length > 0 ? table() : noTransactions();
}

export {fillInputPrice, fillTransactionsArea, validatePrice, validateRequiredFields, maskNumberToPtBr, saveData, loadData, submitTransaction, calculate, indicateProfitOrLoss}