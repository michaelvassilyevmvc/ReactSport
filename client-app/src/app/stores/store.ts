import { createContext, useContext } from 'react';
import PersonStore from './personStore';

interface Store {
    personStore: PersonStore;
}

export const store: Store = {
    personStore: new PersonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}