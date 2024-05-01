import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Favourite from "../src/Components/FavouritePage Components/Favourite";
import FavLocationModel from "../src/Components/FavouritePage Components/FavLocation.model";
import userEvent from "@testing-library/user-event";

describe(`Favourite test suite`, () => {
  let testLocation, location, _id;

  beforeEach(() => {
    testLocation = new FavLocationModel(`Dublin`, 1);
    ({ location, _id } = testLocation);
  });

  test(`it should render a checked bookmark initially`, () => {
    render(<Favourite favourite={testLocation} />);

    const expectedText = "Checkmark";

    const checked = screen.getByAltText(expectedText);
    expect(checked).toBeInTheDocument();
  });
});
