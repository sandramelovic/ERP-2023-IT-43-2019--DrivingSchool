import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstants";
import { getUserDetails, updateUser, clearErrors } from "../../redux/actions/userActions";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const userFromLocalS = JSON.parse(localStorage.getItem('user'))
  const token = userFromLocalS.token

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [nameSurename, setNameSurename] = useState();
  const [username, setUsername] = useState();
  const [address, setAddress] = useState();
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");
  const [jmbg, setJmbg] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [birthDate, setBirthDate] = useState();
  const [role, setRole] = useState();

  const userId = id;

  useEffect(() => {
    
    dispatch(getUserDetails(userId, token));
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("nameSurename", nameSurename);
    myForm.set("address", address);
    myForm.set("jmbg", jmbg);
    myForm.set("phoneNumber", phoneNumber)
    myForm.set("birthDate", birthDate);
    myForm.set("username", username);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm, token));
  };

  return (
    <div>
      <Header />
      <Fragment>
        <div className="dashboard">
          <SideBar />
          <div className="newProductContainer">
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Izmeni korisnika</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Ime i prezime"
                  required
                  name="nameSurename"
                  defaultValue={nameSurename}
                  onChange={(e) => setNameSurename(e.target.value)}
                />
              </div>
              <div>
                <AccountCircleIcon />
                <input
                  type="text"
                  placeholder="Korisnicko ime"
                  required
                  name="username"
                  defaultValue={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select defaultValue={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Izaberi ulogu</option>
                  <option value="Admin">Admin</option>
                  <option value="User">Korisnik</option>
                </select>
              </div>



              <Button
                id="createProductBtn"
                type="submit"
              /*  disabled={
                  updateLoading ? true : false || role === "Admin" ? true : false
                }*/
              >
                Izmeni
              </Button>
            </form>

          </div>
        </div>
      </Fragment>
      <div style={{ marginTop: "51rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default UpdateUser;