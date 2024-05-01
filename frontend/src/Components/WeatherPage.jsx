import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DaysTwoToFive from "../Components/WeatherPage Components/Day2-5Container";
import DayOne from "./WeatherPage Components/Day1Container";
import "./css/WeatherPage.css";
import UncheckedBookmark from "../Images/UncheckedBookmark.png";

const WeatherPage = ({ user, updateFavourites }) => {
  const [weatherData, setWeatherData] = useState(null);
  const { location } = useParams();
  const API_KEY = "c549ac4b5e573697ac79d9292fbd9d8a";

  useEffect(() => {
    if (location) {
      weatherFetcher();
    }
  }, [location]);

  const weatherFetcher = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`
      );
      const weatherData = response.data;
      console.log(weatherData);
      setWeatherData(weatherData);
    } catch (error) {
      console.error(`Error loading weather`);
    }
  };

  const updateFavouriteArray = (location) => {
    try {
      if (user.name.length > 0) {
        // If signed in:

        let favourited = false;

        user.favLocations.forEach((favourite) => {
          if (favourite === location) favourited = true;
        });

        if (!favourited) {
          // If not already a favourite location
          const updatedFavLocations = [...user.favLocations, location];
          updateUser(updatedFavLocations);
        } else {
          // If already a favourite location
          throw new Error(`Already favourite`);
        }
      } else {
        // If not signed in
        throw new Error(`Not logged in`);
      }
    } catch (error) {
      console.error(`Error updating: `, error);
    }
  };

  const updateUser = async (updatedFavLocations) => {
    // console.log(user.email, user.password, updatedFavLocations);

    try {
      const response = await axios.put("http://localhost:4000/favourite", {
        email: user.email,
        password: user.password,
        favLocations: updatedFavLocations,
      });
      // console.log(response);

      if (response.status === 200) {
        const updatedUser = response.data;
        // console.log(updatedUser.user);
        updateFavourites(updatedUser.user);
      } else {
        throw new Error(`Error whilst updating profile`);
      }
    } catch (error) {
      console.error("Error whilst updating profile");
    }
  };

  if (!weatherData || !weatherData.list) {
    return (
      <div className="weather-page heading">
        <h1>Loading Data...</h1>
      </div>
    );
  }

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-md-12 weather-page heading">
          <div>
            <h1 className="header-weather">Telling you about...</h1>
            <h1>{location}</h1>
            <label>
              <button onClick={() => updateFavouriteArray(location)}>
                <img
                  className="bookmark"
                  src={UncheckedBookmark}
                  alt="Unchecked Bookmark"
                />
              </button>
              Click to add to favourites
            </label>
          </div>
          <DayOne weatherData={weatherData} />
          <DaysTwoToFive weatherData={weatherData} />
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
