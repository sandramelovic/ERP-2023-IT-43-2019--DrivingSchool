import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import { Navigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { getUserDetails } from "../../redux/actions/userActions";

const Profile = () => {
  
  const { user, loading } = useSelector((state) => state.userDetails);
const userr = localStorage.getItem('user')

const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserDetails(JSON.parse(userr).data.user.userId, JSON.parse(userr).token))
    
  }, [dispatch]);
  return (
    <div>
      <Header />
      <Fragment>
        <Fragment>
        <h1 className="text-center"> <span className="stroke-text display-6 fw-bolder text-warning" style={{ color: 'var(--darkGrey)' }}>{`${user.nameSurename}`}</span><span className="display-6 fw-bolder text-warning"> 's profile </span></h1>
          <div className="profileContainer">
            <div>
              <h1 className="text-warning">My Profile</h1>
              <img src="https://cdn3.iconfinder.com/data/icons/flatastic-4-1/256/user_orange-512.png" alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4 className="text-warning">Full Name</h4>
                <p className="text-warning">{user.nameSurename}</p>
              </div>
              <div>
                <h4 className="text-warning">Username</h4>
                <p className="text-warning">{user.username}</p>
              </div>
              <div>
                <h4 className="text-warning">Joined On</h4>
                <p className="text-warning">{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
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