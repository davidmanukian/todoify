import React, {createContext, useContext, useEffect, useState} from 'react'
import * as Google from "expo-auth-session/providers/google";
import auth_creds from "../constant_auth";
import * as WebBrowser from "expo-web-browser";
import {AUTH_TOKEN} from '../helpers/constant_storage';
import {useStorage} from './storage';

export const AuthContext = createContext({});


const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState();
    const {getItem, removeItem, storeItem} = useStorage();

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: auth_creds.IOS_CLIENT_ID,
        expoClientId: auth_creds.EXPO_CLIENT_ID,
        androidClientId: auth_creds.ANDROID_CLIENT_ID,
        webClientId: auth_creds.WEB_CLIENT,
        scopes: auth_creds.SCOPES
    });

    useEffect(() => {
        if (response?.type === 'success') {
            let innerAccessTOken = response.authentication.accessToken;
            setAccessToken(innerAccessTOken);
            storeItem(AUTH_TOKEN, innerAccessTOken);
            getItem(AUTH_TOKEN).subscribe(data => console.log(data))
        }
    }, [response]);

    useEffect(() => {
        getItem(AUTH_TOKEN).subscribe(t => setAccessToken(t));
    }, []);

    const signIn = async () => {
        try {
            await promptAsync({showInRecents: true})
        } catch (err) {
            console.log(err)
        }
    }

    const signOut = async () => {
        setAccessToken(null);
        removeItem(AUTH_TOKEN);
        WebBrowser.dismissAuthSession();
    }

    useEffect(() => {
        getItem(AUTH_TOKEN).subscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    return useContext(AuthContext);
}

export {
    AuthProvider,
    useAuth
}

