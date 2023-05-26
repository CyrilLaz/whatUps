import { FC, useEffect, useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './AuthPage.scss';
import { TApiData } from '../../types/TApiData';

const AuthPage: FC<{
  onEnter: (
    v: Omit<TApiData, 'host'>,
    // callback: React.Dispatch<React.SetStateAction<any>>
  ) => Promise<void>;
}> = ({ onEnter }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [values, setValues] = useState<Omit<TApiData, 'host'>>({
    idInstance: '',
    apiTokenInstance: '',
  });

  useEffect(
    () => () => {//сбрасываем состояния при размонтировании
      setIsLoading(false);
      setErrorMessage('');
    },
    []
  );
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage('');
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function onSubmitEnter() {
    setIsLoading(true);
    onEnter(values)
      .catch(() => {
        setErrorMessage(
          'Произошла ошибка при запросе. Проверьте авторизацию на сервисе'
        );
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <section className='auth-page'>
      <div className='auth-page__landing'></div>
      <div className='auth-page__header'>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://green-api.com/'
          className='auth-page__link'
        >
          <span className='auth-page__logo'></span>
        </a>
        <h1 className='auth-page__heading'>What Ups</h1>
      </div>
      <div className='auth-page__form'>
        <div className='auth-page__form-wrapper'>
          <h2 className='auth-page__title'>
            Используйте свои данные для входа
          </h2>
          <AuthForm
            values={values}
            onSubmitEnter={onSubmitEnter}
            onChange={onChange}
            errorMessage={errorMessage}
          />
        </div>
        <span
          className={`auth-page__loading${
            isLoading ? ' auth-page__loading_active' : ''
          }`}
        ></span>
      </div>
    </section>
  );
};

export default AuthPage;
