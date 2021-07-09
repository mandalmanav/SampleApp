
import AddContact from '../../src/screens/AddContact'
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { CONTACTS } from '../../test-const';
import { it } from '@jest/globals';
import { SET_SELECTED } from '../../src/store/constants';
import UpdateContact from '../../src/screens/UpdateContact';

const changedText = 'changedText'
describe('Test Edit Contact', () => {
    const expectedPayload1 = {
        type: SET_SELECTED, payload: {
           ...CONTACTS[0],firstName:changedText
        }
    }
    const expectedPayload2 = { type: SET_SELECTED, payload: {
        ...CONTACTS[0],lastName:changedText
    }}
    const expectedPayload3 = { type: SET_SELECTED, payload:  {
        ...CONTACTS[0],mobile:changedText
    } }

    let initialState = { contacts: CONTACTS, searchTerm: '', contact: CONTACTS[0] }
    const mockStore = configureStore()
    let store, wrapper
    store = mockStore(initialState)
    const changeAction = () => ({ type: SET_SELECTED })
    it('First name input box render and change text', () => {
        const { getByTestId } = render(<Provider store={store}><UpdateContact /></Provider>)
        let textBox = getByTestId('first-name')
        expect(textBox).not.toBeNull()
        expect(textBox.props.value).toBe(CONTACTS[0].firstName);
        fireEvent.changeText(textBox, changedText)
        const actions = store.getActions()
        expect(actions).toEqual([expectedPayload1])

    })
    it('Last name input box render and change text', () => {
        const { getByTestId } = render(<Provider store={store}><UpdateContact /></Provider>)
        let textBox = getByTestId('last-name')
        expect(textBox).not.toBeNull()
        expect(textBox.props.value).toBe(CONTACTS[0].lastName);
        fireEvent.changeText(textBox, changedText)
        const actions = store.getActions()
        expect(actions).toEqual([expectedPayload1,expectedPayload2])

    })
    it('Mobile number render and change correctly', () => {
        const { getByTestId } = render(<Provider store={store}><UpdateContact/></Provider>)
        let textBox = getByTestId('mobile')
        expect(textBox).not.toBeNull()
        expect(textBox.props.value).toBe(CONTACTS[0].mobile);
        fireEvent.changeText(textBox, changedText)
        const actions = store.getActions()
        expect(actions).toEqual([expectedPayload1,expectedPayload2,expectedPayload3])

    })
    // it('save button rendered and fire press event',()=>{
    //     const { getByTestId } = render(<Provider store={store}><AddContact/></Provider>)
    //     let button = getByTestId('save-button')
    //     expect(button.props.children).toBe('Save');
    //     expect(button).not.toBeNull()
    //    fireEvent.press(button)
    // })
    it('Match Snapshot', () => {
        const component = render(<Provider store={store}><UpdateContact /></Provider>)
        expect(component).toMatchSnapshot()
    })
})