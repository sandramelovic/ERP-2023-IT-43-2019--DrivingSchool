import axios from 'axios'

/*export const addOrderItemToCart=(singleProduct)=>async dispatch=>{
    dispatch({type: 'LOADING', payload:true})

    try {
        const response = await axios.post('http://localhost:4000/orderItem')
        dispatch({type: 'ADD_ORDERITEM_TO_CART', payload:response.data})
        dispatch({type: 'LOADING', payload:false})
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})
    }
}

export const deleteOrderItemFromCart=(singleProduct)=>async dispatch=>{
    dispatch({type: 'LOADING', payload:true})

    try {
        const response = await axios.delete('http://localhost:4000/orderItem')
        dispatch({type: 'DELETE_ORDERITEM_FROM_CART', payload:response.data})
        dispatch({type: 'LOADING', payload:false})
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})
    }
}*/

export const addOrderItemToCart=(singleProduct)=>{

   return{
        type: 'ADD_ORDERITEM_TO_CART', 
        payload : singleProduct
   }
    
}

export const deleteOrderItemFromCart=(singleProduct)=>{

    return{
        type: 'DELETE_ORDERITEM_FROM_CART', 
        payload : singleProduct
    }
}

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: 'SAVE_SHIPPING_INFO',
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };

  export const clearCart = () => {
    return {
      type: 'CLEAR_CART',
    };
  };