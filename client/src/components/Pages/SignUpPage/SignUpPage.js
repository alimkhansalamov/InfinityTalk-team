import React, { useState } from 'react';
import styles from './signup.module.css';
import miniLogo from '../../../assets/mini-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../redux/features/Auth';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const errorEmail = useSelector((state) => state.auth.errorEmail);

  const Russian = '61c042c69dbc13d9692e46db';
  const English = '61c042d19dbc13d9692e46dd';
  const Spanish = '61c042d79dbc13d9692e46df';
  const French = '61c042dd9dbc13d9692e46e1';
  const Arabic = '61c042e29dbc13d9692e46e3';
  const Deutsch = '61c042e79dbc13d9692e46e5';

  const successSingUp = useSelector((state) => state.auth.successSingUp);
  const errorSignUp = useSelector((state) => state.auth.errorSignUp);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [defaultLanguage, setDefaultLanguage] = useState(Russian);
  const [learnLanguage, setLearnLanguage] = useState(English);

  const handleChangeName = (ev) => {
    setName(ev.target.value);
  };

  const handleChangeEmail = (ev) => {
    setEmail(ev.target.value);
  };

  const handleChangeLogin = (ev) => {
    setLogin(ev.target.value);
  };

  const handleChangePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const handleSubmit = () => {
    //функция проверки email
    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(email);
    }
    if (validateEmail(email)) {
      dispatch(
        createUser(name, email, login, password, defaultLanguage, learnLanguage)
      );
    } else {
      dispatch({ type: 'auth/signup/emailRejected' });
    }
    setName('');
    setEmail('');
    setLogin('');
    setPassword('');
  };

  const handleSelectDefault = (ev) => {
    setDefaultLanguage(ev.target.value);
  };

  const handleSelectLearn = (ev) => {
    setLearnLanguage(ev.target.value);
  };

  return (
    <div className={styles.main}>
      <div>
        <img className={styles.miniLogo} src={miniLogo} />
      </div>
      <h3>SIGN UP</h3>
      <input
        className={styles.input}
        placeholder='Name...'
        value={name}
        onChange={handleChangeName}
      />
      <input
        className={styles.input}
        placeholder='Email...'
        value={email}
        onChange={handleChangeEmail}
      />
      <br />
      <input
        type='email'
        className={styles.input}
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
      <br />
      <div>
        <b>I speak:</b>
        <b>I want to learn:</b>
      </div>
      <select
        value={defaultLanguage}
        onChange={handleSelectDefault}
        className={styles.input}
      >
        <option value={Russian}>Russian</option>
        <option value={English}>English</option>
        <option value={Spanish}>Spanish</option>
        <option value={French}>French</option>
        <option value={Arabic}>Arabic</option>
        <option value={Deutsch}>Deutsch</option>
      </select>
      <select
        value={learnLanguage}
        onChange={handleSelectLearn}
        className={styles.input}
      >
        <option value={English}>English</option>
        <option value={Russian}>Russian</option>
        <option value={Spanish}>Spanish</option>
        <option value={French}>French</option>
        <option value={Arabic}>Arabic</option>
        <option value={Deutsch}>Deutsch</option>
      </select>
      {errorSignUp && (
        <div id={styles.error} class='alert alert-danger' role='alert'>
          Ошибка регистрации!
        </div>
      )}
      {errorEmail === false && (
        <div id={styles.error} class='alert alert-danger' role='alert'>
          Некорректно введен email
        </div>
      )}
      <div>
        <button
          type='button'
          className={`btn btn-outline-success ${styles.signUp}`}
          onClick={handleSubmit}
        >
          SIGN UP
        </button>
        {successSingUp && navigate('/signIn')}
      </div>
    </div>
  );
};

export default SignUpPage;
