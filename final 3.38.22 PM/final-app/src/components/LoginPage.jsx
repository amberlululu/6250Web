import {useState, useContext } from 'react';
import loginPageContext from '../loginPage-context';
import { fetchLogin } from '../services';

function LoginPage(){

  const [user, setUser] = useState('');
  const {loginHandleMethod, handleErrorMethod} = useContext(loginPageContext);

  function onLogin(user){
    fetchLogin(user)
    .then(fetchedData=>{
      setUser(user);
      loginHandleMethod(fetchedData, user);
    })
    .catch( error =>{
      handleErrorMethod('Do not put empty and dog as user name, please try again');
    });
  }
 
  return(
    <div className="status">      
        <h2>Login Page</h2><br/>
          <div className="login">
            <form action="#" id="login">
              <label id="login-user-label"><b>User Name</b></label>
                <input id="Uname"  value={user} placeholder="username" onInput={(e)=>setUser(e.target.value)} required/>
                <br/>
                <br/>
                <button id ="log" type="button" onClick={()=> onLogin(user)}>Login</button>
              <br/>
            </form>
          </div>
      </div>
  )
}

export default LoginPage;