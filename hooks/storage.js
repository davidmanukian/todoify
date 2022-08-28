import React, {createContext, useContext} from 'react'
import {from, map} from 'rxjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageContext = createContext({});

/**
 * Storage provide/context
 * */
const StorageProvider = ({children}) => {

    //method for getting item from async storage. Used many places in different screens.
    //some RXJS since AsyncStorage allows us to store only String and that's why sometimes I need to parse it back to
    //object JSON.parse()..
    const getItem = (key) => {
        return from(AsyncStorage.getItem(key))
            .pipe(
                map(res => {
                    if (res && res.includes('{') && res.includes('}')) {
                        return JSON.parse(res);
                    } else {
                        return res;
                    }
                })
            );
    }

    const getItemRaw = (key) => {
        return from(AsyncStorage.getItem(key))
    }

    const getAllItems = () => {
        return from(AsyncStorage.getAllKeys())
    }

    const multiGetItems = (keys) => {
        return from(AsyncStorage.multiGet(keys))
    }

    const clearItems = () => {
        return from(AsyncStorage.clear())
    }

    const storeItemRaw = (key, data) => {
        return from(AsyncStorage.setItem(key, data)).subscribe()
    };

    const storeItem = (key, data) => {
        return from(AsyncStorage.setItem(
                key,
                (typeof data === 'string' || data instanceof String) ? data : JSON.stringify(data)
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
                getItemRaw,
                getAllItems,
                multiGetItems,
                clearItems,
                storeItem,
                storeItemRaw,
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

