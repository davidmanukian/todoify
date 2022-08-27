import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign, Entypo} from "@expo/vector-icons";
import {grayishColor, mainBackgroundColor, whitenColor} from "../../colors";

const Item = (props) => {
    const iconSize = 24;
    const formatDueDate = () => {
        const date = new Date(props.data.dueDate)
        const today = new Date()
        if (today.toDateString() === date.toDateString()){
            return "Today"
        }
        today.setDate(today.getDate() + 1)
        if (today.toDateString() === date.toDateString()){
            return "Tomorrow"
        }

        return date.toDateString()
    }
    return (
        <View style={[styles.container]}>
            <View style={[styles.taskStatusContainer]}>
                {props.data.status === 'started' ?
                    <Entypo name="circle" onPress={() => props.changeTaskStatus(props.data, 'completed')}
                            size={iconSize}
                            color={grayishColor}/>
                    :
                    <AntDesign name="checkcircleo" onPress={() => props.changeTaskStatus(props.data, 'started')}
                               size={iconSize}
                               color={grayishColor}/>
                }

            </View>
            <TouchableOpacity onPress={() => props.navigation.navigate('Details', {
                data: props.data
            })} style={[styles.detailsContainer]}>
                <View style={[styles.detailsView]}>
                    <Text style={[props.data.status === 'completed' && styles.taskCompleted, styles.taskText]}>
                        {props.data.task}
                    </Text>
                    <View style={[styles.dueDateView]}>
                        <Text style={[styles.dueDateText]}>
                            {formatDueDate() !== "Invalid Date" ? formatDueDate() : "Today"}
                        </Text>
                    </View>

                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 4,
        backgroundColor: mainBackgroundColor,
        margin: 10,
        borderRadius: 10,
        paddingVertical: 10
    },
    taskStatusContainer: {
        backgroundColor: mainBackgroundColor,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10
    },
    detailsContainer: {
        flex: 4
    },
    detailsView: {
        flexDirection: "column",
        flex: 1
    },
    taskText: {
        flex: 1,
        color: whitenColor,
        fontSize: 16
    },
    dueDateView: {
        flexDirection: "row",
        marginTop: 3,
        flex: 1
    },
    dueDateText: {
        color: grayishColor
    },
    taskCompleted: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    }
})

export default Item

