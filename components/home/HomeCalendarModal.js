import TodoModal from "../../ui/modal";
import {Text, TouchableOpacity, View} from "react-native";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import {useEffect} from "react";
import {DatePicker} from "react-native-woodpicker";
import dayjs from "dayjs";


const HomeCalendarModal = (props) => {
    const todayDayJs = dayjs()
    const formattedToday = todayDayJs.format("ddd")

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

                <TouchableOpacity style={{
                    flexDirection: "row",
                    marginTop: 15,
                    justifyContent: "space-between"
                }}
                                  onPress={openDatePicker}
                >
                    <View style={{
                        flexDirection: "row",
                        flex: 1
                    }}>
                        <MaterialCommunityIcons name="calendar-blank" size={24} color="black"/>
                        <Text style={{fontSize: 20}}>
                            Pick a Date
                        </Text>
                    </View>
                    <View>
                        <AntDesign name="right" size={24} color="black"/>
                    </View>
                    { props.datePickerOpened &&
                    <DatePicker
                        style={{flex:1}}
                        ref={props.datePickerRef}
                        value={props.datePickerValue}
                        onDateChange={(e) => props.addDueDate(e)}
                        title="Select Due Date"
                        isNullable={false}
                        iosDisplay="inline"
                        androidDisplay="default"
                        androidMode="calendar"
                    />
                    }
                </TouchableOpacity>
            </View>
        </TodoModal>
    )
}


export default HomeCalendarModal
