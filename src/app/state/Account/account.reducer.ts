import { createReducer, on } from '@ngrx/store';
import { Account } from '../../shared/model/Account';

import { AccountLogin,AccountLogout } from './account.action';
import { initialState } from './account.state';


export const accountReducer = createReducer(
  initialState,
  on(AccountLogin, (state,action) => {
    return{
      ...state,
      token: action.token,
      isActive: action.isActive,
  }})
);
