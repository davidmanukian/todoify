import {from} from 'rxjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeItem = (key, data) => {
    AsyncStorage.setItem(
        key,
        data
    );
    return from(AsyncStorage.setItem(
            key,
            data
        )
    ).subscribe(res => console.log('stored', res))
};

export const removeItem = (key) => {
    return from(AsyncStorage.removeItem(
            key
        )
    )
}

export const getItem = (key) => {
    AsyncStorage.getItem(key).then(data => console.log(data))
    return from(AsyncStorage.getItem(key));
}

