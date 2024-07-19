import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchUserProfile, login, updateUserProfile} from '../actions/authActions';
import {User} from "../../types/types";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  userProfile: User | null;
}

const initialState: AuthState = {
  token: sessionStorage.getItem('authToken'),
  loading: false,
  error: null,
  userProfile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.userProfile = null;
      sessionStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
        state.loading = false;
        state.token = action.payload.token;
        sessionStorage.setItem('authToken', action.payload.token);
      })
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? 'An unknown error occurred';
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user profile';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.userProfile = {
          ...state.userProfile,
          ...action.payload,
        };
      })
      .addCase(updateUserProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update user profile';
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
