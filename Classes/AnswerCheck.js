export default

class AnswerCheck {
    constructor(userInput, correctAnswers){

        this.userInput = userInput;
        this.correctAnswers = correctAnswers;
        this.output = [];
        
        console.log('CorrectAnswers');
        console.log(this.correctAnswers);

        console.log('userInput')
        console.log(this.userInput);

        

        this.check();
    }   
    
    
    check(){

        for(let i= 0 ; i< 3; i++){

            if(this.userInput[i] === this.correctAnswers[i]){
                this.output.push(1);
            }
            else{
                this.output.push(0);
            }


        }


        console.log(this.output);


    }









}

