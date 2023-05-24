import './App.scss';
import ChatList from './ChatList/ChatList';
import HeaderWithChatlist from './HeaderWithChatlist/HeaderWithChatlist';
import InitialChatView from './InitialChatView/InitialChatView';
import HeaderWithChat from './HeaderWithChat/HeaderWithChat';
import ChatView from './ChatView/ChatView';
import ChatInput from './ChatInput/ChatInput';
import NewChat from './NewChat/NewChat';
import { useCallback, useEffect, useState } from 'react';
import { SearchContext } from '../context/SearchContext';
import { api } from '../utils/api/Api';
import { TContactInfo } from '../types/TContactInfo';
import { IChatItem } from '../interfaces/IChatList';
import { IIncomeMessage, IOutgoMessage } from '../interfaces/IMessage';
import { useGetNotifications } from '../hooks/useGetNotifications';

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
  const { getMessages, isLoad, messageState } = useGetNotifications(api);

  useEffect(()=>{setIsButtonActive(isLoad)},[isLoad]);
  useEffect(() => {
    if (messageState) {      
        setMessagesMap((prev)=>new Map([...prev, [messageState.chatId, [...prev.get(messageState.chatId)||[], messageState]]]));
    }
  }, [messageState]);

  async function checkNotification() {
    await getMessages();
  }

  useEffect(() => {
    setMessagesInChat(messagesMap.get(currentChat.chatId) || []);
  }, [messagesMap, currentChat]);

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
        counter: 0,
      },
      ...chatList,
    ]);
    setCurrentChat(contactInfo);
  }

  function onSubmitMessage() {
    const timestamp = Math.floor(Date.now() / 1000);
    api
      .sendMessage({
        chatId: contactInfo.chatId,
        message: messageInputValue,
      })
      .then(({ idMessage }) => {
        const chat = messagesMap.get(contactInfo.chatId) || [];

        const message: IOutgoMessage = {
          textMessage: messageInputValue,
          type: 'outgoing',
          timestamp,
          statusMessage: 'sent',
          idMessage,
          chatId: contactInfo.chatId,
        };

        setMessagesMap(
          new Map([...messagesMap, [contactInfo.chatId, [...chat, message]]])
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
          return api.getContact(searchValue);
        }
        setIsInitialSearch(false);
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
