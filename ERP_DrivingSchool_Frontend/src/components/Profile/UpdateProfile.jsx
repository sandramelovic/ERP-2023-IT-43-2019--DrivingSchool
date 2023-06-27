import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import HomeIcon from '@mui/icons-material/Home';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearErrors } from "../../redux/actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { getUserDetails } from "../../redux/actions/userActions";
import {
    useNavigate
} from "react-router-dom";
import noUserPhoto from '../../assets/no-user-image-icon.jpg'


const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.userDetails);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const userFromLocalS = JSON.parse(localStorage.getItem('user'))
    const token = userFromLocalS.token
    const id = userFromLocalS.data.user.userId

    const [nameSurename, setNameSurename] = useState(user.nameSurename);
    const [username, setUsername] = useState(user.username);
    const [address, setAddress] = useState(user.address);
    const [avatar, setAvatar] = useState(user.userImage);
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const [jmbg, setJmbg] = useState(user.jmbg);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [birthDate, setBirthDate] = useState(user.birthDate);

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("nameSurename", nameSurename);
        myForm.set("address", address);
        myForm.set("jmbg", jmbg);
        myForm.set("phoneNumber", phoneNumber)
        myForm.set("birthDate", birthDate);
        myForm.set("username", username);
        myForm.set("userImage", avatar);


        dispatch(updateProfile(id, myForm, token));
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(file.name);
            }
        };
        console.log(file)
        if (file) {
            reader.readAsDataURL(file);
        }  else {
            // Set default photo here
            setAvatarPreview(noUserPhoto); // Replace 'default_photo_url' with the actual URL of the default photo
            setAvatar(noUserPhoto); // Replace 'default_photo_name' with the desired default photo name
        }
    };

    useEffect(() => {
        dispatch(getUserDetails(userFromLocalS.data.user.userId, userFromLocalS.token))

        /*  if (userFromLocalS) {
              setNameSurename(userFromLocalS.nameSurename);
              setUsername(userFromLocalS.username);
              setAvatarPreview("https://i.pinimg.com/originals/6d/e8/ad/6de8ad5eca1b8686e9ca946545194062.jpg");
          }*/

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
                            <h2 className="updateProfileHeading">Izmeni profil</h2>

                            <form
                                className="updateProfileForm"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="updateProfileName">
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="Ime i prezime"
                                        required
                                        name="nameSurename"
                                        defaultValue={nameSurename}
                                        onChange={(e) => setNameSurename(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
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
                                <div className="updateProfileAddress">
                                    <HomeIcon />
                                    <input

                                        placeholder="Adresa"
                                        name="address"
                                        defaultValue={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileAddress">
                                    <FingerprintIcon />
                                    <input
                                        type="text"
                                        placeholder="JMBG"
                                        required
                                        name="jmbg"
                                        defaultValue={jmbg}
                                        onChange={(e) => setJmbg(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfilePhoneNumber">
                                    <PhoneInTalkIcon />
                                    <input
                                        type="text"
                                        placeholder="Broj telefona"
                                        required
                                        name="phoneNumber"
                                        defaultValue={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileAddress">
                                    <CalendarMonthIcon />
                                    <input
                                        type="date"
                                        placeholder="Datum rodjenja"
                                        name="birthDate"
                                        defaultValue={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
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
                                    value="Izmeni"
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