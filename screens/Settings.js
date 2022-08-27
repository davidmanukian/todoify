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
import FontAwesome5 from '@expo/vector-icons/FontAwesome';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const sectionModalHeight = SCREEN_HEIGHT * 75 / 100;

const Settings = () => {
    const {signOut} = useAuth();
    const {getItem, storeItem, clearItems} = useStorage();
    const [sections, setSections] = useState([]);
    const [sectionName, setSectionName] = useState('');

    const [addASectionPressed, setAddSectionPressed] = useState(false)

    useEffect(() => {
        getItem(COLLECTION_SECTIONS).subscribe((sections) => {
            if (sections && sections.length > 0 && sections !== '[]') {
                setSections(sections);
            }
        })
    }, []);


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

    const clearAl = () => {
        clearItems().subscribe()
    }

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
        const indexToDelete = Number(index);
        let newArr = [...sections.filter((c, innerI) => Number(innerI) !== indexToDelete)];
        persistSections(newArr);
    }

    const persistSections = (list) => {
        storeItem(COLLECTION_SECTIONS, list);
        setSections(list);
    }

    const changeAvailability = (index) => {
        const sectionsToUpdate = [...sections];
        console.log('sectionsToUpdate[index]', index, sectionsToUpdate);

        sectionsToUpdate[index].isSelected = !sectionsToUpdate[index].isSelected;
        persistSections([...sectionsToUpdate]);
    }

    return (
        <View style={styles.container}>
            <Button title="Add New Section" onPress={() => showDialog()}/>
            <TableView>
                {(sections && sections.length > 0) ?
                    <Section header="Sections" style={styles.container}>
                        <SwipeListView
                            disableRightSwipe
                            data={sections?.map((cItem, i) => ({
                                key: `${i}`,
                                text: cItem?.name,
                                isSelected: cItem?.isSelected
                            }))}
                            renderItem={(data, rowMap) => (
                                <TouchableHighlight
                                    onPress={() => changeAvailability(data.item.key)}>
                                    <View style={[styles.rowFront]}>
                                        <Text
                                            style={{
                                                justifyContent: 'space-between',
                                                display: 'flex'
                                            }}>{data.item.text}
                                        </Text>
                                        {data.item.isSelected && <FontAwesome5.Button size={15}
                                                                                      backgroundColor='transparent'
                                                                                      color={"#065a60"}
                                                                                      iconStyle={{
                                                                                          margin: 0,
                                                                                          paddingRight: 0,
                                                                                          paddingLeft: 0
                                                                                      }}
                                                                                      style={{
                                                                                          margin: 0,
                                                                                          paddingRight: 0
                                                                                      }}
                                                                                      name='check'
                                        />}
                                    </View>
                                </TouchableHighlight>
                            )}
                            renderHiddenItem={(data, rowMap) => (
                                <View style={styles.rowBack}>
                                    <Text>Left</Text>
                                    <TouchableOpacity
                                        style={[styles.backRightBtn, styles.backRightBtnRight]}
                                        onPress={() => deleteSection(data.item.key)}>
                                        <Text
                                            style={styles.backTextWhite}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            leftOpenValue={75}
                            rightOpenValue={-75}
                        />
                    </Section>
                    :
                    <Text style={[styles.noSectionsText]}>No Created Sections.</Text>
                }
                <Section>
                    <Cell cellContentView={
                        <View style={[styles.logOutViewStyle]}>
                            <Text style={[styles.logOutTextStyle]}>Log Out</Text>
                        </View>
                    } onPress={signOut}/>
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
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 1,
        flexDirection: 'row'
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
    noSectionsText: {
        left: SCREEN_WIDTH / 3.5,
        top: 300,
        fontSize: 20
    },
    logOutViewStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    },
    logOutTextStyle: {
        fontSize: 18
    }
});

export default Settings
