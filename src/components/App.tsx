import './App.scss';
import ChatList from './ChatList/ChatList';
// import { chatList } from '../data/chats';
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
import { IChatItem } from '../interfaces/IChatList';
import { IIncomeMessage, IOutgoMessage } from '../interfaces/IMessage';
const id = process.env.REACT_APP_ID_INSTANCE!;
const token = process.env.REACT_APP_API_TOKEN_INSTANCE!;
const host = process.env.REACT_APP_HOST!;

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [isNewChatVisible, setIsNewChatVisible] = useState(false);
  const [chatList, setChatList] = useState<IChatItem[] | []>([]);
  const [contactInfo, setContactInfo] = useState<TContactInfo>({
    avatar: '',
    name: '',
    chatId: '',
  });
  const [messagesInChat, setMessagesInChat] = useState<
    (IIncomeMessage | IOutgoMessage)[] | []
  >([]);
  const [messageInputValue, setMessageInputValue] = useState('');
  const [isNumberNotExist, setIsNumberNotExist] = useState(false);
  const [isInitialSearch, setIsInitialSearch] = useState(true);
  const [isInitialState, setIsInitialState] = useState(true);
  // const [chatState, setChatState] = useState({})

  const api = new Api({ host, idInstance: id, apiTokenInstance: token });

  function createChat() {
    setSearchValue('');
    setIsNewChatVisible(false);
    setIsInitialSearch(true);
    setIsInitialState(false);
    setChatList([
      {
        avatarUrl: contactInfo.avatar,
        name: contactInfo.name,
        id: contactInfo.chatId,
      },
      ...chatList,
    ]);
  }

  function onSubmitMessage() {
    const timestamp = Math.floor(Date.now() / 1000);
    api
      .sendMessage({ chatId: contactInfo.chatId, message: messageInputValue })
      .then(({idMessage}) => {
        setMessagesInChat([
          ...messagesInChat,
          {
            textMessage: messageInputValue,
            type: 'outgoing',
            timestamp,
            statusMessage:'sent',
            idMessage,
          },
        ]);
      });
  }

  function getContact() {
    setIsInitialSearch(true);
    setIsNumberNotExist(false);
    api
      .checkNumber(searchValue)
      .then((res) => {
        if (res.existsWhatsapp) {
          setSearchValue('');
          return api.getContact(searchValue);
        }
        setIsNumberNotExist(true);
        throw new Error('Нет пользователя в ватсапе');
      })
      .then((res) => {
        setIsInitialSearch(false);
        setContactInfo(res);
      })
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
            {isInitialState ? (
              <InitialChatView />
            ) : (
              <>
                <HeaderWithChat
                  avatarUrl={contactInfo.avatar}
                  name={contactInfo.name}
                />
                <ChatView messages={messagesInChat} />
                <ChatInput
                  onSubmitMessage={onSubmitMessage}
                  setMessageInputValue={setMessageInputValue}
                  messageInputValue={messageInputValue}
                />
              </>
            )}
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;
