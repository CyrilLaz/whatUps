import React from 'react';
import './Header.scss';

interface IHeader {
  urlAvatar: string;
  callMenu?: () => void;
  children?: JSX.Element;
}

const Header: React.FC<IHeader> = (props): JSX.Element => {
  return (
    <header className='header'>
      <div className='header__info'>
        <img
          src={props.urlAvatar}
          alt='Изображение аватары пользователя'
          className='header__avatar'
        />
        {props.children || null}
      </div>
      <ul className='header__menu'>
        <li onClick={props.callMenu} className='header__menu-item'>
          <div className='header__button'></div>
        </li>
      </ul>
    </header>
  );
};

export default Header;
