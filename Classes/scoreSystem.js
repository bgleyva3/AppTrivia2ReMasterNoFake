/*-------------- CÓMO FUNCIONA-----------------

// answersArray: arreglo de respuestas correctas [1,0,1]
// level: nivel actual de las respuestas
// scoreInStorage: Nombre del score en el storage

let score = scoreSystem.run(answersArray, level, scoreInStorage);

 ---------------------------------------------*/

const scoreSystem = {
    run: (answersArray, level, scoreInStorage) => {
        let answersSum = answersArray.reduce((a, b) => a + b, 0);
        let points = answersSum * level;
        let scoreJSON = localStorage.getItem(scoreInStorage);
        let score = JSON.parse(scoreJSON);
        score += points;
        localStorage.setItem(scoreInStorage, JSON.stringify(score));
        return score;
    }
}

export default scoreSystem;


/* --- Lógica:----
Recibo Array [1,0,1]
Sumo los 1 y los multiplico por el nivel(1,2,3)
El resultado lo almaceno en local storage

*/