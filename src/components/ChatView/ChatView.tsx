import React, { FC, JSX } from 'react';
import './ChatView.scss';
import { IIncomeMessage, IOutgoMessage } from '../../interfaces/IMessage';
import MessageItem from '../UI/MessageItem/MessageItem';

const ChatView: FC<{ messages: Array<IIncomeMessage | IOutgoMessage> }> = ({
  messages,
}): JSX.Element => {
  function putMessage(mes: IIncomeMessage | IOutgoMessage) {
    return (
      <li key={mes.idMessage} className={`chat__item chat__item_${mes.type}`}>
        {<MessageItem {...mes} />}
      </li>
    );
  }
  return (
    <section className='chat'>
      <ul className='chat__list'>{messages.map(putMessage)}</ul>
    </section>
  );
};

export default ChatView;
