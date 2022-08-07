import {
    Button,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
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
    const [sectionName, setSectionName] = useState('');

    const [addASectionPressed, setAddSectionPressed] = useState(false)


    const showDialog = () => {
        setAddSectionPressed(true);
        setAddSectionPressed(true);
    };

    const handleCancel = () => {
        setAddSectionPressed(false);
    };

    const handleDelete = () => {
        setAddSectionPressed(false);
    };

    const saveNewSection = () => {
        let newItem = {
            name: sectionName,
            isSelected: false
        };
        persistSections([...sections, ...[newItem]]);
        setAddSectionPressed(false);
        setSectionName('');
    }

    const persistSections = (list) => {
        storeItem(COLLECTION_SECTIONS, list);
        setSections(list);
    }

    const changeAvailability = (index) => {
        const sectionsToUpdate = [...sections];
        sectionsToUpdate[index].isSelected = !sectionsToUpdate[index].isSelected;
        persistSections([...sectionsToUpdate]);
    }


    useEffect(() => {
        getItem(COLLECTION_SECTIONS).subscribe((c) => {
            if (c.length >= 1) {
                setSections(c);
            }
        })
    }, []);

    useEffect(() => {
        console.log('setSections', sections);
    }, [sections])

    return (
        <View style={styles.container}>
            <Section>
                <Cell
                    onPress={() => showDialog()}
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
                                    onPress={() => changeAvailability(index)}
                                    accessory={s?.isSelected ? 'Checkmark' : null}
                                    title={s?.name}
                                />
                            }) : ''
                        }
                    </Section>
                </TableView>
            </ScrollView>

            {addASectionPressed &&
                <KeyboardAvoidingView style={[styles.keyboardAvoidingViewStyle]}
                                      behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={styles.inputWrapper}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}>
                            <Button onPress={saveNewSection}
                                    color="black"
                                    title="Save"/>
                            <Button onPress={handleCancel}
                                    title="Cancel"/>
                        </View>
                        <TextInput onChangeText={setSectionName}
                                   autoFocus={true}
                                   style={styles.input}/>
                    </View>
                </KeyboardAvoidingView>
            }
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
    inputWrapper: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 15
    },
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
