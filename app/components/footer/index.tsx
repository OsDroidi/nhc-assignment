import { NHCLogo, Vision2030 } from '../svgs';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles['footer-bg']}>
      <div className={styles['footer']}>
        <div className={styles['footer-logos']}>
          <NHCLogo className={styles['logo']} />
          <Vision2030 />
        </div>
        <div>
          All rights reserved © 2022 - Developed and operated by National
          Housing
        </div>
      </div>
    </footer>
  );
};

export default Footer;
