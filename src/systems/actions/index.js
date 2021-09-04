import api from '../../utils/api';
import {SET_USERS_DATA_SUCCESS, USER_REQUEST, REQUEST_PASSWORD_RESET, USER_FAILED, ERROR_401, CLEAR_USER_STORE, USER_REQUEST_CLEAN} from './userActions';
import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  INGREDIENT_COUNT_INCREMENT,
  INGREDIENT_COUNT_DECREMENT,
  INGREDIENT_COUNT_CLEAR,
  INGREDIENT_COUNTS_CLEAR
} from './ingredientsActions';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  DELETE_BUN_FROM_CONSTRUCTOR,
  SORT_INGREDIENTS_IN_CONSTRUCTOR
} from './constructorsActions'
import {
  GET_INGREDIENT_INFO,
  CLEAR_INGREDIENT_INFO
} from './ingredientsInfoActions';
import {
  POST_ORDER_SUCCESS,
  POST_ORDER_REQUEST,
  POST_ORDER_FAILED,
  ADD_INGREDIENT_IN_ORDER,
  DELETE_INGREDIENT_FROM_ORDER,
  CALCULATE_COAST,
  CLEAR_ORDER,
  POST_ORDER_ERROR
} from './orderActions';


export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    api.getIngredients()
    .then((res) => {
      const newData = [];
      res.data.map(item => (
        newData.push({...item, counter: 0})
        ))
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        data: newData
      })
    })
    .catch(() => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      })
    });
  }
}

export function postOrder(data) {
  return function(dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    });
    if (data.length) {
      api.createOrder(data)
      .then((res) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          number: res.order.number
        })
        dispatch({type: INGREDIENT_COUNTS_CLEAR})
    })
      .catch(() => {
        dispatch({
          type: POST_ORDER_FAILED
        })
      })
    }
  }
}

export function registration(data) {
  //console.log(call);
  return function(dispatch) {
    dispatch({
      type: USER_REQUEST
    });
    if (data) {
      api.register(data)
      .then((res) => {
        if (res.accessToken && res.refreshToken) {
          localStorage.setItem('refresh', res.refreshToken);
          localStorage.setItem('token', res.accessToken);
        }
        dispatch({
          type:SET_USERS_DATA_SUCCESS,
          data: res.user
        });

      })
      .catch((res) => dispatch({type: USER_FAILED, status: res.status}))
    }
  }
}

export function login(data) {
  //console.log(call);
  return function(dispatch) {
    dispatch({
      type: USER_REQUEST
    });
    if (data) {
      api.login(data)
      .then((res) => {
        console.log(res)
        if (res.message === "email or password are incorrect") {
          dispatch({type: ERROR_401})
        }
        if (res.accessToken && res.refreshToken) {
          localStorage.setItem('refresh', res.refreshToken);
          localStorage.setItem('token', res.accessToken);
        }
        dispatch({
          type:SET_USERS_DATA_SUCCESS,
          data: res.user
        });

      })
      .catch((res) => {
        console.log(res);
        dispatch({type: USER_FAILED});
        
      })
    }
  }
}

export const refreshToken = (callback) => {
  return function(dispatch) {
    const token = localStorage.getItem('refresh');
    api.updateTokens(token).then(() => dispatch(callback))
  }
}

export function getUserInfo() {
  return function(dispatch) {
    dispatch({
      type: USER_REQUEST
    });
    api.getUserInfo()
    .then((res) => {
      if (!res.success) throw res;
      else {dispatch({
        type:SET_USERS_DATA_SUCCESS,
        data: res.user
      });}
    })
    .catch((res) => {
      if (res.message === 'jwt expired') {
        console.log(res)
        dispatch(refreshToken(getUserInfo()))
      }  
    })
  }
}

export function updateUserInfo(data) {
  return function(dispatch) {
    dispatch({
      type: USER_REQUEST
    });
    api.editUserInfo(data)
    .then((res) => {
      if (!res.success) throw res;
      else {dispatch({
        type:SET_USERS_DATA_SUCCESS,
        data: res.user
      });}
    })
    .catch((res) => {
      dispatch({type: USER_FAILED});
      console.log(res)
      if (res.message === 'jwt expired') {
        console.log(res)
        dispatch(refreshToken(updateUserInfo(data)))
      }  
    })
  }
}

export {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  INGREDIENT_COUNT_INCREMENT,
  INGREDIENT_COUNT_DECREMENT,
  INGREDIENT_COUNT_CLEAR,
  INGREDIENT_COUNTS_CLEAR,

  SET_USERS_DATA_SUCCESS,
  USER_REQUEST,
  USER_FAILED,
  CLEAR_USER_STORE,
  REQUEST_PASSWORD_RESET,
  USER_REQUEST_CLEAN,
  ERROR_401,

  ADD_INGREDIENT_TO_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  DELETE_BUN_FROM_CONSTRUCTOR,
  SORT_INGREDIENTS_IN_CONSTRUCTOR,

  GET_INGREDIENT_INFO,
  CLEAR_INGREDIENT_INFO,

  POST_ORDER_SUCCESS,
  POST_ORDER_REQUEST,
  POST_ORDER_FAILED,
  ADD_INGREDIENT_IN_ORDER,
  DELETE_INGREDIENT_FROM_ORDER,
  CALCULATE_COAST,
  CLEAR_ORDER,
  POST_ORDER_ERROR
}