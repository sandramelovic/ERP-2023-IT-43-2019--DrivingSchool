import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const NotFound = () => {
    return (
        <div>
            <Header />
            <div className="PageNotFound">
                <ErrorIcon />
                <Typography>Stranica nije pronađena </Typography>
                <Link to="/">Početna</Link>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;