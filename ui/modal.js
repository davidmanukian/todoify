import Modal from "react-native-modal";
import {View} from "react-native";

const TodoModal = (props) => {
    const modalHeight = props.modalHeight
    return (
        <Modal isVisible={props.isVisible}
               customBackdrop={
                   <View style={{
                       marginTop: modalHeight,
                       flex: 1,
                       flexDirection: "column",
                       opacity:1,
                       backgroundColor: "white",
                       borderTopRightRadius: 15,
                       borderTopLeftRadius: 15
                   }
                   }/>
               }
               backdropOpacity={props.backdropOpacity}
               onBackdropPress={props.onBackdropPress}>
            {props.children}
        </Modal>
    )
}

export default TodoModal
