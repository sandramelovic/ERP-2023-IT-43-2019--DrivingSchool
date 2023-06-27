import axios from 'axios'
import { message } from 'antd'
import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from '../constants/userConstants'

export const userLogin = (username, password) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST })

  try {
    const data = await axios.post('http://localhost:4000/login', {
      username: username,
      password: password
    })
    localStorage.setItem('user', JSON.stringify(data.data))
    localStorage.setItem('token', data.data.token)

    dispatch({ type: LOGIN_SUCCESS, payload: data.data })
    message.success('Uspešno ste se prijavili!')

    return data.data
  } catch (error) {
    console.log(error)
    message.error('something went wrong')
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
  }
}

export const userRegister = (reqObj) => async dispatch => {
  dispatch({ type: 'LOADING', payload: true })

  try {
    const response = await axios.post('http://localhost:4000/user', {
      nameSurename: reqObj.nameSurename,
      phoneNumber: reqObj.phoneNumber,
      jmbg: reqObj.jmbg,
      birthDate: reqObj.birthDate,
      address: reqObj.address,
      username: reqObj.username,
      password: reqObj.password
    })
    dispatch({ type: 'LOADING', payload: false })
    message.success('Uspešno ste se registrovali!')

    return response

    } catch (error) {
    if (error.response && error.response.status === 400) {
      message.error(error.response.data.msg);
    } else {
      console.log(error);
      message.error('Something went wrong');
    }
    dispatch({ type: 'LOADING', payload: false })
  }
}

export const logoutUser = (reqObj) => async dispatch => {
  dispatch({ type: 'LOADING', payload: true })

  try {
    const response = await axios.post('http://localhost:4000/logout')

    dispatch({ type: 'LOADING', payload: false })
    
    return response

  } catch (error) {
    console.log(error)
    message.error('something went wrong')
    dispatch({ type: 'LOADING', payload: false })
  }
}

// get All Users
export const getAllUsers = (token) => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    const data = await axios.get(`http://localhost:4000/users`, config);
    const users = data.data
    dispatch({ type: ALL_USERS_SUCCESS, payload: users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// get  User Details
export const getUserDetails = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    const data = await axios.get(`http://localhost:4000/user/${id}`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
export const updateUser = (id, userData, token) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    console.log(userData.get('role'))
    const data = await axios.put(
      `http://localhost:4000/user/${id}`,
      {
        nameSurename: userData.get("nameSurename"),
        phoneNumber: userData.get("phoneNumber"),
        jmbg: userData.get("jmbg"),
        address: userData.get("address"),
        username: userData.get("username"),
        role: userData.get('role')

      },
      config
    ).then(res => {
      console.log(res)
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data.success,
      });
    }).catch(error => {
      console.log(error)
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data?.message,
      });
    })

  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data?.message,
    });
  }
};

// Delete User
export const deleteUser = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.delete(`http://localhost:4000/user/${id}`,
      config).then(res => {
        dispatch({
          type: DELETE_USER_SUCCESS,
          payload: res.data.success,
        });

        //    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
      }).catch(error => {
        dispatch({
          type: DELETE_USER_FAIL,
          payload: error.response.data?.message,
        });
      })

  } catch (error) {
    console.log(error)
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data?.message,
    });
  }
};

export const updateProfile = (id, userData, token) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
console.log(userData.get("userImage"))
    const data = await axios.put(`http://localhost:4000/user/${id}`, {
      nameSurename: userData.get("nameSurename"),
      phoneNumber: userData.get("phoneNumber"),
      jmbg: userData.get("jmbg"),
      birthDate: userData.get("birthDate"),
      address: userData.get("address"),
      username: userData.get("username"),
      userImage: userData.get("userImage")

    }, config).then(res => {
      console.log(res)
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data.success,
      });
    }).catch(error => {
      console.log(error)
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data?.message,
      });
    })

  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};