import {Button, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';

const iosClientId = "382648074525-3bh0jsq03ut910i367er4djqp2fm0iok.apps.googleusercontent.com";
const androidClientId = "382648074525-4ll05bhmc1od6ubeu4n4ri2omjhs88mj.apps.googleusercontent.com";
const expoClientId = "382648074525-luus5lp62g7f13fjsq8h19poe2541ltr.apps.googleusercontent.com"

const Login = () => {
    const [accessToken, setAccessToken] = useState()
    const [userInfo, setUserInfo] = useState()

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId,
        webClientId: expoClientId,
        androidClientId,
        expoClientId,
        scopes: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/calendar.events',
            'https://www.googleapis.com/auth/calendar']
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
