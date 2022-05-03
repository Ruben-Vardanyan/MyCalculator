//screen
let board = document.querySelector('.back')
let panel = document.querySelector('.panel')
//buttons
let numbers = document.querySelectorAll('[data-num]')
let opers = document.querySelectorAll('[data-oper]')
let equals = document.querySelector('[data-equals]')
let clear = document.querySelector('[data-cl]')
let del = document.querySelector('[data-bcksp]')
let plusMinus = document.querySelector('[data-plmns]')
let prc = document.querySelector('[data-prc]')

let calculator = new Calc(panel , board , clear)

numbers.forEach(number => {
    number.addEventListener("click" , () => {
        //console.log(number.value)
        calculator.write(number.value)
        calculator.display()
    })
})

opers.forEach(oper => {
    oper.addEventListener("click", () => {
        //console.log(oper.value)
        calculator.oper(oper.value)
        calculator.display()
    })
})

equals.addEventListener("click",() => {
    calculator.calculate()
})

clear.addEventListener("click",() => {
    calculator.ac()
    calculator.display()
})

del.addEventListener("click",() => {
    calculator.del()
    calculator.display()
})

plusMinus.addEventListener("click",() => {
    calculator.plusMinus()
    calculator.display()
})
prc.addEventListener("click",() => {
    calculator.prcnt()
    calculator.display()
})