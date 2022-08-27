import { fillInputPrice, fillTransactionsArea, submitTransaction, validateRequiredFields } from "./functions.js";

const inputPrice = document.querySelector("#form__price");
const inputProduct = document.querySelector("#form__product-name");
const form = document.querySelector(".c-form");
const select = document.querySelector("select");
const cleanData = document.querySelector("#clean__data");
const transactionsSummary = document.querySelector(".c-transactions");
const menuBurguerBtn = document.querySelector(".c-menu-burguer__btn");
const menu = document.querySelector(".c-menu");
const closeMenu = document.querySelector(".c-close__menu__mobile__btn");

inputPrice.addEventListener("input", fillInputPrice);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateRequiredFields() && submitTransaction();
    fillTransactionsArea();
    form.reset();
});

cleanData.addEventListener("click", () => {
    localStorage.clear();
    fillTransactionsArea();
});

menuBurguerBtn.addEventListener("click", () => {
    menu.classList.toggle('js-show__hide__menu');
    setTimeout(() => {
        menu.classList.toggle('js-show__hide__menu--smooth');
    },0.5);
});

closeMenu.addEventListener("click", () => {
    menu.classList.toggle('js-show__hide__menu--smooth');
    setTimeout(() => {
        menu.classList.toggle('js-show__hide__menu');
    },200);
});

window.addEventListener("load",fillTransactionsArea);

export {inputPrice, inputProduct, form, select, cleanData, transactionsSummary, menu, menuBurguerBtn, closeMenu}