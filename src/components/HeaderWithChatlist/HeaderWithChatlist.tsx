import { FC } from 'react';
import Header from '../layouts/Header/Header';
import HeaderButton from '../UI/HeaderButton/HeaderButton';
import moreIcon from '../../images/more-icon.svg';
import newChatIcon from "../../images/new-chat-icon.svg";

const HeaderWithChatlist: FC = () => {
  const menu = (
    <>
      <HeaderButton image={newChatIcon} callMenu={() => console.log('button')} />
      <HeaderButton image={moreIcon} callMenu={() => console.log('button')} />
    </>
  );
  return (
    <Header
      urlAvatar='https://i.ytimg.com/vi/In11LnTuLvg/maxresdefault.jpg'
      menu={menu}
    />
  );
};

export default HeaderWithChatlist;
