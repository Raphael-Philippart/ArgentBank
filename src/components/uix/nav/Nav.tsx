import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {logout} from "../../../store/slices/authSlice";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {selectUserProfile} from "../../../store/selectors/authSelectors";
import Logo from "../logo/Logo";
import styles from './Nav.module.scss';

const Nav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userProfile = useAppSelector(selectUserProfile);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={styles.mainNav}>
      <Logo/>
      <div className={styles.mainNavContainer}>
        {userProfile && (
          <div>
            <Link
              className={`${styles.mainNavItem} ${isActive('/profile') ? styles.active : ''}`}
              to="/profile"
            >
              <FontAwesomeIcon icon={faUserCircle} size="1x"/>
              {userProfile.lastName}
            </Link>
          </div>
        )}
        {userProfile ? (
          <button
            className={styles.mainNavItem}
            onClick={handleLogout}
            style={{all: 'unset', cursor: 'pointer'}}
          >
            <FontAwesomeIcon icon={faSignOutAlt} size="1x"/>
            Sign Out
          </button>
        ) : (
          <Link
            className={`${styles.mainNavItem} ${isActive('/login') ? styles.active : ''}`}
            to="/login"
          >
            <FontAwesomeIcon icon={faUserCircle} size="1x"/>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
