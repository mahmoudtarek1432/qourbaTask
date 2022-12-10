import { createAction, props } from '@ngrx/store';
import { Account, AuthToken } from '../../shared/model/Account';

export const AccountLogin = createAction("[Account] Account Login", props<{token:string|null,isActive:boolean}>());
export const AccountLogout = createAction("[Account] Account Login");
