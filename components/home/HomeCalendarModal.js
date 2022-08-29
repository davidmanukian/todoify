import TodoModal from "../../ui/modal";
import {Text, TouchableOpacity, View} from "react-native";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import {useEffect} from "react";
import dayjs from "dayjs";

/**
 * Calendar Modal component that is use in Home screen.
 * This component is based my custom UI modal.
 * */
const HomeCalendarModal = (props) => {
    //usage dayjs or similar to this library is crucial in hybrid development.
    //since simple 'new Date()' works differently in android and ios. I'll mention it in my report.
    const todayDayJs = dayjs()

    //render today in the modal
    const formattedToday = todayDayJs.format("ddd")
    //render tomorrow in the modal
    const tomorrowDayJs = dayjs().add(1, "days")
    const formattedTomorrow =  tomorrowDayJs.format("ddd")

    const openDatePicker = () => {
        props.setDatePickerOpened(true)
    }

    useEffect(() => {
        props.datePickerRef?.current?.open()
    }, [props.datePickerOpened])

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
                <TouchableOpacity style={{
                    flexDirection: "row",
                    marginTop: 15,
                    justifyContent: "space-between"
                }} onPress={() => props.addDueDate(todayDayJs)}>
                    <View style={{
                        flexDirection: "row",
                        flex: 1
                    }}>
                        <MaterialCommunityIcons name="calendar" size={24} color="black"/>
                        <Text style={{fontSize: 20}}>
                            Today
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {formattedToday.toString()}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        marginTop: 15,
                        justifyContent: "space-between"
                    }}
                    onPress={() => props.addDueDate(tomorrowDayJs)}>
                    <View style={{
                        flexDirection: "row",
                        flex: 1
                    }}>
                        <MaterialCommunityIcons name="calendar-arrow-right" size={24} color="black"/>
                        <Text style={{fontSize: 20}}>
                            Tomorrow
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {formattedTomorrow.toString()}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </TodoModal>
    )
}


export default HomeCalendarModal
