import { noTransactions, table } from "./components.js";
import {inputPrice, inputProduct, select, menu} from "./index.js"


// ======================================================= //
//                      VALIDATIONS                        // 
// ======================================================= //

// Gets a number from the price input and reinserts it in the same field, formatted in pt-BR.

function fillInputPrice() {
    const price = validatePrice(inputPrice.value);
    const maskedPrice = maskNumberToPtBr(price);
    inputPrice.value = maskedPrice;
}


// Returns true if all fields are filled. Otherwise, it returns false.

function validateRequiredFields() {
    if(inputPrice.value.length === 0 || inputProduct.value.length === 0) {
        alert("Preencha todos os campos!");
        return false;
    } else {
        return true;
    }
}


// Gets a string and returns it filtered by characters from "0" to "9"

function validatePrice(price) {
    const validPrice = price.replace(/[^"1""2""3""4""5""6""7""8""9""0"]/g, "");
    return validPrice;
}


// Gets a string of digits and returns it formatted in pt-BR: the thousands separated with "." and decimals with ",".

function maskNumberToPtBr(value) {
    if(value.length>2) {
        let formattedValue = [value.slice(0, value.length-2), ",", value.slice(value.length-2)].join("");

        if(formattedValue.length > 4 && formattedValue[0] === "0") {
            formattedValue = formattedValue.slice(1)
        }

        let count = (formattedValue.length-3)-3;

        for(let i = formattedValue.length-3; i>0;i--) {
            if(i === count) {
                formattedValue = [formattedValue.slice(0,count),".",formattedValue.slice(count)].join("");
                count = count - 3;
            }
        }

        return formattedValue;
    }else if (value.length === 1){
        return ['0', `0${value}`]
    }else {
        return ['0', value];
    }
}


// ======================================================= //
//                 DATA SAVE AND RECOVERY                  // 
// ======================================================= //

// Gets an array of objects, containing the transactions, and save it in localStorage.

function saveData(data) {
    const dataString = JSON.stringify(data);
    localStorage.setItem("transactions", dataString);
}


// Returns an array of objects, containing the transactions, recovered from localStorage. If localStorage is empty, it returns an empty array.

function loadData() {
    if (localStorage.getItem("transactions") !== null) {
        const data = JSON.parse(localStorage.getItem("transactions"));
        return data;
    } else {
        return [];
    }
}


// Adds new transaction to the database, from the information entered in the form.

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

// Asks for confirmation to clean all transactions.

function confirmCleanData() {
    const data = loadData()

    if (data.length > 0) {
        confirm('Gostaria de limpar o extrato de transações?') && localStorage.clear();
    } else {
        alert('Não há transações.')
    }
}


// ======================================================= //
//                      CALCULATION                            // 
// ======================================================= //

// Returns the balance.

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


// Gets the balance and returns profit or loss.

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
//         FILLING OUT THE TRANSACTIONS STATEMENT          // 
// ======================================================= //

// Returns the transaction table. If there is no transactions, it returns the "noTransactions" component.

function fillTransactionsArea() {
    const database = loadData();
    database.length > 0 ? table() : noTransactions();
}


// ======================================================= //
//                         OTHERS                          // 
// ======================================================= //

// Opens and closes the mobile menu.

function showHideMobileMenu() {
    if (menu.classList.contains("js-show__hide__menu")) {
        menu.classList.toggle("js-show__hide__menu--smooth");
        setTimeout(() => {
            menu.classList.toggle("js-show__hide__menu");
        },200);
    } else {
        menu.classList.toggle("js-show__hide__menu");
        setTimeout(() => {
            menu.classList.toggle("js-show__hide__menu--smooth");
        },0.5);
    }
}




export {fillInputPrice, fillTransactionsArea, validatePrice, validateRequiredFields, maskNumberToPtBr, saveData, loadData, submitTransaction, calculate, indicateProfitOrLoss, confirmCleanData, showHideMobileMenu}