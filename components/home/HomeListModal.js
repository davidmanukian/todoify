import {Button, Text, TouchableOpacity, View} from "react-native";
import TodoModal from "../../ui/modal";


const HomeListModal = (props) => {

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
                justifyContent: "space-between",
                paddingTop: props.modalHeight
            }}>
                <View
                    style={{flexDirection: "row", alignItems: "center"}}>
                    <Button color={"black"}
                            title={"Cancel"}
                            onPress={props.cancelButton}/>
                    <Text style={{fontSize: 18, alignItems: "center", marginLeft: "20%", fontWeight: "bold"}}>Select
                        a List</Text>
                </View>
                <View style={{flexDirection: "column", flex: 1, marginTop: 15}}>
                    {props.sections.map((value, i) => {
                        return <TouchableOpacity key={value} onPress={() => props.addList(value)}>
                            <Text style={{fontSize: 16}} key={value}>
                                {value}
                            </Text>
                        </TouchableOpacity>
                    })}
                </View>
            </View>
        </TodoModal>
    )
}

export default HomeListModal
