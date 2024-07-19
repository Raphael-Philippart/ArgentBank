import React, {useEffect, useState} from 'react';
import {LoginData} from "../../types/types";
import {login} from "../../store/actions/authActions";
import {useAppDispatch} from "../../store/hooks";
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {selectAuthToken, selectUserError, selectUserLoading} from "../../store/selectors/authSelectors";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import styles from './SignIn.module.scss';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const token = useSelector(selectAuthToken);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    const loginData: LoginData = {email, password};
    dispatch(login(loginData));
  };

  useEffect(() => {
    if (token && !error && error !== 'invalid token') {
      navigate('/user');
    }
  }, [token, navigate, error]);

  return <div className={styles.signInPage}>
    <section className={styles.signInContent}>
      <FontAwesomeIcon icon={faUserCircle} className={styles.signInIcon}/>
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
          <input type="checkbox" id="remember-me"/>
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className={styles.signInButton} disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </section>
  </div>
};

export default SignIn;
