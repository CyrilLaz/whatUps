import React, { FC } from 'react';
import './Header.scss';

interface IHeader {
  urlAvatar: string;
  menu: JSX.Element;
  info?: JSX.Element;
}

const Header: FC<IHeader> = ({ menu, urlAvatar, info }): JSX.Element => {
  return (
    <header className='header'>
      <div className='header__info'>
        <img
          src={urlAvatar}
          alt='Изображение аватары пользователя'
          className='header__avatar'
        />
        {info}
      </div>
      <ul className='header__menu'>{menu}</ul>
    </header>
  );
};

export default Header;
