import { FC } from 'react';
import './AuthForm.scss';
import { TApiData } from '../../types/TApiData';

interface IAuthForm {
  values: Omit<TApiData, 'host'>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitEnter: () => void;
  errorMessage: string;
}
const AuthForm: FC<IAuthForm> = ({
  values,
  onSubmitEnter,
  onChange,
  errorMessage,
}) => {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmitEnter();
  }
  return (
    <form className='auth' onSubmit={onSubmit}>
      <fieldset className='auth__inputs'>
        <label className='auth__label' htmlFor='idInstance'>
          IdInstance
        </label>
        <input
          value={values.idInstance}
          onChange={onChange}
          name='idInstance'
          id='idInstance'
          type='text'
          required
          className='auth__input'
        />
        <span className='auth__error'>{errorMessage}</span>
        <label className='auth__label' htmlFor='apiTokenInstance'>
          ApiTokenInstance
        </label>
        <input
          value={values.apiTokenInstance}
          onChange={onChange}
          name='apiTokenInstance'
          id='apiTokenInstance'
          type='text'
          required
          className='auth__input'
        />
      </fieldset>

      <button className='auth__button'></button>
    </form>
  );
};

export default AuthForm;
