import { IIncomeMessage } from "../interfaces/IMessage";
import { useCallback, useState } from 'react';
import { api } from "../utils/api/Api";
import { TReceiveNoteMessageExtText, TReceiveNoteMessageText } from "../types/TMessage";
import { log } from "console";

const useGetNotifications = (a: typeof api) => {
    const [messageState, setMessageState] = useState<IIncomeMessage>();
    const [isLoad, setIsLoad] = useState(false);
    const resetMessageState = useCallback((init = undefined) => setMessageState(init), [])
    const getNote = useCallback(async () => {
        try {
            return await a.receiveNotification();
        } catch (err) { console.log(err) }
    }, [a]);

    const deleteNote = useCallback(async (id: number) => {
        try {
            return await a.deleteNotification(id);
        } catch (err) { console.log(err) }
    }, [a]);

    const getMessages = useCallback(async () => {
        setIsLoad(true);
        let message: TReceiveNoteMessageText | TReceiveNoteMessageExtText | null | undefined;
        while (message !== null) {
            message = await getNote();
            if (!message) {
                break;
            }
            if (message.body.typeWebhook === 'incomingMessageReceived') {
                switch (message.body.messageData.typeMessage) {
                    case 'textMessage':
                        setMessageState({
                            senderId: message.body.senderData.sender,
                            type: 'incoming',
                            idMessage: message.body.idMessage,
                            timestamp: message.body.timestamp,
                            textMessage:
                                message.body.messageData.textMessageData.textMessage,
                            chatId: message.body.senderData.chatId
                        });
                        break;
                    case 'extendedTextMessage':
                        console.log('пришло уведомление с расширенным сообщением от пользователя ', message.body.senderData.sender, ' c текстом ', message.body.messageData.extendedTextMessageData.text);
                        break;
                    default:
                        console.error('пришло неопознанное уведомление')
                        console.log(message);
                        
                        break;
                }
            }
            await deleteNote(message.receiptId)
        }
        setIsLoad(false);
    }, [deleteNote, getNote])

    return { getMessages, isLoad, messageState, resetMessageState }
}

export { useGetNotifications };