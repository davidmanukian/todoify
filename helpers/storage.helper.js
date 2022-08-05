import {from} from 'rxjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeItem = (key, data) => {
    return from(AsyncStorage.setItem(
            key,
            data
        )
    ).subscribe()
};

export const removeItem = (key) => {
    return from(AsyncStorage.removeItem(
            key
        )
    )
}

export const getItem = (key) => {
    return from(AsyncStorage.getItem(key));
}

