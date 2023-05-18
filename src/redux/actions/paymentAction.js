import {
    CREATE_PAYMENT_FAIL,
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS
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
      const  data  = await axios.post("http://localhost:4000/payment", {
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
  