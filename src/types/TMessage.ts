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

type TMessageBody<T> = {
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
    messageData: T
}

type TMessageDataText = {
            typeMessage: 'textMessage';
        textMessageData: {
            textMessage: string;
        };
}


 type TMessageDataExtText = {
    typeMessage:             'extendedTextMessage';
    extendedTextMessageData: {
        text:            string;
        description:     string;
        title:           string;
        previewType:     string;
        jpegThumbnail:   string;
        forwardingScore: number;
        isForwarded:     boolean;
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

export type TReceiveNoteMessageText = TReceiveNotification<TMessageBody<TMessageDataText>>;
export type TReceiveNoteMessageExtText = TReceiveNotification<TMessageBody<TMessageDataExtText>>;
export type TReceiveNoteStatus = TReceiveNotification<TStatusBody>;