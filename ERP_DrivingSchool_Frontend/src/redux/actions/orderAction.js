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
export const getOrderDetails = (id, token) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const data  = await axios.get(`http://localhost:4000/order/${id}`, config);
  
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

    const userFromLocalS = JSON.parse(localStorage.getItem('user'))
const user = userFromLocalS.data.user

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
   
    const  data  = await axios.post("http://localhost:4000/order", {
      total:order.itemsPrice,
      date: new Date().toISOString().split("T")[0],
      userId: user.userId
    }, config).then(res => {
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