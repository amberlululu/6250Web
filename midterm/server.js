const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
const {v4: uuidv4} = require('uuid');
const words = require('./words');
const playWeb = require('./playWeb');
const game = require('./game');

app.use(express.static('./public'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

const sessions = {};
const userGameObj = {};

app.get('/',(req,res)=>{
  const sid = req.cookies.sid; 
  if(sid && sessions[sid]){
    const username = sessions[sid].username;
    let userHistory;
    if(!game.users[username]){
      userHistory = game.startAGame(username,words);
    }
    userHistory = game.users[username];
    userGameObj[username] = userHistory;
    res.send(playWeb.gamePage(username, words, game));
    return;
  }
  res.send(playWeb.loginPage());
  return;
});

app.post('/login',(req, res)=>{
  const username = req.body.username;
  const regex = /^[0-9a-zA-Z]+$/;
  if(username==='dog'|| !username || !username.match(regex) || username.indexOf(' ')>=0){
    res.status(401).send(playWeb.invalidLoginPage());
    return;
  }
  const sid = uuidv4();
  sessions[sid] = {username};
  res.cookie('sid',sid);
  res.redirect('/');
});

app.post('/logout',(req,res)=>{
  delete sessions.sid;
  res.clearCookie('sid');
  res.redirect('/');
});

app.post('/guess',(req, res)=>{
  const sid = req.cookies.sid; 
  const {newGuess} = req.body;
  if(sid && sessions[sid]){
    const username = sessions[sid].username;
    if(game.ifAcceptableGuess(game.users[username], newGuess)){  
      game.AddWord(game.users[username], newGuess, words);
      res.redirect('/');
    }else{
      res.redirect('/');  
    }
  }else{
    res.send(playWeb.reloginPage());
    return;
  }
});

app.post('/new-game',(req,res)=>{
  const sid = req.cookies.sid;
  if(sid && sessions[sid].username){
    const username = sessions[sid].username;
    userGameObj[username] = game.startAGame(username,words);
    res.redirect('/');
  }else{
    res.send(playWeb.reloginPage());
    return;
  }
});


app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
