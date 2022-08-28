import {Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {Cell, Section, TableView} from "react-native-tableview-simple";
import {AntDesign, Entypo, Feather, Ionicons} from "@expo/vector-icons";
import {grayishColor} from "../colors";
import {useEffect, useRef, useState} from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome";
import HomeListModal from "../components/home/HomeListModal";
import {useStorage} from "../hooks/storage";
import {COLLECTION_SECTIONS, COLLECTION_TASKS} from "../constant_storage";
import HomeCalendarModal from "../components/home/HomeCalendarModal";
import dayjs from "dayjs";

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

//my custom modal can be any height you desire that's why I'm using such constants
const modalHeight = SCREEN_HEIGHT * 10 / 100
const calendarModalHeight = SCREEN_HEIGHT * 70 / 100;


/**
 * This screen is responsible for showing details of Todos.
 * You can navigate to this screen when you're Home page and click at any Tod
 * */
const Details = (props) => {
    //fetching navigation params (data) from Home page.
    const {data} = props.route.params

    //using storage (async storage) context.
    const {getItemRaw, removeItem, storeItemRaw} = useStorage()

    const datePickerRef = useRef(null);

    const [taskName, setTaskName] = useState(data.task)
    const [isSectionVisible, setSectionVisible] = useState(false)
    const [isCalendarVisible, setCalendarVisible] = useState(false)
    const [datePickerOpened, setDatePickerOpened] = useState(false);
    const [datePickerValue, setDatePickerValue] = useState();
    const [dueDateValue, setDueDateValue] = useState();

    const [sections, setSections] = useState([])

    /**
     * fetching all sections that were created in Settings page when page is loaded.
     * */
    useEffect(() => {
        getItemRaw(COLLECTION_SECTIONS)
            .subscribe(e => {
                const parsedSections = JSON.parse(e)
                const sections = parsedSections.map(e => e.name)
                setSections(sections)
            })
    }, [])

    /**
     * When we change date in 'due modal' we need to UPSERT our task.
     * */
    useEffect(() => {
        const upsert = {
            id: data.id,
            list: data.list,
            dueDate: dueDateValue,
            task: data.task,
            status: data.status
        }
        storeItemRaw(COLLECTION_TASKS + ":" + data.id, JSON.stringify(upsert))
    }, [dueDateValue, datePickerValue])

    //convenient way of rendering data
    const formatDueDate = () => {
        return `Due ${datePickerValue ? dayjs(datePickerValue).format("MMM D, YYYY") :
            dayjs(data.dueDate).format("MMM D, YYYY")}`
    }

    const dueDatePressed = () => {
        setCalendarVisible(true)
    }

    const sectionPressed = () => {
        setSectionVisible(true)
    }

    //add list method that is used to store a list
    const addList = (e) => {
        data.list = e
        storeItemRaw(COLLECTION_TASKS + ":" + data.id, JSON.stringify(data))
        setSectionVisible(false)
    }

    //dueDate handler for updating due date
    const addDueDate = (value) => {
        setDatePickerValue(value)
        setDueDateValue(value)
        setDatePickerOpened(false)
        setCalendarVisible(false)
    }

    //when we remove task we have to redirect back to Home page with alert
    const removeTask = () => {
        removeItem(COLLECTION_TASKS + ":" + data.id)
        Alert.alert("Task was deleted")
        props.navigation.goBack()
    }

    /**
     * These are Cells of tableview.
     * this is much convenient and best practice to use then hardcode in JSX.
     * */
    const detailsCells = [
        {
            "title": "Due",
            "icon": <FontAwesome5 name="calendar" size={20}/>,
            "text": formatDueDate(),
            "disabled": false,
            "onPress": () => dueDatePressed()
        },
        {
            "title": "",
            "icon": <Feather name="list" size={20}/>,
            "text": data.list,
            "disabled": false,
            "onPress": () => sectionPressed()
        },
        {
            "title": "Remind Me",
            "icon": <Ionicons name="notifications-outline" size={20}/>,
            "text": "Remind Me",
            "disabled": true,
            "onPress": () => {
            }
        },
        {
            "title": "Repeat",
            "icon": <Feather name="repeat" size={20}/>,
            "text": "Repeat",
            "disabled": true,
            "onPress": () => {
            }
        },
        {
            "title": "Add Note",
            "icon": <FontAwesome5 name="sticky-note" size={20}/>,
            "text": "Add Note",
            "disabled": true,
            "onPress": () => {
            }
        }
    ]

    const iconSize = 30
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{flexDirection: "row", flex: 4, marginTop: 15}}>
                    <View style={{paddingHorizontal: 15}}>
                        {data.status === 'started' ?
                            <Entypo name="circle" onPress={() => props.changeTaskStatus(props.data, 'completed')}
                                    size={iconSize}
                                    color={grayishColor}/>
                            :
                            <AntDesign name="checkcircleo" onPress={() => props.changeTaskStatus(props.data, 'started')}
                                       size={iconSize}
                                       color={grayishColor}/>
                        }
                    </View>
                    <View style={{flex: 4}}>
                        <TextInput value={taskName}
                                   onChangeText={setTaskName}
                                   style={{fontSize: 24}}/>
                    </View>
                </View>
                <TableView>
                    <Section>
                        {detailsCells.map(e =>
                            <Cell key={e.title} isDisabled={e.disabled} cellContentView={
                                <View style={[styles.cellContentViewStyle]}>
                                    {e.icon}
                                    <Text style={[styles.cellContentViewTextStyle, {
                                        "color": e.disabled ? "gray" : "black"
                                    }]}>{e.text}</Text>
                                </View>
                            }
                                  onPress={e.onPress}
                                  hideSeparator={true}
                            />
                        )}
                    </Section>
                    <Section>
                        <Cell
                            cellContentView={
                                <View style={[styles.cellContentViewStyle]}>
                                    <AntDesign name="delete" size={20}/>
                                    <Text style={styles.cellContentViewTextStyle}>Delete</Text>
                                </View>
                            }
                            onPress={removeTask}
                        />
                    </Section>
                    <HomeListModal
                        isVisible={isSectionVisible}
                        modalHeight={modalHeight}
                        onBackdropPress={() => setSectionVisible(false)}
                        cancelButton={() => setSectionVisible(false)}
                        addList={(e) => addList(e)}
                        sections={sections}
                    />
                    <HomeCalendarModal
                        isVisible={isCalendarVisible}
                        modalHeight={calendarModalHeight}
                        onBackdropPress={() => setCalendarVisible(false)}
                        addDueDate={(e) => addDueDate(e)}
                        setDatePickerOpened={(e) => setDatePickerOpened(e)}
                        datePickerOpened={datePickerOpened}
                        setDatePickerValue={(e) => setDatePickerOpened(e)}
                        datePickerValue={datePickerValue}
                        datePickerRef={datePickerRef}
                    />
                </TableView>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cellContentViewStyle: {
        flexDirection: "row",
        flex: 1
    },
    cellContentViewTextStyle: {
        fontSize: 20,
        marginLeft: 15
    }
});

export default Details
