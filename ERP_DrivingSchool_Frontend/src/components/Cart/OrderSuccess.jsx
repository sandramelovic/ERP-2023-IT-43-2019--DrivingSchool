import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";

const OrderSuccess = () => {
    return (
        <div>
            <Header />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="orderSuccess">
                <CheckCircleIcon />

                <Typography>Vaša porudžbina je uspešno obavljena </Typography>
                <Link to="/orders">Pogledaj porudžbine</Link>
            </motion.div>
            <Footer />
        </div>
    );
};

export default OrderSuccess;