import { FC } from 'react';
import './HeaderButton.scss';

interface IHeaderButton {
  callMenu: () => void;
  image: string;
  isButtonActive?: boolean;
}

const HeaderButton: FC<IHeaderButton> = ({ callMenu, image,isButtonActive }) => {
  return (
    <li onClick={callMenu} className='header-item'>
      <div
        style={{ backgroundImage: `url(${image})` }}
        className={`header-item__button${isButtonActive?' header-item__button_active':''}`}
      ></div>
    </li>
  );
};

export default HeaderButton;
