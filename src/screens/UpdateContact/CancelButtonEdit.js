import React, { useDebugValue } from 'react';
import { Pressable } from 'react-native';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAction, updateContactAction } from '../../store/actions/contacts';
import { SET_SELECTED } from '../../store/constants';

export default ({ navigation }) => {
    let { contact, contacts } = useSelector(state => state)
    let dispatch = useDispatch()
    return (<Pressable onPress={async () => {
        let oldContact = contacts.filter(c => c.id == contact.id)[0]
        dispatch({
            type: SET_SELECTED,
            payload: oldContact
        })

        navigation.navigate('ContactDetails')
    }}><Text style={{ ...styles.primaryText, ...styles.actionFS, ...{ marginLeft: 8 } }}>Cancel</Text>
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