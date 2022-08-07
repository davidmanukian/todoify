import {Text} from "react-native";

const SectionLabel = (props) => {
    return (
        <Text style={{
            marginLeft: 20,
            fontSize: 22,
            fontWeight: "bold"
        }}>
            {props.label}
        </Text>
    )
}

export default SectionLabel
