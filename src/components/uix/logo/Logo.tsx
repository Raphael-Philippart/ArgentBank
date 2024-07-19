import React from 'react';
import styles from './Logo.module.scss';
import LogoIMG from './argentBankLogo.png';

const Logo = () => {
  return <a className={styles.mainNavLogo} href="/">
    <img
      className={styles.mainNavLogoImage}
      src={LogoIMG}
      alt="Argent Bank Logo"
    />
    <h1 className="sr-only">Argent Bank</h1>
  </a>
};

export default Logo;
