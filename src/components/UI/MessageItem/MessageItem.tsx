import { FC } from 'react';
import { IOutgoMessage, IIncomeMessage } from '../../../interfaces/IMessage';
import { format } from 'ts-date/locale/ru';
import './MessageItem.scss'

const MessageItem: FC<IOutgoMessage | IIncomeMessage> = (props) => {
  const formatDate = format(new Date(props.timestamp * 1000), 'HH:mm');
  return (
    <div className={`message message_${props.type}`}>
      <span className='message__text'>{props.textMessage}</span>
      <span className='message__timestamp'>{formatDate}</span>
    </div>
  );
};

export default MessageItem;
