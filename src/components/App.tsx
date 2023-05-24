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

  const api = new Api({ host, idInstance: id, apiTokenInstance: token });

  useEffect(() => {  
    setMessagesInChat(messagesMap.get(currentChat.chatId)||[]);
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
      .sendMessage({ chatId: contactInfo.chatId, message: messageInputValue })
      .then(({ idMessage }) => {
        const chat = messagesMap.get(contactInfo.chatId);
        console.log(chat);
        console.log(!!chat);
        
        const message: IOutgoMessage = {
          textMessage: messageInputValue,
          type: 'outgoing',
          timestamp,
          statusMessage: 'sent',
          idMessage,
        };

        setMessagesMap( new Map(messagesMap).set(
            contactInfo.chatId,
            !!chat ? [...chat, message] : [message]
          )
        );
        setMessagesInChat(messagesMap.get(currentChat.chatId)||[]);
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

  function updateState() {
    return api
      .receiveNotification()
      .then((res) => {
        console.log(res);

        if (!res) return;
        if (res.body.typeWebhook === 'incomingMessageReceived') {
          const chat = messagesMap.get(res.body.senderData.chatId);
          const message: IIncomeMessage = {
            senderId: res.body.senderData.sender,
            type: 'incoming',
            idMessage: res.body.idMessage,
            timestamp: res.body.timestamp,
            textMessage: res.body.messageData.textMessageData.textMessage,
          };
          setMessagesMap(new Map(messagesMap).set(
              currentChat.chatId,
              !!chat ? [...chat, message] : [message]
            )
          );
        }
        return api.deleteNotification(res.receiptId);
      })
      .then((res) => {
        if (res?.result) updateState();
      })
      .catch(console.log);
  }

  // setTimeout(() => updateState(), 30000);
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
              setVisible={setIsNewChatVisible}
              updateState={updateState}
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
