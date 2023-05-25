import { FC } from 'react';
import Header from '../layouts/Header/Header';
import HeaderButton from '../UI/HeaderButton/HeaderButton';
import updateIcon from '../../images/update-icon.svg';
import newChatIcon from '../../images/new-chat-icon.svg';

interface IHeaderWithChat {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  updateState: () => Promise<void>;
  isButtonActive: boolean;
}

const HeaderWithChat: FC<IHeaderWithChat> = ({ setVisible, updateState,isButtonActive }) => {
  const menu = (
    <>
      <HeaderButton image={newChatIcon} callMenu={() => setVisible(true)} />
      <HeaderButton
        image={updateIcon}
        isButtonActive={isButtonActive}
        callMenu={isButtonActive?()=>{console.error('too many request')}:() => updateState().catch(console.error)}
      />
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
