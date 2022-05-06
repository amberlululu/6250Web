export const initialState={
  isLoggedIn: false,
  spots: [],
  error : "",
  username: "",
}

export function checkSessionAction(){
  return{
    type: 'checkSession',
  }
}

export function loadTravelSpotsAction(spots){
  return{
    type: 'loadSpots',
    spots,
  }
}

export function loginAction(spots, username){
  return{
    type: 'login',
    spots,
    username,
  }
}

export function logoutAction(){
  return{
    type: 'logout',
  }
}

export function addTravelSpotAction(spot){
  return{
    type: 'addSpot',
    spot,
  }
}

export function removeTravelSpotAction(id){
   return{
     type: 'removeSpot',
     id,
   }
}

export function completeTravelSpotAction(id){
  return{
    type: 'completeSpot',
    id,
  }
}

export function handleErrorAction(error){
  return{
    type: 'handleError',
    error,
  }
}

export function loginUsernameAction(username){
  return{
    type: 'handleUsername',
    username,
  }
}

export function reducer(state, action){
  switch(action.type){
    case 'checkSession':
      return{
        ...state,
        isLoggedIn: false,
      }

    case 'loadSpots':
      return{
        ...state,
        spots : action.spots,
        isLoggedIn : true,
        error: "",

      }

    case 'login':
      return{
        ...state,
        isLoggedIn: true,
        username: action.username,
        spots: action.spots,
        error: "",
      }

    case 'logout':
      return{
        ...state,
        isLoggedIn: false,
        username: "",
        spots: [],
        error: "",
      };

    case 'addSpot':
      {
      const newSpots = state.spots;
      newSpots[action.spot.id] = action.spot;
      return{
        ...state,
        spots : newSpots,
        error: "",
      }
    }

    case 'removeSpot':
    {
      const newSpots = state.spots;
      delete newSpots[action.id] 
      return{
        ...state,
        spots: newSpots,

      }
    }

    case 'completeSpot':    
      return{
        ...state,
        spots:{
          ...state.spots,
          [action.id]:{
            ...state.spots[action.id],
            done:!state.spots[action.id].done,
          }
        }
      }
    
    case 'handleError':
     return{
       ...state,
       error: action.error,
     }

    case 'handleUsername':
      return{
        ...state,
        username: action.username,
      }

    default:
      throw Error(`Error action :${action.type}`, action);
    }
  }