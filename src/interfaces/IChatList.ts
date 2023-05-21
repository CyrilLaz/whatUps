export interface IChatItem {
    avatarUrl: string;
    name: string;
    lastMessage?: string;
    id: string;
    timeStamp?: string
    counter?: number
}

export interface IChatListProps {
    chatList: IChatItem[];
}