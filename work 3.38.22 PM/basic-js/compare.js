"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */

  let matched = 0;
  const objWord = {};
  const objGuess = {};

  const upWord = word.toUpperCase();
  const upGuess = guess.toUpperCase();

  for(let i = 0; i< upWord.length; i++){
    if(!objWord.hasOwnProperty(upWord[i])){
      objWord[upWord[i]] = 0;
    }
    objWord[upWord[i]]++;
  }

  for(let j = 0; j < upGuess.length; j++){
    if(!objGuess.hasOwnProperty(upGuess[j])){
      objGuess[upGuess[j]] = 0;
    }
    objGuess[upGuess[j]]++;
  }

  for(let key in objWord){
    if(objGuess.hasOwnProperty(key)){
      if(objWord[key] < objGuess[key]){
        matched+=objWord[key];
      }else{
        matched+=objGuess[key];
      }
    }
  }
  
  return matched;
}
