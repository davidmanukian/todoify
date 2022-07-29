import {Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';


const Calendar = ({navigation}) => {
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
        getData().then(t => setAccessToken(t));
    }, [])

    const storeData = async (value) => {
        try {
            await AsyncStorage.removeItem('accessToken')
        } catch (e) {
            console.log('saving error', e);
            // saving error
        }
    }

    const getEvents = () => {
        console.log('getEvents');
        const CALENDAR_ID = 'someCalendarID';
        const API_KEY = 'AIzaSyBj-fHnlIw5LSBCk3yJrDKf-4grjW3leGE';
        const beginDate = new Date();
        // let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${beginDate.toISOString()}&maxResults=50&singleEvents=true&orderBy=startTime`;
        let url = `https://www.googleapis.com/calendar/v3/calendars/primary/events`;

        console.log('fetch', accessToken)
        fetch(url,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                mode: 'no-cors'
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('responseJson', responseJson);
                if (responseJson.error) {
                    if (responseJson.error.code === 401 || responseJson.error.code === 403) {
                        on401Error();
                    }
                }
            })
            .then(() => {
                // this.getDates()
            })
            .catch(error => {
                console.log('error', error);
                // storeData(null);
                // setAccessToken(null);
                // navigation.navigate('Login')

                // this.setState({error, loading: false, refreshing: false});
            });
    };

    const on401Error = () => {
        storeData(null);
        setAccessToken(null);
        navigation.navigate('Login', {name: 'Login'})
    }

    return (
        <Button onPress={() => getEvents()} title="Get events">
        </Button>
    )
}


export default Calendar
