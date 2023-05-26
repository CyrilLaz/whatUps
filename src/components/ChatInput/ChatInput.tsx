import { FC, useState, FormEvent, useEffect } from 'react';
import './ChatInput.scss';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

interface IChatInputProps {
  setMessageInputValue: React.Dispatch<React.SetStateAction<string>>;
  messageInputValue: string;
  onSubmitMessage: () => void;
}

const ChatInput: FC<IChatInputProps> = ({
  setMessageInputValue,
  messageInputValue,
  onSubmitMessage,
}) => {
  const [isEmpty, setIsEmpty] = useState(true);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isEmpty) onSubmitMessage();
  }

  const pasteAsPlainText = (e:React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();   
    setMessageInputValue(prev=>prev + e.clipboardData.getData("text/plain"))
  }

  useEffect(() => {
    setIsEmpty(messageInputValue.length === 0);
  }, [messageInputValue]);

  function onChange(e: ContentEditableEvent) {
    setMessageInputValue(e.target.value);
  }

  return (
    <form className='chat-input' onSubmit={onSubmit}>
      <div className='chat-input__container'>
        <ContentEditable
          html={messageInputValue}
          disabled={false}
          onChange={onChange}
          className='chat-input__input'
          onPaste={pasteAsPlainText}
        />
        <span
          className={`chat-input__placeholder${
            isEmpty ? '' : ' chat-input__placeholder_hidden'
          }`}
        >
          Введите сообщение
        </span>
      </div>
      <button type='submit' className='chat-input__submit'></button>
    </form>
  );
};

export default ChatInput;
