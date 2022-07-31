import {StyleSheet, View} from 'react-native';
import {useAuth} from "../hooks/auth";
import {Agenda} from 'react-native-calendars';
import {useEffect, useState} from 'react';
import {from, map, switchMap, tap, toArray} from 'rxjs';
// import {fromPromise} from 'rxjs/';


const Calendar = () => {
    const {accessToken} = useAuth();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [events, setEvents] = useState({});
    const [marksDate, setMarksDate] = useState({});
    const [refreshCalender, setRefreshCalender] = useState(false);

    const getEvents = () => {
        return from(fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })).pipe(
            switchMap(e => from(e.json())),
            switchMap((res) => from(res.items)
                .pipe(
                    map(item => {
                        return {
                            [new Date(item.start)]: {
                                start: item.start,
                                end: item.end
                            }
                        }
                    })
                )
            ),
            tap(e => {
                console.log(e)
            }),
        )
    }

    useEffect(() => {
        getEvents().subscribe(e => {

            // setEvents(e);
        });
    }, [])


    return (
        <View style={styles.container}>
            <Agenda
                items={events}
                style={styles.calendarWrapper}
                scrollEnabled={true}
                theme={{
                    // calendarBackground: '#000000'
                    todayTextColor: '#00adf5',
                }}>
            </Agenda>

            {/*<View style={styles.absolute}*/}
            {/*      behavior={Platform.OS === "ios" ? "padding" : "height"}>*/}
            {/*    /!*<Button title="press1" onPress={handleModal}/>*!/*/}
            {/*    <Modal isVisible={isModalVisible}>*/}
            {/*        <Modal.Container>*/}
            {/*            <Modal.Header title="Placeholder"/>*/}
            {/*            <Modal.Body>*/}
            {/*                <Text style={styles.text}>Placeholder Text</Text>*/}
            {/*            </Modal.Body>*/}
            {/*            <Modal.Footer>*/}
            {/*                /!*<Button title="press2" onPress={handleModal}/>*!/*/}
            {/*            </Modal.Footer>*/}
            {/*        </Modal.Container>*/}
            {/*    </Modal>*/}
            {/*</View>*/}
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
    }
})


export default Calendar
