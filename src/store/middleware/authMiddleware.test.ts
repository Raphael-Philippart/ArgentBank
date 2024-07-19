import {Dispatch, MiddlewareAPI} from '@reduxjs/toolkit';
import {FetchAction, RootState} from '../types';
import {authMiddleware} from './authMiddleware';

describe('authMiddleware', () => {
  let store: MiddlewareAPI<Dispatch<any>, RootState>;
  let next: Dispatch<any>;
  let invoke: (action: FetchAction | any) => any;

  beforeEach(() => {
    store = {
      getState: jest.fn(() => ({
        auth: {
          token: 'test-token',
          loading: false,
          error: null,
        },
      })),
      dispatch: jest.fn(),
    } as unknown as MiddlewareAPI<Dispatch<any>, RootState>;
    next = jest.fn();
    invoke = (action) => authMiddleware(store)(next)(action);
  });

  it('should add Authorization header if token is present', () => {
    const action: FetchAction = {
      type: 'api/test',
      payload: {
        headers: {},
      },
    };

    invoke(action);

    console.log('Authorization Header:', action.payload.headers?.Authorization); // Log du token ajouté aux headers
    expect(action.payload.headers?.Authorization).toBe('Bearer test-token');
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should not add Authorization header if token is not present', () => {
    store.getState = jest.fn(() => ({
      auth: {
        token: null,
        loading: false,
        error: null,
      },
    }));

    const action: FetchAction = {
      type: 'api/test',
      payload: {
        headers: {},
      },
    };

    invoke(action);

    console.log('Authorization Header:', action.payload.headers?.Authorization); // Log du header quand il n'y a pas de token
    expect(action.payload.headers?.Authorization).toBeUndefined();
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should pass through actions that are not fetch actions', () => {
    const action = {type: 'test'};

    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
  });
});
