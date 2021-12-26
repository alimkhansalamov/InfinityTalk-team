import React, { useState } from 'react';
import styles from './signin.module.css';
import miniLogo from '../../../assets/mini-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { authUser } from '../../../redux/features/Auth';

const SignInPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const errorSignIn = useSelector((state) => state.auth.errorSignIn);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeLogin = (ev) => {
    setLogin(ev.target.value);
  };

  const handleChangePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const handleAuth = () => {
    dispatch(authUser(login, password));

    setLogin('');
    setPassword('');
  };

  return (
    <div className={styles.main}>
      <div>
        <img className={styles.miniLogo} src={miniLogo} />
      </div>
      <h3>SIGN IN</h3>
      <input
        className={styles.input}
        type='text'
        placeholder='Login...'
        value={login}
        onChange={handleChangeLogin}
      />
      <input
        className={styles.input}
        type='password'
        placeholder='Password...'
        value={password}
        onChange={handleChangePassword}
      />
      <div>
        {errorSignIn && (
          <div id={styles.error} class='alert alert-danger' role='alert'>
            Ошибка авторизации!
          </div>
        )}
        <button
          type='button'
          className={`btn btn-outline-danger ${styles.signIn}`}
          onClick={handleAuth}
        >
          SIGN IN
        </button>
        {token && navigate('/')}
      </div>
    </div>
  );
};

export default SignInPage;
