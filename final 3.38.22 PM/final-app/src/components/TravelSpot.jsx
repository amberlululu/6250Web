import React, { useContext } from "react";
import {useState} from 'react';
import "../services";
import { fetchDeleteSpot, fetchUpdateSpot } from "../services";
import travelSpotsContext from "../travelSpots-context";
import "../components/TravelSpot.css";
import { Link } from "react-router-dom";

function TravelSpot({
  id,
  location,
  country,
  image,
  description,
  done,
}){

  const [checked, setChecked] = useState(done);
  const {removeTravelSpotMethod, completeTravelSpotMethod, handleErrorMethod} = useContext(travelSpotsContext);

  function deleteSpotSubmit(){
    fetchDeleteSpot(id)
    .then(
      ()=> removeTravelSpotMethod(id)
      )
    .catch(err =>{
    handleErrorMethod("Something went wrong with deleting, please try again");

    })
  }

  function changeSpotStatusSubmit(){

    fetchUpdateSpot(id, {done: !done})
    .then(
      (spot)=>completeTravelSpotMethod(spot.id)    
      )
    .catch(err =>{ 
    handleErrorMethod("Something went wrong with changing status, please try again");
    })
  }

  function toggle(value){
    return !value;
  }
  
   return (  
    <div className="spot-container">
      <ul className="spot-card">  
        <label className="spot-label">
          <div className="spot-img">
            <img src={image} alt="spot" className="spot-i"/>
          </div>
          <div className="spot-detail">
            {done && '💖'} 
            <input
              className="spot__toggle"
              data-id={id}
              type="checkbox"
              onChange={() => setChecked(toggle)}
              checked = {checked}
              onClick={()=> changeSpotStatusSubmit()}
            />
            <span
              data-id={id} className={`spot__toggle spot__text`} >  
              {location}     {country}          
              <button
                data-id={id}
                className="spot__delete"
                onClick={()=>deleteSpotSubmit()}
              >
                &#10060;
              </button>    
            </span><br/>
            </div>  
            <h3>Description</h3>
            <Link
                to={`/travelSpots/${id}`}
                className="detail-link"
            >Details</Link>
            <p>{description}</p> 
        </label>
      </ul>
    </div>
   )
}

export default TravelSpot; 