import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import routes from "../constant_routes";
import Home from "./Home";
import Settings from './Settings'
import Calendar from "./Calendar";
import Constants from 'expo-constants';
import {StyleSheet,} from "react-native";
import {useStorage} from '../hooks/storage';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Details from "./Details";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const paddingTop = Constants.statusBarHeight

const InnerNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={routes.HOME} component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name={routes.DETAILS} component={Details}/>
        </Stack.Navigator>
    )
}

const AppNavigator = () => {
    const {selectedTab, setSelectedTab} = useState();
    const {getItem, storeItem} = useStorage();
    const navigation = useNavigation();


    useEffect(() => {
        getItem('selectedTab').subscribe(t => {
            if (t) {
                console.log('t', t);
                navigation.navigate(t);
            }
        })
    }, [])
    useEffect(() => {
        const unsubscribe = navigation.addListener('state',
            (e) => {
                let index = e.data.state.index;
                let screenName = e.data.state.routeNames[index];
                storeItem('selectedTab', screenName);
            });
        return unsubscribe;
    }, [navigation]);
    return (
        <Tab.Navigator style={[]}
                       screenOptions={
                           {headerShown: false}
                       }
        >
            <Tab.Screen name={routes.HOME}
                        component={InnerNavigator}
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

const styles = StyleSheet.create({});

export default AppNavigator
