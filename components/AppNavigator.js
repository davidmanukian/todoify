import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import routes from "../constant_routes";
import Home from "./Home";
import Settings from './Settings'
import Calendar from "./Calendar";
import {CalendarProvider} from '../hooks/calendar';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name={routes.HOME}
                        component={Home}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <MaterialCommunityIcons name="home"
                                                        color={color}
                                                        size={size}/>
                            ),
                        }}
            />
            {/*<CalendarProvider>*/}
                <Tab.Screen name={routes.CALENDAR}
                            component={Calendar}
                            options={{
                                tabBarIcon: ({color, size}) => (
                                    <MaterialCommunityIcons name="calendar"
                                                            color={color}
                                                            size={size}/>
                                ),
                            }}
                />
            {/*</CalendarProvider>*/}

            <Tab.Screen name={routes.SETTINGS}
                        component={Settings}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <MaterialCommunityIcons name="cog" color={color}
                                                        size={size}/>
                            ),
                        }}
            />
        </Tab.Navigator>
    )
}

export default AppNavigator
