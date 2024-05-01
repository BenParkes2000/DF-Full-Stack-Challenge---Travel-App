import SearchLocationForm from "./HomePage Components/SearchLocationForm";
import "./css/HomePage.css";

const HomePage = () => {
  return (
    <>
      <div className="container-fluid text-center heading home-page">
        <h1 className="header-home">Tell me about...</h1>
        <SearchLocationForm />
      </div>
    </>
  );
};

export default HomePage;
