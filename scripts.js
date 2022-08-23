const inputPrice = document.querySelector('#form__price')
const inputProduct = document.querySelector('#form__product-name')
const form = document.querySelector('form')
const select = document.querySelector('select')
const cleanData = document.querySelector('#clean__data')
const transactionsSummary = document.querySelector('.c-transactions')
const menuBurguerBtn = document.querySelector('.c-menu-burguer__btn')
const menu = document.querySelector('.c-menu')
const closeMenu = document.querySelector('.c-close__menu__mobile__btn')

inputPrice.addEventListener('input', fillPrice)

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    emptyFieldsValidation() === true && submitTransaction()
    fillTransactionsArea()
    form.reset()
})

cleanData.addEventListener('click', ()=>{
    localStorage.clear()
    fillTransactionsArea()
})

menuBurguerBtn.addEventListener('click', ()=>{
    menu.style.display='flex';
    setTimeout(()=>{
        menu.style.width='350px'
    },0.5)
})

closeMenu.addEventListener('click', ()=>{
    menu.style.width='0'
    setTimeout(()=>{
        menu.style.display='none';
    },200)
})

window.addEventListener('load',fillTransactionsArea)

function fillPrice() {
    const price = priceValidation(inputPrice.value)
    const maskedPrice = brlMask(price)
    inputPrice.value = maskedPrice
}

function emptyFieldsValidation() {
    if(inputPrice.value.length==0 || inputProduct.value.length==0) {
        alert('Preencha todos os campos!')
        return false
    } else {
        return true
    }
}

function priceValidation(price) {
    let validPrice = price.replace(/[^'0''1''2''3''4''5''6''7''8''9']/g, '')
    return validPrice
}

function brlMask(value){
    if(value.length>2) {
        let formattedValue = [value.slice(0, value.length-2), ',', value.slice(value.length-2)].join('')

        let count = (formattedValue.length-3)-3

        for(let i = formattedValue.length-3; i>0;i--){
            if(i==count) {
                formattedValue = [formattedValue.slice(0,count),'.',formattedValue.slice(count)].join('')
                count = count - 3            
            }   
        } 

        return formattedValue
    }else{
        return value
    }
}

function saveData(data) {
    const dataString = JSON.stringify(data)
    localStorage.setItem('transactions', dataString)
}

function loadData() {
    if (localStorage.getItem('transactions')!==null) {
        const data = JSON.parse(localStorage.getItem('transactions'))
        return data
    } else {
        return []
    }
    
}

function submitTransaction() {
    let data = loadData()
    let transaction = {
        type: select.value,
        product: inputProduct.value,
        price: inputPrice.value
    }
    console.log(transaction)
    data.push(transaction)
    saveData(data)
    calc()
}

function calc() {
    let total = 0
    const data = loadData()
    data.map((transaction)=>{
        if (transaction.type === "Compra") {
            total -= Number(priceValidation(transaction.price))
        } else {
            total += Number(priceValidation(transaction.price))
        }
    })
    return total
}

function table() {
    transactionsSummary.innerHTML = '<div class="c-summary__row  c-summary__row--header  c-summary__row--header-footer__text"> <div>Mercadoria</div> <div>Valor</div> </div>'
    item()
    tableFooterTotal()
}

function item() {
    const data = loadData()
    data.map(transaction=>{
        transactionsSummary.innerHTML += `<div class="c-summary__row"> 
        <div class="c-summary__product"> 
        <div class="c-in__out__sign">${transaction.type === "Compra" ? "-" : "+"}</div>
        <div class="summary__product__name">${transaction.product}</div>
        </div> <div class="summary__product__price">R$ ${transaction.price}</div>
        </div>`
    })    
}

function tableFooterTotal() {
    transactionsSummary.innerHTML += `<div class="c-summary__row  c-summary__footer  c-summary__row--header-footer__text">
    <div>Total</div>
    <div>${calc() < 0 ? "-" : ""} R$ ${brlMask(priceValidation(String(calc())))}</div>
</div>   
<div class="c-summary__profit">${profitAnalyser(calc())}</div>`
}

function profitAnalyser(value) {
    if(value > 0) {
        return "[LUCRO]"
    } else if (value < 0) {
        return "[PREJUÍZO]"
    } else {
        return ""
    }
}

function noTransactions() {
    transactionsSummary.innerHTML = '<div class="c-no__transactions">Nenhuma transação cadastrada</div>'
}

function fillTransactionsArea() {
    const database = loadData()
    database.length > 0 ? table() : noTransactions()    
}
