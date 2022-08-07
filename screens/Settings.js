import {
    Button,
    Dimensions, KeyboardAvoidingView, Platform,
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
import app_constants from '../app_constants';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const sectionModalHeight = SCREEN_HEIGHT * 75 / 100;

const Settings = () => {
    const {signOut} = useAuth();
    const {getItem, storeItem} = useStorage();
    const [sections, setSections] = useState([]);
    const [visible, setVisible] = useState(false);
    const [sectionName, setSectionName] = useState('');


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

    const saveNewSection = () => {
        console.log('sectionName', sectionName);
        let newItem = {
            name: sectionName,
            isSelected: false
        };
        console.log('newItem', newItem);
        storeItem(COLLECTION_SECTIONS, [
            ...sections || [],
            newItem
        ]);

        setSections([...sections, ...[newItem]]);
    }


    useEffect(() => {
        storeItem(COLLECTION_SECTIONS, []);
        getItem(COLLECTION_SECTIONS).subscribe((c) => {
            if (c.length >= 1) {
                setSections([]);
            }
        })
    }, []);

    return (
        <View style={styles.container}>
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
                        {
                            sections && sections.length >= 1 ? sections?.map((s, index) => {
                                return <Cell
                                    key={index}
                                    onPress={() => showDialog}
                                    cellStyle="Subtitle"
                                    accessory={s?.isSelectd ? 'Checkmark' : null}
                                    title={s?.name}
                                />
                            }) : ''
                        }
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

            <KeyboardAvoidingView style={[styles.keyboardAvoidingViewStyle]}
                                  behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TodoModal isVisible={visible}
                           modalHeight={sectionModalHeight}
                           backdropOpacity={1}
                           onBackdropPress={() => setVisible(false)}>
                    <View style={{
                        paddingTop: sectionModalHeight,
                    }}>
                        <View style={{
                            flexDirection: 'column'
                        }}>
                            <View style={{flexDirection: 'row'}}>
                                <Button onPress={saveNewSection}
                                        color="black"
                                        title="Save"/>
                                <Button onPress={handleCancel}
                                        title="Cancel"/>
                            </View>
                            <TextInput onChangeText={setSectionName}
                                       style={styles.input}/>
                        </View>
                    </View>
                </TodoModal>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    stage: {
        backgroundColor: '#EFEFF4',
        paddingTop: 20,
        paddingBottom: 20,
    },

    container: {
        position: 'static',
        paddingTop: app_constants.STATUS_BAR_HEIGHT,
        flex: 1,
        backgroundColor: '#E8EAED',
    },

    saveButton: {},
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    keyboardAvoidingViewStyle: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0
    },
});

export default Settings
