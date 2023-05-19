import axios from "axios";


import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_REQUEST,
} from "../constants/productConstants"
import { json } from "react-router-dom";

// Get All Products
export const getProduct =
  () =>
    async dispatch => {
      try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        //    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        //    if (category) {
        //      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        //    }

        const data = await axios.get("http://localhost:4000/programs");
        const products = data.data

        dispatch({
          type: ALL_PRODUCT_SUCCESS,
          payload: products,
        });

      } catch (error) {
        dispatch({
          type: ALL_PRODUCT_FAIL,
          payload: error.response.data.message,
        });
      }
    };


// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const data = await axios.get(`http://localhost:4000/programs/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const data = await axios.get("http://localhost:4000/programs");
    const products = data.data

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData, token) => async (dispatch) => {

  try {

    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    for (const value of productData.values()) {
      console.log(value);
    }
    const { data } = await axios.put(
      `http://localhost:4000/programs/${id}`,
      productData,
      config
    ).then(res => {
      console.log(res)

      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: res.data.success,
      });
    }).catch(error => {
      console.log(error)
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data?.message,
      });
    })


  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Delete Product
export const deleteProduct = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    const data = await axios.delete(
      `http://localhost:4000/programs/${id}`,
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    ).then(res => {
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: res.data.success,
      });
    }).catch(error => {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data?.message,
      });
    })


  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data?.message,
    });
  }
};

// Create Product
export const createProduct = (productData, token) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    for (const value of productData.values()) {
      console.log(value);
    }
    console.log(token);

    const  data  = await axios.post(
      'http://localhost:4000/programs',
      productData,
      config
    ).then(res => {
      console.log(res);

      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: res.data,
      });
    }).catch(error => {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data?.message,
      });
    })

  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data?.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

