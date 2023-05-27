import React, { FC, JSX } from 'react';
import './ChatItem.scss';
import { IChatItem } from '../../../interfaces/IChatList';

const ChatItem: FC<IChatItem> = ({onClick,...props}): JSX.Element => {
  return (
    <li onClick={()=>onClick()} key={props.id} className='chat-item'>
      <img
        src={props.avatarUrl}
        alt='Изображение аватары пользователя'
        className='chat-item__avatar'
      />
        <div className='chat-item__notification'>
      <div className='chat-item__info'>
          <h3 className='chat-item__name'>{props.name}</h3>
          <span className='chat-item__time'>{props.timeStamp}</span>
        </div>
        <div className='chat-item__info'>
          <p className='chat-item__message'>{props.lastMessage}</p>
          <span className={`chat-item__counter${props.counter===0?' chat-item__counter_hidden':''}`}>{props.counter}</span>
        </div>
      </div>
    </li>
  );
};

export default ChatItem;
