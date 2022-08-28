import {Button, View} from "react-native";
import {mainBackgroundColor} from "../../colors";


/**
 * 'TaskDone' as a component
 * */
const TaskDoneButton = (props) => {

    return (
        <View
            style={{position: "absolute", top: 50, right: 10, bottom: 0}}>
            <Button color={mainBackgroundColor} backgroundColor={"transparent"} onPress={props.addATask}
                    title="Done"/>
        </View>
    )
}

export default TaskDoneButton

