import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { fetchLogout } from '../services';
import '../components/Nav.css'
import logo from '../logo.svg';
import navbarContext from "../navbar-context";

function Nav(){
  const {logoutHandleMethod, handleErrorMethod} = useContext(navbarContext);

   function onLogout(){
     fetchLogout()
     .then(()=>{
        logoutHandleMethod();
     })
     .catch( error =>{
      handleErrorMethod("Something went wrong with log out, please try again");
     })

  }
  return(
    <div className='nav-container'>
      <img className='logo' src={logo} alt="logo"/>
      <nav>
        <ul className='nav-links'>
          <li><Link className = "nav-lin" to={"/user"}>Your Home Page</Link></li>
          <li><Link className = "nav-lin" to={"/favoriteSpots"}>Favorite Travel Spots</Link></li>
          <li>More</li>
        </ul>
      </nav>
      <a className='cta'href="#"><button className='logout-btn' onClick={onLogout}>Logout</button></a>
    </div>
  )
}

export default Nav;