
const uuid = require('uuid').v4;
function makeTravelSpotsList() {

  const id1 = uuid();
  const id2 = uuid();
  const id3 = uuid();
  const id4 = uuid();
  const id5 = uuid();

  const travelSpotsList = {};
  const spots = {

    [id1]: {
      id: id1,
      location: 'New York',
      country: 'United States',
      image: "/images/newyork.jpeg",
      description:"One of the greatest cities in the world, New York is always a whirlwind of activity, with famous sites at every turn and never enough time to see them all. Some people come here to enjoy the Broadway shows; others come specifically to shop and dine; and many come simply to see the sites: the Statue of Liberty, Empire State Building, Brooklyn Bridge, Central Park, historic neighborhoods, and numerous world famous museums.",
      done: false,
    },
    [id2]: {
      id: id2,
      location: 'Shang Hai',
      country: 'China',
      image: "/images/shanghai.jpeg",
      description:"Shanghai, China's largest city, offers many exciting sightseeing opportunities for travelers.Things to do here include visiting the city's world-class museums and art galleries, such as the Shanghai Museum and the China Art Museum; wandering through lovely gardens and parks; or getting in some shopping, especially in the 'New World' pedestrian area with its luxury boutiques and galleries. Also fun is exploring the city's many fine old temples and traditional pagodas.",
      done: true,
    },
    [id3]: {
      id: id3,
      location: 'Kyoto',
      country: 'Japan',
      image: "/images/japan.jpeg",
      description:"Celebrated as the residence of the Emperor, and Japan's principal cultural center for almost 1,100 years, Kyoto today boasts numerous things to do and great places to visit, including exploring the fine examples of sculptures, paintings, and other art forms in its many museums and galleries",
      done: true,
    },
    [id4]: {
      id: id4,
      location: 'Paris',
      country: 'France',
      image: "/images/France.jpeg",
      description:"If it's your first time to Paris, you'll probably want to spend some time at the world-renowned Eiffel Tower, the Louvre and Notre-Dame, but don't miss out on other notable city jewels such as the Musée d'Orsay, the Luxembourg Gardens or Le Marais. There's no way you'll get to do it all – museum-touring, shopping, cemetery-perusing, district-exploring, opera-attending",
      done: false,
    },
    [id5]: {
      id: id5,
      location: 'Seoul',
      country: 'Korean',
      image: "/images/south-korea.jpeg",
      description:"Seoul is also a city of palaces, with five huge palace complexes located throughout the city and now restored to their former glory. Of course it's also known for its food, with a mouthwatering array of street food, Korean specialties like barbecue, and fine-dining options. Discover the best places to visit in this exciting city with our list of the top attractions and things to do in Seoul.",
      done: false,
    },
  };

  travelSpotsList.contains = function contains(id) {
    return !!spots[id];
  };

  travelSpotsList.getSpots = function getSpots() {
    return spots;
  };

  travelSpotsList.getFavoriteSpots = function getFavoriteSpots(){
    const newFavorites = {};
      for( const [key, value] of Object.entries(spots)){
        if(value.done === true){
          newFavorites[key] = value;
        }
      }
    return newFavorites;
  }

  travelSpotsList.addSpot = function addSpot({location, country, image, description}) {
    const id = uuid();
    spots[id] = {
      id,
      location,
      country,
      image,
      description,
      done: false,
    };
    return id;
  };

  travelSpotsList.getSpot = function getSpot(id) {
    return spots[id];
  };

  travelSpotsList.updateSpot = function updateSpot(id, spot) {   
    spots[id].done = spot.done ?? spots[id].done;
    spots[id].location = spot.location || spots[id].location;
    spots[id].country = spot.country || spots[id].country;
    spots[id].image = spot.image || spots[id].image;
    spots[id].description = spot.description || spots[id].description;
  };

  travelSpotsList.deleteSpot = function deleteSpot(id) {
    delete spots[id];
  };
  return travelSpotsList;
};

module.exports = {
  makeTravelSpotsList,
};