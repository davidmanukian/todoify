import {Button, Text} from 'react-native';
import {useAuth} from "../hooks/auth";

const Home = () => {
    const {signOut} = useAuth()

    const doSignOut = async () => {
        try {
            await signOut()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Button onPress={doSignOut} title="Sign Out"/>
    )
}

export default Home;
