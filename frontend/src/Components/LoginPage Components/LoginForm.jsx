import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ loginSuccess, loginError }) => {
  const [emailAddressText, setEmailAddressText] = useState(``);
  const [passwordText, setPasswordText] = useState(``);

  const navigate = useNavigate();
  const signUpClick = () => {
    navigate("/signup");
  };

  const fetchUser = async () => {
    console.log(emailAddressText, passwordText);
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email: emailAddressText,
        password: passwordText,
      });

      const user = response.data;
      console.log(user.user);
      loginSuccess(user.user);
      navigate("/");
    } catch (error) {
      console.error("Error whilst signing in");
      loginError(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetchUser();
  };

  return (
    <div className="align-items-center text-center login-form">
      <h1>Enter User Details</h1>
      <div className="container-fluid text-center">
        <form
          className="d-flex flex-column align-items-center"
          role="search"
          aria-label="form"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="text-center mt-3 mb-3 form-group input-group-lg">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Email Address"
              aria-label="Email Address"
              value={emailAddressText}
              onChange={(e) => setEmailAddressText(e.target.value)}
            />
          </div>
          <div className="text-center mt-3 mb-3 form-group input-group-lg">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Password"
              aria-label="Password"
              value={passwordText}
              onChange={(e) => setPasswordText(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" className="btn btn-primary" value="Login" />
          </div>
        </form>
      </div>
      <input
        className="sign-up-button btn btn-primary"
        type="submit"
        aria-label="Sign Up"
        value="Sign Up"
        onClick={signUpClick}
      />
    </div>
  );
};

export default LoginForm;
