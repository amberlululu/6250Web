const  getMatchedCount = (secretWord, guess) => {
  let matches = 0;
  const letterCount = {};

  for(let letter of secretWord.toLowerCase()){
    letterCount[letter] = letterCount[letter] + 1|| 1;
  }

  for(let letter of guess.toLowerCase()){
    if(letterCount[letter]){
      letterCount[letter]-=1;
      matches +=1;
    }
  }
  return matches;
};

const exactMatch = (secretWord, guess) => {
  return secretWord.toLowerCase() == guess.toLowerCase();
}

const checkWordValid = (guess, secretWord) =>{
  const regex = /^[a-zA-Z]*$/;
  if(guess && guess.match(regex)&& guess.trim().length == secretWord.length){
    return true;
  }
  return false;
}

export {getMatchedCount, exactMatch, checkWordValid};


