import React, { useContext } from "react";
import {useState} from 'react';
import "../services";
import { fetchDeleteTodo, fetchUpdateTodo } from "../services";
import '../components/Todo.css';
import todosContext from "../todos-context";

function Todo({
  id,
  task,
  done,
}){


  const [checked, setChecked] = useState(done);
  const {removeTodoMethod, completeTodoMethod, handleErrorMethod} = useContext(todosContext);
  

  function deleteTodoSubmit(){
    fetchDeleteTodo(id)
    .then(
      ()=> removeTodoMethod(id)
      )
    .catch(err =>{
    handleErrorMethod("Something went wrong with deleting, please try again");

    })
  }


  function changeTodoStatusSubmit(){
    fetchUpdateTodo(id, {done: !done})
    .then(
      (todo)=>completeTodoMethod(todo.id)
      )
    .catch(err =>{ 
    handleErrorMethod("Something went wrong with changing status, please try again");
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
    </div>
   
   )
}

export default Todo;