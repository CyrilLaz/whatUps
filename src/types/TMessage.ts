export type TReceiveNotification = {
    receiptId: number;
    body:      TBody;
}

export type TBody = {
    typeWebhook:  string;
    instanceData: TInstanceData;
    timestamp:    number;
    idMessage:    string;
    senderData:   TSenderData;
    messageData:  TMessageData;
}
export type TInstanceData = {
    idInstance:   number;
    wid:          string;
    typeInstance: string;
}

export type TMessageData = {
    typeMessage:     string;
    textMessageData: TTextMessageData;
}

export type TTextMessageData = {
    textMessage: string;
}

export type TSenderData = {
    chatId:     string;
    chatName:   string;
    sender:     string;
    senderName: string;
}

export type TSendMessage = {
    chatId:  string;
    message: string;
}

export type TSendMessageAnswer = {
    idMessage: string;
}
