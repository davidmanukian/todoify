import {Button, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import {
    ANDROID_CLIENT_ID,
    EXPO_CLIENT_ID,
    IOS_CLIENT_ID,
    OAUTH_SCOPES
} from '../config';


const Login = () => {
    const [accessToken, setAccessToken] = useState()
    const [userInfo, setUserInfo] = useState()

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: IOS_CLIENT_ID,
        webClientId: EXPO_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        expoClientId: EXPO_CLIENT_ID,
        scopes: OAUTH_SCOPES
    });


    // useEffect(() => {
    //     setAccessToken(null);
    // }, [])


    useEffect(() => {
        if (response?.type === 'success') {
            let innerAccessToken = response.authentication.accessToken;
            setAccessToken(innerAccessToken);
            const storeData = async (value) => {
                try {
                    await AsyncStorage.setItem('accessToken', value)
                } catch (e) {
                    // saving error
                }
            }

            storeData(innerAccessToken);
        }
    }, [response])

    async function getUserData() {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        userInfoResponse.json().then(data => {
            console.log('userData', accessToken);
            setUserInfo(data)
        })
    }

    const logout = () => {
        WebBrowser.dismissAuthSession();
        console.log('logout');
        // AuthSession.revokeAsync({
        //     token: accessToken
        // }).then(r => {
        //     console.log(r);
        // })
    }

    const showUserInfo = () => {
        if (userInfo) {
            return (
                <View>
                    <Text>Welcome {userInfo.name}</Text>
                </View>
            )
        }
    }
    return (
        <View style={styles.container}>
            {showUserInfo()}
            <Button onPress={accessToken ? getUserData : () => {
                promptAsync({showInRecents: true})
            }} title={accessToken ? "Get User Data" : "Login"}/>
            <Button
                title="Log out"
                onPress={async () => {
                    setUserInfo(null);
                    setAccessToken(null);
                    window.location = "https://mail.google.com/mail/u/0/?logout&hl=en";
                    window.location.replace(
                        // `https://www.googleapis.com/v2/logout?client_id=${iosClientId}&returnTo=${'/'}`
                    );
                }}
            />
            <StatusBar style="auto"/>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
