import {Dispatch, Middleware, MiddlewareAPI} from '@reduxjs/toolkit';
import {isFetchAction, RootState} from '../types';

export const authMiddleware: Middleware<{}, RootState> = (store: MiddlewareAPI<Dispatch, RootState>) => (next) => (action) => {
  if (isFetchAction(action) && action.type.startsWith('api/')) {
    const token = store.getState().auth.token;
    if (token) {
      action.payload.headers = {
        ...action.payload.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return next(action);
};
