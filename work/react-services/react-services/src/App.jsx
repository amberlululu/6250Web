import './App.css';
import {useState, useEffect} from 'react';
import './services';
import Todos from "./components/Todos"
import { fetchTodos, fetchLogin, fetchSession, fetchLogout} from './services';
import TodoForm from './components/TodoForm';



function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');


  useEffect(
    ()=>{
       checkSession()      
    },[]
  )

  function checkSession(){
    fetchSession()
    .then(loadTodos)
    .catch(()=> setLoggedIn(false));

  }

  
  function setLogin(){
    fetchLogin(user)
    .then(fetchedData=>{
      setTodos(fetchedData);
      setLoggedIn(true);
      setError("");
    })
    .catch( error =>{
      setError('Do not put empty and dog as user name, please try again');
      setTodos([]);
    })
  }

  function loadTodos(){
    fetchTodos()
    .then(fetchedData =>{
      setTodos(fetchedData);
      setLoggedIn(true)
      setError('');
    })
    .catch( error =>{
      setError('Something went wrong with loading, please try again');
      setTodos([]);
    })
  }

  function setLogout(){
     setTodos([]);
     fetchLogout()
     .then(()=> setLoggedIn(false))
     .catch( error =>{
       setError("Something went wrong with log out, please try again")
     })

  }



function addTodo(todo){
  const newTodos ={...todos};
  newTodos[todo.id] = todo;
  setTodos(newTodos);
}


  function removeTodo(id){
    const newTodos = {...todos};
    delete newTodos[id] 
    setTodos(newTodos);
  }

  function completeTodo(id){  
    const newTodos = {...todos};

   for( const [key, value] of Object.entries(newTodos)){
     if(key === id){
       newTodos[key].done = !newTodos[key].done
     }
   }
    setTodos(newTodos)
  }



  return (
    <div className="App">
      <main className="App-header">
      {error && <div className="error">{error}</div>}
        {!isLoggedIn && <div className="status">
        
          <div className="login">
            <form action="#">
              <label>
                <span>Username:</span>
                <input className="login__username" value={user} placeholder="username" onInput={(e)=>setUser(e.target.value)}/>
              </label>
              <button type="button" onClick={setLogin}>Login</button>
            </form>
          </div>
        </div>}
       {isLoggedIn && <div className="content">
             <p> Welcome {user}</p>
            <Todos todos={todos} removeTodo={removeTodo} completeTodo={completeTodo}/>     
            <TodoForm addTodo={addTodo}/>
              <div className="controls">
            <button className="logout" onClick={setLogout}>Logout</button>
          </div>
        </div>}     
      </main>
    </div>
  );
}

export default App;
