import React from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import {logout} from "../../../store/slices/authSlice";
import {useAppDispatch} from "../../../store/hooks";
import {selectUserProfile} from "../../../store/selectors/authSelectors";
import Logo from "../logo/Logo";
import styles from './Nav.module.scss';

const Nav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(selectUserProfile);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in');
  };

  return <nav className={styles.mainNav}>
    <Logo/>
    <div className={styles.mainNavContainer}>
      {userProfile && <div>
        <a className={styles.mainNavItem} href="/user">
          <FontAwesomeIcon icon={faUserCircle} size="1x"/>
          {userProfile.lastName}
        </a>
      </div>}
      {userProfile ?
        <button className={styles.mainNavItem} onClick={handleLogout} style={{all: 'unset', cursor: 'pointer'}}>
          <FontAwesomeIcon icon={faSignOutAlt} size="1x"/>
          Sign Out
        </button> :
        <a className={styles.mainNavItem} href="/sign-in">
          <FontAwesomeIcon icon={faUserCircle} size="1x"/>
          Sign In
        </a>}
    </div>
  </nav>
};

export default Nav;
