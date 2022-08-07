import {
    Alert,
    Button,
    Dimensions,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SectionList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {useAuth} from "../hooks/auth";
import FontAwesome5 from "@expo/vector-icons/FontAwesome";
import app_constants from "../app_constants";
import {useEffect, useRef, useState} from "react";
import {AntDesign, Entypo, Feather} from "@expo/vector-icons";
import TodoBadge from "../ui/badge";
import HomeListModal from "../components/home/HomeListModal";
import HomeCalendarModal from "../components/home/HomeCalendarModal";
import {COLLECTION_TASKS} from '../constant_storage';
import {useStorage} from '../hooks/storage';
import {groupBy, map} from "lodash";
import uuid from 'react-native-uuid'

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const modalHeight = SCREEN_HEIGHT * 10 / 100
const calendarModalHeight = SCREEN_HEIGHT * 70 / 100;

const addATaskWidth = SCREEN_WIDTH - 30;

const mainBackgroundColor = "#065a60"
const whitenColor = "#f8f9fa"
const grayishColor = "#d3d3d3"

const Item = (props) => {
    return (
        <View style={{
            flexDirection: "row",
            flex: 4,
            backgroundColor: mainBackgroundColor,
            margin: 10,
            borderRadius: 10,
            paddingVertical: 10
        }}>
            <View style={{
                backgroundColor: mainBackgroundColor,
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 10
            }}>
                {props.data.status === 'started' ?
                    <Entypo name="circle" onPress={props.completeTask} size={24} color={grayishColor}/>
                    :
                    <AntDesign name="checkcircleo" size={24} color={grayishColor}/>
                }

            </View>
            <View style={{
                flex: 4
            }}>
                <View style={{
                    flexDirection: "column",
                    flex: 1
                }}>
                    <Text style={{
                        flex: 1,
                        color: whitenColor,
                        fontSize: 16
                    }}>
                        {props.data.task}
                    </Text>
                    <View style={{
                        flexDirection: "row",
                        marginTop: 3,
                        flex: 1
                    }}>
                        <Text style={{
                            color: grayishColor
                        }}>
                            {props.data.dueDate}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const SectionLabel = (props) => {
    return (
        <Text style={{
            marginLeft: 20,
            fontSize: 22,
            fontWeight: "bold"
        }}>
            {props.label}
        </Text>
    )
}

const Home = () => {
    const {signOut} = useAuth()

    const datePickerRef = useRef(null);

    const {getItem, getAllItems, multiGetItems, removeItem, clearItems, storeItem} = useStorage()

    const [addATaskPressed, setAddATaskPressed] = useState(false)

    const [taskValue, setTaskValue] = useState(null)
    const [listValue, setListValue] = useState(null)
    const [dueDateValue, setDueDateValue] = useState(null);

    const [listModalVisible, setListModalVisible] = useState(false)
    const [calendarModalVisible, setCalendarModalVisible] = useState(false)

    const [datePickerOpened, setDatePickerOpened] = useState(false);
    const [datePickerValue, setDatePickerValue] = useState(null);

    const [sections, setSections] = useState(['Section 1', 'Section 2'])

    const [tasksGroupBySection, setTasksGroupBySection] = useState([])

    useEffect(() => {
        // getItem(COLLECTION_SECTIONS).
        //     subscribe(e => {
        //         setSections(e)
        // })
        fetchTasks()
    }, [])


    const fetchTasks = () => {
        getAllItems()
            .subscribe(e => {
                const filtered = e.filter(e => e.includes(COLLECTION_TASKS))
                multiGetItems(filtered)
                    .subscribe(result => {
                        const tasks = []
                        for (let i = 0; i < result.length; i++) {
                            tasks.push(JSON.parse(result[i][1]))
                        }

                        const groupedBySection = groupBy(tasks, task => task.status === 'started' ?
                            task.list ?? "No Section" : 'Completed')
                        const mappedDataToRequiredFormat = map(groupedBySection, (key, value) => ({
                            section: value,
                            data: key
                        }))

                        setTasksGroupBySection(mappedDataToRequiredFormat)
                    })
            })
    }

    const showTaskModal = () => {
        setAddATaskPressed(true)
    }

    const dismissTask = () => {
        Keyboard.dismiss;
        setAddATaskPressed(false)
        setDatePickerValue(null)
        setDueDateValue(null)
        setListValue(null)
    }

    const addATask = () => {
        console.log(taskValue)
        if (taskValue !== null) {
            const task = {
                id: uuid.v4(),
                list: listValue,
                dueDate: dueDateValue,
                task: taskValue,
                status: "started"
            }

            try {
                storeItem(COLLECTION_TASKS + ":" + task.id, JSON.stringify(task))
                dismissTask()
                Alert.alert("New task was added successfully")
                fetchTasks()
            } catch (exc) {
                console.log("Error occurred during saving new task ", exc)
            }
        }
    }

    const addList = (value) => {
        console.log(value);
        setListValue(value)
        setListModalVisible(false)
    }

    const addDueDate = (value) => {
        console.log(value);
        setDatePickerValue(value)
        setDueDateValue(value)
        setDatePickerOpened(false)
        setCalendarModalVisible(false)
    }

    const openList = () => {
        setListModalVisible(true);
    }

    const openCalendar = () => {
        setCalendarModalVisible(true)
    }

    const dueDateFormatted = () => {
        if (typeof datePickerValue === 'string') {
            return datePickerValue
        }
        const weekday = datePickerValue.toLocaleString('en-us', {weekday: 'short'})
        const day = datePickerValue.toLocaleString('en-us', {day: "2-digit"})
        const month = datePickerValue.toLocaleString('en-us', {month: 'short'})

        return `${weekday}, ${day} ${month}`

    }

    const completeTask = (item) => {
        const path = COLLECTION_TASKS + ":" + item.id;
        console.log("path", path)
        getItem(path)
            .subscribe(
                task => {
                    const parsedTask = JSON.parse(task)
                    parsedTask.status = 'completed'
                    storeItem(path, JSON.stringify(parsedTask))
                    fetchTasks()
                }
            )
    }

    return (
        <ImageBackground source={require("../assets/backgroundImg3.jpg")} style={[styles.container]}>
            <View style={[{flexDirection: "row", flex: 1, marginTop: 50}]}>
                <TouchableWithoutFeedback onPress={dismissTask}>
                    <SectionList sections={tasksGroupBySection}
                                 keyExtractor={(item, index) => item + index}
                                 renderItem={({item}) => <Item data={item} completeTask={() => completeTask(item)}
                                                               section/>}
                                 renderSectionHeader={({section: {section}}) => (
                                     <SectionLabel label={section}/>
                                 )}

                    />
                </TouchableWithoutFeedback>
            </View>
            {addATaskPressed ?
                <KeyboardAvoidingView style={[styles.keyboardAvoidingViewStyle]}
                                      behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={[styles.addATaskModalContainer]}>
                        <View style={[{flexDirection: "row", flex: 1, paddingHorizontal: 20, alignItems: "center"}]}>
                            <Entypo name="circle" size={20} color={grayishColor} style={[{paddingRight: 10}]}/>
                            <TextInput
                                placeholder={"Add a Task"}
                                placeholderTextColor={grayishColor}
                                selectionColor={grayishColor}
                                style={[styles.addTaskTextInputStyle]}
                                autoFocus={true}
                                onChangeText={task => setTaskValue(task)}
                            />
                        </View>
                        <View style={[{flexDirection: "row", flex: 1, paddingHorizontal: 20, alignItems: "center"}]}>
                            <TouchableOpacity onPress={openList}>
                                {listValue ?
                                    <TodoBadge
                                        badgeStyle={{backgroundColor: grayishColor}}
                                        badgeSize={30}
                                        data={listValue}
                                        buttonSize={15}
                                        buttonBackgroundColor="transparent"
                                        buttonBorderRadius={0}
                                        buttonIconName="close"
                                        buttonOnPress={() => setListValue(null)}
                                    >

                                    </TodoBadge>
                                    :
                                    <Feather name="list" size={20} color={grayishColor}/>}
                            </TouchableOpacity>
                            <TouchableOpacity style={[datePickerValue ? styles.badgeMargin : styles.noBadgeMargin]}
                                              onPress={openCalendar}>
                                {datePickerValue ?
                                    <TodoBadge
                                        badgeStyle={{backgroundColor: grayishColor}}
                                        badgeSize={30}
                                        data={dueDateFormatted()}
                                        buttonSize={15}
                                        buttonBackgroundColor="transparent"
                                        buttonBorderRadius={0}
                                        buttonIconName="close"
                                        buttonOnPress={() => setDatePickerValue(null)}
                                    >

                                    </TodoBadge>
                                    :
                                    <FontAwesome5 name="calendar" size={20} color={grayishColor}/>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                :
                <View style={[styles.addATaskContainerStyle]}>
                    <FontAwesome5.Button name="plus"
                                         style={[styles.addTaskStyle]}
                                         onPress={showTaskModal}>
                        <Text style={{fontSize: 16, color: whitenColor}}>Add a Task</Text>
                    </FontAwesome5.Button>
                </View>
            }
            {addATaskPressed &&
                <View
                    style={[{position: "absolute", top: 50, right: 10, bottom: 0}]}>
                    <Button color={mainBackgroundColor} backgroundColor={"transparent"} onPress={addATask}
                            title="Done"/>
                </View>
            }

            <HomeListModal isVisible={listModalVisible}
                           modalHeight={modalHeight}
                           onBackdropPress={() => setListModalVisible(false)}
                           cancelButton={() => setListModalVisible(false)}
                           sections={sections}
                           addList={(e) => addList(e)}
            />

            <HomeCalendarModal isVisible={calendarModalVisible}
                               modalHeight={calendarModalHeight}
                               onBackdropPress={() => setCalendarModalVisible(false)}
                               addDueDate={(e) => addDueDate(e)}
                               setDatePickerOpened={(e) => setDatePickerOpened(e)}
                               datePickerOpened={datePickerOpened}
                               setDatePickerValue={(e) => setDatePickerOpened(e)}
                               datePickerValue={datePickerValue}
                               datePickerRef={datePickerRef}

            />

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: app_constants.STATUS_BAR_HEIGHT,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addATaskContainerStyle: {
        flexDirection: "row",
        marginBottom: 15
    },
    addTaskStyle: {
        alignSelf: "stretch",
        minWidth: addATaskWidth,
        backgroundColor: mainBackgroundColor,
        paddingVertical: 10
    },
    addATaskModalContainer: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        width: "100%",
        height: 80,
        backgroundColor: mainBackgroundColor
    },
    keyboardAvoidingViewStyle: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0
    },
    addTaskTextInputStyle: {
        height: 40,
        flex: 1,
        color: whitenColor,
        fontSize: 16
    },
    badgeMargin: {
        marginLeft: 5
    },
    noBadgeMargin: {
        marginLeft: 20
    }
});

export default Home;
