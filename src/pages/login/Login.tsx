import React, {useState} from 'react';
import {LoginType} from "../../types/types";
import {login} from "../../store/actions/authActions";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useNavigate} from 'react-router-dom';
import {selectLoginError, selectUserLoading} from "../../store/selectors/authSelectors";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import styles from './Login.module.scss';
import {unwrapResult} from '@reduxjs/toolkit';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectUserLoading);
  const loginError = useAppSelector(selectLoginError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const loginData: LoginType = { email, password };
    try {
      const resultAction = await dispatch(login(loginData));
      unwrapResult(resultAction);
      navigate('/profile');
    } catch (err) {
      console.log('Error')
    }
  };

  return (
    <div className={styles.signInPage}>
      <section className={styles.signInContent}>
        <FontAwesomeIcon icon={faUserCircle} className={styles.signInIcon} />
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn} data-bitwarden-watching="1">
          <div className={styles.inputWrapper}>
            <label htmlFor="email">Username</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>
          <div className={styles.inputRemember}>
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className={styles.signInButton} disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          {loginError && <p className={styles.error}>{loginError}</p>}
        </form>
      </section>
    </div>
  );
};

export default Login;
