import {
    CREATE_PAYMENT_FAIL,
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    ALL_PAYMENT_FAIL,
    ALL_PAYMENT_REQUEST,
    ALL_PAYMENT_SUCCESS,
    CLEAR_ERRORS,
    PAYMENT_DETAILS_FAIL,
    PAYMENT_DETAILS_REQUEST,
    PAYMENT_DETAILS_SUCCESS
} from '../constants/paymentConstants'
import axios from 'axios';

export const newPaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CREATE_PAYMENT_SUCCESS:
            return {
                loading: false,
                payment: action.payload,
            };

        case CREATE_PAYMENT_FAIL:
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

const initialState = {
    loading: false,
    payments: [],
    error: null,
};

export const paymentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PAYMENT_REQUEST:
            return {
                loading: true,
                payments: [],
            };

        case ALL_PAYMENT_SUCCESS:
            return {
                loading: false,
                payments: action.payload,
                //     productsCount: action.payload.productsCount,
                //     resultPerPage: action.payload.resultPerPage,
                //     filteredProductsCount: action.payload.filteredProductsCount,
            };
        case ALL_PAYMENT_FAIL:
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
}

export const paymentDetailsReducer = (state = { payment: {} }, action) => {
    switch (action.type) {
      case PAYMENT_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case PAYMENT_DETAILS_SUCCESS:
        
        return {
          ...state,
          loading: false,
          payment: action.payload,
        };
  
      case PAYMENT_DETAILS_FAIL:
        return {
          ...state,
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
