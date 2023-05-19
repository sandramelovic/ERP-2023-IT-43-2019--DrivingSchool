import {
  CREATE_PAYMENT_FAIL,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  ALL_PAYMENT_FAIL,
  ALL_PAYMENT_REQUEST,
  ALL_PAYMENT_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/paymentConstants'
import axios from 'axios';

// Create Order
export const createPayment = (order, token, orderId) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PAYMENT_REQUEST });

    const userFromLocalS = JSON.parse(localStorage.getItem('user'))
    const user = userFromLocalS.data.user
    let newDate = new Date()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    console.log(order.paymentInfo.status)
    const data = await axios.post("http://localhost:4000/payment", {
      paid: new Date().toISOString().split("T")[0],
      details: JSON.stringify(order.shippingInfo),
      status: order.paymentInfo.status,
      orderId: orderId,
    }, config).then(res => {
      dispatch({
        type: CREATE_PAYMENT_SUCCESS,
        payload: res.data
      });
    }).catch(error => {
      console.log(error)
      dispatch({
        type: CREATE_PAYMENT_FAIL,
        payload: error.response.data?.message,
      });
    })

  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Payments
export const getAllPayments =
  (token) =>
    async dispatch => {
      try {
        dispatch({ type: ALL_PAYMENT_REQUEST });

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        //    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        //    if (category) {
        //      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        //    }

        const data = await axios.get("http://localhost:4000/payments", config);
        const payments = data.data

        dispatch({
          type: ALL_PAYMENT_SUCCESS,
          payload: payments,
        });

      } catch (error) {
        dispatch({
          type: ALL_PAYMENT_FAIL,
          payload: error.response.data.message,
        });
      }
    };

