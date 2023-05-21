import { FC, useState, FormEvent, useEffect } from 'react';
import './ChatInput.scss';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

interface IChatInputProps {}

const ChatInput: FC<IChatInputProps> = (props) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [value, setValue] = useState('');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setValue('');
    if (!isEmpty) console.log('отправляет сообщение ');
  }

  useEffect(() => {
    setIsEmpty(value.length === 0);
  }, [value]);

  function onChange(e: ContentEditableEvent) {
    setValue(e.target.value);
  }

  return (
    <form className='chat-input' onSubmit={onSubmit}>
      <div className='chat-input__container'>
        <ContentEditable
          html={value}
          disabled={false}
          onChange={onChange}
          className='chat-input__input'
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
