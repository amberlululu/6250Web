const users = {
    "Amit": "Amit",
    "Bao": "Bao",
};

const messages = [
  {
    sender: "Amit",
    text: "You up?",
  },
  {
    sender: "Bao",
    text: " Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];

function addMessage({ sender, text }) {
  // Fill in!

  if(!Object.keys(users).includes(sender)){
    users[sender]= sender;
  }
  const newMessageObj = {sender: sender, text: text};
  messages.push(newMessageObj);
}

const chat = {
  users,
  messages,
  addMessage,
};

module.exports = chat;

