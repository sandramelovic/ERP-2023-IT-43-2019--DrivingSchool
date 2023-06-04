import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import { Navigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { getUserDetails } from "../../redux/actions/userActions";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const Profile = () => {

  const { user, loading } = useSelector((state) => state.userDetails);
  const userr = localStorage.getItem('user')

  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserDetails(JSON.parse(userr).data.user.userId, JSON.parse(userr).token))

  }, [dispatch]);

  const formattedDate = user.birthDate ? new Date(user.birthDate).toLocaleDateString() : null;
  return (
    <div>
      <Header />
      <div class="profile-wrapper">
        <div class="profile-image">
          <img src={user.userImage}></img>
        </div>
        <div class="close"></div>
        <h2 class="profile-title">{user.nameSurename} <span>profil</span></h2>
        <div class="profile-info">
          <div class="content">
            <h3>Personalne informacije</h3>
            <div>
              <h6 className="text-warning">Ime i prezime:</h6>
              <p>{user.nameSurename}</p>
            </div>
            <div>
              <h6 className="text-warning">Korisničko ime:</h6>
              <p>{user.username}</p>
            </div>
            <div>
              <h6 className="text-warning">Broj telefona:</h6>
              <p>{user.phoneNumber}</p>
            </div>
            <div>
              <h6 className="text-warning">JMBG:</h6>
              <p>{user.jmbg}</p>
            </div>
            <div>
              <h6 className="text-warning">Adresa:</h6>
              {!user.address ? (
                <span>
                  <p className="text-danger">Adresa nije uneta</p>
                  <Link to="/me/update">
                    <WarningAmberIcon /> Unesi adresu
                  </Link>
                </span>
              ) : (
                <p>{user.address}</p>
              )}
            </div>
            <div>
              <h6 className="text-warning">Datum rođenja:</h6>
              {!user.birthDate ? (
                <span>
                  <p className="text-danger">Datum rođenja nije unet </p> <Link to="/me/update"><WarningAmberIcon></WarningAmberIcon> Unesi datum rođenja</Link>
                </span>
              ) : (
                <p>{formattedDate}</p>
              )}
            </div>
          </div>
          <div class="stats">

            <Link to="/orders">Moje porudžbine</Link>
            <Link to="/me/update">Izmeni profil</Link>

          </div>

        </div>
      </div>
      <div style={{ marginTop: "60rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;