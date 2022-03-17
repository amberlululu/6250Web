"use strict";

(function () {

const groceries = [
  {
    text: 'Orange',
    quantity: 0,
  },
  {
    text: 'Apple',
    quantity: 0,
  },
];

const listEl = document.querySelector('#grocery-app .items');
const addNewInput = document.querySelector('#grocery-app #newItem');
const addNewBtn = document.querySelector('#grocery-app #addNewItem');

disableButtonIfNoInput();
addAbilityToChangeQuantity();
addAbilityToAddItems();
addAbilityToDeleteItems();

render(groceries);

function render(groceries){
  const html = groceries.map((grocery, index)=>{
    return `
      <li class="itemDetail">
        <span class="itemName">${grocery.text}</span>    
        <span class="delete-item" data-index="${index}">X</span>
        <button class="subtractQuantity" data-index="${index}">-</button>
        <span class ="quantityNum">${grocery.quantity}</span>
        <button class="addQuantity" data-index="${index}">+</button>
      </li>
    `
  }).join('');

  listEl.innerHTML = html;
  addNewBtn.disabled = !addNewInput.value;
  const childLi = Array.from(listEl.querySelectorAll("li"));
  childLi.map((child, index)=>{
    if(groceries[index].quantity === 0){
      child.querySelector(".subtractQuantity").disabled = true;
    }
  })
}

function disableButtonIfNoInput(){
  addNewInput.addEventListener('input',()=>{
    addNewBtn.disabled = !addNewInput.value;
  });
}

function addAbilityToAddItems(){
  addNewBtn.addEventListener('click',(e)=>{
    const inputValue = addNewInput.value.trim();
    const newItem = {
      text: inputValue,
      quantity: 0,
    };
    
    if(inputValue != ""){
      groceries.push(newItem);
      addNewInput.value = '';
    } else if(inputValue === ""){
      e.target.parentElement.querySelector('#error-msg').style.display = "inline";
    }
    render(groceries);
  });
}

function addAbilityToDeleteItems(){
  listEl.addEventListener('click',(e)=>{
    if(!e.target.classList.contains('delete-item')) {
      return;
    };
    const index = e.target.dataset.index;
    groceries.splice(index,1);
    render(groceries);
  });
}

function addAbilityToChangeQuantity(){
  listEl.addEventListener('click',(e)=>{
    if(e.target.classList.contains('subtractQuantity')){      
      const index = e.target.dataset.index;
      if(groceries[index].quantity <= 0){
         e.target.disabled = true;
      }else{
        groceries[index].quantity--;
      }
    }else if(e.target.classList.contains('addQuantity')){
      const index = e.target.dataset.index;  
      if(groceries[index].quantity > 0){
         e.target.parentElement.querySelector('.subtractQuantity').disabled = false;
      }
      groceries[index].quantity++;
    }
    render(groceries);
  });
};

})();

