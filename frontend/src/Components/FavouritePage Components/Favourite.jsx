import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import CheckedBookmark from "/src/Images/CheckedBookmark.png";
import FavLocationModel from "./FavLocation.model";

const Favourite = ({ favourite, update }) => {
  const { location, _id } = favourite;
  const navigate = useNavigate();

  const removeFavourite = () => {
    update(location);
  };

  const onClick = (e) => {
    e.preventDefault();
    navigate(`/weather/${location}`);
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 ">
      <div>
        <button onClick={removeFavourite}>
          <img className="bookmark" src={CheckedBookmark} alt="Checkmark" />
        </button>
        <a className="location" onClick={(e) => onClick(e)}>
          {location}
        </a>
      </div>
    </div>
  );
};

Favourite.propTypes = {
  favourite: PropTypes.instanceOf(FavLocationModel),
};

export default Favourite;
