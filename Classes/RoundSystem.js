import AnswerCheck from "./AnswerCheck.js";
export default
    class RoundSystem {

    constructor(CurrentLvl) {
        this.dificultystate = CurrentLvl;

        this.output = {};


        switch (this.dificultystate) {
            case 1:
                //console.log('Requested easy');
                this.easyQuestions();
                break
            case 2:
                //console.log('Requested Medium');
                this.mediumQuestions();

                break
            case 3:
                //console.log('Requested HARD');
                this.hardQuestions();
                break

        }

    }

    easyQuestions() {
        fetch('https://opentdb.com/api.php?amount=3&difficulty=easy', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                this.setQuestions(data.results);
                this.setAnswers(data.results);
                this.setCategory(data.results);
                this.setWrongAnswers(data.results);
            })

    }

    mediumQuestions() {
        fetch('https://opentdb.com/api.php?amount=3&difficulty=medium', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                this.setQuestions(data.results);
                this.setAnswers(data.results);
                this.setCategory(data.results);
                this.setWrongAnswers(data.results);
            })
    }

    hardQuestions() {
        fetch('https://opentdb.com/api.php?amount=3&difficulty=hard', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                this.setQuestions(data.results);
                this.setAnswers(data.results);
                this.setCategory(data.results);
                this.setWrongAnswers(data.results);
            })

    }


    setQuestions(data) {

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

    setCategory(data) {
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




