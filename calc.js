class Calc {
    constructor(p, b , c) {
        this.panel = p
        this.back = b;
        this.board = ""
        this.oldNum = ""
        this.newNum = "0"
        this.operation = ""
        this.cleanLetter = c
        this.clickOnOper = 0
    }
    clear() {
        //if (this.newNum == "0") {
            //this.clickOnClear = 0;
            this.board = "0"
            this.oldNum = "0"
            this.operation = ""
            this.styleOfOper = ""
        //}

        // if (this.operation != "") {
        //     this.board = this.board.slice(0, this.board.indexOf(this.styleOfOper) + 1);
        // }
        //else {
           // this.board = ""
           // this.oldNum = ""
            // this.board = "0"
        //}
        this.newNum = "0"
        this.answer = ""
        //console.log(this.cleanLetter)
        //console.log(this.clickOnClear)
    }
    delete(){
        
        if(this.newNum == "0") this.clear();
        let arr = []
        let old = []
        arr = this.newNum.split("") 
        old = this.board.split("")
        arr.pop()
        old.pop()
        if(arr[0] == undefined) arr.push("0")
        if(old[0] == undefined) old.push("0")
        this.newNum = arr.join('')
        this.board = old.join('') 
          
    }
    write(num) {
        if (this.board == "Error") {
            this.board = ""
        }
        if (this.newNum.length > 10) return

        if (this.answer == this.newNum) {
            this.newNum = "0"
            this.board = ""
        }
        if (num == ".") {
            if(this.board[this.board.length - 1] == this.styleOfOper){
                this.board += "0";
            }
            if (this.newNum.length == 0) return;
            else if (this.newNum.length == 1 && this.newNum[0] == "0") {
                this.board += "0";
            }
            else {
                for (let i of this.newNum) {
                    if (i == ".") return;
                }
            }
            
        }
        else {
            if (this.newNum[0] == "0" && this.newNum.length == 1) {
                //if(num == "0" ) return
                if (num == "0" && this.board[this.board.length - 1] == "0") {
                    this.board += ""
                    this.answer = ""
                    this.newNum = "0"
                    return
                }
                if (num == "0" && this.newNum[0] == "0" && this.board.length >= 2) {
                    this.board += num
                    this.answer = ""
                    this.newNum = "0"
                    return
                }
                else if (num == "0") return
                this.newNum = ""
            }

        }
        if (this.board[this.board.length - 1] == "0") {
            if (num != "0") {
                this.board = this.board.slice(0, this.board.length - 1)
            }
        }
        this.answer = ""
        this.newNum += num
        this.board += num

    }
    plmns() {
        let old = this.newNum;
        if (this.newNum == "" || this.newNum == "0") return;
        this.newNum = String((-1) * parseFloat(this.newNum))
        this.board = this.board.replace(old, this.newNum)
    }
    oper(operation) {
        if(this.board[this.board.length - 1] == ".") return
        this.styleOfOper = ""
        switch (operation) {
            case "+":
                this.styleOfOper = "+"
                break;
            case "-":
                this.styleOfOper = "-"
                break;
            case "*":
                this.styleOfOper = "×"
                break;
            case "/":
                this.styleOfOper = "÷"

                break;
        }
        if (this.newNum == "0") {
            if (this.board[this.board.length - 1] == "0") return
            this.board = this.board.slice(0, this.board.length - 1);
            if (this.board.length == 0) this.board += "0"

            this.board += this.styleOfOper;
            //this.board = this.board.replace(this.operation,operation)
            this.operation = operation
            return
        }
        if (this.oldNum != "0" || this.oldNum != "0") {
            this.calculate(false);
        }
        

        this.operation = operation
        // if(this.newNum == "0" ) this.board = this.operation
        // else this.board += this.operation
        if (this.newNum == "0") this.board = this.styleOfOper
        else this.board += this.styleOfOper
        this.oldNum = this.converter(this.newNum)
        this.newNum = "0"
    }
    calculate(bl) {
        if(this.board[this.board.length - 1] == ".") return
        this.newNum = this.converter(this.newNum)
        if (bl == false) {
            switch (this.operation) {
                case "+":

                    this.newNum = this.oldNum + this.newNum;
                    break;
                case "-":
                    this.newNum = this.oldNum - this.newNum;
                    break;
                case "*":
                    this.newNum = this.oldNum * this.newNum;
                    break;
                case "/":
                    if (this.newNum == "0") {
                        this.board = "Error"
                        this.newNum = "0"
                        this.oldNum = ""
                        this.operation = ""
                        this.diplay()
                        this.board = ""
                        return
                    }
                    else {
                        this.newNum = this.oldNum / this.newNum;
                    }
                    break;
            }  
        }
        else{
            let k = 0
            for (let i of this.board) {
                if (i == "×") k++
            }
            if (k == 1) {
                this.newNum = this.oldNum * this.newNum / 100;
            }
        }
        this.newNum = String(this.newNum)
        if (this.newNum.length > 8) {
            this.newNum = parseFloat(this.newNum).toPrecision(8).toString()
            // this.newNum = parseFloat(this.newNum).toString()
        } 
        this.operation = ""
        this.diplay()
        this.oldNum = String(this.newNum)
        this.board = this.newNum
        this.answer = this.newNum
    }
    converter(num) {

        let integerT = parseInt(num);

        for (let c of num) {
            if (c == ".") {
                let splited = num.split(".");
                console.log(splited);
                let pointer = parseFloat(splited[1]);
                for (let i = 0; i < splited[1].length; i++) {
                    pointer = pointer / 10;
                }
                integerT = parseFloat(splited[0]) + pointer;
                break;
            }
        }
        //console.log(integerT)
        return integerT;
    }
    diplay() {

        
        this.panel.innerText = this.newNum
        this.back.innerHTML = this.board
        if(this.back.innerHTML == "0" || this.back.innerHTML == ""){
            this.back.style.opacity = "0"
            this.cleanLetter.innerHTML = "AC"
        }
        else{
            this.back.style.opacity = "1"
            this.cleanLetter.innerHTML = "C"
        }
        if(this.newNum.length > 6){
            this.panel.style.fontSize = "32px"
        }
        else{
            this.panel.style.fontSize = "45px"
        }
        
    }
}