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
    CREATE_ORDERITEM_SUCCESS
} from '../constants/orderItemsConstants'

export const allOrderItemReducer = (state = { orderItems: [] }, action) => {
    switch (action.type) {
      case ALL_ORDERITEM_REQUEST:
        return {
          loading: true,
        };
  
      case ALL_ORDERITEM_SUCCESS:
        return {
          loading: false,
          orderItems: action.payload[0],
        };
  
      case ALL_ORDERITEM_FAIL:
        return {
          loading: false,
          error: action.payload[0],
        };
      case CLEAR_ERRORS:
        return {
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const newOrderItemReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDERITEM_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CREATE_ORDERITEM_SUCCESS:
            return {
                loading: false,
                orderItem: action.payload,
            };

        case CREATE_ORDERITEM_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
