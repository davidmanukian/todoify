import {KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {Entypo, Feather} from "@expo/vector-icons";
import {grayishColor, mainBackgroundColor, whitenColor} from "../../colors";
import TodoBadge from "../../ui/badge";
import FontAwesome5 from "@expo/vector-icons/FontAwesome";
import dayjs from "dayjs";

const TaskInput = (props) => {

    const dueDateFormatted = () => {
        return dayjs(props.datePickerValue).format("MMM D, YYYY")

    }

    return (
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
                        onChangeText={task => props.setTaskValue(task)}
                    />
                </View>
                <View style={[{flexDirection: "row", flex: 1, paddingHorizontal: 20, alignItems: "center"}]}>
                    <TouchableOpacity onPress={props.openList} disabled={props.disabled}>
                        {props.listValue ?
                            <TodoBadge
                                badgeStyle={{backgroundColor: grayishColor}}
                                badgeSize={30}
                                data={props.listValue}
                                buttonSize={15}
                                buttonBackgroundColor="transparent"
                                buttonBorderRadius={0}
                                buttonIconName="close"
                                buttonOnPress={() => props.setListValue(null)}
                            >

                            </TodoBadge>
                            :
                            <Feather name="list" size={20} color={grayishColor}/>}
                    </TouchableOpacity>
                    <TouchableOpacity style={[props.datePickerValue ? styles.badgeMargin : styles.noBadgeMargin]}
                                      onPress={props.openCalendar}>
                        {props.datePickerValue ?
                            <TodoBadge
                                badgeStyle={{backgroundColor: grayishColor}}
                                badgeSize={30}
                                data={dueDateFormatted()}
                                buttonSize={15}
                                buttonBackgroundColor="transparent"
                                buttonBorderRadius={0}
                                buttonIconName="close"
                                buttonOnPress={() => props.setDatePickerValue(null)}
                            >

                            </TodoBadge>
                            :
                            <FontAwesome5 name="calendar" size={20} color={grayishColor}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}


export default TaskInput

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0
    },
    addATaskModalContainer: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        width: "100%",
        height: 80,
        backgroundColor: mainBackgroundColor
    },
    badgeMargin: {
        marginLeft: 5
    },
    noBadgeMargin: {
        marginLeft: 20
    },
    addTaskTextInputStyle: {
        height: 40,
        flex: 1,
        color: whitenColor,
        fontSize: 16
    },
})
