import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  DELETE_BUN_FROM_CONSTRUCTOR,
  SORT_INGREDIENTS_IN_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR
} from '../actions/index';

export const initialState = {
  items: []
};

export const constructorListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      return {...state, items: [...state.items, action.item]}
    case DELETE_INGREDIENT_FROM_CONSTRUCTOR:
      return {...state, items: state.items.filter( item => item.uuid !== action.uuid)}
    case DELETE_BUN_FROM_CONSTRUCTOR:
      return {...state, items: state.items.filter( item => item.type !== 'bun')}
    case SORT_INGREDIENTS_IN_CONSTRUCTOR:
      return {...state, items: action.data}
    case CLEAR_CONSTRUCTOR:
      return initialState;
    default:
      return state;
  }
}