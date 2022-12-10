import { createAction, props } from '@ngrx/store';
import { Account, AuthToken } from '../../shared/model/Account';

export const ProcessesLoading = createAction("[Account] Process state", props<{Count:number}>());
