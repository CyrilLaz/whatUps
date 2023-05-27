import { FC, memo } from 'react';
import Header from '../layouts/Header/Header';
import HeaderButton from '../UI/HeaderButton/HeaderButton';
import updateIcon from '../../images/update-icon.svg';
import newChatIcon from '../../images/new-chat-icon.svg';
import { useAccountContext } from '../../context/AccountContext';

interface IHeaderWithChat {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  updateState: () => Promise<void>;
  isButtonActive: boolean;
}

const HeaderWithChat: FC<IHeaderWithChat> = ({
  setVisible,
  updateState,
  isButtonActive,
}) => {
  const {avatar} = useAccountContext()!;
  
  const menu = (
    <>
      <HeaderButton image={newChatIcon} callMenu={() => setVisible(true)} />
      <HeaderButton
        image={updateIcon}
        isButtonActive={isButtonActive}
        callMenu={
          isButtonActive
            ? () => {
                console.error('too many request');
              }
            : () => updateState().catch(console.error)
        }
      />
    </>
  );
  return (
    <Header
      urlAvatar={avatar.length===0?'https://i.ytimg.com/vi/In11LnTuLvg/maxresdefault.jpg':avatar}
      menu={menu}
    />
  );
};

export default memo(HeaderWithChat);
