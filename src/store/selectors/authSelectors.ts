import {createSelector} from 'reselect';
import {RootState} from "../index";

const selectAuthState = (state: RootState) => state.auth;

const selectUserProfile = createSelector(
  [selectAuthState],
  (auth) => auth.userProfile
);

const selectAuthToken = createSelector(
  [selectAuthState],
  (auth) => auth.token
);

const selectUserLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading
);

const selectUserError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

export {
  selectUserProfile,
  selectAuthToken,
  selectUserLoading,
  selectUserError,
}
