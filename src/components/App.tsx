import React from 'react';
import './App.scss';
import Header from './Header/Header';

function App() {
  return (
    <div className='app'>
      <div className='app__container'>
        <div className='app__chatlist'>
          <Header urlAvatar='https://i.ytimg.com/vi/In11LnTuLvg/maxresdefault.jpg' />
        </div>
        <div className='app__chat'>
        </div>
      </div>
    </div>
  );
}

export default App;
