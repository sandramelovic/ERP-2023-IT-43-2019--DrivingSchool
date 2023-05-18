import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearErrors } from "../../redux/actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {
    useNavigate
} from "react-router-dom";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
   // const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const userFromLocalS = JSON.parse(localStorage.getItem('user'))
    const token =userFromLocalS.token
    const id = userFromLocalS.data.user.userId

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("nameSurename", name);
        myForm.set("address", userFromLocalS.data.user.address);
        myForm.set("jmbg", userFromLocalS.data.user.jmbg);
        myForm.set("phoneNumber", userFromLocalS.data.user.phoneNumber)
        myForm.set("birthDate", userFromLocalS.data.user.birthDate);
        myForm.set("username", email);
        myForm.set("role", userFromLocalS.data.user.role);

        dispatch(updateProfile(id, myForm, token));
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (userFromLocalS) {
            setName(userFromLocalS.name);
            setEmail(userFromLocalS.email);
            setAvatarPreview("https://i.pinimg.com/originals/6d/e8/ad/6de8ad5eca1b8686e9ca946545194062.jpg");
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            navigate("/profile");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, alert, isUpdated]);
    return (
        <div>
            <Header />
            <Fragment>
                <Fragment>
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading">Update Profile</h2>

                            <form
                                className="updateProfileForm"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="updateProfileName">
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
                                    <MailOutlineIcon />
                                    <input
                                
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div id="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="updateProfileBtn"
                                />
                            </form>
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

export default UpdateProfile;