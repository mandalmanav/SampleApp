import React, { useDebugValue } from 'react';
import { Pressable ,Alert} from 'react-native';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAction } from '../../store/actions/contacts';

export default ({navigation }) => {
    let {contact} = useSelector(state=>state)
    let dispatch = useDispatch()
    return (<Pressable onPress={async() => {
        if (contact.firstName==undefined||!contact.firstName.trim().length) {
                        Alert.alert(
                            "Invalid",
                            "First name cannot be left blank",
                            [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        return
                                    },
                                    style: "cancel"
                                }
                            ]
                        );
                        return
                    }
                    if (contact.lastName==undefined||!contact.lastName.trim().length) {
                        Alert.alert(
                            "Invalid",
                            "Last name cannot be left blank",
                            [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        return
                                    },
                                    style: "cancel"
                                }
                            ]
                        );
                        return
                    }
                    if (contact.mobile==undefined||String(contact.mobile).length < 10) {
                        Alert.alert(
                            "Invalid",
                            "Mobile number should consist of 10 digits",
                            [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        return
                                    },
                                    style: "cancel"
                                }
                            ]
                        );
                        return
                    }
        await addContactAction(dispatch,contact)
        navigation.navigate('ContactDetails')
      }}><Text style={{ ...styles.primaryText, ...styles.actionFS, ...{ marginRight: 8 } }}>Save</Text>
      </Pressable>)
}

const styles = StyleSheet.create({
    primaryText: {
        color: '#4d90fe'
    },
    actionFS: {
        fontSize: 16
    }
});