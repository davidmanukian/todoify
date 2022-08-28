import React, {createContext, useContext, useEffect, useState} from 'react'
import * as Google from "expo-auth-session/providers/google";
import auth_creds from "../constant_auth";
import * as WebBrowser from "expo-web-browser";
import {COLLECTION_AUTH_TOKEN} from '../constant_storage';
import {useStorage} from './storage';

export const AuthContext = createContext({});

/**
 * Auth Provider/Context is providing API related to sing in/sign out and manage all work related to access-token
 * */
const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState();
    //using another context to store access-token
    const {getItem, removeItem, storeItem} = useStorage();

    //Expo-Auth-Session google provider
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: auth_creds.IOS_CLIENT_ID,
        expoClientId: auth_creds.EXPO_CLIENT_ID,
        androidClientId: auth_creds.ANDROID_CLIENT_ID,
        webClientId: auth_creds.WEB_CLIENT,
        scopes: auth_creds.SCOPES
    });
    //if signed in successfully we need to store access-token in async-storage
    useEffect(() => {
        if (response?.type === 'success') {
            console.log('response', response);
            let innerAccessToken = response.authentication.accessToken;
            setAccessToken(innerAccessToken);
            storeItem(COLLECTION_AUTH_TOKEN, innerAccessToken);
            getItem(COLLECTION_AUTH_TOKEN).subscribe(data => console.log(data))
        }
    }, [response]);

    useEffect(() => {
        getItem(COLLECTION_AUTH_TOKEN).subscribe(t => setAccessToken(t));
    }, []);

    //sign in EXPO-AUTH-SESSION
    const signIn = async () => {
        try {
            await promptAsync({showInRecents: true})
        } catch (err) {
            console.log(err)
        }
    }

    //sign out EXPO-AUTH-SESSION
    const signOut = async () => {
        setAccessToken(null);
        removeItem(COLLECTION_AUTH_TOKEN);
        WebBrowser.dismissAuthSession();
    }

    useEffect(() => {
        getItem(COLLECTION_AUTH_TOKEN).subscribe();
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

