import { createAction, props } from '@ngrx/store';
import { Account, AuthToken } from '../../shared/model/Account';

export const UserCart = createAction("[Account] CartCount", props<{Count:number}>());
