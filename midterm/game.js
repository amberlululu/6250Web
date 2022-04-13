const users = {};

function selectARandomWord(words){
  return words[Math.floor(Math.random()*words.length)];
}

function startAGame(username,words){
  const user = {};
  user.secretWord = selectARandomWord(words);
  user.isGameOver = false;
  user.validWords = 0;
  user.isRecentGuessAcceptable = true;
  user.guessHistory = [];
  user.allGuessedWords = [];
  user.recentGuess = "";
  users[username] = user;

  // help grading
  console.log("username is " + username + ", and the secret word is " + user.secretWord);
  return user;
}

function exactMatch(guess, chosenWord) {
  return guess.toUpperCase() === chosenWord.toUpperCase(); 
}

function compare( word, guess ) {   
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

function isGuessValid(words,guess,user){
  const guessLowercase = guess.toLowerCase();
  if(words.indexOf(guessLowercase) != -1 && user.allGuessedWords.indexOf(guessLowercase)===-1){
    user.allGuessedWords.push(guessLowercase);
    return true;
  }
  return false;
}

function ifAcceptableGuess(user, guess){
  const regex = /^[a-zA-Z]*$/;
  if(guess && guess.match(regex) && guess.indexOf(' ')<0){  
    user.isRecentGuessAcceptable = true;  
     return true;
  } 
  user.isRecentGuessAcceptable = false;
  return false;
}

function AddWord(user, guess, words){
 
  const secretWord = user.secretWord;
  const matchedLetterNum = compare(secretWord, guess);
  const isValid = isGuessValid(words, guess, user);

  if(isValid){
    user.guessHistory.push({"guess": guess, "matched": matchedLetterNum, "valid": isValid});
    user.validWords ++;
  }
  user.recentGuess =  guess + ": matched " + matchedLetterNum + " letters"+ ", valid is " + isValid;

  if(exactMatch(guess,secretWord)){
    user.isGameOver = true;
    return true;
  }else{
    return false;
  }
}

const game = {
  users,
  startAGame,
  ifAcceptableGuess,
  AddWord,
}

module.exports = game;


