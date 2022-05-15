import React from "react";
import FavoriteSpotDetail from "./FavoriteSpotDetail"

function FavoriteSpotsContainer({favoriteSpotRecords}){
 
  return Object.values(favoriteSpotRecords).map((spot)=>
    
    <div key={spot.id}>
      <FavoriteSpotDetail
        key={spot.id}
        id={spot.id}
        location={spot.location}
        country = {spot.country}
        description={spot.description}
        image={spot.image}
      />
    </div>
    )
}

export default FavoriteSpotsContainer; 