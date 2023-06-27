import React from "react";
import './Error.css'
import car_login from "../../../assets/car_login.png"

const Error = ({notificationMessages}) => {
    return (
        <div id="error-box">
            <div class="dot"></div>
            <div class="dot two"></div>
            <div class="face2">
                <div class="eye"></div>
                <div class="eye right"></div>
                <div class="mouth sad"></div>
            </div>
            <div class="shadow move"></div>
            <div class="message"><h1 class="alert h1Notification">{notificationMessages}</h1><p className="pNotification">Vidimo se opet!</p></div>
            <img data-aos='zoom-in-right'
            data-aos-duration='3000'
            src={car_login} alt="" className='car_login_notification' />
        </div>
    );
};

export default Error;