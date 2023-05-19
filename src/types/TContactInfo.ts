export type TContactInfo = {
    avatar:         string;
    name:           string;
    email:          string;
    category:       string;
    description:    string;
    products:       any[];
    chatId:         string;
    lastSeen:       null;
    isArchive:      boolean;
    isDisappearing: boolean;
    isMute:         boolean;
    muteExpiration: null;
}