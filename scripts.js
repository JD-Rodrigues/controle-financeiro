const inputPrice = document.querySelector('#form__price')
const inputProduct = document.querySelector('#form__product-name')
const form = document.querySelector('form')
const select = document.querySelector('select')
const cleanData = document.querySelector('#clean__data')

inputPrice.addEventListener('input', fillPrice)

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    emptyFieldsValidation() === true && submitTransaction()
    console.log(brlMask(calc()))
})

cleanData.addEventListener('click', ()=>localStorage.clear())

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

function loadData() {
    if (localStorage.getItem('transactions')!==null) {
        const data = JSON.parse(localStorage.getItem('transactions'))
        return data
    } else {
        return []
    }
    
}

function saveData(data) {
    const dataString = JSON.stringify(data)
    localStorage.setItem('transactions', dataString)
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
    return String(total)
}

