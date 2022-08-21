const input = document.querySelector('#form__price')

input.addEventListener('input', fillPrice)

function fillPrice() {
    const price = priceValidation(input.value)
    const maskedPrice = brlMask(price)
    input.value = maskedPrice
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