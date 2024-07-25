import {createSelector} from 'reselect';
import {RootState} from "../index";
import {AuthState} from "../slices/authSlice";

/**
 * Selector to retrieve the authentication state from the global state.
 * @param {RootState} state - The global state of the application.
 * @returns {AuthState} - The authentication state.
 */
const selectAuthState = (state: RootState): AuthState => state.auth;

/**
 * Selector to retrieve the user profile from the authentication state.
 * @param {RootState} state - The global state of the application.
 * @returns {User | null} - The user profile or null if not available.
 */
const selectUserProfile = createSelector(
  [selectAuthState],
  (auth) => auth.userProfile
);

/**
 * Selector to retrieve the authentication token from the authentication state.
 * @param {RootState} state - The global state of the application.
 * @returns {string | null} - The authentication token or null if not available.
 */
const selectAuthToken = createSelector(
  [selectAuthState],
  (auth) => auth.token
);

/**
 * Selector to retrieve the authentication loading state from the authentication state.
 * @param {RootState} state - The global state of the application.
 * @returns {boolean} - True if an authentication operation is in progress, otherwise false.
 */
const selectUserLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading
);

/**
 * Selector to retrieve the authentication error message from the authentication state.
 * @param {RootState} state - The global state of the application.
 * @returns {string | null} - The error message or null if there is no error.
 */
const selectUserError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

/**
 * Selector to retrieve the login error message from the authentication state.
 * @param {RootState} state - The global state of the application.
 * @returns {string | null} - The login error message or null if there is no error.
 */
const selectLoginError = createSelector(
  [selectAuthState],
  (auth) => auth.loginError
);

export {
  selectUserProfile,
  selectAuthToken,
  selectUserLoading,
  selectUserError,
  selectLoginError
}
