import {
  GET_INGREDIENT_INFO,
  CLEAR_INGREDIENT_INFO
} from '../actions/index';

export const initialState = {};

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENT_INFO:
      return action.item;
    case CLEAR_INGREDIENT_INFO:
      return initialState;
    default:
      return state;
  }

}