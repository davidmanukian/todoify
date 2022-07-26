import {Alert, Dimensions, ImageBackground, Keyboard, StyleSheet} from 'react-native';
import app_constants from "../app_constants";
import {useEffect, useRef, useState} from "react";
import HomeListModal from "../components/home/HomeListModal";
import HomeCalendarModal from "../components/home/HomeCalendarModal";
import {COLLECTION_TASKS, COLLECTION_SECTIONS} from '../constant_storage';
import {useStorage} from '../hooks/storage';
import {groupBy, map} from "lodash";
import uuid from 'react-native-uuid'
import TaskView from "../components/home/TaskView";
import TaskInput from "../components/home/TaskInput";
import TaskAddButton from "../components/home/TaskAddButton";
import TaskDoneButton from "../components/home/TaskDoneButton";

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const modalHeight = SCREEN_HEIGHT * 10 / 100
const calendarModalHeight = SCREEN_HEIGHT * 70 / 100;

const Home = ({navigation}) => {
    const datePickerRef = useRef(null);

    const {getItemRaw, getAllItems, multiGetItems, removeItem, clearItems, storeItemRaw} = useStorage()

    const [addATaskPressed, setAddATaskPressed] = useState(false)

    const [taskValue, setTaskValue] = useState(null)
    const [listValue, setListValue] = useState(null)
    const [dueDateValue, setDueDateValue] = useState(null);

    const [listModalVisible, setListModalVisible] = useState(false)
    const [calendarModalVisible, setCalendarModalVisible] = useState(false)

    const [datePickerOpened, setDatePickerOpened] = useState(false);
    const [datePickerValue, setDatePickerValue] = useState(null);

    const [sections, setSections] = useState([])

    const [tasksGroupBySection, setTasksGroupBySection] = useState([])

    let enabledSections = ['No Section', 'Completed'];

    useEffect(() => {
        navigation.addListener('focus', () => {
            enabledSections = ['No Section', 'Completed'];
        })
    }, [])

    useEffect(() => {
        navigation.addListener('focus', () => {
            fetchSections();
        })
        fetchSections();
    }, [])

    useEffect(() => {
        navigation.addListener('focus', () => {
            fetchTasks()
        })
    }, [navigation])

    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchSections = () => {
        getItemRaw(COLLECTION_SECTIONS)
            .subscribe(data => {
                if (data) {
                    const parsedSections = JSON.parse(data)
                    const sections = parsedSections.filter(e => e.isSelected).map(data => data.name)
                    parsedSections.forEach(e => {
                        if (e.isSelected) {
                            enabledSections.push(e.name)
                        }
                    })
                    setSections(sections)
                }
            })
    }


    const fetchTasks = () => {
        fetchSections();
        getAllItems()
            .subscribe(e => {
                const filtered = e.filter(e => e.includes(COLLECTION_TASKS))
                multiGetItems(filtered)
                    .subscribe(result => {
                        let tasks = []
                        for (let i = 0; i < result.length; i++) {
                            tasks.push(JSON.parse(result[i][1]))
                        }
                        tasks = tasks.filter(e => !e.list || e.list === 'Completed' || enabledSections.includes(e.list))
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
                storeItemRaw(COLLECTION_TASKS + ":" + task.id, JSON.stringify(task))
                dismissTask()
                Alert.alert("New task was added successfully")
                fetchTasks()
            } catch (exc) {
                console.log("Error occurred during saving new task ", exc)
            }
        }
    }

    const addList = (value) => {
        setListValue(value)
        setListModalVisible(false)
    }

    const addDueDate = (value) => {
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


    const changeTaskStatus = (item, status) => {
        console.log("Clicked ", status)
        const path = COLLECTION_TASKS + ":" + item.id;
        getItemRaw(path)
            .subscribe(
                task => {
                    const parsedTask = JSON.parse(task)
                    parsedTask.status = status
                    storeItemRaw(path, JSON.stringify(parsedTask))
                    fetchTasks()
                }
            )
    }

    return (
        <ImageBackground source={require("../assets/backgroundImg3.jpg")} style={[styles.container]}>
            <TaskView
                navigation={navigation}
                dismissTask={() => dismissTask()}
                tasksGroupBySection={tasksGroupBySection}
                changeTaskStatus={(e, s) => changeTaskStatus(e, s)}
            />
            {addATaskPressed ?
                <TaskInput
                    datePickerValue={datePickerValue}
                    setTaskValue={(e) => setTaskValue(e)}
                    openList={() => openList()}
                    listValue={listValue}
                    disabled={sections.length === 0}
                    setListValue={(e) => setListValue(e)}
                    openCalendar={() => openCalendar()}

                />
                :
                <TaskAddButton
                    showTaskModal={() => showTaskModal()}
                />
            }
            {addATaskPressed &&
                <TaskDoneButton
                    addATask={() => addATask()}
                />
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
});

export default Home;
