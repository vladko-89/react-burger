import api from '../../utils/api';

// Ingredients actions
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INGREDIENT_COUNT_INCREMENT = 'INGREDIENT_COUNT_INCREMENT';
export const INGREDIENT_COUNT_DECREMENT = 'INGREDIENT_COUNT_DECREMENT';
export const INGREDIENT_COUNT_CLEAR = 'INGREDIENT_COUNT_CLEAR';
export const INGREDIENT_COUNTS_CLEAR = 'INGREDIENT_COUNTS_CLEAR';

// Constructor actions
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR = 'DELETE_INGREDIENT_FROM_CONSTRUCTOR';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const DELETE_BUN_FROM_CONSTRUCTOR = 'DELETE_BUN_FROM_CONSTRUCTOR';
export const SORT_INGREDIENTS_IN_CONSTRUCTOR = 'SORT_INGREDIENTS_IN_CONSTRUCTOR';

// Ingredients_info actions
export const GET_INGREDIENT_INFO = 'GET_INGREDIENT_INFO';
export const CLEAR_INGREDIENT_INFO = 'CLEAR_INGREDIENT_INFO';

// Order actions
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const ADD_INGREDIENT_IN_ORDER = 'ADD_INGREDIENT_IN_ORDER';
export const DELETE_INGREDIENT_FROM_ORDER = 'DELETE_INGREDIENT_FROM_ORDER';
export const CALCULATE_COAST = 'CALCULATE_COAST';
export const CLEAR_ORDER = 'CLEAR_ORDER';
export const POST_ORDER_ERROR = 'POST_ORDER_ERROR';

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