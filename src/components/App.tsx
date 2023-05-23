import './App.scss';
import ChatList from './ChatList/ChatList';
import { chatList } from '../data/chats';
import HeaderWithChatlist from './HeaderWithChatlist/HeaderWithChatlist';
import InitialChatView from './InitialChatView/InitialChatView';
import HeaderWithChat from './HeaderWithChat/HeaderWithChat';
import ChatView from './ChatView/ChatView';
import { messages } from '../data/messages';
import ChatInput from './ChatInput/ChatInput';
import NewChat from './NewChat/NewChat';
import { useEffect, useState } from 'react';
import { SearchContext } from '../context/SearchContext';
import Api from '../utils/api/Api';
import { TContactInfo } from '../types/TContactInfo';
const id = process.env.REACT_APP_ID_INSTANCE!;
const token = process.env.REACT_APP_API_TOKEN_INSTANCE!;
const host = process.env.REACT_APP_HOST!;

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [isNewChatVisible, setIsNewChatVisible] = useState(false);
  const [contactInfo, setContactInfo] = useState<TContactInfo>({
    avatar: '',
    name: '',
    chatId: '',
  });
  const [isNumberNotExist, setIsNumberNotExist] = useState(false);
  const [isInitialSearch, setIsInitialSearch] = useState(true);

  const api = new Api({ host, idInstance: id, apiTokenInstance: token });

  function createChat() {
    setSearchValue('');
    setIsNewChatVisible(false);
  }

  function getContact() {
    setIsInitialSearch(true);
    setIsNumberNotExist(false);
    api
      .checkNumber(searchValue)
      .then((res) => {
        setIsInitialSearch(false);
        if (res.existsWhatsapp) {
          setSearchValue('');
          return api.getContact(searchValue);
        }
        setIsNumberNotExist(true);
        throw new Error('Нет пользователя в ватсапе');
      })
      .then((res) => setContactInfo(res))
      .catch(console.log);
  }
  return (
    <div className='app'>
      <div className='app__container'>
        <SearchContext.Provider
          value={{
            avatar: contactInfo.avatar,
            name: contactInfo.name,
            chatId: contactInfo.chatId,
            value: searchValue,
            setValue: setSearchValue,
          }}
        >
          <NewChat
            onSearchSubmit={getContact}
            createChat={createChat}
            isVisible={isNewChatVisible}
            setVisible={setIsNewChatVisible}
            isEmptyField={isInitialSearch}
            isNumberNotExist={isNumberNotExist}
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
