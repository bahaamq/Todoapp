import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, IconButton, TextInput, FAB } from 'react-native-paper'
import Header from '../component/Header'
import { useSelector, useDispatch } from 'react-redux'
import { addnote, deletenote } from '../reducer/notes'
import { AsyncStorage } from 'react-native';
import { useEffect } from 'react'
function AddNotes({ navigation }) {

    const globalState = useSelector(state => state)
    const dispatch = useDispatch()

    const [noteTitle, setNoteTitle] = useState('')
    const [noteDescription, setNoteDescription] = useState('')

    useEffect (async()=>{
               const value =  await AsyncStorage.getItem('@MySuperStore');
        console.log("value,",value)
    
    },[])
useEffect(() => {
  async () => {
        try {
            await AsyncStorage.setItem(
                '@MySuperStore',
                'I like to save it.'
              );
          
        } catch (error) {
          // Error saving data
          console.log(error)
        }
      };
}, [globalState])
    function onSaveNote() {
      console.log(globalState,"gg")
        dispatch(addnote({ noteTitle, noteDescription }))
        navigation.goBack()

        
    }

    return (
        <>
            <Header titleText='Cancel' />
            <IconButton
                icon="close"
                size={25}
                color='white'
                onPress={() => navigation.goBack()} // goes to the screen before.
                style={styles.iconButton}
            />

            <View style={styles.container}>
                <TextInput
                    label="Add Note Title here"
                    value={noteTitle}
                    mode='outlined'
                    onChangeText={setNoteTitle}
                    style={styles.title}
                />
                <TextInput
                    label="Add Note Description"
                    value={noteDescription}
                    onChangeText={setNoteDescription}
                    mode="flat"
                    multiline={true}
                    style={styles.text}
                    scrollEnabled={true}
                    returnKeyLabel='done'
                    blurOnSubmit={true}
                />
                <FAB
                    style={styles.fab}
                    small
                    icon="check"
                    disabled={noteTitle == '' ? true : false}
                    onPress={() => onSaveNote()}
                />
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    iconButton: {
        backgroundColor: '#219653',
        position: 'absolute',
        right: 0,
        top: 40,
        margin: 10
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 24,
        marginBottom: 16
    },
    text: {
        height: 300,
        fontSize: 16
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: '#219653'
    }

})

export default AddNotes
