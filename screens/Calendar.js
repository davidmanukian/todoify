import {Button, StyleSheet, View} from 'react-native';
import {useAuth} from "../hooks/auth";
import app_constants from "../app_constants";

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
        <View style={[styles.container]}>
            <Button onPress={() => getEvents()} title="Get events">
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: app_constants.STATUS_BAR_HEIGHT,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Calendar
