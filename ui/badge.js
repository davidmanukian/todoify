import {SafeAreaView, Text, View} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome";
import {Badge} from "react-native-paper";


const TodoBadge = (props) => {
    console.log(props.data)
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
