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
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { getOrderDetails } from "../../redux/actions/orderAction";
import { getAllPayments } from "../../redux/actions/paymentAction";
import { setCategory, setProgramType } from "../../redux/actions/categoryActions";
import { getProduct } from "../../redux/actions/productAction";
import uploadPhotoGrayBack from '../../assets/uploadPhotoGrayBack.png'

const OrderDetails = () => {
    const { orderItems } = useSelector((state) => state.allOrderItems);
    const { products } = useSelector((state) => state.products)

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const {payments} = useSelector((state) => state.allPayments)

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
        dispatch(getOrderDetails(token, orderId.id));
        dispatch(getAllPayments(token))
        dispatch(getAllOrderItems(token, orderId));


    }, [dispatch, alert, error, orderId.id]);

    const paymentArray = payments.find(paymentArr => paymentArr.length > 0 && paymentArr[0].orderId === order.orderId);
    const payment = paymentArray ? paymentArray[0] : null;
    const status = payment ? payment.status : "Unknown";

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProduct())
       
    }, [dispatch, error])
    return (
        <div>

            <Header />
            <Fragment>
                <div className="orderDetailsPage">
                    <div className="orderDetailsContainer">
      
                        <Typography component="h1">
                        Porudžbina br. #{order && order.orderId}
                        </Typography>
                        <Typography>Podaci isporuke</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p>Ime i prezime:</p>
                                <span>{user.data.user.nameSurename}</span>
                            </div>
                            <div>
                                <p>Broj telefona:</p>
                                <span>
                                    {user.data.user.phoneNumber}
                                </span>
                            </div>
                            <div>
                                <p>Datum isporuke:</p>
                                <span>
                                   {order.date}
                                </span>
                            </div>
                        </div>
                        <Typography>Plaćanje</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                
                                <p
                                    className={
                                        status &&
                                        status === 'succeeded'
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                > <span>
                                    { status &&
                                        status === 'succeeded'
                                        ? "PLAĆENO"
                                        : "NIJE PLAĆENO"}
                                </span>
                                   
                                </p>
                            </div>

                            <div>
                                <p>Ukupno:</p>
                                <span>{order.total},00 RSD</span>
                            </div>
                        </div>


                    </div>

                    <div className="orderDetailsCartItems">
                        <Typography>Stavke porudžbine:</Typography>
                        <div className="orderDetailsCartItemsContainer">
                            {orderItems && Array.isArray(orderItems) && orderItems.length > 0 ? (
                                orderItems.map((item) => (
                                    <div key={item.orderItemId}>
                                        <img src={(products.find(program => program.programId === item.programId).programImage) ? require(`../../assets/${products.find(program => program.programId === item.programId).programImage}`) : uploadPhotoGrayBack } alt="Product" />

                                        <Link to={`/programs/${item.programId}`}>{setCategory(products.find(program => program.programId === item.programId).categoryId)} - {setProgramType(products.find(program => program.programId === item.programId).programTypeId)}</Link>{" "}
                                        
                                        <span>
                                            <b> {item.amount},00 RSD</b>
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-danger"><WarningAmberIcon></WarningAmberIcon><span>Nisu pronađene stavke porudžbine.</span></p>
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