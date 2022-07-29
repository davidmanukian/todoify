import {Button, StatusBar, StyleSheet, Text, Alert, View} from 'react-native';
import {useAuth} from "../hooks/auth";

const Login = () => {

    const {signIn} = useAuth()

    const doSignIn = async () => {
        try {
            await signIn()
        } catch (err) {
            Alert.alert(err)
        }
    }

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
            <Button title="Sign In" onPress={doSignIn}/>
            <StatusBar style="auto"/>
        </View>
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
                    window.location.replace(
                        `https://www.googleapis.com/v2/logout?client_id=${iosClientId}&returnTo=${'/'}`
                    );
                }}
            />
            <StatusBar style="auto"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Login
