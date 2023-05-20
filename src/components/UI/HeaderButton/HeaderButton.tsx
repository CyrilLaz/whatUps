import { FC } from 'react';
import './HeaderButton.scss';

interface IHeaderButton {
  callMenu: () => void;
  image: string;
}

const HeaderButton: FC<IHeaderButton> = ({ callMenu, image }) => {
  return (
    <li onClick={callMenu} className='header-item'>
      <div
        style={{ backgroundImage: `url(${image})` }}
        className='header-item__button'
      ></div>
    </li>
  );
};

export default HeaderButton;
