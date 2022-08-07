import {SectionList, TouchableWithoutFeedback, View} from "react-native";
import Item from "./Item";
import SectionLabel from "./SectionLabel";


const TaskView = (props) => {

    return (
        <View style={[{flexDirection: "row", flex: 1, marginTop: 50}]}>
            <TouchableWithoutFeedback onPress={props.dismissTask}>
                <SectionList sections={props.tasksGroupBySection}
                             keyExtractor={(item, index) => item + index}
                             renderItem={({item}) => <Item data={item}
                                                           completeTask={() => props.completeTask(item)}
                                                           undoCompleteTask={() => props.undoCompleteTask(item)}
                                                           section/>}
                             renderSectionHeader={({section: {section}}) => (
                                 <SectionLabel label={section}/>
                             )}

                />
            </TouchableWithoutFeedback>
        </View>
    )
}

export default TaskView
