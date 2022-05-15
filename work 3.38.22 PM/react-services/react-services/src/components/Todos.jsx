import React from "react";
import Todo from './Todo'

function Todos({todos,removeTodo,completeTodo}){

  return Object.values(todos).map((todo)=>
    <Todo
    id={todo.id}
    key={todo.id}
    task={todo.task}
    done={todo.done}
    removeTodo={removeTodo}
    completeTodo={completeTodo}
    
     />
  )
}

export default Todos;