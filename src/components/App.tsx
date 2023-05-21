import './App.scss';
import ChatList from './ChatList/ChatList';
import { chatList } from '../data/chats';
import HeaderWithChatlist from './HeaderWithChatlist/HeaderWithChatlist';
import InitialChatView from './InitialChatView/InitialChatView';
// import { useState } from 'react';
import HeaderWithChat from './HeaderWithChat/HeaderWithChat';
import ChatView from './ChatView/ChatView';
import { messages } from '../data/messages';
import ChatInput from './ChatInput/ChatInput';

function App() {
  // const [actualChat, setActualChat] = useState({});
  return (
    <div className='app'>
      <div className='app__container'>
        <div className='app__chatlist'>
          <HeaderWithChatlist />
          <ChatList chatList={chatList} />
        </div>
        <div className='app__conversation'>
          {false ? (
            <InitialChatView />
          ) : (
            <>
              <HeaderWithChat
                avatarUrl={chatList[0].avatarUrl}
                name={chatList[0].name}
                id={chatList[0].id}
              />
              <ChatView messages={messages}/>
              <ChatInput/>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
