
import AddContact from '../../src/screens/AddContact'
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { CONTACTS, SEARCH_TERM } from '../../test-const';
import { it } from '@jest/globals';
import { SET_SELECTED } from '../../src/store/constants';
const changedText = 'changedText'
    describe('Test Add Contact', () => {

    let initialState = { contacts: CONTACTS, searchTerm: '', contact: {} }
    const mockStore = configureStore()
    let store, wrapper
    store = mockStore(initialState)
    const expectedPayload1 = { type: SET_SELECTED, payload: {firstName: changedText } }
    const expectedPayload2 = { type: SET_SELECTED, payload: {lastName: changedText } }
    const expectedPayload3 = { type: SET_SELECTED, payload: {mobile: changedText } }
     
    it('First name input box render and change text', () => {
        
        const { getByTestId } = render(<Provider store={store}><AddContact /></Provider>)
        let textBox = getByTestId('first-name')
        expect(textBox).not.toBeNull()
        expect(textBox.props.value).toBe(undefined);
        expect(textBox.props.placeholder).toBe("Enter First Name");
        fireEvent.changeText(textBox, changedText)
         const actions = store.getActions()
            expect(actions).toEqual([expectedPayload1])
        
    })
    it('Last name input box render and change text', () => {
        const { getByTestId } = render(<Provider store={store}><AddContact  /></Provider>)
        let textBox = getByTestId('last-name')
        expect(textBox).not.toBeNull()
        expect(textBox.props.value).toBe(undefined);
        expect(textBox.props.placeholder).toBe("Enter Last Name");
        fireEvent.changeText(textBox, changedText)
        const actions = store.getActions()
        const expectedPayload = { type: SET_SELECTED, payload: {lastName: changedText } }
        expect(actions).toEqual([expectedPayload1,expectedPayload2])
     })
    it('Mobile number render and change correctly', () => {
        const { getByTestId } = render(<Provider store={store}><AddContact  /></Provider>)
        let textBox = getByTestId('mobile')
        expect(textBox).not.toBeNull()
        expect(textBox.props.value).toBe(undefined);
        expect(textBox.props.placeholder).toBe("Add mobile");
        fireEvent.changeText(textBox, changedText)
        const actions = store.getActions()
        const expectedPayload = { type: SET_SELECTED, payload: {mobile: changedText } }
        expect(actions).toEqual([expectedPayload1,expectedPayload2,expectedPayload3])
     })
   
    it('Match Snapshot', () => {
        const component = render(<Provider store={store}><AddContact route={{
            params:{
                contact:{}
            }
        }} /></Provider>)
        expect(component).toMatchSnapshot()
    })
})