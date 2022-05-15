
import './App.css';
import './services';
import {useState, useEffect, useReducer} from 'react';
import Todos from "./components/Todos";
import { fetchTodos, fetchLogin, fetchSession, fetchLogout} from './services';
import TodoForm from './components/TodoForm.jsx';
import {
  reducer, 
  initialState, 
  checkSessionAction,
  loadTodosAction, 
  loginAction, 
  logoutAction, 
  addTodoAction, 
  removeTodoAction, 
  completeTodoAction,
  handleErrorAction,
  loginUsernameAction
} from './reducer';

import todosContext from "./todos-context";
import TodoFormContext from "./todoForm-context";


function App() {

  const [user, setUser] = useState('');
  const [state, dispatch] =  useReducer(reducer, initialState);
  const [isLoading, setIsloading] = useState(false);


  useEffect(
    ()=>{
       checkSession();      
    },[]
  )

  function checkSession(){   
    fetchSession()
    .then( user=>{
      dispatch(loginUsernameAction(user.username));
      loadTodos();
    })
    .catch(()=> dispatch(checkSessionAction()));
  }

  function loadTodos(){
    fetchTodos()
    .then(fetchedData =>{
      dispatch(loadTodosAction(fetchedData));
    })
    .catch( error =>{
      dispatch(handleErrorAction('Something went wrong with loading, please try again'));
    })
  }

  function onLogin(user){
    setIsloading(true);
    setTimeout(()=>{
    fetchLogin(user)
    .then(fetchedData=>{
      setUser(user);
      dispatch(loginAction(fetchedData, user));
    })
    .catch( error =>{
      dispatch(handleErrorAction('Do not put empty and dog as user name, please try again'));
    })
    .finally(()=> setIsloading(false));

  },3000)

  }

  function onLogout(){
     fetchLogout()
     .then(()=>{
        dispatch(logoutAction());
        setUser("");
     })
     .catch( error =>{
      dispatch(handleErrorAction('Something went wrong with log out, please try again'));
     })

  }

  function addTodoMethod(todo){
    dispatch(addTodoAction(todo));
  }
  
  function removeTodoMethod(id){
    dispatch(removeTodoAction(id));
  }
  
  function completeTodoMethod(id){
    dispatch(completeTodoAction(id));
  }

  function handleErrorMethod(error){
    dispatch(handleErrorAction(error));
  }

  

  return (
    <div className="App">
      <main className="App-header">
      {state.error && <div className="error">{state.error}</div>}
        {!state.isLoggedIn && <div className="status">
        
          <div className="login">
            <form action="#">
              <label>
                <span>Username:</span>
                <input className="login__username" value={user} placeholder="username" onInput={(e)=>setUser(e.target.value)}/>
              </label>
              <button type="button" onClick={()=>onLogin(user)}>Login</button>
            </form>
          </div>
        </div>}
        {isLoading &&<div> Loading...</div>}
        
       {state.isLoggedIn && !isLoading &&
        <div className="content">
          <p> Welcome {state.username}</p> 
          <todosContext.Provider value={{state, removeTodoMethod, completeTodoMethod, handleErrorMethod}}>     
            <Todos/>
          </todosContext.Provider>
              
          <TodoFormContext.Provider value = {{addTodoMethod, handleErrorMethod}}>               
            <TodoForm/>
          </TodoFormContext.Provider>
          <div className="controls">
            <button className="logout" onClick={onLogout}>Logout</button>
          </div>
        </div>
        }     
      </main>
    </div>
  );
}

export default App;
