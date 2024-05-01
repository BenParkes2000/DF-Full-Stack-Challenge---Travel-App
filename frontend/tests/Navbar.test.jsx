import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../src/Components/Navbar";
import { MemoryRouter } from "react-router-dom";

describe(`Navbar test suite`, () => {
  test(`it should render favourite saved locations list if there are saved locations`, () => {
    const user = {
      name: "Ben Parkes",
      favLocations: [
        { location: "Dublin", _id: 0 },
        { location: "London", _id: 1 },
        { location: "Birmingham", _id: 2 },
        { location: "Manchester", _id: 3 },
        { location: "Swansea", _id: 4 },
      ],
    };

    render(<Navbar user={user} />, { wrapper: MemoryRouter });

    const expectedText = "My Saved Locations";

    const checked = screen.getByText(expectedText);
    expect(checked).toBeInTheDocument();
  });

  test(`it should not render favourite saved locations list if there are no saved locations`, () => {
    const user = {
      name: "Ben Parkes",
      favLocations: [],
    };

    render(<Navbar user={user} />, { wrapper: MemoryRouter });

    const expectedText = "My Saved Locations";

    expect(screen.queryByText(expectedText)).toBeNull();
  });

  test(`it should render your name if you are signed in`, () => {
    const user = {
      name: "Ben Parkes",
      favLocations: [
        { location: "Dublin", _id: 0 },
        { location: "London", _id: 1 },
        { location: "Birmingham", _id: 2 },
        { location: "Manchester", _id: 3 },
        { location: "Swansea", _id: 4 },
      ],
    };

    render(<Navbar user={user} />, { wrapper: MemoryRouter });

    const expectedText = "Welcome Ben Parkes";

    const checked = screen.getByText(expectedText);
    expect(checked).toBeInTheDocument();
  });

  test(`it should render "Login / Signup if you are not signed in`, () => {
    const user = {
      name: "",
      favLocations: [],
    };

    render(<Navbar user={user} />, { wrapper: MemoryRouter });

    const expectedText = "Login / Signup";

    const checked = screen.getByText(expectedText);
    expect(checked).toBeInTheDocument();
  });
});
