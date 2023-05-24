type TReceiveNotification<T> = {
    receiptId: number;
    body: T;
}

type TStatusBody = {
    typeWebhook: 'outgoingMessageStatus';
    chatId: string;
    instanceData: {
        idInstance: number;
        wid: string;
        typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    status: string;
    sendByApi: boolean;
}

type TMessageBody = {
    typeWebhook: 'incomingMessageReceived';
    instanceData: {
        idInstance: number;
        wid: string;
        typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
        chatId: string;
        chatName: string;
        sender: string;
        senderName: string;
    };
    messageData: {
        typeMessage: string;
        textMessageData: {
            textMessage: string;
        };
    };
}

export type TResponseDeleteNotification = { result: boolean }

export type TSendMessage = {
    chatId: string;
    message: string;
}

export type TSendMessageAnswer = {
    idMessage: string;
}

export type TReceiveNoteMessage = TReceiveNotification<TMessageBody>;
export type TReceiveNoteStatus = TReceiveNotification<TStatusBody>;