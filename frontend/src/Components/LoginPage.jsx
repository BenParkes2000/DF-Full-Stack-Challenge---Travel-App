import LoginForm from "../Components/LoginPage Components/LoginForm";
import "./css/LoginPage.css";

const LoginPage = ({ login, failedLogin }) => {
  return (
    <>
      <div className="container-fluid heading-login login-page">
        <LoginForm loginSuccess={login} loginError={failedLogin} />
      </div>
    </>
  );
};

export default LoginPage;
