import { FC } from 'react';
import Header from '../layouts/Header/Header';
import HeaderButton from '../UI/HeaderButton/HeaderButton';
import moreIcon from '../../images/more-icon.svg';
import newChatIcon from '../../images/new-chat-icon.svg';

interface IHeaderWithChat {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  updateState: ()=>Promise<void>
}

const HeaderWithChat: FC<IHeaderWithChat> = ({ setVisible,updateState }) => {
  const menu = (
    <>
      <HeaderButton
        image={newChatIcon}
        callMenu={() => setVisible(true)}
      />
      <HeaderButton image={moreIcon} callMenu={() => updateState()} />
    </>
  );
  return (
    <Header
      urlAvatar='https://i.ytimg.com/vi/In11LnTuLvg/maxresdefault.jpg'
      menu={menu}
    />
  );
};

export default HeaderWithChat;
