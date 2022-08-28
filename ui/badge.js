import {SafeAreaView, Text, View} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome";
import {Badge} from "react-native-paper";

/**
 * This is my custom UI that related to Badge.
 * It's used in modals, for example when you want to add a task, selection of a section & due date will be rendered in
 * this badge.
 * */
const TodoBadge = (props) => {
    return (
        <Badge size={props.badgeSize} style={[props.badgeStyle]}>
            {/*<View style={{*/}
            {/*    flexDirection: "row",*/}
            {/*    flex: 1,*/}
            {/*    alignItems: "center",*/}
            {/*    justifyContent: "center"*/}
            {/*}}>*/}
                <Text style={{
                    marginLeft: 20,
                    marginTop: 2,
                    color: "#065a60"
                }}>{props.data}</Text>
                {/*<FontAwesome5.Button size={props.buttonSize}*/}
                {/*                     backgroundColor={props.buttonBackgroundColor}*/}
                {/*                     color="#065a60"*/}
                {/*                     iconStyle={{*/}
                {/*                         margin: 0,*/}
                {/*                         paddingRight: 0,*/}
                {/*                         paddingLeft: 0*/}
                {/*                     }}*/}
                {/*                     style={{margin: 0, paddingRight: 0}}*/}
                {/*                     borderRadius={props.buttonBorderRadius}*/}
                {/*                     name={props.buttonIconName}*/}
                {/*                     onPress={props.buttonOnPress}*/}
                {/*/>*/}
            {/*</View>*/}
        </Badge>
    )
}

export default TodoBadge
