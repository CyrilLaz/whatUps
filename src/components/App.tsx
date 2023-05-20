import './App.scss';
import ChatList from './ChatList/ChatList';
import { chatList } from '../data/chats';
import HeaderWithChatlist from './HeaderWithChatlist/HeaderWithChatlist';
import InitialChatView from './InitialChatView/InitialChatView';

function App() {
  return (
    <div className='app'>
      <div className='app__container'>
        <div className='app__chatlist'>
          <HeaderWithChatlist />
          <ChatList chatList={chatList} />
        </div>
        <div className='app__conversation'>
          <InitialChatView/>
          {/* <Header urlAvatar='https://i.ytimg.com/vi/In11LnTuLvg/maxresdefault.jpg' /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
