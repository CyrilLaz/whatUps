export interface IChatItem {
    avatarUrl: string;
    name: string;
    lastMessage?: string;
    id: string;
    timeStamp?: string
    counter: number
    onClick:()=>void
}

export interface IChatListProps {
    chatList: IChatItem[];
}