import React, {useState, useEffect, useReducer} from 'react';
import TravelSpotDetail from "./TravelSpotDetail";
import {fetchSpot} from '../services';
import {useParams} from 'react-router-dom';
import {initialState, reducer, checkSessionAction,loginUsernameAction} from'../reducer';
import {fetchSession} from '../services';
import Nav from "./Nav";

function TravelSpotShow() {
  const {id} = useParams();
  const [spotRecord, setSpotRecord] = useState({});
  const [state, dispatch] =  useReducer(reducer, initialState);
  const [error, setError] = useState("");

  useEffect(
    ()=>{
       checkSession();       
    },[]
  )

  function checkSession(){   
    fetchSession()
    .then( user=>{
      dispatch(loginUsernameAction(user.username));
      loadSpot(id); 
    })
    .catch(()=> dispatch(checkSessionAction()));
  }

  function loadSpot(id){
    fetchSpot(id)
    .then(fetchedData =>{
      setSpotRecord(fetchedData);
    })
    .catch( error =>{
      console.log(error)
      setError(error);
    })
  }

  return(
    <div>
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
      <div>
        <Nav/>
        <TravelSpotDetail
          username={state.username}
          key={spotRecord.id}
          id={spotRecord.id}
          location={spotRecord.location}
          country = {spotRecord.country}
          description={spotRecord.description}
          image={spotRecord.image}
        />
      </div>
    </div>   
  )
}

export default TravelSpotShow;