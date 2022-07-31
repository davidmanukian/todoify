import TodoModal from "../../ui/modal";
import {Text, View} from "react-native";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";


const HomeCalendarModal = (props) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return (
        <TodoModal isVisible={props.isVisible}
                   modalHeight={props.modalHeight}
                   backdropOpacity={1}
                   onBackdropPress={props.onBackdropPress}
        >
            <View style={{
                flexDirection: "column",
                flex: 1,
                flexWrap: "wrap",
                paddingTop: props.modalHeight
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center"
                }}>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>
                        Due
                    </Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    marginTop: 15,
                    justifyContent: "space-between"
                }}>
                    <View style={{
                        flexDirection: "row",
                        flex:1
                    }}>
                        <MaterialCommunityIcons name="calendar" size={24} color="black" />
                        <Text style={{fontSize: 20}}>
                            Today
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {today.toLocaleString('en-us', {  weekday: 'short' })}
                        </Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: "row",
                    marginTop: 15,
                    justifyContent: "space-between"
                }}>
                    <View style={{
                        flexDirection: "row",
                        flex:1
                    }}>
                        <MaterialCommunityIcons name="calendar-arrow-right" size={24} color="black" />
                        <Text style={{fontSize: 20}}>
                            Tomorrow
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {tomorrow.toLocaleString('en-us', {  weekday: 'short' })}
                        </Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: "row",
                    marginTop: 15,
                    justifyContent: "space-between"
                }}>
                    <View style={{
                        flexDirection: "row",
                        flex:1
                    }}>
                        <MaterialCommunityIcons name="calendar-blank" size={24} color="black" />
                        <Text style={{fontSize: 20}}>
                            Pick a Date
                        </Text>
                    </View>
                    <View>
                        <AntDesign name="right" size={24} color="black" />
                    </View>
                </View>
            </View>

        </TodoModal>
    )
}


export default HomeCalendarModal
