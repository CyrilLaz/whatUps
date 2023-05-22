import { ChangeEvent, Dispatch, FC } from 'react';
import './NewChat.scss';
import { useSearchContext } from '../../context/SearchContext';

interface INewChat {
  name?: string;
  avatar?: string;
  onSearchSubmit: () => void;
  onClick: () => void;
  searchValue: string;
  setSearchValue: Dispatch<React.SetStateAction<string>>;
}

const NewChat: FC<any> = (props) => {
  const {setValue, value,avatar,name} = useSearchContext();
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div className='new-chat'>
      <header className='new-chat__header'>
        <span className='new-chat__back'></span>
        <h2 className='new-chat__title'>Новый чат</h2>
      </header>
      <form onSubmit={props.onSearchSubmit} className='new-chat__search'>
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
        <span className='new-chat__no-result'>
          Пользователя по такому номеру не найдено!
        </span>
        <div onClick={props.onClick} className='new-chat__contact'>
          <img
            src={avatar}
            alt={`Изображение контакта ${name}`}
            className='new-chat__avatar'
          />
          <h3 className='new-chat__name'>{name}</h3>
        </div>
      </div>
    </div>
  );
};
export default NewChat;
