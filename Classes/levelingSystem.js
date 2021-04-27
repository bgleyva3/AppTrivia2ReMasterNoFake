/*-------------- CÓMO FUNCIONA-----------------

// Recibe el arreglo de respuestas correctas [1,0,1], el nivel actual y el stack_value de los intentos actual
// Devuelve un arreglo con el valor del siguiente nivel y el stack_value de los intentos cuando logra 2/3 respuestas

[nextLevel, stack_value] = levelingSystem.run(answersArray, level, levelInStorage, stack_value);

 ---------------------------------------------*/

const levelingSystem = {

  run: (answersArray, level, levelInStorage, stack_value) => {
    console.log('leveling system');
    console.log(answersArray);
    const answersSum = answersArray.reduce((a, b) => a + b, 0);
    switch (answersSum) {
      case 3:
        const nextLevel1 = levelingSystem.limitLevel(level=level+1);
        localStorage.setItem(levelInStorage, JSON.stringify(nextLevel1));
        return [nextLevel1, (stack_value = 0)];
      case 2:
        if (stack_value === 0) {
          localStorage.setItem(levelInStorage, JSON.stringify(level));
          return [level, (stack_value = 1)];
        } else {
          const nextLevel2 = levelingSystem.limitLevel(level=level+1);
          localStorage.setItem(levelInStorage, JSON.stringify(nextLevel2));
          return [nextLevel2, (stack_value = 0)];
        }
      case 1:
        localStorage.setItem(levelInStorage, JSON.stringify(level));
        return [level, (stack_value = 0)];
      case 0:
        const nextLevel3 = levelingSystem.limitLevel(level=level-1);
        localStorage.setItem(levelInStorage, JSON.stringify(nextLevel3));
        return [nextLevel3, (stack_value = 0)];
    }
  },

  limitLevel: (level) => {
    if (level > 3) {
      return (level = 3);
    } else if (level < 1) {
      return (level = 1);
    }
    return(level);
  },

};

export default levelingSystem;










///---------------IGNORAR TODO DEBAJO DE ESTA LINEA----------------

//Metodo 3 IGNORAR

/*  initialize: (modeGame, level) => {
    
    if (modeGame === 1) {
      //returns [level, stack_value]
      return [1, 0];
    } else {
      //returns [level, stack_value]
      return [level, 0];
    }
  }, */



// PSEUDO CODE::: IGNORAR
// OBJECT: levelingSystem

/* Method 1: Play()

 Se tiene un arreglo de [0, 1, 0], una variable
                 level=1 al 3 y Stack_value= 0 o 1
    Method 4: Se suma todos los 1 del arreglo.
    1) Si el arreglo === 3:
            Se retorn level++, Stack_value=0 (Method 2)
    2) Si el arreglo suma === 2:
            Se compara Stack_value
            (if Stack_value=0): 
                Se retorna Stack_value=1 y level
            else if (Stack_value=1):
                Se retorna Stack_value=0 y level ++ (Method 2)
    4) Si el arrelo suma === 1:
            Se retorna level y Stack_value=0
    5) Si el arreglo suma === 0:
            Se retorna level-- y Stack_value=0 (Method 2)

*/

//-------------------------------------------

/* Method 2: limitLevel()

- Si level>3 => level =3
- Si level<1 => level =1  */

//-------------------------------------------

/* Method 3: Initialize()

-Si modo1 Selected: level=1, Stack_value=0
-Si modo2 Selected: level=recibe, Stack_value=0  */
