import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign, Entypo} from "@expo/vector-icons";
import {grayishColor, mainBackgroundColor, whitenColor} from "../../colors";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday"
import isTomorrow from "dayjs/plugin/isTomorrow"
import isYesterday from "dayjs/plugin/isYesterday"

/**
 * Task item that is rendered in Home screen.
 * I did this as a separate component for convenient usage.
 * */
const Item = (props) => {
    //extending dayjs by features like to check current day is today/tomorrow/yesterday
    dayjs.extend(isToday)
    dayjs.extend(isTomorrow)
    dayjs.extend(isYesterday)

    const iconSize = 24;

    //formatting date to render Today/Tomorrow/Yesterday instead of date. However, the date will be rendered
    const formatDueDate = () => {
        const date = dayjs(props.data.dueDate)
        if (date.isToday()){
            return "Today"
        }

        if (date.isTomorrow()){
            return "Tomorrow"
        }

        if (date.isYesterday()){
            return "Yesterday"
        }

        return date.format("MMM D, YYYY")
    }
    return (
        <View style={styles.container}>
            <View style={styles.taskStatusContainer}>
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
            })} style={styles.detailsContainer}>
                <View style={styles.detailsView}>
                    <Text style={[props.data.status === 'completed' && styles.taskCompleted, styles.taskText]}>
                        {props.data.task}
                    </Text>
                    <View style={styles.dueDateView}>
                        <Text style={styles.dueDateText}>
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

