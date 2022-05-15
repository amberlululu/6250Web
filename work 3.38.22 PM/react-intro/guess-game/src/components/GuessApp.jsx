import React from "react";
import { useState } from "react";
import "./GuessApp.css";
import  {getMatchedCount, exactMatch, checkWordValid} from "../compare";

function GuessApp(){
  const [guess, setGuess] = useState('');
  const [content, setContent]  = useState('');
  const secret = "RECAT";

  const takeGuess = () =>{
    if(exactMatch(secret, guess)){
      setContent(`${guess} is the secret word!`);
    }else if(!checkWordValid(guess, secret)){
      if(!guess || guess.indexOf(' ') == 0){
        setContent(`Do not put empty guess or leading empty space before guess!`)
      }else if(guess.trim().indexOf(' ')>0){
        setContent(`Do not put empty space between guess!`)
      }else if(guess.indexOf(' ') > 0){
        setContent(`Do not put empty space after guess!`)
      }else{
        setContent(`${guess} was not a valid word`);
      }
        
    }else{
      const matchedCount  = getMatchedCount(secret, guess);
      setContent(`${guess} had ${matchedCount} letters in common`);
    }
    setGuess('');
  }
  
  
  return(
    <div className="guess-game">
      <span className="guess-game-title">Guess Game</span><br/>
      <label>
        <p className="policy-msg">Policy: 1. please only put 5 letters (a-z or A-Z) 2. No empty space before, between or after the guess word</p>
        
        <span className="input-title">Take a Guess</span><br/>
        <input type="text" value = {guess} id="text" placeholder="Add your guess..." 
               onInput={(e) => setGuess(e.target.value)
              }
        /><br/>
        <button className="add-btn"
                type="button"
                onClick = {takeGuess}
                >Guess</button>
      </label> 
      <div className="res-msg">
        {content}
      </div> 
    </div>
  )
}

export default GuessApp;