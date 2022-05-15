import React from "react";
import {useState} from 'react';
import {fetchAddTodo} from "../services";

function TodoForm ({addTodo}){

 const [todoInput, setTodoInput] = useState('')
 const [error, setError] = useState('');


const handleSubmit =(e) =>{
  e.preventDefault();
  if(todoInput== ""){
    return;
  }
      
  fetchAddTodo(todoInput) 
  .then( todo =>{
    addTodo(todo);
    
  })
  .catch( error=>{
    setError("Something went wrong with adding todo, please try again")
  })
  setTodoInput("");
}

  
  return(
    
    <form action="#" onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input className="to-add" value = {todoInput} onChange={(e)=>setTodoInput(e.target.value)}/>
      <button type="submit" className="add" >Add</button>
    </form>
  )

}

export default TodoForm;