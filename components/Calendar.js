import {Button} from 'react-native';
import {useAuth} from "../hooks/auth";

const API_KEY = "AIzaSyBj-fHnlIw5LSBCk3yJrDKf-4grjW3leGE"

const Calendar = () => {
    const {accessToken} = useAuth();

    const getEvents = async () => {
        const events = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
            headers:{
                "Authorization": `Bearer ${accessToken}`
            }
        })

        console.log('', events)

        const eventsJson = events.json();

        console.log(eventsJson)

        return eventsJson;
    }


    return (
        <Button onPress={() => getEvents()} title="Get events">
        </Button>
    )
}


export default Calendar
