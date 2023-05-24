import { FC } from 'react';
import Header from '../layouts/Header/Header';
import { IChatItem } from '../../interfaces/IChatList';

const HeaderWithChat: FC<Omit<Omit<IChatItem, 'id'>, 'counter'>> = (props) => {
  const info = (
    <>
      <h3
        style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}
        className='chat-name'
      >
        {props.name}
      </h3>
    </>
  );
  return <Header urlAvatar={props.avatarUrl} info={info} />;
};

export default HeaderWithChat;
