import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import CreateUserPage from "./Components/CreateUserPage";
import FavouritePage from "./Components/FavouritePage";
import Footer from "./Components/Footer";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import Navbar from "./Components/Navbar";
import WeatherPage from "./Components/WeatherPage";

const App = () => {
  const [user, setUser] = useState({ name: "", favLocations: [] });

  const loginSuccess = (userData) => {
    setUser(userData);
    console.log(userData);
  };

  const loginError = (error) => {
    console.error("Error logging in:", error);
  };

  const updateFavourites = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="container-fluid">
        <Navbar user={user} />
        <div>
          <Routes>
            <Route index element={<HomePage />} />
            <Route
              path="login"
              element={
                <LoginPage login={loginSuccess} failedLogin={loginError} />
              }
            />
            <Route path="signup" element={<CreateUserPage />} />
            <Route
              path="weather/:location"
              element={
                <WeatherPage user={user} updateFavourites={updateFavourites} />
              }
            />
            <Route
              path="favourites"
              element={
                <FavouritePage
                  user={user}
                  updateFavourites={updateFavourites}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
