import { createContext, useContext } from 'react';
export type TSearchContext = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  avatar: string;
  name: string;
};
export const SearchContext = createContext<TSearchContext>({
  value: '',
  setValue: () => {},
  avatar: '',
  name: '',
});
export const useSearchContext = () => useContext(SearchContext);
