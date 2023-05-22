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
import NewChat from './NewChat/NewChat';
import { useState } from 'react';
import { SearchContext } from '../context/SearchContext';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [isNewChatVisible, setIsNewChatVisible] = useState(false);

  return (
    <div className='app'>
      <div className='app__container'>
        <SearchContext.Provider
          value={{
            avatar: 'https://i.ytimg.com/vi/In11LnTuLvg/maxresdefault.jpg',
            name: 'Basya',
            value: searchValue,
            setValue: setSearchValue,
          }}
        >
          <NewChat
            onSearchSubmit={() => console.log('поиск номера')}
            createChat={() => console.log('создание чата')}
            isVisible={isNewChatVisible}
            setVisible={setIsNewChatVisible}
          />
          <div className='app__chatlist'>
            <HeaderWithChatlist setVisible={setIsNewChatVisible} />
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
                <ChatView messages={messages} />
                <ChatInput />
              </>
            )}
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;
