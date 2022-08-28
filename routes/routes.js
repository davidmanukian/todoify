import {NavigationContainer} from "@react-navigation/native";
import AppNavigator from "../screens/AppNavigator";
import {useAuth} from "../hooks/auth";
import Login from "../screens/Login";
import {CalendarProvider} from '../hooks/calendar';

/**
 * Navigation that allows us to detect whether user signed in successfully or not.
 * If there is access-token (google oauth) then the user can use Calendar and fetch all events otherwise will be
 * redirected to Login page.
 * */
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
