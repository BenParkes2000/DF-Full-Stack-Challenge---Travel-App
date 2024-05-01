import axios from "axios";

import FavLocationModel from "./FavLocation.model";
import Favourite from "./Favourite";

const AllFavourites = ({ user, updateFavourites }) => {
  const favourite = user.favLocations;

  // Function to convert array to object with id
  const favouritesObject = favourite.map((value, index) => ({
    location: value,
    _id: index + 1,
  }));

  // Function to remove favourite location from object
  const updateFavouriteObject = (location) => {
    const removeIndex = favouritesObject.findIndex(
      (place) => place.location === location
    );
    favouritesObject.splice(removeIndex, 1);
    updateFavouriteArray();
  };

  // Function to change user favourite location array
  const updateFavouriteArray = () => {
    const updatedFavourites = favouritesObject.map((place) => place.location);
    console.log(updatedFavourites);
    updateUser(updatedFavourites);
  };

  const updateUser = async (updatedFavourites) => {
    // console.log(user.email, user.password, updatedFavourites);

    try {
      const response = await axios.put("http://localhost:4000/favourite", {
        email: user.email,
        password: user.password,
        favLocations: updatedFavourites,
      });
      console.log(response);

      if (response.status === 200) {
        const updatedUser = response.data;
        // console.log(updatedUser.user);
        updateFavourites(updatedUser.user);
      } else {
        throw new Error(`Error whilst updating profile`);
      }
    } catch (error) {
      console.error("Error whilst updating profile");
      // loginError(error);
    }
  };

  const locations = favouritesObject.map((favourite) => {
    const { location, _id } = favourite;
    const FavLocation = new FavLocationModel(location, _id);
    return (
      <Favourite
        favourite={FavLocation}
        update={updateFavouriteObject}
        key={favourite._id}
      />
    );
  });

  return (
    <div className="container-fluid all-favourites">
      <div className="row">{locations}</div>
    </div>
  );
};

export default AllFavourites;
