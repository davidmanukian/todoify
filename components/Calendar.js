import {Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Calendar = () => {
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

    const localAccessToken =  'ya29.A0AVA9y1thrXBYUTgUi0iT_mROrgeunUVOtiug1Oa_e2i6NoTKTO5t1bQDIjMArX_VZJWtyyP3Un_T775Atw-CtPTgd38puEUGLnZ2E5vy1znPdeJKgFP586MKhtf8kMsDBMbVLhVMa5M0781E7Z6HihtH4sXhYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4dnNrd3FSWjZIZmRubHlNWWVQVWU4dw0163'
    // const localAccessToken =  'ya29.A0AVA9y1ti48xvfl2_91LMgtQzB97u67iMjzI5RcCr9bFVKaZ0q9Ue2En-l7_jR1MU5PxmvN0iXzWLqzCLp5JZh3wicrwBijVvElMGRT7Z8v5kfYUZDKElpnYfZV8MNp4sUO1IwibR3sJ-Omn2aMqgrnzY0tI68YKmMjSV-fsYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4X2ZlbUVUUXBwQWRfTHJFQk42NFhOZw0174'
    console.log('localAccessToken', localAccessToken);

    // getData().

    const getEvents = () => {
        const CALENDAR_ID = 'someCalendarID';
        const API_KEY = 'AIzaSyBj-fHnlIw5LSBCk3yJrDKf-4grjW3leGE';
        const beginDate = new Date();
        // let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${beginDate.toISOString()}&maxResults=50&singleEvents=true&orderBy=startTime`;
        let url = `https://www.googleapis.com/calendar/v3/calendars/primary/events`;


        fetch(url,
            {
                headers: {
                    Authorization: `Bearer ${localAccessToken}`
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('responseJson', responseJson);
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
                this.setState({error, loading: false, refreshing: false});
            });
    };


    return (
        <Button onPress={() => getEvents()} title="Get events">
        </Button>
    )
}


export default Calendar
