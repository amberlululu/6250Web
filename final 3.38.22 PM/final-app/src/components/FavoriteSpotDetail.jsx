import React from "react";
import './FavoriteSpotDetail.css';
import { Link } from "react-router-dom";

const FavoriteSpotDetail=({id, location, country, image})=>{

  return(
    <div className="favorite-spot">
      <div className="favorite-spot-container">
        <ul className="favorite-spot-card">
            <div>💖</div> 
            <div className="favorite-spot-img">
              <img src={image} alt="favorite spot img" className="favorite-spot-i"/>
            </div>
            <div className="favorite-spot-detail">
              <span>{location} {country}</span><br/>
              <Link
                to={`/travelSpots/${id}`}
                className=""
              >Details</Link>
            </div>
        </ul>
      </div>
    </div>
  )
}

export default FavoriteSpotDetail;