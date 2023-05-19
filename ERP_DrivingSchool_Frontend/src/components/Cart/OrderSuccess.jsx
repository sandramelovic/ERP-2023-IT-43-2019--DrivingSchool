import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const OrderSuccess = () => {
    return (
        <div>
            <Header />
            <div className="orderSuccess">
                <CheckCircleIcon />

                <Typography>Vaša porudžbina je uspešno obavljena </Typography>
                <Link to="/orders">Pogledaj porudžbine</Link>
            </div>
            <Footer />
        </div>
    );
};

export default OrderSuccess;