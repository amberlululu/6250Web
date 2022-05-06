import './MainPage.css';
import '../services';
import {useEffect, useReducer} from 'react';
import TravelSpots from './TravelSpots';
import {fetchSpots, fetchSession} from '../services';
import TravelSpotForm from './TravelSpotForm';
import LoginPage from "./LoginPage";
import Nav from "./Nav";
import{
  reducer,
  initialState,
  checkSessionAction,
  loadTravelSpotsAction,
  loginAction,
  logoutAction,
  addTravelSpotAction,
  removeTravelSpotAction,
  completeTravelSpotAction,
  handleErrorAction,
  loginUsernameAction
}from'../reducer';
import travelSpotsContext from '../travelSpots-context';
import travelSpotFormContext from '../travelSpotForm-context';
import loginPageContext from '../loginPage-context';
import navbarContext from "../navbar-context";

function MainPage() {
  const [state, dispatch] =  useReducer(reducer, initialState);

  useEffect(
    ()=>{
       checkSession();      
    },[]
  )

  function checkSession(){   
    fetchSession()
    .then( user=>{
      dispatch(loginUsernameAction(user.username));
      loadSpots();
    })
    .catch(()=> dispatch(checkSessionAction()));
  }

  function loadSpots(){
    fetchSpots()
    .then(fetchedData =>{
      dispatch(loadTravelSpotsAction(fetchedData));
    })
    .catch( error =>{
      dispatch(handleErrorAction('Something went wrong with loading, please try again'));
    })
  }

  function addTravelSpotMethod(travelSpot){
    dispatch(addTravelSpotAction(travelSpot));
  }

  function removeTravelSpotMethod(id){
  
    dispatch(removeTravelSpotAction(id));
  }

  function completeTravelSpotMethod(id){
    dispatch(completeTravelSpotAction(id));
  }

  function handleErrorMethod(error){
    dispatch(handleErrorAction(error));
  }

  function loginHandleMethod(spots, user){
    dispatch(loginAction(spots, user))
  }

  function logoutHandleMethod(){
    dispatch(logoutAction())
  }

  return (
    <div className="App">
      <main className="App-header">
      {state.error && 
        <div className="alert">
          <span className="msg">
            {state.error}
          </span>
          <span className="close-btn">
            <span className="fas fa-times">!</span>
          </span>
        </div> 
      }
      {!state.isLoggedIn &&  
      <loginPageContext.Provider value={{loginHandleMethod, handleErrorMethod}}>
        <LoginPage/>
      </loginPageContext.Provider>
      } 
      {state.isLoggedIn &&
      <div className="content">
        <navbarContext.Provider value={{logoutHandleMethod, handleErrorMethod}}>
          <Nav />
        </navbarContext.Provider>
        <p> Welcome {state.username}</p>
        <div className='spots-gallary'>
          <travelSpotsContext.Provider value={{state, removeTravelSpotMethod, completeTravelSpotMethod, handleErrorMethod}}>     
            <TravelSpots/>
          </travelSpotsContext.Provider>
        </div> 
        <travelSpotFormContext.Provider value = {{addTravelSpotMethod, handleErrorMethod}}>               
          <TravelSpotForm/>
        </travelSpotFormContext.Provider>
        <div className="controls">
        </div>
      </div>
      }     
      </main>
    </div> 
  );
}

export default MainPage;
