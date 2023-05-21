export interface IIncomeMessage {
    type: string;
    idMessage: string;
    timestamp: number;
    typeMessage: string;
    chatId: string;
    textMessage: string;
    senderId: string;
    senderName: string;
}

export interface IOutgoMessage {
    type: string;
    idMessage: string;
    timestamp: number;
    typeMessage: string;
    chatId: string;
    textMessage: string;
    extendedTextMessage: ExtendedTextMessage;
    statusMessage: string;
    sendByApi: boolean;
}

interface ExtendedTextMessage {
    text: string;
    description: string;
    title: string;
    previewType: string;
    jpegThumbnail: string;
    forwardingScore: null;
    isForwarded: null;
}
