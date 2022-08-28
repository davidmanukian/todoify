import {Alert, ImageBackground, StyleSheet} from 'react-native';
import {useAuth} from "../hooks/auth";
import FontAwesome5 from "@expo/vector-icons/FontAwesome";

/**
 * Login page that allows us to sign in only with Google.
 * */
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
        <ImageBackground source={require("../assets/login.jpg")} style={styles.container}>
            <FontAwesome5.Button name="google" onPress={doSignIn}>
                Sign in with Google
            </FontAwesome5.Button>
        </ImageBackground>
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
