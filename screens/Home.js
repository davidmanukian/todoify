import {
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
import {useState} from "react";
import {Entypo, Feather, Ionicons} from "@expo/vector-icons";
import TodoBadge from "../ui/badge";
import HomeListModal from "../components/home/HomeListModal";
import HomeCalendarModal from "../components/home/HomeCalendarModal";

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const modalHeight = SCREEN_HEIGHT * 10 / 100
const calendarModalHeight = SCREEN_HEIGHT * 70 / 100;

const addATaskWidth = SCREEN_WIDTH - 30;


const Item = ({title}) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}

const Home = () => {
    const {signOut} = useAuth()

    const [addATaskPressed, setAddATaskPressed] = useState(false)
    const [taskValue, setTaskValue] = useState(null)
    const [listValue, setListValue] = useState(null)
    const [listModalVisible, setListModalVisible] = useState(false)
    const [calendarModalVisible, setCalendarModalVisible] = useState(false)

    const doSignOut = async () => {
        try {
            await signOut()
        } catch (err) {
            console.log(err)
        }
    }

    const showTaskModal = () => {
        setAddATaskPressed(true)
    }

    const dismissTask = () => {
        Keyboard.dismiss;
        setAddATaskPressed(false)
    }

    const addATask = () => {
        console.log(taskValue)
    }

    const addList = (value) => {
        console.log(value)
        setListValue(value)
        setListModalVisible(false)
    }

    const openList = () => {
        setListModalVisible(true);
    }

    const openCalendar = () => {
        setCalendarModalVisible(true)
    }

    const sections = ["Section 1", "Section 2", "Section 3"]

    const data = [
        {
            section: "Section 1",
            data: ["To Complete 1", "To Complete 2", "To Complete 3"]
        },
        {
            section: "Section 2",
            data: ["To Complete 1", "To Complete 2", "To Complete 3"]
        },
        {
            section: "Section 3",
            data: ["To Complete 1", "To Complete 2", "To Complete 3"]
        }
    ];

    return (
        <ImageBackground source={require("../assets/backgroundImg.jpg")} style={[styles.container]}>
            <View style={[{flexDirection: "row", flex: 1}]}>
                <TouchableWithoutFeedback onPress={dismissTask}>
                    <SectionList sections={data}
                                 keyExtractor={(item, index) => item + index}
                                 renderItem={({item}) => <Item title={item}/>}
                                 renderSectionHeader={({section: {section}}) => (
                                     <Text>{section}</Text>
                                 )}/>
                </TouchableWithoutFeedback>
            </View>
            {addATaskPressed ?
                <KeyboardAvoidingView style={[styles.keyboardAvoidingViewStyle]}
                                      behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={[styles.addATaskModalContainer]}>
                        <View style={[{flexDirection: "row", flex: 1, paddingHorizontal: 20, alignItems: "center"}]}>
                            <Entypo name="circle" size={20} color="gray" style={[{paddingRight: 10}]}/>
                            <TextInput
                                placeholder={"Add a Task"}
                                style={[styles.addTaskTextInputStyle]}
                                autoFocus={true}
                                onChangeText={task => setTaskValue(task)}
                            />
                        </View>
                        <View style={[{flexDirection: "row", flex: 1, paddingHorizontal: 20, alignItems: "center"}]}>
                            <TouchableOpacity onPress={openList}>
                                {listValue ?
                                    <TodoBadge badgeSize={30}
                                               data={listValue}
                                               buttonSize={15}
                                               buttonBackgroundColor="transparent"
                                               buttonBorderRadius={0}
                                               buttonIconName="close"
                                               buttonOnPress={() => setListValue(null)}
                                    >

                                    </TodoBadge>
                                    :
                                    <Feather name="list" size={20} color="gray"/>}
                            </TouchableOpacity>
                            <TouchableOpacity style={[{marginLeft: 20}]} onPress={openCalendar}>
                                <FontAwesome5 name="calendar" size={20} color="gray"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                :
                <View style={[styles.addATaskContainerStyle]}>
                    <FontAwesome5.Button name="plus"
                                         style={[styles.addTaskStyle]}
                                         onPress={showTaskModal}>
                        Add a Task
                    </FontAwesome5.Button>
                </View>
            }
            {addATaskPressed &&
                <View
                    style={[{position: "absolute", top: 50, right: 10, bottom: 0}]}>
                    <Button color={"white"} backgroundColor={"transparent"} onPress={addATask} title={"Done"}/>
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
        backgroundColor: "brown"
    },
    addATaskModalContainer: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        width: "100%",
        height: 80,
        backgroundColor: "white"
    },
    keyboardAvoidingViewStyle: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0
    },
    addTaskTextInputStyle: {
        height: 40,
        flex: 1
    }
});

export default Home;
