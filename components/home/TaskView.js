import {SectionList, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import Item from "./Item";
import SectionLabel from "./SectionLabel";
import {mainBackgroundColor, whitenColor} from "../../colors";

/**
 * TaskView is a wrapper for React SectionList component.
 * It renders all sections and tasks related to each section.
 * */
const TaskView = (props) => {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={props.dismissTask}>
                <SectionList sections={props.tasksGroupBySection}
                             keyExtractor={(item, index) => item.id}
                             renderItem={({item}) => <Item data={item}
                                                           navigation={props.navigation}
                                                           changeTaskStatus={(e,s) => props.changeTaskStatus(e, s)}
                                                           section/>}
                             renderSectionHeader={({section: {section}}) => (
                                 <SectionLabel label={section}/>
                             )}

                />
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        marginTop: 50
    }
})

export default TaskView
