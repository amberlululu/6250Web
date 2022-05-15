const playWeb = {
  loginPage: function(){
    return `
    <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="style.css">
          <title>Login Form</title> 
        </head>
        <body>
          <h2>Login Page</h2><br>
          <div class="login">
            <form id="login" action ="/login" method="POST">
              <label id="login-user-label"><b>User Name</b></label>
              <input id="Uname" name="username" placeholder="Username" required>
              <br><br>
              <button id="log" type="submit">login</button>
              <br><br>
            </form>
          </div>          
        </body>
      </html>   
    `
  },

  invalidLoginPage: function(){
    return `
    <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="style.css">
          <title>Login Form</title> 
        </head>
        <body>
          <p class="errorMsg">Your username is not valid please choose another username </p>
          <p class="errorMsg">Please make sure your username is not "dog" and only include letters and numbers, no empty space before, in the middle or after username, no empty input.</p>
          <h2>Login Page</h2><br>
          <div class="login">
            <form id="login" action ="/login" method="POST">
              <label id="login-user-label"><b>User Name</b></label>
              <input id="Uname" name="username" placeholder="Username" required>
              <br><br>
              <button id="log" type="submit">login</button>
              <br><br>
            </form>
          </div>          
        </body>
      </html>           
    `
  },

  reloginPage: function(){
    return `
    <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="style.css">
          <title>Login Form</title> 
        </head>
        <body>
        <p id="errorMsg">You do not have valid session id please log in again!</p>
          <h2>Login Page</h2><br>
          <div class="login">
            <form id="login" action="/login" method="POST">
              <label id="login-user-label"><b>User Name</b></label>
              <input id="Uname" name="username" placeholder="Username" required>
              <br><br>
              <button id="log" type="submit">login</button>
              <br><br>
            </form>
          </div>          
        </body>
      </html>           
    `

  },

  gamePage: function(username, words, game){
    return `
      <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="style.css">
          <title>GuessWord</title> 
        </head>
        <body>
          <div id="guess-word-app">
            <div class="display-panel">
              <p id="user-label">Hi, <span id="user-name-label">${username}</span> Welcome to the Guess Game!</p> 
              <div id="word-list-panel">
                ${playWeb.getWordsList(words)}                   
              </div> 
              <div id="game-result">
                <p id="game-policy-title">Guess Policy</p>
                <p><span class="policy-details"> Valid Guess:</span> if the word is in the word list and the first time you guess it, we consider it valid, if you guess it the second time it is considered not valid</p>
                <p><span class="policy-details">Correct word:</span> the word has to be the same as the secret word that randomly selected by the system, regardless of uppercase and lowercase</p>
                <p class="guess-result-title">Your previously valid guess history are shown below:</p>
                <div id="game-result-area">
                  ${playWeb.getAllGuessResult(username,game)}
                </div>
              </div>
              <div>
                <p class="guess-result-title">Your Total Valid Guess: <span id="valid-count">${playWeb.getValidWordCount(username,game)}</span></p>
                <p class="guess-result-title">Your Recent Guess is:</p>
                ${playWeb.getRecentGuessResult(username,game)}
              </div>
            </div>
            <div>
              ${playWeb.getOutgoing(username,game)}
            </div>
            <form action="/new-game" method="POST">
              <button type="submit">Start New Game</button>
            </form> 
            <form action ="/logout" method="POST">
              <button type="submit">logout</button>
            </form> 
          </div>
        </body>
      </html>
  `;

  },

  getWordsList: function(words){
    return `<ul class="word">` +
      words.map( word => `
        <li>
          <div>
            <span class="word-text">${word}</span>
          </div>
        </li>
      `).join('')+
      `</ul>`;
  },

  getAllGuessResult: function(username, game){
    const results = game.users[username].guessHistory;
    return `<ol class="each-guess-result">` +
      results.map(res =>    
        ` <li>
          <div>
            <p class="each-guess-res"> Your Guess: <span class="highlight">${res.guess}</span>, Matched: <span class="highlight">${res.matched}</span>, Valid: <span class="highlight">${res.valid}</span></p>
          </div>
        </li>
      `).join('')+
      `</ol>`;
  },
  getValidWordCount: function(username, game){
    const validCount = game.users[username]["validWords"];
    return validCount;

  },

  getRecentGuessResult: function(username, game){
    const recentResult = game.users[username]["recentGuess"];
    let message = "";
    if(game.users[username]["isGameOver"]){
      message = "Congras, You have won the game!!";
    }else if(!game.users[username]["isGameOver"] && game.users[username]["recentGuess"]!=""){
      message = "Sorry, your previous guess was not right, want to make another guess?"
    }
    return `
    <p class="each-guess-result"><span>${recentResult}</span></p>
    <p class="each-guess-result" id="guess-check-msg">${message}</p>
    `
  },

  getOutgoing: function(username,game){
    let isGameOver = game.users[username]["isGameOver"]; 
    let showSubmitForm = isGameOver? 'display: none': 'display: inline';
    let ifShow = isGameOver? 'guess-label-hide' :'';

    let isAcceptable =game.users[username]["isRecentGuessAcceptable"];
    let ifAcceptableGuess = "Your guess is not acceptable, please take another guess. Make sure acceplable guess only includes letters, do not put leading empty space before the word and no empty input"
    let ifAcceptableGuessMsg  = isAcceptable? 'if-acceptable-msg' : 'acceptable-msg';  
    return `
      <p class="guess-input-title" id=${ifShow}>Take a Guess</p>
      <form action="/guess" method="POST"  style="${showSubmitForm}">
        <input type="text" name="newGuess" required="true"/>
        <button type="submit">submit</button>
      </form>
      <p id="${ifAcceptableGuessMsg}">${ifAcceptableGuess}</p>
    `
  }
}

module.exports = playWeb;