import './App.scss';
import ChatList from './ChatList/ChatList';
import HeaderWithChatlist from './HeaderWithChatlist/HeaderWithChatlist';
import InitialChatView from './InitialChatView/InitialChatView';
import HeaderWithChat from './HeaderWithChat/HeaderWithChat';
import ChatView from './ChatView/ChatView';
import ChatInput from './ChatInput/ChatInput';
import NewChat from './NewChat/NewChat';
import { useEffect, useState } from 'react';
import { SearchContext } from '../context/SearchContext';
import { api } from '../utils/api/Api';
import { TContactInfo } from '../types/TContactInfo';
import { IChatItem } from '../interfaces/IChatList';
import { IIncomeMessage, IOutgoMessage } from '../interfaces/IMessage';
import { useGetNotifications } from '../hooks/useGetNotifications';
import { useInterval } from '../hooks/useInterval';
import AuthPage from './AuthPage/AuthPage';
import { TApiData } from '../types/TApiData';
import { AccountContext } from '../context/AccountContext';
import { parseNumber } from '../utils/parseNumber';
import parseHtml from '../utils/parseHtml';
import { UPDATE_INTERVAL } from '../constants/settings';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [isNewChatVisible, setIsNewChatVisible] = useState(false);
  const [chatList, setChatList] = useState<IChatItem[] | []>([]);
  const [contactInfo, setContactInfo] = useState<TContactInfo>({
    avatar: '',
    name: '',
    chatId: '',
  });
  const [currentChat, setCurrentChat] = useState<TContactInfo>({
    avatar: '',
    name: '',
    chatId: '',
  });
  const [account, setAccount] = useState<TContactInfo>();
  const [messagesMap, setMessagesMap] = useState<
    Map<string, (IIncomeMessage | IOutgoMessage)[]>
  >(new Map([]));
  const [messagesInChat, setMessagesInChat] = useState<
    (IIncomeMessage | IOutgoMessage)[] | []
  >([]);
  const [messageInputValue, setMessageInputValue] = useState('');
  const [isNumberNotExist, setIsNumberNotExist] = useState(false);
  const [isInitialSearch, setIsInitialSearch] = useState(true);
  const [isInitialState, setIsInitialState] = useState(true);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { getMessages, isLoad, messageState, resetMessageState } =
    useGetNotifications(api);

  useEffect(() => {
    setIsButtonActive(isLoad);
  }, [isLoad]);

  useEffect(() => {
    if (messageState) {
      setMessagesMap((prev) =>
        new Map(prev).set(messageState.chatId, [
          ...(prev.get(messageState.chatId) || []),
          messageState,
        ])
      );
      resetMessageState();
    }
  }, [messageState, resetMessageState]);

  async function checkNotification() {
    await getMessages();
  }

  useInterval(
    async () => {
      await getMessages();
    },
    isLogin ? (isLoad ? null : UPDATE_INTERVAL) : null
  );

  useEffect(() => {
    setMessagesInChat(messagesMap.get(currentChat.chatId) || []);
  }, [messagesMap, currentChat]);

  function createNewChat() {
    setSearchValue('');
    setIsNewChatVisible(false);
    setIsInitialSearch(true);
    setIsInitialState(false);
    setChatList([
      {
        avatarUrl: contactInfo.avatar,
        name: contactInfo.name,
        id: contactInfo.chatId,
        counter: 0,
        onClick:()=>switchChat(contactInfo)
      },
      ...chatList,
    ]);
    // setCurrentChat(contactInfo);
    switchChat(contactInfo);
  }

  function switchChat(chatInfo: TContactInfo) {
    setCurrentChat(chatInfo);
  }

  function onSubmitMessage() {
    const timestamp = Math.floor(Date.now() / 1000);
    const parsedMessage = parseHtml(messageInputValue);
    api
      .sendMessage({
        chatId: currentChat.chatId,
        message: parsedMessage,
      })
      .then(({ idMessage }) => {
        const chat = messagesMap.get(currentChat.chatId) || [];

        const message: IOutgoMessage = {
          textMessage: parsedMessage,
          type: 'outgoing',
          timestamp,
          statusMessage: 'sent',
          idMessage,
          chatId: currentChat.chatId,
        };

        setMessagesMap(
          new Map([...messagesMap, [currentChat.chatId, [...chat, message]]])
        );
        setMessagesInChat(messagesMap.get(currentChat.chatId) || []);
        setMessageInputValue('');
      })
      .catch(console.log);
  }

  function getContact() {
    setIsInitialSearch(true);
    setIsNumberNotExist(false);
    api
      .checkNumber(searchValue)
      .then((res) => {
        if (res.existsWhatsapp) {
          setSearchValue('');
          return api.getContactInfo(`${searchValue}@c.us`);
        }
        setIsInitialSearch(false);
        setIsNumberNotExist(true);
        throw new Error('Нет пользователя в ватсапе');
      })
      .then((res) => {
        if (res.name.length === 0) res.name = parseNumber(contactInfo.chatId); // если имя отсутствует у контакта пишем в это поле номер телефона
        if (res.avatar.length === 0)
          res.avatar = 'https://www.svgrepo.com/show/500470/avatar.svg'; // дефолтная фотография для контакта
        setIsInitialSearch(false);
        setContactInfo(res);
      })
      .catch(console.log);
  }

  function onEnter(v: Omit<TApiData, 'host'>) {
    return api
      .login(v)
      .then((res) => {
        if (res) {
          api.apiData = v;
          return;
        }
        throw Error;
      })
      .then(() => api.getSettings())
      .then((res) => api.getContactInfo(res.wid))
      .then((res) => {
        setIsLogin(true);
        setAccount(res);
      });
  }
  return (
    <div className='app'>
      <div
        className={`app__container${
          isLogin ? '' : ' app__container_margin_zero'
        }`}
      >
        <AccountContext.Provider value={account}>
          <SearchContext.Provider
            value={{
              avatar: contactInfo.avatar,
              name: contactInfo.name,
              chatId: contactInfo.chatId,
              value: searchValue,
              setValue: setSearchValue,
            }}
          >
            {!isLogin ? (
              <AuthPage onEnter={onEnter} />
            ) : (
              <>
                <NewChat
                  onSearchSubmit={getContact}
                  createChat={createNewChat}
                  isVisible={isNewChatVisible}
                  setVisible={setIsNewChatVisible}
                  isEmptyField={isInitialSearch}
                  isNumberNotExist={isNumberNotExist}
                />
                <div className='app__chatlist'>
                  <HeaderWithChatlist
                    isButtonActive={isButtonActive}
                    setVisible={setIsNewChatVisible}
                    updateState={checkNotification}
                  />
                  <ChatList chatList={chatList} />
                </div>
                <div className='app__conversation'>
                  {isInitialState ? (
                    <InitialChatView />
                  ) : (
                    <>
                      <HeaderWithChat
                        avatarUrl={currentChat.avatar}
                        name={currentChat.name}
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
              </>
            )}
          </SearchContext.Provider>
        </AccountContext.Provider>
      </div>
    </div>
  );
}

export default App;
