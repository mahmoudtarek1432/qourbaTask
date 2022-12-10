import { createReducer, on } from '@ngrx/store';
import { initialState } from './cart.state';
import { UserCart } from './cart.action';


export const CartReducer = createReducer(
  initialState,
  on(UserCart, (state,action) => {
    return{
      ...state,
      count: action.Count
  }})
);
