import {Button} from 'react-native';


const Calendar = () => {
    const config = {
        "clientId": "382648074525-3bh0jsq03ut910i367er4djqp2fm0iok.apps.googleusercontent.com",
        "apiKey": "AIzaSyBj-fHnlIw5LSBCk3yJrDKf-4grjW3leGE",
        "scope": "https://www.googleapis.com/auth/calendar",
        "discoveryDocs": [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
        ]
    }

    const getEvents = () => {
        const CALENDAR_ID = 'someCalendarID';
        const API_KEY = 'AIzaSyBj-fHnlIw5LSBCk3yJrDKf-4grjW3leGE';
        const beginDate = new Date();
        let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${beginDate.toISOString()}&maxResults=50&singleEvents=true&orderBy=startTime`;

        fetch(url)
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
