import {Text} from "react-native";

/**
 * Created separated component for rendering sections
 * */
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
