import React, {useState, useEffect,useReducer} from "react";
import {fetchSession} from '../services';
import {fetchFavoriteSpots} from '../services';
import {initialState, reducer, loginUsernameAction, checkSessionAction} from'../reducer';
import Nav from './Nav';
import FavoriteSpotsContainer from "./FavoriteSpotsContainer";


function FavoriteTravelSports(){
  const [favoriteSpotRecords, setFavoriteSpotRecords] = useState([]);
  const [state, dispatch] =  useReducer(reducer, initialState);
  const [error, setError] = useState("");

  const  userGallaryLink = (
    <div className="text-center">
      <a href={`/`}>Go Back to Main Page</a>
    </div>
  );

  const  loginLink = (
    <div className="text-center">
      <a href={`/`}>Login Page</a>
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
      loadFavoriteSpots();
    })
    .catch(()=> dispatch(checkSessionAction()));
  }


  function loadFavoriteSpots(){
    fetchFavoriteSpots()
    .then(fetchedData =>{
        setFavoriteSpotRecords(fetchedData)
    })
    .catch( error =>{
      setError(error);
    })
  }


  return (
    <div>
      <Nav/>
      {error && 
        <div className="alert">
          <span className="msg">
            {error}
          </span>
          <span className="close-btn">
            <span className="fas fa-times">x</span>
          </span>
        </div> 
      }
      {state.username &&
      <div className="favorite-spots-lists">
        <FavoriteSpotsContainer favoriteSpotRecords={favoriteSpotRecords} username={state.username}/>
        <h2>{userGallaryLink}</h2>
      </div>
      }

      {
        !state.username &&
        <div>
          <p>You are not logged in so please go to login page</p>
          <h2>{loginLink}</h2>
        </div>
      }
    </div>
    
    
  )

}


export default FavoriteTravelSports;