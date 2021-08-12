import {
  ADD_INGREDIENT_IN_ORDER,
  DELETE_INGREDIENT_FROM_ORDER,
  CALCULATE_COAST,
  CLEAR_ORDER,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_ERROR
} from '../actions/index';

export const initialState = {
  coast: 0,
  orderNumber: 0,
  ingredientsOrder: [],
  orderRequest: false,
  orderFailed: false,
  orderError: false
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_IN_ORDER:
      return {...state, 
        ingredientsOrder: [...state.ingredientsOrder, action.id] }
    case DELETE_INGREDIENT_FROM_ORDER:
      return {...state, 
        ingredientsOrder: state.ingredientsOrder.filter(item => item.id !== action.id)
      }
    case POST_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true
      }
      case POST_ORDER_SUCCESS:
        return {
          ...state,
          orderFailed: false,
          orderRequest: false,
          ingredientsOrder: [],
          orderError: false,
          orderNumber: action.number
        }
      case POST_ORDER_FAILED:
        return {
          ...state,
          orderFailed: true,
          orderRequest: false
        }
    case CLEAR_ORDER:
      return initialState;
    case CALCULATE_COAST:
      return {...state, coast: action.items.reduce((acc, item) => item.type === 'bun' ? acc += item.price * 2 : acc += item.price, 0)}
    case POST_ORDER_ERROR:
      return {
        ...state,
        orderError: true
        }
    default:
      return state;
  }
}