export const initialState={
  isLoggedIn: false,
  todos: [],
  error : "",
  username: "",

}

export function checkSessionAction(){
  return{
    type: 'checkSession',

  }
}

export function loadTodosAction(todos){
  return{
    type: 'loadTodos',
    todos,
  }
}

export function loginAction(todos, username){
  return{
    type: 'login',
    todos,
    username,
  }
}

export function logoutAction(){
  return{
    type: 'logout',
  }
}

export function addTodoAction(todo){
  return{
    type: 'addTodo',
    todo,

  }
}

export function removeTodoAction(id){
   return{
     type: 'removeTodo',
     id,
   }
}

export function completeTodoAction(id){
  return{
    type: 'completeTodo',
    id,
  }
}


export function handleErrorAction(error){
  return{
    type: 'handleError',
    error,

  }
}

export function loginUsernameAction(username){
  return{
    type: 'handleUsername',
    username,

  }
}




export function reducer(state, action){
  switch(action.type){
    case 'checkSession':
      return{
        ...state,
        isLoggedIn: false,
      }

    case 'loadTodos':
      return{
        ...state,
        todos : action.todos,
        isLoggedIn : true,
        error: "",

      }
    
    case 'login':
      return{
        ...state,
        isLoggedIn: true,
        username: action.username,
        todos: action.todos,
        error: "",

      }

    case 'logout':
      return{
        ...state,
        isLoggedIn: false,
        username: "",
        todos: [],
        error: "",
      };

    case 'addTodo':
      {
      const newTodos = state.todos;
      newTodos[action.todo.id] = action.todo;

      return{
        ...state,
        todos : newTodos,
        error: "",
        
      }
    }

    case 'removeTodo':
    {
      const newTodos = state.todos;
      delete newTodos[action.id] 
      
      return{
        ...state,
        todos: newTodos,
        
      }
    }
    
    case 'completeTodo':
    {
      const newTodos = state.todos;

      for( const [key, value] of Object.entries(newTodos)){
        if(key === action.id){
          newTodos[key].done = !newTodos[key].done
        }
      }

      return{
        ...state,
        todos: newTodos,
        
      }
    }

    case 'handleError':
     return{
       ...state,
       error: action.error,
     }

    case 'handleUsername':
      return{
        ...state,
        username: action.username,
      }

    default:
      throw Error(`Error action :${action.type}`, action);
    
  }

}