import {Text, View} from "react-native";
import {AntDesign, Entypo} from "@expo/vector-icons";
import {grayishColor, mainBackgroundColor, whitenColor} from "../../colors";

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
                    <AntDesign name="checkcircleo" onPress={props.undoCompleteTask} size={24} color={grayishColor}/>
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

export default Item
