import axios from "axios";
import {
    ALL_ORDERITEM_REQUEST,
    ALL_ORDERITEM_SUCCESS,
    ALL_ORDERITEM_FAIL,
    ORDERITEM_DETAILS_FAIL,
    ORDERITEM_DETAILS_REQUEST,
    ORDERITEM_DETAILS_SUCCESS,
    CLEAR_ERRORS,
    CREATE_ORDERITEM_FAIL,
    CREATE_ORDERITEM_REQUEST,
    CREATE_ORDERITEM_SUCCESS,
} from '../constants/orderItemsConstants'

 // Get All OrderItems
 export const getAllOrderItems = (token,id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDERITEM_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const data = await axios.get(`http://localhost:4000/orderItems`, config);
      const orderItems = data.data
      const filteredOrderItems = orderItems.filter(subArray => subArray.some(element => element.orderId == id.id));
     
      dispatch({ type: ALL_ORDERITEM_SUCCESS, payload: filteredOrderItems });
    } catch (error) {
      dispatch({
        type: ALL_ORDERITEM_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Create Order item
export const createOrderItem = (item, token, orderId) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDERITEM_REQUEST });

    const userFromLocalS = JSON.parse(localStorage.getItem('user'))
    const user = userFromLocalS.data.user

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    const data = await axios.post("http://localhost:4000/orderItem", {
      amount: item.price,
      programId: item.programId,
      orderId: orderId,
    }, config).then(res => {
      dispatch({
        type: CREATE_ORDERITEM_SUCCESS,
        payload: res.data
      });
    }).catch(error => {
      console.log(error)
      dispatch({
        type: CREATE_ORDERITEM_FAIL,
        payload: error.response.data?.message,
      });
    })

  } catch (error) {
    dispatch({
      type: CREATE_ORDERITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};


   // Clearing Errors
   export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };