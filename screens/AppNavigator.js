import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import routes from "../constant_routes";
import Home from "./Home";
import Settings from './Settings'
import Calendar from "./Calendar";
import Constants from 'expo-constants';
import {StyleSheet,} from "react-native";

const Tab = createBottomTabNavigator();

const paddingTop = Constants.statusBarHeight

const AppNavigator = () => {
    return (
        <Tab.Navigator style={[]}
                       screenOptions={{headerShown: false}}
        >
            <Tab.Screen name={routes.HOME}
                        component={Home}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <MaterialCommunityIcons name="home" color={color} size={size}/>
                            )
                        }}
            />
            <Tab.Screen name={routes.CALENDAR}
                        component={Calendar}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <MaterialCommunityIcons name="calendar" color={color} size={size}/>
                            ),
                        }}
            />
            <Tab.Screen name={routes.SETTINGS}
                        component={Settings}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <MaterialCommunityIcons name="cog" color={color} size={size}/>
                            ),
                        }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({});

export default AppNavigator
