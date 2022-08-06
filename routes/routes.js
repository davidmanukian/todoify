import {NavigationContainer} from "@react-navigation/native";
import AppNavigator from "../screens/AppNavigator";
import {useAuth} from "../hooks/auth";
import Login from "../screens/Login";
import {CalendarProvider} from '../hooks/calendar';

const Routes = () => {
    const {accessToken} = useAuth()
    return (
        <NavigationContainer>
            {accessToken ?
                <CalendarProvider>
                    <AppNavigator/>
                </CalendarProvider>
                : <Login/>}
        </NavigationContainer>
    )
}

export default Routes
