import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ user }) => {
  const [searchBarText, setSearchBarText] = useState(``);
  const navigate = useNavigate();

  const searchClick = (e) => {
    e.preventDefault();
    navigate(`/weather/${searchBarText}`);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary fixed-top">
        <div className="container-fluid mb-10">
          <a
            className="navbar-brand"
            href="https://www.digitalfutures.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="src\Images\DF_Logo.png"
              alt="DF Logo"
              width="30"
              height="30"
            />
          </a>
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                {user.name.length > 0 ? (
                  <Link className="nav-link active" to="/login">
                    Welcome {user.name}
                  </Link>
                ) : (
                  <Link className="nav-link active" to="/login">
                    Login / Signup
                  </Link>
                )}
              </li>
              {user.favLocations.length > 0 && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/favourites">
                    My Favourite Locations
                  </Link>
                </li>
              )}
            </ul>
            <form
              className="d-flex"
              role="search"
              onSubmit={(e) => searchClick(e)}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Location search..."
                aria-label="Search"
                value={searchBarText}
                onChange={(e) => setSearchBarText(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1200px-Magnifying_glass_icon.svg.png"
                  width="30"
                  height="30"
                  alt="Search"
                />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
