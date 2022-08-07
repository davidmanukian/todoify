import {
    Button,
    Dimensions,
    ScrollView,
    StyleSheet, Text,
    TextInput,
    View
} from 'react-native';
import {useAuth} from '../hooks/auth';
import {useEffect, useState} from 'react';
import {useStorage} from '../hooks/storage';
import {COLLECTION_SECTIONS} from '../constant_storage';
import {Cell, Section, TableView} from 'react-native-tableview-simple';
import TodoModal from '../ui/modal';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const sectionModalHeight = SCREEN_HEIGHT * 70 / 100;

const Settings = () => {
    const {signOut} = useAuth();
    const {getItem, storeItem} = useStorage();
    const {sections, setSections} = useState();

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
                {/*<View*/}
                {/*    style={{*/}
                {/*        minHeight: Dimensions.get('window').height,*/}
                {/*    }}>*/}
                {/*    <View*/}
                {/*        style={{*/}
                {/*            // backgroundColor: 'transparent',*/}
                {/*            height: 200,*/}
                {/*            alignItems: 'center',*/}
                {/*            justifyContent: 'center',*/}
                {/*        }}>*/}
                {/*    </View>*/}
                {/*    <TableView>*/}
                {/*        <Section footer="You are logged in as">*/}
                {/*            <Cell*/}
                {/*                title="Log out"*/}
                {/*                titleTextColor="#007AFF"*/}
                {/*                onPress={() => signOut()}*/}
                {/*            />*/}
                {/*        </Section>*/}
                {/*    </TableView>*/}
                {/*</View>*/}
            </ScrollView>
            <TodoModal isVisible={visible} modalHeight={sectionModalHeight}
                       onBackdropPress={() => setVisible(false)}>
                <View style={{
                    paddingTop: sectionModalHeight
                }}>
                    <Text>Hello world</Text>
                </View>
            </TodoModal>
        </View>
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
