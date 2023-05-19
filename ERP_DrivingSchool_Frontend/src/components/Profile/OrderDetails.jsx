import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getAllOrderItems, clearErrors } from "../../redux/actions/orderItemsAction";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const OrderDetails = () => {
    const { orderItems, error, loading } = useSelector((state) => state.allOrderItems);

    const id = useParams()
    const dispatch = useDispatch();
    const alert = useAlert();
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token
    const orderId = id

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAllOrderItems(token, orderId));


    }, [dispatch, alert, error, orderId]);

    return (
        <div>

            <Header />
            <Fragment>
                <div className="orderDetailsPage">
                    <div className="orderDetailsContainer">
                        <Typography component="h1">
                            Order #order && order._id
                        </Typography>
                        <Typography>Shipping Info</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p>Ime i prezime:</p>
                                <span>order.user && order.user.name</span>
                            </div>
                            <div>
                                <p>Broj telefona:</p>
                                <span>
                                    user.data.data.user.phoneNumber && order.shippingInfo.phoneNo
                                </span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>
                                    order.shippingInfo &&
                                    `$order.shippingInfo.address, $order.shippingInfo.city, $order.shippingInfo.state, $order.shippingInfo.pinCode, $order.shippingInfo.country`
                                </span>
                            </div>
                        </div>
                        <Typography>Payment</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p
                                    className={
                                        orderItems?.amount &&
                                            orderItems?.amount > 20000
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                >
                                    {orderItems?.amount &&
                                        orderItems?.amount > 20000
                                        ? "PAID"
                                        : "NOT PAID"}
                                </p>
                            </div>

                            <div>
                                <p>Amount:</p>
                                <span>{orderItems?.amount && orderItems?.amount}</span>
                            </div>
                        </div>


                    </div>

                    <div className="orderDetailsCartItems">
                        <Typography>Order Items:</Typography>
                        <div className="orderDetailsCartItemsContainer">
                            {orderItems && Array.isArray(orderItems) && orderItems.length > 0 ? (
                                orderItems.map((item) => (
                                    <div key={item.orderItemId}>
                                        <img src="https://cdn-icons-png.flaticon.com/128/3500/3500833.png" alt="Product" />
                                        <Link to={`/programs/${item.programId}`}>{item.programId}</Link>{" "}
                                        <span>{item.orderId}</span>
                                        <span>
                                            <b>RSD {item.amount}</b>
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p>No order items found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </Fragment>
            <Footer />
        </div>
    );
};

export default OrderDetails;