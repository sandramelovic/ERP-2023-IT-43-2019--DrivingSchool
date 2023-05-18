import {
    CREATE_PAYMENT_FAIL,
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS
} from '../constants/paymentConstants'
import axios from 'axios';

export const newOrderReducer = (state = {}, action) => {
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