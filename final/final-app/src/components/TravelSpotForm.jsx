import React, { useContext } from "react";
import {useState} from 'react';
import {fetchAddSpot} from "../services";
import travelSpotFormContext from '../travelSpotForm-context'
import '../components/TravelSpotForm.css'

function TravelSpotForm (){
 const {addTravelSpotMethod, handleErrorMethod} = useContext(travelSpotFormContext);
 const [submitted, setSubmitted] = useState(false);
 const [valid, setValid] = useState(false);

 const [values, setValues] = useState({
   location : "",
   country: "",
   image: "",
   description: "",
 })

 const handleLocationInputChange = (event)=>{
   setValues({
     ...values,
     location: event.target.value
   })
 }

 const handleCountryInputChange = (event)=>{
  setValues({
    ...values,
    country: event.target.value
  })
}

const handleImageInputChange = (event)=>{
  setValues({
    ...values,
    image: event.target.value
  })
}

const handleDescriptionInputChange = (event)=>{
  setValues({
    ...values,
    description: event.target.value
  })
}

const handleSubmit =(e) =>{
  e.preventDefault();
  if(values.location && values.country && values.image && values.description){
    setValid(true);
  }
  setSubmitted(true);
  fetchAddSpot(values) 
  .then( spot =>{
    addTravelSpotMethod(spot);
    setValues({
      location : "",
     country: "",
     image: "",
     description: "",
    });
  })
  .catch( error=>{
    handleErrorMethod("Something went wrong with adding spot, please try again");
  })
  
}
  return(
    <div className="form-container">
      <form action="#" onSubmit={handleSubmit} className="travelSpot-form">
        {submitted && valid ? <div className="success">Thank you for submitting!</div> : null}
        <h1>New Travel Spot Form</h1>
        <div className ="form-detail">
          <label htmlFor="location">Location:</label>
          <input 
            className="form-field" 
            type="text" 
            name="location" 
            id="location" 
            value = {values.location} 
            placeholder="Location of The Spot" 
            onChange={handleLocationInputChange}/>
            {submitted && !values.location ?<span className="form-error">Please enter the location(only characters)</span> : null}
        </div>
        <div className ="form-detail">
          <label htmlFor="country">Country:</label>
          <input 
            className="form-field" 
            type="text" 
            name="country" 
            id="country" 
            value = {values.country} 
            placeholder="Country of The Spot" 
            onChange={handleCountryInputChange}/>
            {submitted && !values.country ?<span className="form-error">Please enter the country(only characters)</span>: null}
        </div>
        <div className ="form-detail">
          <label htmlFor="image">Image:</label>
          <input 
            className="form-field" 
            type="text" 
            name="image" 
            id="image" 
            value = {values.image} 
            size="50" 
            placeholder="Image of The Spot" 
            onChange={handleImageInputChange}/>
            {submitted && !values.image ?<span className="form-error">Please enter the image url</span>: null }
        </div>
        <div className ="form-textarea">
          <label htmlFor="description">Description:</label>
          <textarea 
            className="form-field" 
            type="text" 
            name="description" 
            id="description" 
            value = {values.description} 
            placeholder="Description of The Spot" 
            onChange={handleDescriptionInputChange}/>
            {submitted && !values.description ?<span className="form-error">Please enter the description</span>: null}
        </div>
        <button type="submit" className="add" >Add</button>
    </form>
    </div>
  )
}

// Here is an example for you to put in the form

// City
//Cairo

//Country
//Egypt

// image url
//https://www.touropia.com/gfx/d/best-places-to-visit-in-egypt/dahshur.jpg

//Description:
//With a fascinating history that reaches back to the dawn of civilization, 
//Egypt is considered the oldest travel destination on earth. 
//The African nation’s awe-inspiring temples and pyramids have captured the imagination of travelers for thousands of years.


export default TravelSpotForm; 