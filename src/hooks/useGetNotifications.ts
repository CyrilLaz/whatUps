import { IIncomeMessage } from "../interfaces/IMessage";
import { useCallback, useState } from 'react';
import { api } from "../utils/api/Api";
import { TReceiveNoteMessage } from "../types/TMessage";

const useGetNotifications = (a: typeof api) => {
    const [messageState, setMessageState] = useState<IIncomeMessage>();
    const [isLoad, setIsLoad] = useState(false);
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
        let message: TReceiveNoteMessage | null | undefined;
        while (message !== null) {
            message = await getNote();
            if (!message) {
                break;
            }
            if (message.body.typeWebhook === 'incomingMessageReceived') {
                setMessageState({
                    senderId: message.body.senderData.sender,
                    type: 'incoming',
                    idMessage: message.body.idMessage,
                    timestamp: message.body.timestamp,
                    textMessage:
                        message.body.messageData.textMessageData.textMessage,
                    chatId: message.body.senderData.chatId
                });
            }
            await deleteNote(message.receiptId)
        }
        setIsLoad(false);
    }, [deleteNote, getNote])

    return { getMessages, isLoad, messageState }
}

export { useGetNotifications };