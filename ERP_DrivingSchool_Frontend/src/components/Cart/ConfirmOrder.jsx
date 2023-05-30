import React, { Fragment } from "react";
import axios from "axios";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import uploadPhotoGrayBack from '../../assets/uploadPhotoGrayBack.png'
import { setCategory } from '../../redux/actions/categoryActions'
import { setProgramType } from "../../redux/actions/categoryActions";
import { useDispatch } from "react-redux";
import { createOrder, clearErrors } from "../../redux/actions/orderAction";

const ConfirmOrder = ({ history }) => {
  const shippingInfo = useSelector((state) => state.shippingInfo);
  const cartItems = useSelector((state) => state.orderItemReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userFromLocalS = localStorage.getItem('user')
  const user = JSON.parse(userFromLocalS).data.user

  let subtotal = 0
  cartItems.forEach((item) => {
    subtotal += item.price;
  });

  const itemList = (item) => {

    return (
      <li className="list-group-item d-flex justify-content-between lh-sm">
        <div>
          <h6 className="my-0">Naslov</h6>
        </div>
        <span className="text-muted">RSD {item.price}</span>
      </li>
    );
  }

  const shippingCharges = subtotal > 50000 ? 0 : 200;

  const tax = subtotal * 0.05;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    const paymentData = {
      amount: Math.round(data.totalPrice * 100),
      userId: user.userId,
      cartItems: cartItems,
      token: JSON.parse(userFromLocalS).token
    };
  
    //   sessionStorage.setItem("orderInfo", JSON.stringify(data));
    //  navigate("/process/payment");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userFromLocalS.token}`
        },
      };
      axios.post(
        "http://localhost:4000/order/confirm",
        paymentData,
        config
      ).then((response) => {
        console.log(response)
        if (response.data.url) {
        //  dispatch(createOrder(response.data.newOrder, userFromLocalS.token));
          
          window.location.href = response.data.url;
        }
      })
        .catch((err) => console.log(err.message));
    }
  
  catch (error) {
    //  payBtn.current.disabled = false;
    alert.error(error.response.data?.message);
  }
}

  return (
    <div>
      <Header />
      <Fragment>
        <h1 className="text-center"> <span className="stroke-text display-6 fw-bolder" style={{ color: 'var(--darkGrey)' }}>Potvrdi</span><span className="display-6 fw-bolder text-light"> porudzbinu </span></h1>
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage">
          <div>
            <div className="confirmshippingArea">
              <Typography >Podaci za isporuku</Typography>
              <div className="confirmshippingAreaBox">
                <div>
                  <p>Ime i prezime:</p>
                  <span>{user.nameSurename}</span>
                </div>
                <div>
                  <p>Broj telefona:</p>
                  <span>{shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Adresa:</p>
                  <span>{address}</span>
                </div>
              </div>
            </div>
            <div className="confirmCartItems">
              <Typography>Programi u korpi:</Typography>
              <div className="confirmCartItemsContainer">
                {cartItems &&
                  cartItems.map((item) => (
                    itemList(item),
                    <div key={item.programId}>
                      <img src={item.programImage ? require(`../../assets/${item.programImage}`) : uploadPhotoGrayBack} alt="Product" />
                      <Link to={`/programs/${item.programId}`}>
                        {setCategory(item.categoryId)}
                      </Link>{" "}
                      <span>
                        <b>{item.price} RSD</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/*  */}
          <div>
            <div className="orderSummary">
              <Typography>Pregled porudžbine</Typography>
              <div>
                <div>
                  <p>Međuzbir:</p>
                  <span>{subtotal} RSD</span>
                </div>
              </div>

              <div className="orderSummaryTotal">
                <p>
                  <b>Ukupno:</b>
                </p>
                <span>{subtotal} RSD</span>
              </div>

              <button onClick={proceedToPayment}>Idi na plaćanje</button>
            </div>
          </div>
        </div>
      </Fragment>
      <Footer />
    </div>
  );
};

export default ConfirmOrder;