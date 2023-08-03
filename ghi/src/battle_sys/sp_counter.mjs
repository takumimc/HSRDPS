class SpCounter{
    constructor(){
        this.sp = 3
    }
    increase(){
        if(this.sp < 5){
        this.sp += 1
        }
    }
    decrease(){
        if(this.sp > 0){
            this.sp -= 1
        }
    }
}


export default SpCounter
