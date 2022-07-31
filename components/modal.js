import Modal from "react-native-modal";
import {View} from "react-native";

const Modal = (props) => {

    return (
        <Modal isVisible={props.listModalVisible}
               customBackdrop={
                   <View style={{
                       marginTop: modalHeight,
                       flex: 1,
                       flexDirection: "column",
                       backgroundColor: "white",
                       borderTopRightRadius: 15,
                       borderTopLeftRadius: 15
                   }
                   }/>
               }
               backdropOpacity={1}
               statusBarTranslucent
               onBackdropPress={() => setListModalVisible(false)}>>

        </Modal>
    )
}
