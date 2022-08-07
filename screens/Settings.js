import {
    Button,
    Dimensions,
    ScrollView,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import {useAuth} from '../hooks/auth';
import {useEffect, useState} from 'react';
import {useStorage} from '../hooks/storage';
import {COLLECTION_SECTIONS} from '../constant_storage';
import {Cell, Section, TableView} from 'react-native-tableview-simple';
import TodoModal from '../ui/modal';

const Settings = () => {
    const {signOut} = useAuth();
    const {getItem, storeItem} = useStorage();
    const {sections, setSections} = useState();
    const {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    } = Dimensions.get('window');

    const modalHeight = SCREEN_HEIGHT * 10 / 100

    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleDelete = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        setVisible(false);
    };


    useEffect(() => {
        getItem(COLLECTION_SECTIONS).subscribe((c) => {
            console.log(c);
        })
    }, []);


    const addNewSection = () => {

    }

    return (
        <View style={{
            flex: 1,
            flexDirection: 'row'
        }}>
            <TodoModal isVisible={visible}
                       modalHeight={100}
                       backdropOpacity={1}
                       onBackdropPress={handleCancel}
            >

                <View style={{
                    flexDirection: "column",
                    flex: 1,
                    flexWrap: "wrap",
                    backgroundColor: 'white',
                    paddingTop: 100
                }}>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center"
                    }}>
                        <TextInput>

                        </TextInput>

                        <Button title="Save"/>
                        <Button title="Cancel" onPress={() => handleCancel()}/>
                    </View>
                </View>
            </TodoModal>
            {/*<Dialog.Container visible={visible}>*/}
            {/*    <Dialog.Title>Account delete</Dialog.Title>*/}
            {/*    <Dialog.Description>*/}
            {/*        Do you want to delete this account? You cannot undo this*/}
            {/*        action.*/}
            {/*    </Dialog.Description>*/}
            {/*    <Dialog.Button label="Cancel" onPress={handleCancel}/>*/}
            {/*    <Dialog.Button label="Delete" onPress={handleDelete}/>*/}
            {/*</Dialog.Container>*/}
            <Section>
                <Cell
                    onPress={() => showDialog()}
                    cellStyle="Subtitle"
                    title="Add New Section"
                />
            </Section>
            <ScrollView contentContainerStyle={styles.stage}>
                <TableView>
                    <Section header="Sections">
                        <Cell
                            onPress={() => showDialog}
                            cellStyle="Subtitle"
                            accessory="Checkmark"
                            title="Subtitle"
                            detail="some section"
                        />
                    </Section>
                </TableView>
                <View
                    style={{
                        minHeight: Dimensions.get('window').height,
                    }}>
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            height: 400,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                    </View>
                    <TableView>
                        <Section footer="You are logged in as">
                            <Cell
                                title="Log out"
                                titleTextColor="#007AFF"
                                onPress={() => signOut()}
                            />
                        </Section>
                    </TableView>
                </View>
            </ScrollView>
        </View>
        // <View>
        //     <Button
        //         title="Log out"
        //         onPress={() => signOut()}
        //     />
        // </View>
    )
}

const styles = StyleSheet.create({
    stage: {
        backgroundColor: '#EFEFF4',
        paddingTop: 20,
        paddingBottom: 20,
    },
});

export default Settings
