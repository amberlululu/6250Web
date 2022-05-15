import React, { useContext } from "react";
import {useState} from 'react';
import {fetchAddTodo} from "../services";
import todoFormContext from "../todoForm-context";

function TodoForm (){

 const [todoInput, setTodoInput] = useState('');
 const {addTodoMethod, handleErrorMethod} = useContext(todoFormContext);


const handleSubmit =(e) =>{
  e.preventDefault();
  if(!todoInput || todoInput.trim() == ""){
    handleErrorMethod("Do not put empty todo");
    return;
  }
      
  fetchAddTodo(todoInput.trim()) 
  .then( todo =>{
    addTodoMethod(todo);
    
  })
  .catch( error=>{
    handleErrorMethod("Something went wrong with adding todo, please try again");
  })
  setTodoInput("");
}

  
  return(
    
    <form action="#" onSubmit={handleSubmit}>
      <input className="to-add" value = {todoInput} onChange={(e)=>setTodoInput(e.target.value)}/>
      <button type="submit" className="add" >Add</button>
    </form>
  )

}

export default TodoForm;