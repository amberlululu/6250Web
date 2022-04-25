const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const inventories = require('./inventories');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'You do not have the authentification to see this page' });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;
  const regex = /^[0-9a-zA-Z]+$/;
  if(!username) {
    res.status(400).json({ error: 'requiredUsername' });
    return;
  }
  if(username.toLowerCase() === 'dog' || !username.match(regex)) {
    res.status(403).json({ error: 'authInsufficient' });
    return;
  }
  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);
  if(!existingUserData) {
    users.addUserData(username, inventories.makeInventoryList());
  }
  res.cookie('sid', sid);
  res.json(users.getUserData(username).getInventories());
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


app.get('/api/inventories', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'You do not have the authentification to see this page' });
    return;
  }
  res.json(users.getUserData(username).getInventories());
});

app.get('/api/inventories/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'You do not have the authentification to see this page' });
    return;
  }
  const inventoryList = users.getUserData(username);
  const { id } = req.params;
  if(!inventoryList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No inventory with id ${id}` });
    return;
  }
  res.json(inventoryList.getInventory(id));
});

app.patch('/api/inventories/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'You do not have the authentification to see this page' });
    return;
  }
  const { id } = req.params;
  const { name, quantity } = req.body;
  const inventoryList = users.getUserData(username);
  if(!inventoryList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No inventory with id ${id}` });
    return;
  }
  const regex = /^0$|^[1-9][0-9]*$/;
  const strQuantity = quantity.toString();
  if(quantity < 0 || !strQuantity.match(regex)){
    res.status(400).json({ error: `noSuchQuantity`, message: `No inventory with quantity ${quantity}` });
    return;
  }
  inventoryList.updateInventory(id, { name, quantity });
  res.json(inventoryList.getInventory(id));
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));