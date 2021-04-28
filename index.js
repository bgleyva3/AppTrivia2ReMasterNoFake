import RoundSystem from "./Classes/RoundSystem.js";
import RoundSystemMode2 from "./Classes/RoundSystemGameMode2.js"
import AnswerCheck from "./Classes/AnswerCheck.js";
import DisplayQAs from "./Classes/DisplayQAs.js"
import CategoryFiter from "./Classes/CategoryFiter.js"
import musicLevel from "./Classes/musicLevel.js"
import levelingSystem from "./Classes/levelingSystem.js"
import scoreSystem from "./Classes/scoreSystem.js"

 
//#region GLOBALS

let NUMB_OF_RIGHT_ANSWERS_DISPLAY = null;

let QUESTIONS_OBJECT = null;

let USERANSWERS = null;

let OVERALLVL = 1;
let STACK = 0;

//#region MUSIC SYSTEM

let CURRENT_LVL = null;

let RESET = null;

let GAMEMODE2PARAMETERS = null;

let CURRENT_MODE = null;

let LOCALINITIALITE = false;

let ALL_ANSWERS_ARRAY = [];

//#endregion music system

//#endregion globals


//#region ASYNC SOLUTION

//---------------------------------------------------------------

// const Questions = new RoundSystem(3);
 

function mode1Handler(){
    const storageLevelJSON = localStorage.getItem("level");
    const storageLevel = JSON.parse(storageLevelJSON);
    if(storageLevel === null ){
        //console.log(`No hay level en storage`)
        ModeChanger(1,1);
    }else{
        //console.log(`level en storage: ${storageLevel}`)
        ModeChanger(1, storageLevel);
    }
}




///
function ModeChanger(mode, parameters) {


    document.getElementById('Selection-Mode-Container').classList.add('d-none');

    ShowCover();
    console.log(mode);

    let Questions = null
    if(mode === 1){


        CURRENT_MODE = 1;
        console.log('level in Modechanger')
        console.log(parameters)
        Questions = new RoundSystem(parameters);

        
        
        RESET = [mode, parameters];

        //PLAY Music
        PlayMusic(parameters);

        // musicLevel.stop();
 
        

        //console.log("mode1")

    }
    if(mode === 2){
        CURRENT_MODE = 2;
        Questions = new RoundSystemMode2(parameters);
        RESET = [mode, parameters];
        OVERALLVL = JSON.parse(parameters[0]);
        console.log('IN MODE 2 lvl is')
        console.log(OVERALLVL);
        GAMEMODE2PARAMETERS = parameters;

        // console.log('parameters');
        // console.log(parameters);

    }





    setTimeout(() => {
        

        QUESTIONS_OBJECT = Questions.output;

        /// --- > Here The QUESTIONS_OBJECT is created





        setTimeout(() => {
            HideCover();

            ///---- > Here is hapens AFTER! the object is created.

            console.log(QUESTIONS_OBJECT);

            document.getElementById("headerDisplay").classList.add("d-none");
            

            document.body.scrollTop = document.documentElement.scrollTop = 0;

            ALL_ANSWERS_ARRAY = DisplayQAs.run(QUESTIONS_OBJECT, CURRENT_MODE, OVERALLVL);

            document.getElementById("explanationDisplay").classList.remove("d-none");

            console.log("7777777777")
            console.log(ALL_ANSWERS_ARRAY)
            
        
        }, 1000)

    }, 2000)
}




//---------------------------------------------------------------

//#endregion async solution






//#region  Get Users Answers Function

let userAnswers = [null,null,null];

// La función recibe el textContent del botón mediante un "onclick"
function getUserAnswers(answer, idName){

    const indexInArray = placeAnswerInOrder(idName);
    userAnswers.splice(indexInArray, 1, answer);

    console.log("Así va:")
    console.log(userAnswers)

    colorAnswers(userAnswers, idName);
    
    
    USERANSWERS = userAnswers;
    return(userAnswers);
}

