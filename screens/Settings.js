import {
    Button,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import {useAuth} from '../hooks/auth';
import {useEffect, useState} from 'react';
import {useStorage} from '../hooks/storage';
import {COLLECTION_SECTIONS} from '../constant_storage';
import {Cell, Section, TableView} from 'react-native-tableview-simple';
import app_constants from '../app_constants';
import {SwipeListView} from 'react-native-swipe-list-view';

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

    const deleteSection = (index) => {
        sections.slice(index, 1)
        persistSections([...sections.filter((c, innerI) => innerI !== index)]);
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
                console.log('set sections', c.length);
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
            {/*<ScrollView contentContainerStyle={styles.stage}>*/}
            <TableView>
                <Section header="Sections" style={styles.container}>
                    <SwipeListView
                        disableRightSwipe
                        data={sections?.map((cItem, i) => ({
                            key: `${i}`,
                            text: cItem?.name
                        }))}
                        renderItem={(data, rowMap) => (
                            <TouchableHighlight
                                onPress={() => console.log('switch pressed')}>
                                <View style={styles.rowFront}>
                                    <Text>{data.item.text}</Text>
                                </View>
                            </TouchableHighlight>
                        )}
                        renderHiddenRow={(data, rowMap) => (
                            <View>
                                <Text>Left</Text>
                                <Text>Right</Text>
                            </View>
                        )}
                        renderRow={(data, rowMap) => (
                            <View>
                                <Text>Left</Text>
                                <Text>Right</Text>
                            </View>
                        )}
                        renderHiddenItem={(data, rowMap) => (
                            <View style={styles.rowBack}>
                                <Text>Left</Text>
                                <TouchableOpacity
                                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                                    onPress={() => deleteSection(data.item.key)}
                                >
                                    <Text
                                        style={styles.backTextWhite}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />
                </Section>
            </TableView>

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

    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 50,
        flexWrap: 'wrap',
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 2,
        paddingVertical: 10,
        width: Dimensions.get('window').width / 3,
    },
    rowFront: {
        fontSize: 16,
        height: 50,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginBottom: 1
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        height: 50
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});

export default Settings
