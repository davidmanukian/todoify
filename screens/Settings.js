import {Button} from 'react-native';
import {useAuth} from '../hooks/auth';

const Settings = () => {
    const {signOut} = useAuth()


    return (
        <Button
            title="Log out"
            onPress={() => signOut()}
        />
    )
}

export default Settings
