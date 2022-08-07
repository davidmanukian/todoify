import React, {createContext, useContext} from 'react'
import {from, of} from 'rxjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageContext = createContext({});


const StorageProvider = ({children}) => {

    const getItem = (key) => {
        return from(AsyncStorage.getItem(key));
    }

    const getAllItems = () => {
        return from(AsyncStorage.getAllKeys())
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
                getAllItems,
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

