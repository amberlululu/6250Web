import React from "react";
import "../components/TravelSpotDetail.css";
const TravelSpotDetail=({username, location, country, image,description})=>{

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

  return(
    <div>
      {username &&
      <div className="spot-detail-container">
        <h2 className="spot-detail-location">{location}</h2>
        <h2 className="spot-detail-country">{country}</h2>
        <img src={image} width="800" alt="spot" className="spot-detail-image"/>
        <p className="spot-detail-des">{description}</p>
        <h2>{userGallaryLink}</h2>
      </div>
      }
      {!username &&
        <div>
          <p>You have not logged in yet , please go to the login page and login</p>
          <h2>{loginLink}</h2>
        </div>
      }
    </div>
  )
}

export default TravelSpotDetail;