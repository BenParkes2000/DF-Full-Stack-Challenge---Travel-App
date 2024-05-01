import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import CreateUserForm from "../src/Components/CreateUserPage Components/CreateUserForm";

describe(`CreateUserForm test suite`, () => {
  describe(`Form Manipulation tests`, () => {
    beforeEach(() => {
      render(<CreateUserForm />, { wrapper: MemoryRouter });
    });
    test(`it should render the new value in the input when the name is updated`, async () => {
      const testName = `Ben Parkes`;
      const nameInput = screen.getByPlaceholderText(/Full Name/);
      console.log(nameInput);

      expect(nameInput).toHaveValue(``);

      await userEvent.type(nameInput, testName);

      expect(nameInput).toHaveValue(testName);
    });

    test(`it should render the new value in the input when the email address is updated`, async () => {
      const testEmail = `ben@email.com`;
      const emailInput = screen.getByPlaceholderText(/Email Address/);
      console.log(emailInput);

      expect(emailInput).toHaveValue(``);

      await userEvent.type(emailInput, testEmail);

      expect(emailInput).toHaveValue(testEmail);
    });

    test(`it should render the new value in the input when the password is updated`, async () => {
      const testPassword = `BenPassword`;
      const passwordInput = screen.getByPlaceholderText(/Password/);
      console.log(passwordInput);

      expect(passwordInput).toHaveValue(``);

      await userEvent.type(passwordInput, testPassword);

      expect(passwordInput).toHaveValue(testPassword);
    });
  });
});
