import { createContext, useContext } from 'react';
import { TContactInfo } from '../types/TContactInfo';
export const AccountContext = createContext<TContactInfo | undefined>({
    avatar: '', name: '', chatId: '',
});
export const useAccountContext = () => useContext(AccountContext);
