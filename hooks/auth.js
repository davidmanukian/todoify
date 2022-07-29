import React, {createContext, useContext, useEffect, useState} from 'react'
import * as Google from "expo-auth-session/providers/google";

export const AuthContext = createContext({})


const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState()

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: "382648074525-3bh0jsq03ut910i367er4djqp2fm0iok.apps.googleusercontent.com",
        expoClientId: "382648074525-luus5lp62g7f13fjsq8h19poe2541ltr.apps.googleusercontent.com",
        androidClientId: "382648074525-4ll05bhmc1od6ubeu4n4ri2omjhs88mj.apps.googleusercontent.com",
        webClientId: "382648074525-luus5lp62g7f13fjsq8h19poe2541ltr.apps.googleusercontent.com",
        scopes: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ]
    })

    useEffect(() => {
        if (response?.type === 'success') {
            console.log(response.authentication.accessToken)
            setAccessToken(response.authentication.accessToken);
        }
    }, [response])

    const signIn = async () => {
        try {
            await promptAsync({showInRecents: true})
        } catch (err) {
            console.log(err)
        }
    }

    const signOut = async () => {
        setAccessToken(null)
    }

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
    )
}

const useAuth = () => {
    return useContext(AuthContext)
}

export {
    AuthProvider,
    useAuth
}

