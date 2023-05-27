import {
  FC,
  useState,
  FormEvent,
  useEffect,
  useCallback,
  useRef,
  BaseSyntheticEvent,
  ReactElement,
} from 'react';
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
  const input = useRef<any>(null);
  const [isEnter, setIsEnter] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isEmpty) onSubmitMessage();
  }

  const pasteAsPlainText = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    setMessageInputValue(
      (prev) => prev + e.clipboardData.getData('text/plain')
    );
  };

  useEffect(() => {
    setIsEmpty(messageInputValue.length === 0);
  }, [messageInputValue]);

  function onChange(e: ContentEditableEvent) {
    setMessageInputValue(e.target.value);
    // input.current = e.target.value;
  }

  const onKeyDownEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!isEmpty) onSubmitMessage();
    }
  };

  // use
  return (
    <form className='chat-input' onSubmit={onSubmit} onKeyDown={onKeyDownEnter}>
      <div className='chat-input__container'>
        <ContentEditable
          // onKeyDown={onKeyDownEnter}
          // ref={input}
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