function colorAnswers(userAnswers, idName){
    let counter = 0;
    let counterCorrectAns = 0;
    console.log("************************************")
    for(let i=0; i<userAnswers.length; i++){
        if(userAnswers[i] !== null){
            counter = 0;
            console.log("--------userAns if--------")
            console.log(userAnswers[i])
            for(let j=0; j<ALL_ANSWERS_ARRAY[i].length; j++){
                
                counter++;
                console.log("primer counter")
                console.log(counter)
                //Se llega a la que es igual
                if(userAnswers[i] === ALL_ANSWERS_ARRAY[i][j]){
                    //se cuenta todas las respuestas hasta llegar a que es igual
                    for(let u=0; u<i; u++){
                        
                        counter += ALL_ANSWERS_ARRAY[u].length;
                        console.log("FOR COUNTER")
                        console.log(counter);
                    }

                    if(ALL_ANSWERS_ARRAY[i][j] === QUESTIONS_OBJECT.CorrectAnswers[i]){
                        console.log("------correct ans -------")
                        console.log(`A${counter}`)
                        document.getElementById(`A${counter}`).classList.add("correctAnswer");
                        
                    }else{
                        console.log("------incorrect ans -------")
                        console.log(`A${counter}`)
                        document.getElementById(`A${counter}`).classList.add("incorrectAnswer");
                        counterCorrectAns=0;
                        //Contador para llegar a la respuesta correcta
                            for(let k=0; k<ALL_ANSWERS_ARRAY.length; k++){
                                console.log("¿¿¿first time counter 2 ¿¿¿")
                                console.log(counterCorrectAns)
                                for(let w=0; w<ALL_ANSWERS_ARRAY[k].length; w++){
                                    counterCorrectAns++;
                                    if((QUESTIONS_OBJECT.CorrectAnswers[i] === ALL_ANSWERS_ARRAY[k][w]) && (k===i) ){
                                        console.log("¿¿¿ DELIVERED COUNTER 2 ¿¿¿")
                                        console.log(counterCorrectAns)
                                        document.getElementById(`A${counterCorrectAns}`).classList.add("correctAnswer");
                                        
                                    }
                                }
                            }
                            
                            
                    }
                }
            }

        }
    }
    //document.getElementById(idName).classList.add("selectedAnswer");
    disableAnswers(idName);
}

/* function colorAnswers(userAnswers, idName){
    for(let i=0; i<userAnswers.length; i++){
        if(userAnswers[i] !== null){
            console.log("///////////")
            console.log(QUESTIONS_OBJECT)
            const x = QUESTIONS_OBJECT.IncorrectAnswers[0].length;
            const y = QUESTIONS_OBJECT.IncorrectAnswers[0].length;
            const z = QUESTIONS_OBJECT.IncorrectAnswers[0].length;
            const totalOptions = x+y+z;
            for(let j=0; j<totalOptions; j++){
                
            }

        }
    }
    document.getElementById(idName).classList.add("selectedAnswer");
    disableAnswers(idName);
} */

function placeAnswerInOrder(idName){
    const allAnswers = QUESTIONS_OBJECT.IncorrectAnswers;
    const a = allAnswers[0].length;
    const b = a + allAnswers[1].length;
    const c = b + allAnswers[2].length;

    const idNumber = idName.substring(1);

    if(idNumber <= a){
        const indexInArray = 0;
        return(indexInArray);
    }
    if(idNumber >= a && idNumber <= b){
        const indexInArray = 1;
        return(indexInArray);
    }
    if(idNumber >= b && idNumber <= c){
        const indexInArray = 2;
        return(indexInArray);
    }

}


function disableAnswers(idName){
    const allAnswers = QUESTIONS_OBJECT.IncorrectAnswers;
    const a = allAnswers[0].length;
    const b = a + allAnswers[1].length;
    const c = b + allAnswers[2].length;
    const idNumber = idName.substring(1);

    if(idNumber <= a){
        for(let i=1; i<=a; i++){
            document.getElementById(`A${i}`).removeAttribute("onclick");
        }
    }
    if(idNumber > a && idNumber <= b){
        for(let i=a+1; i<=b; i++){
            document.getElementById(`A${i}`).removeAttribute("onclick");
        }
    }
    if(idNumber > b && idNumber <= c){
        for(let i=b+1; i<=c; i++){
            document.getElementById(`A${i}`).removeAttribute("onclick");
        }
    }
}

//#endregion  




//#region  Checking System

const toTestObject = { 
    Questions: ["In Magic: The Gathering, what term for blocking was established in the Portal set?", "Who is Manchester United&#039;s leading appearance maker?", "Which of the following is used to measure blood pressure?"], 
    CorrectAnswers: ["Intercepting", "Ryan Giggs", "Sphygmomanometer"], 
    Categories: ["Entertainment: Board Games", "Sports", "Science: Gadgets"], 

    IncorrectAnswers: [["Blocking", "Resisting", "Shielding"], 
                        ["David Beckham", "Wayne Rooney", "Eric Cantona"], 
                        ["Barometer", "Ruler", "Haemoerythrometer"]] 
    
                    }



const testAnswers = [toTestObject.IncorrectAnswers[1][0], toTestObject.CorrectAnswers[1], toTestObject.IncorrectAnswers[1][2]]

// CHECKER = new AnswerCheck(testAnswers, toTestObject.CorrectAnswers);

//#endregion Checking System


//#region  ModeSwitcher

// ModeChanger(mode, lvl);
// ModeChanger(1, 1);


// MODE 2
const parametersToMode2= [1, 'Science: Computers', 2];

// ModeChanger(2, parametersToMode2);




//#endregion modeSwitcher



//#endregion toTEST









