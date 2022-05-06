import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import TravelSpotShow from "./components/TravelSpotShow";
import UserPage from "./components/UserPage";
import FavoriteTravelSports from "./components/FavoriteTravelSpots";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<MainPage/>} exact/>
        <Route  path="/user" element={<UserPage/>} exact/>
        <Route  path="/travelSpots/:id" element={<TravelSpotShow/>} exact/>
        <Route  path="/favoriteSpots" element={<FavoriteTravelSports/>} exact/>
      </Routes>
   </BrowserRouter>
  )
}

export default App;

