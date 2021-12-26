import React from 'react';
import styles from './home.module.css';
import logoHome from '../../../assets/logo.png';
import slogan from '../../../assets/slogan.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Friends from '../../../assets/images/2047.jpeg';
import FindPartnerPage from '../FindPartnerPage';

const HomePage = () => {
  let navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      {token ? (
        <FindPartnerPage />
      ) : (
        <div className={styles.main}>
          <div className={styles.imgDiv}>
            <img className={styles.logo} src={logoHome} />
            <img className={styles.slogan} src={slogan} />
          </div>
          <div>
            <button
              type='button'
              className={`btn btn-outline-danger ${styles.signIn}`}
              onClick={async () => {
                navigate(`/signIn`);
              }}
            >
              SIGN IN
            </button>
            <button
              type='button'
              className={`btn btn-outline-success ${styles.signUp}`}
              onClick={async () => {
                navigate(`/signUp`);
              }}
            >
              SIGN UP
            </button>
          </div>
          <img className={styles.divan} src={Friends}/>
        </div>
      )}
    </>
  );
};

export default HomePage;
