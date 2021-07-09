import { AsyncStorage } from 'react-native';
import { getAllContacts, addContact, updateContact, deleteContact } from '../../utils/storageApi';
import { SET_CONTACTS, ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT, SET_SELECTED } from '../constants';
import {useDispatch} from 'react-redux'

export const getAllContactsAction = async (dispatch) => {
    let contacts = await (getAllContacts())
    dispatch({
        type: SET_CONTACTS,
        payload: contacts
    })
}
export const addContactAction = async (dispatch, payload) => {
    try {
        let contact = await addContact(payload)
        dispatch({
            type: ADD_CONTACT,
            payload
        })
        dispatch({
            type:SET_SELECTED,
            payload:contact
        })
        return contact
    }
    catch (e) {
        alert('Unable to add contact')
    }
}
export const deleteContactAction = async (dispatch, payload) => {
    try {
        await deleteContact(payload)
        dispatch({
            type: DELETE_CONTACT,
            payload
        })
    }
    catch (e) {
      
        alert("Unable to delete")
    }
}
export const updateContactAction = async (dispatch, obj) => {
    try {
        await updateContact(obj.id, obj.contact)
        dispatch({
            type:UPDATE_CONTACT,
            payload:obj.contact
        })
        dispatch({
            type:SET_SELECTED,
            payload:obj.contact
        })
       
    }
    catch (e) {
        alert(e)
     
    }


}
