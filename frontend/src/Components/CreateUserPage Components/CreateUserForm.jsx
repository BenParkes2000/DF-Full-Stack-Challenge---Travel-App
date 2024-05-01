import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUserForm = () => {
  const [nameText, setNameText] = useState(``);
  const [emailAddressText, setEmailAddressText] = useState(``);
  const [passwordText, setPasswordText] = useState(``);

  const navigate = useNavigate();

  const addUser = async () => {
    console.log(nameText, emailAddressText, passwordText);
    try {
      const response = await axios.post("http://localhost:4000/create", {
        name: nameText,
        email: emailAddressText,
        password: passwordText,
      });
      console.log(response);
      const user = response.data;
      console.log(user.user);
      navigate("/login");
    } catch (error) {
      console.error("Error whilst creating user");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className="align-items-center text-center create-user-form">
      <h1>Create User Details</h1>
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
              placeholder="Full Name"
              aria-label="Full Name"
              value={nameText}
              onChange={(e) => setNameText(e.target.value)}
            />
          </div>
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

          <input
            className="sign-up-button btn btn-primary"
            type="submit"
            aria-label="Sign Up"
            value="Sign Up"
            // onClick={signUpClick}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
