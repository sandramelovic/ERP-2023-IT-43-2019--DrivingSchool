import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import uploadPhotoGrayBack from '../../assets/uploadPhotoGrayBack.png'
import {setCategory} from '../../redux/actions/categoryActions'

const ConfirmOrder = ({ history }) => {
  const  shippingInfo  = useSelector((state) => state.shippingInfo);
  const  cartItems  = useSelector((state) => state.orderItemReducer);
const navigate = useNavigate();
  //const { user } = useSelector((state) => state.user);
  const userFromLocalS = localStorage.getItem('user')
  const user = JSON.parse(userFromLocalS).data.user

 /* const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );*/
  var subtotal = 0;
    const itemList = (item) => {
        subtotal = subtotal + item.price;
        return (
            <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 className="my-0">Naslov</h6>
                </div>
                <span className="text-muted">RSD {item.price}</span>
            </li>
        );
    }

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <div>
        <Header/>
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
              <div>
                <p>Dostava:</p>
                <span>{shippingCharges} RSD</span>
              </div>
              <div>
                <p>Takse:</p>
                <span>{tax} RSD</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Ukupno:</b>
              </p>
              <span>{subtotal + shippingCharges + tax} RSD</span>
            </div>

            <button onClick={proceedToPayment}>Idi na plaćanje</button>
          </div>
        </div>
      </div>
    </Fragment>
    <Footer/>
    </div>
  );
};

export default ConfirmOrder;