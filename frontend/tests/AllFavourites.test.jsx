import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AllFavourites from "../src/Components/FavouritePage Components/AllFavourites";

test(`it should render the correct number of favourite locations based on the todo array supplied`, () => {
  const favourites = [
    { location: "Dublin", _id: 0 },
    { location: "London", _id: 1 },
    { location: "Birmingham", _id: 2 },
    { location: "Manchester", _id: 3 },
    { location: "Swansea", _id: 4 },
  ];

  const FavouriteLocationLength = favourites.length;

  render(<AllFavourites favourite={favourites} />);

  const numberOfLocations = screen.getAllByRole("button");

  expect(numberOfLocations).toHaveLength(FavouriteLocationLength);
});
