import React from 'react';
import Nav from './Nav';
import {useEffect, useReducer} from 'react';
import {initialState, reducer, checkSessionAction,loginUsernameAction} from'../reducer';
import {fetchSession} from '../services';

function UserPage(){

  const [state, dispatch] =  useReducer(reducer, initialState);

  const  loginLink = (
    <div className="text-center">
      <a href={`/`}>Login Page</a>
    </div>
  );

  const  userGallaryLink = (
    <div className="text-center">
      <a href={`/`}>Go To Main Page</a>
    </div>
  );

  useEffect(
    ()=>{
       checkSession();      
    },[]
  )

  function checkSession(){   
    fetchSession()
    .then( user=>{
      dispatch(loginUsernameAction(user.username));
    })
    .catch(()=> dispatch(checkSessionAction()));
  }

   return (
     <div className="user-page-container">
        <Nav/>
       {state.username &&
        <div className='user-info-container'>
          <h1>Hello</h1>
          <h2>{state.username}</h2>
          <h2>{userGallaryLink}</h2>
        </div>
        }
      { !state.username && 
       <div className='user-info-container'>
          <p>You are not logged in please go to login page</p>
          <h2>{loginLink}</h2>
       </div>
      }
     </div>
   )
}

export default UserPage;