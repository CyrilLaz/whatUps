import { FC, useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './AuthPage.scss';

const AuthPage: FC = () => {
  const [isLoading, setIsloading] = useState(true);
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
          <AuthForm />
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