//#region HTML EVENT HANDLER
document.getElementById("GameMode1-start").addEventListener("click", mode1Handler);

document.getElementById('GameMode2-start').addEventListener("click", Mode2);

document.getElementById('Gamemode2-selection').addEventListener("click", ShowFilterForm)





//#region  GLOBAL FUNCTIONS







// CALLED BY BUTTON
function OnclickReset(){
    console.log('Clicked 2')
    document.getElementById('results').classList.add('d-none');
    Reset();
}


function Reset(){

    console.log('reset called')



    




 //GAMEODE 1

    if (CURRENT_MODE === 1) {
        RESET = [CURRENT_MODE, OVERALLVL]
        userAnswers = [null, null, null];



        // llamar Modechanger(mode , param);
    }



 // GAMEMODE 2
    if(CURRENT_MODE === 2){

    RESET = [CURRENT_MODE, GAMEMODE2PARAMETERS];
    userAnswers = [null, null, null];

}

ModeChanger(RESET[0], RESET[1]);



}






function Mode2(){
    console.log('clicked')
    HideFilterForm();
    ModeChanger(2, CategoryFiter());
    console.log(CategoryFiter());

    // // document.getElementById('Selection-Mode-Container').classList.add('d-none');
}

function PlayMusic(level){

    let indextoPlay = level

    console.log(localStorage.getItem('leveStorage'));
    console.log(LOCALINITIALITE);

    if((localStorage.getItem('leveStorage')!== null) && (LOCALINITIALITE=== false)){
        indextoPlay = JSON.parse(localStorage.getItem('leveStorage'));
        LOCALINITIALITE = true;

        console.log('music from');
    }


    

    if(CURRENT_LVL !== OVERALLVL){

        console.log('music change')

        if(document.getElementById('audio')){
            console.log('STOPED')
            musicLevel.stop();
        }
        console.log(localStorage.getItem('leveStorage'))

        console.log('toplay');
        console.log(indextoPlay);
        musicLevel.play(indextoPlay);
        
        CURRENT_LVL = OVERALLVL;
    }

    CURRENT_LVL = indextoPlay;

    console.log('indextoPlay = ' +indextoPlay)

    console.log('CURRENT in music = ' + CURRENT_LVL)

    console.log(LOCALINITIALITE);
}

//#endregion global functions


//#endregion   html even Handler    


//#region HTML SHOW/HIDE FUNCTIONS
function ShowCover(){

    document.getElementById('cover').classList.remove('d-none');

}

function HideCover(){

    document.getElementById('cover').classList.add('d-none');

}


//#region NEXT HANDLER

// NEXT BUTTON HANDLER
function nextHandler(){

    const answercard = document.getElementById("results");
    // GET USER ANSWERS


    console.log('NEXT HANDLER    ---------');
    // console.log(USERANSWERS);
    // console.log(QUESTIONS_OBJECT.CorrectAnswers);
    
    //#region Checking answers WORKS FINE
    const rightAnswers  = QUESTIONS_OBJECT.CorrectAnswers;
    const userAns = USERANSWERS;
    
    const checkedAnswers = new AnswerCheck(userAns, rightAnswers).output;
    
    // console.log(checkedAnswers);

    const numbOfSucc = checkedAnswers.reduce((a, b) => a + b, 0)

    const score = scoreSystem.run(checkedAnswers, OVERALLVL, "score", CURRENT_MODE);

    // console.log(numbOfSucc);
    //#endregion checking Answers works


    answercard.innerHTML = `
        <h2 class="mt-5">You answered</h2>
        <h3 class="mt-5" id="Right-Answers-Score">${numbOfSucc} out of 3</h3>

        <div>
            <button class="btn btn--start glass" onclick="OnclickReset()" id="ResetBTN">Continuar</button>
        </div>
    `;

    let hola = '';
    
    [hola, STACK] = levelingSystem.run(checkedAnswers, OVERALLVL, 'leveStorage', STACK);
    
    OVERALLVL = hola;
    // console.log

    console.log('hola');
    console.log(hola);

    

    console.log('STACK');
    console.log(STACK);

    answercard.classList.remove("d-none");
    

}


function FactoryReset(){
    localStorage.clear();
    location.reload();
}

//#endregion next handler

function ShowFilterForm(){
    document.getElementById('FilterForm').classList.remove('d-none');
    
}

function HideFilterForm(){
    document.getElementById('FilterForm').classList.add('d-none');
    document.getElementById('Gamemode2-selection').classList.add('d-none');
}
//#endregion html Show/Hide funcitons

// Mode2PlayButtonStart.addEventListener("click", getInfoFromHTMLForm)

window.getUserAnswers = getUserAnswers;

window.nextHandler = nextHandler;

window.OnclickReset = OnclickReset;

window.FactoryReset = FactoryReset;

