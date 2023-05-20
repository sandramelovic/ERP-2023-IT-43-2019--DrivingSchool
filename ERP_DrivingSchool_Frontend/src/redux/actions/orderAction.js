import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/orderConstants";
import axios from "axios";
import {CREATE_PAYMENT_FAIL,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,} from '../constants/paymentConstants'
import { createPayment } from "./paymentAction";
import { createOrderItem } from "./orderItemsAction";
import { clearCart } from "./orderItemAction";


  // Get All Orders 
export const getAllOrders = (token) => async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDERS_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const data = await axios.get(`http://localhost:4000/orders`, config);
      const orders = data.data
      dispatch({ type: ALL_ORDERS_SUCCESS, payload: orders });
    } catch (error) {
      dispatch({
        type: ALL_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Get Order Details
export const getOrderDetails = (token, id) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
   
      const data  = await axios.get(`http://localhost:4000/order/${id}`, config)
      

      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Create Order
export const createOrder = (order, token) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    console.log(order)
    console.log(order.cartItems)
    const cartItems = order.orderItems
    const userFromLocalS = JSON.parse(localStorage.getItem('user'))
const user = userFromLocalS.data.user

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
   
    const  data  = await axios.post("http://localhost:4000/order", {
      total:order.totalPrice,
      date: new Date().toISOString().split("T")[0],
      userId: user.userId
    }, config).then(async (res) => {

      // Create payment
    await  dispatch(createPayment(order,token,res.data.orderId))

      // Create order items
      for (const item of cartItems) {
        await dispatch(createOrderItem(item, token, res.data.orderId));
      }
      dispatch(clearCart())
      dispatch({ 
        type: CREATE_ORDER_SUCCESS, 
        payload: res.data 
      });
    }).catch(error => {
      console.log(error)
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.response.data?.message,
      });
    })

  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data?.message,
    });
  }
};

  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };