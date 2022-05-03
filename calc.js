class Calc {
    constructor(panel,board,clean){
        this.panel = panel
        this.board = board
        this.clean = clean
        this.newNum = ""
        this.oldNum = ""
        this.excNum = ""
        this.answer = ""
        this.operation = ""
        this.clearClick = 0
    }
    ac(){
        this.clearClick++
        this.newNum = ""
        if(this.clearClick == 2){
            this.clearClick = 0
            this.oldNum = ""
            this.excNum = ""
            this.operation = ""
        }
    }
    del(){
        this.newNum = this.newNum.toString().slice(0,-1)
    }
    write(num){
        if(this.answer == this.newNum){
            this.answer = ""
            this.newNum = ""
        }
        if(num == "0" && this.newNum == "") {
            this.newNum = "0"
            return
        }
        if(num != "." && this.newNum == "0") return
        if(this.newNum.length >= 10) return
        if(num == ".") {
            for(let ob of this.newNum){
                if(ob == ".") return
            }
            if(this.newNum == ""){
                this.newNum = "0"
            }
        }
        this.newNum += num
    }
    oper(oper){
        if(this.newNum[this.newNum.length - 1] == "." ) {
            this.newNum = Number(this.newNum).toString()
        }
        if(this.newNum == "" && this.operation != "" && this.oldNum != ""){
            this.excNum = this.excNum.toString().slice(0,-1) + oper
            this.operation = oper
            return    
        }
        else if(this.newNum == "" && this.operation == ""){
            this.newNum = "0"
        }
        if(this.oldNum != "" && this.newNum != ""){
            this.calculate()
        }
        
        this.excNum = this.newNum.toString() + oper
        this.operation = oper
        this.oldNum = this.newNum
        this.newNum = ""
    }
    calculate(){
        if(this.operation == "") return
        if(this.newNum == ""){
            // this.newNum = "0"
            return
        }
        this.newNum = this.converter(this.newNum)
        this.excNum += this.newNum.toString() + "="
        switch(this.operation){
            case "+":
                this.newNum = Number(this.oldNum) + Number(this.newNum) 
                break
            case "-":
                this.newNum = Number(this.oldNum) - Number(this.newNum)
                break
            case "×":
                this.newNum = Number(this.oldNum) * Number(this.newNum)
                break
            case "÷":
                if(this.newNum == "0" ){
                    this.excNum = "Don't devide by zero" 
                    this.answer = "" 
                    this.display()
                    this.oldNum = ""
                    this.operation = ""
                    return
                }   
                else{
                    this.newNum = Number(this.oldNum) / Number(this.newNum) 
                }     
                break
        }
        if(this.newNum.toString().length > 10){
            
            this.newNum = Number(this.newNum).toString()
            this.newNum = Number(this.newNum).toPrecision(8).toString()
            
        }
        else{
            this.newNum = this.newNum.toString()
        }
        this.answer = this.newNum.toString()
        this.display()
        this.oldNum = this.newNum.toString()
        this.operation = ""
        //console.log(this.newNum)
    }




    prcnt(){
        if(this.operation != "×") return
        if(this.newNum == ""){
            //this.newNum = "0"
            return
        }
        this.newNum = this.converter(this.newNum)
        this.excNum += (Number(this.newNum.toString())/100).toString() + "="
        
        this.newNum = Number(this.oldNum) * Number(this.newNum) /100

        if(this.newNum.toString().length > 10){
            this.newNum = Number(this.newNum).toPrecision(9).toString()
        }
        else{
            this.newNum = this.newNum.toString()
        }
        this.newNum = this.newNum.toString()
        this.answer = this.newNum
        this.display()
        this.oldNum = this.newNum.toString()
        this.operation = ""
    }




    plusMinus(){
        if(this.newNum == "") return
        this.newNum = (-1) * this.newNum;
        this.newNum = this.newNum.toString()
    }
    converter(num){
        let intPart = parseInt(num.split(".")[0]) 
        let decPart = num.split(".")[1]
        if(decPart == undefined){
            return String(intPart)
        }
        else{
            decPart = `${intPart}.${decPart}`
            decPart = parseFloat(decPart).toString()
            return decPart
        }
    }

    display(){
        if(this.newNum == ""){
            this.panel.innerHTML = "0";
           
        } else{
            this.panel.innerHTML = this.newNum;
            
        }
        this.board.innerHTML = this.excNum;

        if( this.newNum == "" && this.operation == ""){
            this.clean.innerHTML = "AC"
        }
        else{
            this.clean.innerHTML = "C"
        }

        if(this.newNum.length > 6){
            this.panel.style.fontSize = "32px"
        }
        else{
            this.panel.style.fontSize = "45px"
        }
    }
}