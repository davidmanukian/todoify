import {
    Dimensions,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SectionList,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {useAuth} from "../hooks/auth";
import FontAwesome5 from "@expo/vector-icons/FontAwesome";
import Constants from "expo-constants";
import {useState} from "react";
import {Entypo} from "@expo/vector-icons";

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const paddingTop = Constants.statusBarHeight

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

    const doSignOut = async () => {
        try {
            await signOut()
        } catch (err) {
            console.log(err)
        }
    }

    const addATask = () => {
        setAddATaskPressed(true)

    }

    const dismissTask = () => {
        Keyboard.dismiss;
        setAddATaskPressed(false)
    }

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
                        <View style={[{flexDirection: "row", flex: 1, paddingHorizontal: 10, alignItems: "center"}]}>
                            <Entypo name="circle" size={20} color="gray" style={[{paddingRight: 5}]}/>
                            <TextInput
                                placeholder={"Add a Task"}
                                style={[styles.addTaskTextInputStyle]}
                                autoFocus={true}/>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                :
                <View style={[styles.addATaskContainerStyle]}>
                    <FontAwesome5.Button name="plus"
                                         style={[styles.addTaskStyle]}
                                         onPress={addATask}>
                        Add a Task
                    </FontAwesome5.Button>
                </View>
            }
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: paddingTop,
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
        height: 70,
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
