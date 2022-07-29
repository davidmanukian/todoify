import {Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';


const Calendar = ({navigation}) => {
    const [accessToken, setAccessToken] = useState();


    const config = {
        "clientId": "382648074525-3bh0jsq03ut910i367er4djqp2fm0iok.apps.googleusercontent.com",
        "apiKey": "AIzaSyBj-fHnlIw5LSBCk3yJrDKf-4grjW3leGE",
        "scope": "https://www.googleapis.com/auth/calendar",
        "discoveryDocs": [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
        ]
    }

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
                // this.setState({
                //     pageToken: responseJson.nextPageToken,
                //     dataSource: [...this.state.dataSource, ...responseJson.items],
                //     loading: false,
                //     refreshing: false,
                //     error: responseJson.error || null,
                // });
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
