import AllFavourites from "./FavouritePage Components/AllFavourites";
import "./css/FavouritePage.css";
import CheckedBookmark from "../Images/CheckedBookmark.png";

const FavouritePage = ({ user, updateFavourites }) => {
  return (
    <>
      <div className="container-fluid text-center heading favourite-page">
        <div>
          <h1 className="header-favourite">Telling you about...</h1>
          <h1>Favourite Locations</h1>
          <div>
            <div>
              <label>
                <img
                  className="bookmark"
                  src={CheckedBookmark}
                  alt="Checkmark"
                />
                Click to remove from favourites
              </label>
            </div>
            <p>Click name to view info</p>
          </div>
        </div>
        <div>
          <AllFavourites user={user} updateFavourites={updateFavourites} />
        </div>
      </div>
    </>
  );
};

export default FavouritePage;
