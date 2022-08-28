import {Dimensions, StyleSheet, Text, View} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome";
import {mainBackgroundColor, whitenColor} from "../../colors";

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const addATaskWidth = SCREEN_WIDTH - 30;

/**
 * 'Add Button' as a component
 * */
const TaskAddButton = (props) => {
    return (
        <View style={styles.addATaskContainerStyle}>
            <FontAwesome5.Button name="plus"
                                 style={styles.addTaskStyle}
                                 onPress={props.showTaskModal}>
                <Text style={{fontSize: 16, color: whitenColor}}>Add a Task</Text>
            </FontAwesome5.Button>
        </View>
    )
}

export default TaskAddButton


const styles = StyleSheet.create({
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
})
