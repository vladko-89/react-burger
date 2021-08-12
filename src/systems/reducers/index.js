import { combineReducers } from 'redux';
import { orderReducer } from '../reducers/orderReducer';
import { currentIngredientReducer } from '../reducers/currentIngredientReducer';
import { constructorListReducer } from '../reducers/constructorReducer';
import { ingredientsListReducer } from '../reducers/ingredientsReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsListReducer,
  burgerConstructor: constructorListReducer,
  order: orderReducer,
  currentIngredient: currentIngredientReducer
});