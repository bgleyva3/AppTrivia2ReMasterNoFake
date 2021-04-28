export default
class RoundSystemMode2{


    //#region INSTRUCTIONS 

        /*
            Receiving = ['difficulty', 'category', 'type'];

            - When we define the categories that will be avalible to filter, have to change the url injection.

            - When Define the way to input the Type, have to change the Comparators



        */
    //#endregion --------------






    constructor(arrayOfParameters){
        
        console.log('arrayOfParameters');
        console.log(arrayOfParameters);

        this.difficulty = arrayOfParameters[0];
        this.category = arrayOfParameters[1];
        this.type = arrayOfParameters[2];

        this.output = {};
    // https://opentdb.com/api.php?amount=3&category=12&difficulty=medium&type=multiple  

        this.customURL = 'https://opentdb.com/api.php?amount=3';



        this.setCategory();
    }


    setCategory(){

        switch(this.category){

            case 'Entertainment: Music':
                this.customURL+= '&'+ 'category=12';
                break

            case 'Entertainment: Film':
                this.customURL+= '&'+ 'category=11';
                break

            case 'Entertainment: Television':
                this.customURL+= '&'+ 'category=14';
                break
        
            case 'Entertainment: Video Games':
                this.customURL+= '&'+ 'category=10';
                break

            case 'Entertainment: Japanese Anime & Manga':
                this.customURL+= '&'+ 'category=31';
                break
    

            case 'Entertainment: Cartoon & Animations':
                this.customURL+= '&'+ 'category=31';
                break
    
            case 'Science & Nature':
                this.customURL+= '&'+ 'category=17';
                break
    
            case 'Science: Computers':
                this.customURL+= '&'+ 'category=18';
                break
    


            case 'History':
                this.customURL+= '&'+ 'category=23';
                break
    


            // case 'Entertainment: Music':
            //     this.customURL+= '&'+ 'category=12';
            //     break


            // case 'Entertainment: Music':
            //     this.customURL+= '&'+ 'category=12';
            //     break
        



        }







        console.log(this.customURL);

        this.setDifficulty();
    }


    setDifficulty(){
        const lvl = JSON.parse(this.difficulty);
        console.log('lvl');
        console.log(lvl);
        switch(lvl){

            case 1:
                this.customURL+= '&'+ 'difficulty=easy';
                break;
            case 2:
                this.customURL+= '&'+ 'difficulty=medium';
                break;
            case 3:
                this.customURL+= '&'+ 'difficulty=hard';
                break;
        }

        this.setType();
    }

    setType(){
        console.log('settype')
        console.log(this.type);
        if(this.type == 1){
            this.customURL += '&'+'&type=multiple'
        }
        if(this.type == 2){
            this.customURL += '&'+'&type=boolean'
        }

        this.getFilteredQuesitons();
    }



    getFilteredQuesitons(){


        console.log(this.customURL);

        fetch(this.customURL, {
            method : 'GET',
        }).then(result => result.json())
        .then(data => {
            this.setQuestions(data.results);
            this.setAnswers(data.results);
            this.setCategoryToShow(data.results);
            this.setWrongAnswers(data.results);
        })

    }   

    setQuestions(data){


        const questionsToExport = [];

        for (let i = 0; i < 3; i++) {
            questionsToExport.push((data[i].question));
        }

        this.output.Questions = questionsToExport;


    }


    setAnswers(data) {

        const questionsToExport = [];

        data.forEach((element) => questionsToExport.push(element.correct_answer))


        this.output.CorrectAnswers = questionsToExport;

    }


    setCategoryToShow(data){
        const questionsToExport = [];

        data.forEach((element) => questionsToExport.push(element.category))


        this.output.Categories = questionsToExport;

    }

    setWrongAnswers(data){
        const questionsToExport = [];

        data.forEach((element) => questionsToExport.push(element.incorrect_answers))


        this.output.IncorrectAnswers = questionsToExport;

    }


 



}
