import React, {createContext, useContext} from 'react'
import {from} from 'rxjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageContext = createContext({});


const StorageProvider = ({children}) => {

    const getItem = (key) => {
        return from(AsyncStorage.getItem(key));
    }

    const storeItem = (key, data) => {
        return from(AsyncStorage.setItem(
                key,
                data
            )
        ).subscribe()
    };

    const removeItem = (key) => {
        return from(AsyncStorage.removeItem(
                key
            )
        )
    }


    return (
        <StorageContext.Provider
            value={{
                getItem,
                storeItem,
                removeItem
            }}
        >
            {children}
        </StorageContext.Provider>
    );
}

const useStorage = () => {
    return useContext(StorageContext);
}

export {
    StorageProvider,
    useStorage
}

