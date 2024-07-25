import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchUserProfile, login, updateUserProfile} from '../actions/authActions';
import {User} from "../../types/types";

/**
 * Interface for the authentication state.
 *
 * @interface AuthState
 * @property {string | null} token - The authentication token of the user, or null if not authenticated.
 * @property {boolean} loading - Indicates if an authentication operation is in progress.
 * @property {string | null} error - Error message in case of operation failure, or null if no error.
 * @property {string | null} loginError - Specific login error message, or null if no error.
 * @property {User | null} userProfile - The authenticated user's profile, or null if not available.
 */
export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  loginError: string | null;
  userProfile: User | null;
}

const initialState: AuthState = {
  token: sessionStorage.getItem('authToken'),
  loading: false,
  error: null,
  loginError: null,
  userProfile: null,
};

/**
 * Slice for managing authentication state.
 *
 * @type {Object}
 * @property {Function} actions - The actions generated by this slice.
 * @property {Function} reducer - The reducer generated by this slice.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Logs out the user by removing the token and profile from state and session storage.
     * @param {AuthState} state - The current authentication state.
     */
    logout(state) {
      state.token = null;
      state.userProfile = null;
      sessionStorage.removeItem('authToken');
    }
  },
  extraReducers: (builder) => {
    builder
      /**
       * Triggered when login is pending.
       * @param {AuthState} state - The current authentication state.
       */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      /**
       * Triggered when login is successful.
       * @param {AuthState} state - The current authentication state.
       * @param {PayloadAction<{ token: string }>} action - Action containing the authentication token.
       */
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
        state.loading = false;
        state.token = action.payload.token;
        sessionStorage.setItem('authToken', action.payload.token);
      })
      /**
       * Triggered when login fails.
       * @param {AuthState} state - The current authentication state.
       * @param {PayloadAction<string | undefined>} action - Action containing the error message.
       */
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.loginError = action.payload ?? 'An unknown error occurred';
      })
      /**
       * Triggered when fetching the user profile is pending.
       * @param {AuthState} state - The current authentication state.
       */
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      /**
       * Triggered when fetching the user profile is successful.
       * @param {AuthState} state - The current authentication state.
       * @param {PayloadAction<User>} action - Action containing the user profile.
       */
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      /**
       * Triggered when fetching the user profile fails.
       * @param {AuthState} state - The current authentication state.
       * @param {PayloadAction<string | undefined>} action - Action containing the error message.
       */
      .addCase(fetchUserProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user profile';
      })
      /**
       * Triggered when updating the user profile is pending.
       * @param {AuthState} state - The current authentication state.
       */
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      /**
       * Triggered when updating the user profile is successful.
       * @param {AuthState} state - The current authentication state.
       * @param {PayloadAction<User>} action - Action containing the updated user profile data.
       */
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.userProfile = {
          ...state.userProfile,
          ...action.payload,
        };
      })
      /**
       * Triggered when updating the user profile fails.
       * @param {AuthState} state - The current authentication state.
       * @param {PayloadAction<string | undefined>} action - Action containing the error message.
       */
      .addCase(updateUserProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update user profile';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
