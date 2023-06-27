import React from "react";
import './Success.css'
import { useNavigate } from "react-router-dom";

const Success = ({ notificationMessages }) => {

    const navigate = useNavigate()

    const navigateToPrograms = () => {
        navigate('/programs')
    }

    const navigateToHome = () => {
        navigate('/')
    }
    return (

        <div id="success-box">
            <div class="dot"></div>
            <div class="dot two"></div>
            <div class="face">
                <div class="eye"></div>
                <div class="eye right"></div>
                <div class="mouth happy"></div>
            </div>
            <div class="shadow scale"></div>
            <div class="message"><h1 className="alert h1Notification">Akcija!</h1>
                {notificationMessages.map((message, index) => (
                    <p key={index} className="pNotification">
                        {message}
                    </p>
                ))}
            </div>
            <button className="button-box1" onClick={navigateToPrograms}><h1 className="green h1Notification">Kupi</h1></button>
            <button className="button-box2" onClick={navigateToHome}><h1 className="green h1Notification">Izadji</h1></button>
            <div id="notification-container">
            </div>

        </div>
    );
};

export default Success;