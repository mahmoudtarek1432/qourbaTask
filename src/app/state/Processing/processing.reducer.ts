import { createReducer, on } from '@ngrx/store';
import { initialState } from './processing.state';
import { ProcessesLoading } from './processing.action';


export const processReducer = createReducer(
  initialState,
  on(ProcessesLoading, (state,action) => {
    return{
      ...state,
      count: action.Count
  }})
);
