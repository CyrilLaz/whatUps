import { createContext, useContext } from 'react';
import { TApiData } from '../types/TApiData'

export type TAuthContext = {
    values: Omit<TApiData, 'host'>;
    setValues: React.Dispatch<React.SetStateAction<Omit<TApiData, 'host'>>>;
    onSubmit: () => void;
};
export const AuthContext = createContext<TAuthContext>({
    values: { apiTokenInstance: '', idInstance: '' },
    setValues: () => { },
    onSubmit: () => { },
});
export const useAuthContext = () => useContext(AuthContext);
