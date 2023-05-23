import { ChangeEvent, Dispatch, FormEvent, FC } from 'react';
import './NewChat.scss';
import { useSearchContext } from '../../context/SearchContext';

interface INewChat {
  onSearchSubmit: () => void;
  createChat: () => void;
  setVisible: Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
  isNumberNotExist: boolean;
  isEmptyField: boolean;
}

const NewChat: FC<INewChat> = (props) => {
  const { setValue, value, avatar, name, chatId } = useSearchContext();

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function onSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onSearchSubmit();
  }

  return (
    <div className={`new-chat${props.isVisible ? ' new-chat_visible' : ''}`}>
      <header className='new-chat__header'>
        <span
          onClick={() => props.setVisible(false)}
          className='new-chat__back'
        ></span>
        <h2 className='new-chat__title'>Новый чат</h2>
      </header>
      <form onSubmit={onSearchSubmit} className='new-chat__search'>
        <div className='new-chat__input-container'>
          <input
            type='text'
            pattern='^[0-9]+$'
            onChange={onChange}
            value={value}
            className='new-chat__phone'
          />
          <button className='new-chat__submit'></button>
        </div>
      </form>
      <div className='new-chat__result'>
        {props.isEmptyField ? null : props.isNumberNotExist ? (
          <span className='new-chat__no-result'>
            Пользователя по такому номеру не найдено!
          </span>
        ) : (
          <div onClick={props.createChat} className='new-chat__contact'>
            <img
              src={avatar}
              alt={`Изображение контакта ${name}`}
              className='new-chat__avatar'
            />
            <h3 className='new-chat__name'>{name}</h3>
          </div>
        )}
      </div>
    </div>
  );
};
export default NewChat;
