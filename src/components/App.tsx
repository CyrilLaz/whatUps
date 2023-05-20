import './App.scss';
import ChatList from './ChatList/ChatList';
import { chatList } from '../constants/chats';
import HeaderWithChatlist from './HeaderWithChatlist/HeaderWithChatlist';

function App() {
  return (
    <div className='app'>
      <div className='app__container'>
        <div className='app__chatlist'>
          <HeaderWithChatlist />
          <ChatList chatList={chatList} />
        </div>
        <div className='app__conversation'>
          {/* <Header urlAvatar='https://i.ytimg.com/vi/In11LnTuLvg/maxresdefault.jpg' /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
