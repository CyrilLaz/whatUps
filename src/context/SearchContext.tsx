import { createContext, useContext } from 'react';
export type TSearchContext = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  avatar: string;
  name: string;
  chatId: string;
};
export const SearchContext = createContext<TSearchContext>({
    value: '',
    setValue: () => {},
    avatar: '',
    name: '',
    chatId: '',
  });
export const useSearchContext = () => useContext(SearchContext);
