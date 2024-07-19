import {Action} from '@reduxjs/toolkit';

export interface FetchAction extends Action<string> {
  payload: {
    headers?: Record<string, string>;
  };
}

export const isFetchAction = (action: Action<string> | any): action is FetchAction => {
  return action && action.payload && typeof action.payload.headers !== 'undefined';
};

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
}
