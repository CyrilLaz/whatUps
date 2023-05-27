interface IMessage {
    type: string;
    idMessage: string;
    timestamp: number;
    textMessage: string;
    chatId:string
}

export interface IIncomeMessage extends IMessage {
    type: 'incoming'
    senderId: string;
}


export interface IOutgoMessage extends IMessage {
    type: 'outgoing'
    statusMessage: 'pending' | 'sent' | 'delivered' | 'read';
}

