const chatWeb = {
  chatPage: function(chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="style.css">
          <title>Chat</title> 
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat)}
              ${chatWeb.getMessageList(chat)}
            </div>
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
      // Fill in!
      chat.messages.map( messageObj => `
        <li>
          <div class="message">
            <span class="message-sender">${messageObj.sender}</span><br>
            <span class="message-text">${messageObj.text}</span>
          </div>
        </li>
      `).join('')+
      `</ol>`;
  },
  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },


  getOutgoing: function() {
    // Fill in!
    return `
    <div id="message-form">
      <form action="/chat" method="post" >
        <input id="username" type="hidden" name="username" value="Amber">
        <label for="new-message">Enter Your Message Here: </label>
        <input id="new-message" type="text" name="text" value="Your Message">
        <input type="submit" value="Send" id="sendMessageBtn">
      </form>
    </div>
    `
  }
};
module.exports = chatWeb;
