import { FC, useRef } from 'react';
import './AuthForm.scss';

const AuthForm: FC = () => {
  const errorField = useRef<HTMLSpanElement>(null);

  return (
    <form className='auth'>
      <fieldset className='auth__inputs'>
        <label className='auth__label' htmlFor='idInstance'>
          IdInstance
        </label>
        <input id='idInstance' type='text' required className='auth__input' />
        <span ref={errorField} className="auth__error"></span>
        <label className='auth__label' htmlFor='apiTokenInstance'>
          ApiTokenInstance
        </label>
        <input
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
