import {Button} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const Settings = () => {
    const logout = () => {
        WebBrowser.dismissAuthSession();
        console.log('logout');
        // AuthSession.revokeAsync({
        //     token: accessToken
        // }).then(r => {
        //     console.log(r);
        // })
    }


    return (
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
    )
}

export default Settings
