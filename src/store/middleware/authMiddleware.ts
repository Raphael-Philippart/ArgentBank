import {Dispatch, Middleware, MiddlewareAPI} from '@reduxjs/toolkit';
import {isFetchAction, RootState} from '../types';

/**
 * Middleware that adds an authentication token to API requests.
 *
 * This middleware checks if the action is a `fetch` action and if its type starts with `api/`.
 * If so, it adds an `Authorization` header with the authentication token to the request headers,
 * if the token is available in the store.
 *
 * @param {MiddlewareAPI<Dispatch, RootState>} store - The Redux MiddlewareAPI object, providing the `getState` method to access the store's state.
 * @returns {Middleware<{}, RootState>} A middleware function that takes `next` middleware and returns a function that processes actions.
 */
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
