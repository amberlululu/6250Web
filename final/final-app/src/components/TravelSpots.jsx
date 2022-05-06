import React, { useContext } from "react";
import travelSpotsContext from '../travelSpots-context'
import TravelSpot from './TravelSpot';

function TravelSpots(){
 const state = useContext(travelSpotsContext);

  return Object.values(state.state.spots).map((spot)=>
    <TravelSpot
    id={spot.id}
    key={spot.id}
    location = {spot.location}
    country={spot.country}
    image = {spot.image}
    description = {spot.description}
    done={spot.done}
     />
  )
}

export default TravelSpots; 