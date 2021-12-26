import React from 'react';
import css from './header.module.css'
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/Logo.png'
import ShowModal from '../Modal/Modal';


const Header = () => {

  return (
    <div className={css.main}>
      <div className={css.logo}>
        <NavLink to='/'> <img src={logo}/> </NavLink>
      </div>
      <div className={css.navbar}>
          <NavLink to='/utilities' className={css.websites}> WEBSITES & APPS  </NavLink>
          <NavLink to='/partners' className={css.findpartner}> FIND A PARTNER  </NavLink>
          <NavLink to='/message' className={css.messages}> MESSAGES  </NavLink>
      </div>
      <div className={css.profileBlock}>
        <ShowModal/>
      </div>

    </div>
  );
};

export default Header;