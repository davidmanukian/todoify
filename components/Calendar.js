import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAuth} from "../hooks/auth";
import {Agenda} from 'react-native-calendars';
import {useEffect, useState} from 'react';
import {from, map, of, switchMap, tap} from 'rxjs';
import dayjs from 'dayjs';
import {useCalendar} from '../hooks/calendar';
// import {fromPromise} from 'rxjs/';


const TEST_ID = 'test-calendar'

const Calendar = () => {
    const {getEvents} = useCalendar()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [events, setEvents] = useState({});
    const [marksDate, setMarksDate] = useState({});
    const [refreshCalender, setRefreshCalender] = useState(false);


    useEffect(() => {
        getEvents().subscribe(e => {
            setEvents(e);
        });
    }, []);

    const loadItems = (day) => {
        const items = {};

        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                if (!items[strTime]) {
                    items[strTime] = [];

                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                            day: strTime
                        });
                    }
                }
            }

            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            setEvents(newItems);
        }, 1000);
    }

    const renderItem = (reservation, isFirst) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';

        return (
            <TouchableOpacity
                testID={TEST_ID}
                style={[styles.item, {height: reservation.height}]}
                onPress={() => Alert.alert(reservation.name)}
            >
                <Text style={{fontSize, color}}>{reservation.name}</Text>
            </TouchableOpacity>
        );
    }

    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
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


    return (
        <View style={styles.container}>
            <Agenda
                testID={TEST_ID}
                items={events}
                // loadItemsForMonth={loadItems}
                selected={'2022-07-31'}
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
        height: 15,
        flex: 1,
        paddingTop: 30
    }
})


export default Calendar
