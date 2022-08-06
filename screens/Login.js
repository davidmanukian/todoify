import {Alert, Button, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useAuth} from "../hooks/auth";
import FontAwesome5 from "@expo/vector-icons/FontAwesome";

const Login = () => {

    const {signIn} = useAuth()

    const doSignIn = async () => {
        try {
            await signIn()
        } catch (err) {
            Alert.alert(err)
        }
    }

    return (
        <View style={styles.container}>
            <FontAwesome5.Button name="google" onPress={doSignIn}>
                Sign in with Google
            </FontAwesome5.Button>
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
