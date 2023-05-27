import { FC } from 'react';
import './ChatList.scss';
import ChatItem from '../UI/ChatItem/ChatItem';
import { IChatListProps } from '../../interfaces/IChatList';

const ChatList: FC<IChatListProps> = ({ chatList }): JSX.Element => {
  return (
    <section className='chatlist'>
      <ul className='chatlist__list'>
        {chatList.map((item) => ChatItem(item))}
      </ul>
    </section>
  );
};

export default ChatList;
