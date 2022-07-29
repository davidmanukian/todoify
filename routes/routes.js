import {NavigationContainer} from "@react-navigation/native";
import AppNavigator from "../components/AppNavigator";
import {useAuth} from "../hooks/auth";
import Login from "../components/Login";

const Routes = () => {
    const {accessToken} = useAuth()
    return (
        <NavigationContainer>
            {accessToken ? <AppNavigator/> : <Login/>}
        </NavigationContainer>
    )
}

export default Routes
