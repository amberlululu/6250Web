import React from "react";
import {useState} from 'react';
import "../services";
import { fetchDeleteTodo, fetchUpdateTodo } from "../services";
import '../components/Todo.css';

function Todo({
  id,
  task,
  done,
  removeTodo,
  completeTodo
 
}){

  const [error, setError] = useState('');
  const [checked, setChecked] = useState(done);


  function deleteTodoSubmit(){
    fetchDeleteTodo(id)
    .then(
      ()=> removeTodo(id)
      )
    .catch(err =>{
     setError("Something went wrong with deleting, please try again");
    })
  }


  function changeTodoStatusSubmit(){
    fetchUpdateTodo(id, {done: !done})
    .then(
      (todo)=>completeTodo(todo.id)
      )
    .catch(err =>{ 
     setError("Something went wrong with changing status, please try again");
    })
  }

  function toggle(value){
      return !value;
  }

  const isDoneClass = done ? "todo__text--complete" : "";
  const isAddedClass = id ? "todo__text--added" : "";
  

   return (
    <div>
    <li className="todo">  
    <label >
      <input
        className="todo__toggle"
        data-id={id}
        type="checkbox"
        onChange={() => setChecked(toggle)}
        checked = {checked}
        onClick={()=> changeTodoStatusSubmit()}
        
      />
      <span
        data-id={id}
        className={`todo__toggle todo__text ${ isDoneClass } ${isAddedClass}`}
        >  
        {task}      
      </span>
    </label>
    <button
      data-id={id}
      className="todo__delete"
      onClick={()=>deleteTodoSubmit()}
      
    >
      &#10060;
    </button>
    
    </li>
    {error && <div className="error">{error}</div>}
    </div>
   
   )
}

export default Todo;