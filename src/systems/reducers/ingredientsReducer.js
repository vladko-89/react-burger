import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  INGREDIENT_COUNT_INCREMENT,
  INGREDIENT_COUNT_DECREMENT,
  INGREDIENT_COUNTS_CLEAR,
  INGREDIENT_COUNT_CLEAR
} from '../actions/index';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
};

export const ingredientsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequest: true
      }
    case GET_INGREDIENTS_SUCCESS:
      return  {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.data
      }
      case GET_INGREDIENTS_FAILED:
      return  {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      }
    case INGREDIENT_COUNT_INCREMENT:
      return {
        ...state,
        ingredients: state.ingredients.map(item => item._id === action.id ? {...item, counter: item.counter + action.counter} : item)
      }
    case INGREDIENT_COUNT_DECREMENT:
      return {
        ...state,
        ingredients: state.ingredients.map(item => item._id === action.id ? {...item, counter: item.counter - action.counter} : item)
      }
      case INGREDIENT_COUNT_CLEAR:
        return {
          ...state,
          ingredients: state.ingredients.map(item => item.type === 'bun' ? {...item, counter: 0} : item)
        }
      case INGREDIENT_COUNTS_CLEAR:
        return {
          ...state,
          ingredients: state.ingredients.map(item => { return {...item, counter: 0}})
        }
    default:
      return state;
  }
}