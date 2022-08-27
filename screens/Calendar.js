import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {useEffect, useState} from 'react';
import {useCalendar} from '../hooks/calendar';
import app_constants from "../app_constants";
import dayjs from "dayjs";


const TEST_ID = 'test-calendar'

const Calendar = () => {
    const {getEvents} = useCalendar()
    const [events, setEvents] = useState({});

    const today = new Date();

    useEffect(() => {
        const date = {
            dateString: timeToString(new Date())
        }
        getEventsPerDay(date)
    }, [])

    const renderItem = (reservation, isFirst) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';

        const period = dayjs(reservation.start).format("HH:mm") + "-" + dayjs(reservation.end).format("HH:mm")

        return (
            <TouchableOpacity
                testID={TEST_ID}
                style={[styles.item, {height: reservation.height}]}
                onPress={() => Alert.alert("This feature will be enabled in next release.")}
            >
                <Text style={{fontSize, color}}>{reservation.name}</Text>
                <Text style={[styles.periodText]}>{period}</Text>
            </TouchableOpacity>
        );
    }

    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text>All done!</Text>
            </View>
        );
    }

    const rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    }

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    const getEventsPerDay = (day) => {
        getEvents(day.dateString).subscribe((event) => {
            if (Object.keys(event).length > 0) {
                setEvents(event)
            } else {
                const date = day.dateString
                const emptyMessage = {
                    [date]: {
                        name: "All done"
                    }
                }
                setEvents(emptyMessage)
            }
        })
    }

    return (
        <View style={styles.container}>
            <Agenda
                onDayPress={getEventsPerDay}
                testID={TEST_ID}
                items={events}
                selected={timeToString(today)}
                renderItem={renderItem}
                renderEmptyDate={renderEmptyDate}
                rowHasChanged={rowHasChanged}
                showClosingKnob={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        bottom: 80,
        right: 20
    },
    container: {
        position: 'static',
        paddingTop: app_constants.STATUS_BAR_HEIGHT,
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    calendarWrapper: {},
    items: {},
    dayPressColor: {
        backgroundColor: '#000000'
    },
    itemContainer: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    text: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        flexDirection: "row",
        flex:1,
        height: 15,
        paddingTop: 30,
        alignItems:"center"
    },
    periodText: {
        color: "gray"
    }
})


export default Calendar
