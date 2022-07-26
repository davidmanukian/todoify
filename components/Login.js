import {Button, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import {useEffect, useState} from 'react';

const Login = () => {
    const [accessToken, setAccessToken] = useState()
    const [userInfo, setUserInfo] = useState()

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: "382648074525-3bh0jsq03ut910i367er4djqp2fm0iok.apps.googleusercontent.com",
        androidClientId: "382648074525-4ll05bhmc1od6ubeu4n4ri2omjhs88mj.apps.googleusercontent.com",
        expoClientId: "382648074525-luus5lp62g7f13fjsq8h19poe2541ltr.apps.googleusercontent.com"
    })

    useEffect(() => {
        if (response?.type === 'success') {
            setAccessToken(response.authentication.accessToken);
        }
    }, [response])

    async function getUserData() {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        userInfoResponse.json().then(data => setUserInfo(data))
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
