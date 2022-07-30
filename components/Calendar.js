import {Button} from 'react-native';
import {useAuth} from "../hooks/auth";

const Calendar = () => {
    const {accessToken} = useAuth();

    const getEvents = async () => {
        await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }).then(e => e.json()).then(e => console.log(e)).catch(e => console.log(e))
    }


    return (
        <Button onPress={() => getEvents()} title="Get events">
        </Button>
    )
}


export default Calendar
