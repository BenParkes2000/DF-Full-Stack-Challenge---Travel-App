import CreateUserForm from "../Components/CreateUserPage Components/CreateUserForm";
import "./css/CreateUserPage.css";

const CreateUserPage = () => {
  return (
    <>
      <div className="container-fluid heading-create-user create-user-page">
        <CreateUserForm />
      </div>
    </>
  );
};

export default CreateUserPage;
