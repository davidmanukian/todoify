import * as WebBrowser from 'expo-web-browser'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./components/Login";
import AppNavigator from './components/AppNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const Stack = createNativeStackNavigator();

WebBrowser.maybeCompleteAuthSession()

const App = ({navigation}) => {
    const [accessToken, setAccessToken] = useState();
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('accessToken')
            if (value !== null) {
                console.log(value);
                return value;
                // value previously stored
            }
        } catch (e) {
            // error reading value
        }
    }

    useEffect(() => {
        getData().then(t => {
            setAccessToken(t);
            if (t) {
                navigation.navigate('Home', {name: 'Home'})
            }
        });
    }, [])

    // return (
    //     <NavigationContainer>
    //         <Stack.Navigator>
    //             <Stack.Screen
    //                 name="Home"
    //                 component={HomeScreen}
    //                 options={{ title: 'Welcome' }}
    //             />
    //             <Stack.Screen name="Profile" component={ProfileScreen} />
    //         </Stack.Navigator>
    //     </NavigationContainer>
    // );

    /*{accessToken ? <AppNavigator/> :*/

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <AppNavigator/>
                {/*<Stack.Screen  component={Login} name='Login'/>*/}
            </Stack.Navigator>}
        </NavigationContainer>
    )
}

export default App;
