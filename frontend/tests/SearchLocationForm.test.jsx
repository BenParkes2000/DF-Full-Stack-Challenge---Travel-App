import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import SearchLocationForm from "../src/Components/HomePage Components/SearchLocationForm";

describe(`SearchLocationForm test suite`, () => {
  describe(`Form Manipulation tests`, () => {
    beforeEach(() => {
      render(<SearchLocationForm />, { wrapper: MemoryRouter });
    });
    test(`it should render the new value in the input when the searchBarText is updated`, async () => {
      const testLocation = `Dublin`;
      const searchInput = screen.getByPlaceholderText(/Location name/);
      console.log(searchInput);

      expect(searchInput).toHaveValue(``);

      await userEvent.type(searchInput, testLocation);

      expect(searchInput).toHaveValue(testLocation);
    });
  });
});
