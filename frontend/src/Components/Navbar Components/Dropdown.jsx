const Dropdown = (locations) => {
  const favouritesObject = locations.map((value, index) => ({
    location: value,
    _id: index + 1,
  }));

  const place = favouritesObject.map((place, index) => (
    <li key={index}>
      <a className="dropdown-item">{place.location}</a>
    </li>
  ));

  return { place };
};

export default Dropdown;
