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
      <Fragment>
        <Fragment>
          <h1 className="text-center"> <span className="stroke-text display-6 fw-bolder text-warning" style={{ color: 'var(--darkGrey)' }}>{`${user.nameSurename}`}</span><span className="display-6 fw-bolder text-warning"> profil </span></h1>
          <div className="profileContainer">
            <div>
              <h1 className="text-warning">Moj profil</h1>
              <img src={user.userImage} alt={user.name} />
              <Link to="/me/update">Izmeni profil</Link>
            </div>
            <div>
              <div>
                <h4 className="text-warning">Ime i prezime:</h4>
                <p className="text-light ">{user.nameSurename}</p>
              </div>
              <div>
                <h4 className="text-warning">Korisničko ime:</h4>
                <p className="text-light">{user.username}</p>
              </div>
              <div>
                <h4 className="text-warning">Broj telefona:</h4>
                <p className="text-light">{user.phoneNumber}</p>
              </div>
              <div>
                <h4 className="text-warning">JMBG:</h4>
                <p className="text-light">{user.jmbg}</p>
              </div>
              <div>
                <h4 className="text-warning">Adresa:</h4>
                {!user.address ? (
                  <span>
                    <p className="text-danger">Adresa nije uneta</p>
                    <Link to="/me/update">
                      <WarningAmberIcon /> Unesi adresu
                    </Link>
                  </span>
                ) : (
                  <p className="text-light">{user.address}</p>
                )}
              </div>
              <div>
                <h4 className="text-warning">Datum rođenja:</h4>
                {!user.birthDate ? (
                  <span>
                    <p className="text-danger">Datum rođenja nije unet </p> <Link to="/me/update"><WarningAmberIcon></WarningAmberIcon> Unesi datum rođenja</Link>
                  </span>
                ) : (
                  <p className="text-light">{formattedDate}</p>
                )}
              </div>


              <div>
                <Link to="/orders">Moje porudžbine</Link>
              </div>
            </div>
          </div>
        </Fragment>
      </Fragment>
      <div style={{ marginTop: "48rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;