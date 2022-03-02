const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
const {v4: uuidv4} = require('uuid');

app.use(express.static("./public"));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

const sessions = {};
const storedWordObj = {};

app.get('/',(req,res)=>{
  const sid = req.cookies.sid;
  if(sid && sessions[sid]){
    const username = sessions[sid].username;
    let storedWord = storedWordObj[username];
    if(storedWord === undefined){
      storedWord = "";
    }
    res.send(`
    <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="style.css">
          <title>person page</title> 
        </head>
        <body>
            <p>You Are Logged In As ${username} </p>
            <form action ="/logout" method="POST">
              <button type="submit" id="logout-btn">logout</button>
            </form>
            <p>Your Stored Word is: ${storedWord}</p>
            <p id="change-word-label"> Change Your Stored Word Here</p> 
            <form action ="/change" method="POST">
              Stored Word:<input name="storedWord">
              <button type="submit" id="change-btn">Change</button>
            </form>
        </body>
      </html>   
    `);
    return;
  }

  res.send(`
  <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="style.css">
          <title>login page</title> 
        </head>
        <body> 
          <form action ="/login" method="POST">
            username:<input name="username">
            <button type="submit" id="login-btn">login</button>
          </form>
        </body>
      </html> 
    `)
})

app.post('/login',(req, res)=>{
  const username = req.body.username.trim();
  const regex = /^[0-9a-zA-Z]+$/;
  if(username==='dog' || !username || !username.match(regex)){
    res.status(401).send(`invalid username, please try to login again by <li><a href="/">Home</a></li>`);
    return;
  }
  const sid = uuidv4();
  sessions[sid] = {username};
  res.cookie('sid',sid);
  res.redirect('/');
})

app.post('/logout',(req,res)=>{
  delete sessions.sid;
  res.clearCookie('sid');
  res.redirect('/');
})

app.post('/change',(req, res)=>{
  const sid = req.cookies.sid;
  const username = sessions[sid].username;
  const storedWord = req.body.storedWord;
  storedWordObj[username] = storedWord;
  res.redirect('/');
})


app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
