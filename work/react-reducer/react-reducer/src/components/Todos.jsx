import React, { useContext } from "react";
import todosContext from "../todos-context";
import Todo from './Todo'

function Todos(){
 const state = useContext(todosContext);

  return Object.values(state.state.todos).map((todo)=>
    <Todo
    id={todo.id}
    key={todo.id}
    task={todo.task}
    done={todo.done}
    
     />
  )
}

export default Todos;