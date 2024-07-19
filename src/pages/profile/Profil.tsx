import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useAppDispatch} from '../../store/hooks';
import {fetchUserProfile} from "../../store/actions/authActions";
import {selectAuthToken, selectUserError, selectUserProfile} from "../../store/selectors/authSelectors";
import styles from "./User.module.scss";
import EditButton from "../../components/uix/profil/EditButton";

const Profil: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userProfile  = useSelector(selectUserProfile);
  const token  = useSelector(selectAuthToken);
  const error  = useSelector(selectUserError);

  useEffect(() => {
    if (!token || error === 'invalid token') {
      navigate('/login');
    }
  }, [token, navigate, error]);

  useEffect(() => {
    if (!userProfile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, userProfile]);

  return <>
    {userProfile && <div className={styles.userPage}>
      <h1>Welcome back <br/> {userProfile?.firstName} {userProfile?.lastName}!</h1>
      <EditButton />
    </div>}
  </>
};

export default Profil;
