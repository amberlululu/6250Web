"use strict";
(function() {

   let stateInventories = {};

  const MESSAGES = {
    networkError: 'Trouble connecting to the network.  Please try again',
    authInsufficient: "Please only use letters and numbers for username and do not use 'dog' as username, no space before between and after username",
    requiredUsername: 'Your username is required to login',
    noSuchQuantity: "Quantity can only be number and not less than 0",
    default: 'Something went wrong.  Please try again',

  };


  checkForSession();
  addAbilityToLogin();
  addAbilityToLogout();
  addAbilityToChangeQuantity();

  function setLoggedIn( isLoggedIn ) {
    if(isLoggedIn) {
      renderLoggedInPage();
    } else {    
      renderNotLoggedInPage();
      addAbilityToLogin();
    }
    renderStatus("");  
  }

  function fetchSession() {
    return fetch('/api/session', {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function checkForSession() {
    fetchSession()
    .then( populateInventories )
    .catch( () => setLoggedIn(false) );
  }

  function renderOnLogin(inventories) {
    stateInventories = inventories;
    setLoggedIn(true);
  }

  function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function addAbilityToLogin() {
    if(setLoggedIn){
      const buttonEl = document.querySelector('.login button');
      const usernameEl = document.querySelector('.login__username');     
      if(!buttonEl || !usernameEl){
        return;
      }
      buttonEl.addEventListener('click', (e) => {
        const username = usernameEl.value;
        usernameEl.value ="";
        fetchLogin(username)
        .then( renderOnLogin )
        .catch( error => renderStatus(error) );
      });
    }
    
  }

  function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function addAbilityToLogout() {
    const controlsEl = document.querySelector('.controls');
    if(!controlsEl){
      return;
    }
    controlsEl.addEventListener('click', (e) => {
      stateInventories = {};
      fetchLogout()
      .then( () => setLoggedIn(false) )
      .catch( error => renderStatus(error) );
    });
  }

  function fetchInventories() {
    return fetch('/api/inventories')
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function populateInventories() {
    fetchInventories()
    .then( rawInventories => {
      stateInventories = rawInventories;
      setLoggedIn(true);
      renderLoggedInPage();
      renderStatus('');
    })
    .catch( error => {
      renderStatus(error);
    });
  }

  function fetchUpdateInventory( id, inventoryUpdates ) {
    return fetch(`/api/inventories/${id}`, {
      method: 'PATCH',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      
      body: JSON.stringify( inventoryUpdates ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function addAbilityToChangeQuantity(){
    const listEl = document.querySelector('.inventories');
    if(!listEl){
      return;
    }
    let quantityDetail = 0;
    listEl.addEventListener('click',(e)=>{
      const id = e.target.dataset.id;
      if(e.target.classList.contains('addQuantity')){
        quantityDetail = stateInventories[id].quantity +1;
      }else if(e.target.classList.contains('subtractQuantity')){
        if(stateInventories[id].quantity <= 0){
          e.target.disabled = true;
        }else{
          quantityDetail = stateInventories[id].quantity -1;
        }        
      }else if(!e.target.classList.contains("inventory_detail")){
        return;
      }
      fetchUpdateInventory(id, { quantity: quantityDetail } )
      .then( inventory => {
        stateInventories[id] = inventory;
        renderLoggedInPage();
        renderStatus('');
      })
      .catch( err => {
        renderStatus(err);
      });
      
    })
  }
   
  function renderLoggedInPage({ add } = {}){
   const loginHtml = document.querySelector('.login');
   loginHtml.innerHTML = "";

   const inventoryHtml = Object.values(stateInventories).map( inventory => {
    return `
    <li class="inventory" data-id="${inventory.id}">
      <label >
        <span class="inventory_detail" data-id="${inventory.id}">${inventory.name}</span>   
        <button class="inventory_detail subtractQuantity" data-id="${inventory.id}">-</button>
        <span class="inventory_detail item-quantity">${inventory.quantity}</span>
        <button class="inventory_detail addQuantity" data-id="${inventory.id}">+</button> 
      </label>
    </li>
    `;
  });

   const inventoriesEl = document.querySelector(".inventories");  
   inventoriesEl.innerHTML = inventoryHtml;
   const logoutBtnHtml = ` 
      <button class="logout">Logout</button>
   `
   
   const controlsEl = document.querySelector(".controls");
   if(!controlsEl){
     return;
   }else{
    controlsEl.innerHTML = logoutBtnHtml;

   }
  
   const childLi = Array.from(inventoriesEl.querySelectorAll("li"));
    childLi.map((child)=>{
      const value = child.querySelector(".item-quantity").innerText;
      if(value === "0"){
        child.querySelector(".subtractQuantity").disabled = true;
      }
    })
  }

  function renderNotLoggedInPage(){
    const loginHtml = `
      <form action="#" id="form_login">
        <label>
          <span>Username:</span>
          <input class="login__username">
        </label>
        <button type="button">Login</button>
      </form>
    `
    const loginEl = document.querySelector('.login');
    loginEl.innerHTML = loginHtml;

    const inventoriesEl = document.querySelector(".inventories"); 
    inventoriesEl.innerHTML = "";
    
    const controlsEl = document.querySelector(".controls");
    controlsEl.innerHTML = "";
   
  }

  function renderStatus(message) {
    const statusEl = document.querySelector('.status');
    if( !message ) {
      statusEl.innerText = '';
      return;
    }
    const key = message?.error ? message.error : 'default';
    statusEl.innerText = MESSAGES[key] || MESSAGES.default;
  }

})();