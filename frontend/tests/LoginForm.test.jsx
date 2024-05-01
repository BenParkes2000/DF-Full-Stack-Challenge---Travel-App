import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../src/Components/LoginPage Components/LoginForm";

describe(`LoginForm test suite`, () => {
  describe(`Form Manipulation tests`, () => {
    beforeEach(() => {
      render(<LoginForm />, { wrapper: MemoryRouter });
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
