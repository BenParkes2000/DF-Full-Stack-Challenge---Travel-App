import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchLocationForm = () => {
  const [searchBarText, setSearchBarText] = useState(``);

  const navigate = useNavigate();
  const searchClick = (e) => {
    e.preventDefault();
    navigate(`/weather/${searchBarText}`);
  };

  return (
    <div className="searchLocationForm container-fluid text-center">
      <form
        className="d-flex flex-column align-items-center"
        role="search"
        aria-label="form"
        onSubmit={(e) => searchClick(e)}
      >
        <div className="text-center mt-3 mb-3 form-group input-group-lg">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Location name"
            aria-label="Search"
            value={searchBarText}
            onChange={(e) => setSearchBarText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-primary"
            value="Search"
            // onSubmit={(e) => searchClick(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchLocationForm;
