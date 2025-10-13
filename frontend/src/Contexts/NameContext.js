import { createContext } from 'react';

export const NameContext = createContext({
    name: null,
    setName: () => { },
});
