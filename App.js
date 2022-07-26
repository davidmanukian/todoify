import {StyleSheet} from 'react-native';
import * as WebBrowser from 'expo-web-browser'
import {useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./components/Login";
import AppNavigator from './components/AppNavigator'

const Stack = createNativeStackNavigator();

WebBrowser.maybeCompleteAuthSession()

const App = () => {

    const [accessToken] = useState()

    return (
        <NavigationContainer>
            {accessToken ? <AppNavigator/> : <Login/>}
        </NavigationContainer>
    )
}

export default App;
