const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4000;

const spots = require('./src/travelSpots');
const sessions = require('./src/sessions');
const users = require('./src/users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;
  if(!username || username.trim() == '') {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if(username.trim().toLowerCase() === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);
  if(!existingUserData) {
    users.addUserData(username, spots.makeTravelSpotsList());
  }
  res.cookie('sid', sid);
  res.json(users.getUserData(username).getSpots());
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(sid) {
    res.clearCookie('sid');
  }
  if(username) {
    sessions.deleteSession(sid);
  }
  res.json({ username });
});

app.get('/api/travelSpots', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getSpots());
});

app.get('/favoriteSpots', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getFavoriteSpots());
});

app.post('/api/travelSpots', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
 
  const {location, country, image, description} = req.body;
  if(!location || !country || !image || !description) {
    res.status(400).json({ error: 'required-task' });
    return;
  }
  const regex = /^[a-zA-Z]+$/;
  if(!location.match(regex) || !country.match(regex)){
    res.status(400).json({ error: 'invalid-input' });
    return;
  }
  const spotList = users.getUserData(username);
  const id = spotList.addSpot({location, country, image, description});
  res.json(spotList.getSpot(id));
});

app.get('/api/travelSpots/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const spotList = users.getUserData(username);
  const { id } = req.params;
  if(!spotList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  res.json(spotList.getSpot(id));
});

app.patch('/api/travelSpots/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const { location, country, image, description, done } = req.body;
  const spotList = users.getUserData(username);
  if(!spotList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  spotList.updateSpot(id, { location, country, image, description, done });
  res.json(spotList.getSpot(id));
});

app.delete('/api/travelSpots/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const spotList = users.getUserData(username);
  const exists = spotList.contains(id);
  if(exists) {
    spotList.deleteSpot(id);
  }
  res.json({ message: exists ? `spot ${id} deleted` : `spot ${id} did not exist` });
});

app.get('*', (req,res)=>{
  res.sendFile('./build/index.html');
});

app.listen(PORT, ()=> console.log(`http://localhost:${PORT}/`)) 