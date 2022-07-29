import {Alert, Button, StyleSheet, Text, View} from 'react-native';
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
        // <View style={styles.container}>
        //     <Button title="Sign In" onPress={doSignIn}/>
        //     <StatusBar style="auto"/>
        // </View>
        <View style={styles.container}>
            {showUserInfo()}
            <Button title="Sign In" onPress={doSignIn}/>
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
