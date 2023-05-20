import { FC } from 'react';
import './InitialChatView.scss';

const InitialChatView: FC = () => {
  return (
    <section className='initial-view'>
      <div className='initial-view__greening'>
        <img
          className='initial-view__image'
          src='https://console.green-api.com/headerLogo.png'
          alt=''
        />
        <h1 className='initial-view__title'>WhatUps Web</h1>
        <p className='initial-view__text'>
          Отправляйте и получайте сообщения. И когда кажется что все хорошо,
          перед тобой WhatsApp, a оказывается WhatUps.
        </p>
      </div>
        <span className='initial-view__warning'>Все защищено, обещаю!</span>
    </section>
  );
};

export default InitialChatView;
