import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {fetchUserProfile} from "../../store/actions/authActions";
import {selectAuthToken, selectUserError, selectUserProfile} from "../../store/selectors/authSelectors";
import styles from "./User.module.scss";
import EditButton from "../../components/uix/profil/EditButton";
import Transactions from "../../components/uix/transactions/Transactions";

const Profil: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userProfile  = useAppSelector(selectUserProfile);
  const token  = useAppSelector(selectAuthToken);
  const error  = useAppSelector(selectUserError);

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
      <Transactions />
    </div>}
  </>
};

export default Profil;
