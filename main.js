let panel = document.querySelector(".panel");
let back = document.querySelector(".back");
let numbers = document.querySelectorAll('[data-num]')
let opers = document.querySelectorAll('[data-oper]')
// let clean = document.querySelector('[data-clear]')
let equals = document.querySelector('[data-equals]')
let plmns = document.querySelector('[data-plmns]')
let prc = document.querySelector('[data-prc]')
let del = document.querySelector('[data-bcksp]')
let clean = document.querySelector('[data-cl]')

let calculator = new Calc(panel,back,clean);

clean.addEventListener("click",() => {
    calculator.clear()
    calculator.diplay()
})

for(let x of numbers){
    x.addEventListener("click",() => {
        calculator.write(x.value)
        calculator.diplay()
    })
}
for(let o of opers){
    o.addEventListener("click",() => {
        calculator.oper(o.value)
        calculator.diplay()
    })
}
equals.addEventListener("click",() => {
    calculator.calculate(false)
})
plmns.addEventListener("click",() => {
    calculator.plmns()
    calculator.diplay()
})
prc.addEventListener("click",() => {
    calculator.calculate(true)
})
del.addEventListener("click",() => {
    calculator.delete()
    calculator.diplay()
    
})
