import { createContext } from 'react';

export const CurrencyContext = createContext({
    userCurrency: null,
    setUserCurrency: () => { },
});
