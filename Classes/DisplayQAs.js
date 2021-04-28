const displayQAs = {


run: function (QUESTIONS_OBJECT, CURRENT_MODE, OVERALLVL){
    
    const randomPosition = displayQAs.answersOrder(QUESTIONS_OBJECT);
    const allAnswersArray = displayQAs.concatAllAnswers(QUESTIONS_OBJECT, randomPosition);
    let countId = 0;
    console.log("8888888888")
    console.log(allAnswersArray)
    
    //----------------------------------------------------
    
    //Score display
        const statsBar = document.getElementById("stats-bar");
        statsBar.innerHTML = "";
        console.log("CURRENT MODEEE")
        console.log(CURRENT_MODE)
        if(CURRENT_MODE === 1){
            const score = displayQAs.getScoreFromStorage();
            statsBar.innerHTML = `<h3>Score: ${score}</h3>`
        }

    //Level & Stack/try display

    let leveltoshow = OVERALLVL;

        if(localStorage.getItem('leveStorage') !== null){
            leveltoshow = JSON.parse(localStorage.getItem('leveStorage'));
        }
            
        let levelName="";


        switch(leveltoshow){
            case 1:
                levelName = "EASY";
                break;
            case 2:
                levelName = "MEDIUM";
                break;
            case 3:
                levelName = "HARD";
                break;
        }
        statsBar.innerHTML += `<h3>Level: ${levelName}</h3>`


    //Ques & Ans 1
    const Q1 = document.getElementById("Q1");
    Q1.innerHTML = '';
    Q1.innerHTML = QUESTIONS_OBJECT.Questions[0];
    const Answers1 = document.getElementById("Answers1");
    countId = displayQAs.printAnswers(allAnswersArray[0], "Answers1", countId);
    document.getElementById("hr1").innerHTML = `<br><hr>`
 

    //Ques & Ans 2
    const Q2 = document.getElementById("Q2");
    Q2.innerHTML = '';
    Q2.innerHTML = QUESTIONS_OBJECT.Questions[1];
    const Answers2 = document.getElementById("Answers2");
    countId = displayQAs.printAnswers(allAnswersArray[1], "Answers2", countId);
    document.getElementById("hr2").innerHTML = `<br><hr>`
 

    //Ques & Ans 3
    const Q3 = document.getElementById("Q3");
    Q3.innerHTML = '';
    Q3.innerHTML = QUESTIONS_OBJECT.Questions[2];
    const Answers3 = document.getElementById("Answers3");
    countId = displayQAs.printAnswers(allAnswersArray[2], "Answers3", countId);
    document.getElementById("hr3").innerHTML = `<br><br><br><hr>`

    //Next Button
    const nextButton = document.getElementById("next-button-div");
    nextButton.innerHTML = "<br>";
    nextButton.innerHTML += `<button id="next-button" class="btn btn--start glass glass-btn next-color" onclick="nextHandler()">- NEXT -</button>`
    
    //Stop Game
    nextButton.innerHTML += `<br><button class="btn btn--start glass glass-btn stop-color" onclick="FactoryReset()" id="Reset-to-factory">Reset Game</button>`
    
    return(allAnswersArray);
},



answersOrder: function (QUESTIONS_OBJECT){
    const incorrectAnswersArray = QUESTIONS_OBJECT.IncorrectAnswers;
    ////console.log(incorrectAnswersArray)
    const randomPosition = [];
    for(let i=0; i < 3; i++){
        if(incorrectAnswersArray[i].length === 3){
            const randomNotRounded = Math.random()*(3-0);
            const randomNumber = Math.round(randomNotRounded)
            ////console.log(randomNumber)
            randomPosition.push(randomNumber);

        }else{
            randomPosition.push(null);
        }
    }
    return(randomPosition)
    ////console.log(randomPosition);
},



concatAllAnswers: function (QUESTIONS_OBJECT, randomPosition){
    //console.log(`Objetoo:`);
    //console.log(QUESTIONS_OBJECT);

    const correctAnswersArray = QUESTIONS_OBJECT.CorrectAnswers;
    //console.log(`Correct:`);
    //console.log(correctAnswersArray);

    const incorrectAnswersArray = QUESTIONS_OBJECT.IncorrectAnswers;
    //console.log(`Incorrect: `);
    //console.log(incorrectAnswersArray);

    const allAnswersArray = incorrectAnswersArray;
    
    for(let i=0; i < 3; i++){
        if(randomPosition[i] !== null){

            const randomIndex = randomPosition[i];
            
            const correctAnswer = correctAnswersArray[i];
            allAnswersArray[i].splice(randomIndex, 0, correctAnswer);

        } else {
            allAnswersArray[i] = ["True", "False"];
        }
    }
    return allAnswersArray;
},



printAnswers: function (answers, idName, countId){
    const divAnswers = document.getElementById(idName);
    //resetea las respuestas cada ronda
    divAnswers.innerHTML = '';

    for(let i=0; i < answers.length; i++){
        countId += 1;
        divAnswers.innerHTML += `<button id="A${countId}" onclick="getUserAnswers(this.textContent, this.id)" class="btn btn--start glass glass-btn" >${answers[i]}</button>`
    }
    return(countId);
},


getScoreFromStorage: function (){
    let scoreJSON = localStorage.getItem("score");
    let score = JSON.parse(scoreJSON);
    if(score === null){
        return 0
    }else{
        return score
    }
    
}
}

export default displayQAs;