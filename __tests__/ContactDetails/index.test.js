
import ContactDetails from '../../src/screens/ContactDetails'
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { CONTACTS, SEARCH_TERM } from '../../test-const';
import { it } from '@jest/globals';

import { Alert } from 'react-native';
jest.spyOn(Alert, 'alert');
describe('TEst Contact detail page', () => {

    let initialState = { contacts: CONTACTS, searchTerm: '',contact:CONTACTS[0] }
    const mockStore = configureStore()
    let store, wrapper
    store = mockStore(initialState)


    it('Full Name is visilble', () => {
        const { getByText } = render(<Provider store={store}><ContactDetails  /></Provider>)
        let item = getByText(`${CONTACTS[0].firstName} ${CONTACTS[0].lastName}`)
        expect(item).not.toBeNull()
    })
    it('Mobile number is visilble', () => {
        const { getByText } = render(<Provider store={store}><ContactDetails  /></Provider>)
        let item = getByText(`${CONTACTS[0].countryCode} ${CONTACTS[0].mobile}`)
        expect(item).not.toBeNull()
    })
    it('Icons are rendered', () => {
        const { getByTestId } = render(<Provider store={store}><ContactDetails  /></Provider>)

        expect(getByTestId('comment-icon')).not.toBeNull()
        expect(getByTestId('phone-icon')).not.toBeNull()
        expect(getByTestId('camera-icon')).not.toBeNull()
        expect(getByTestId('envelope-icon')).not.toBeNull()
    })
    // it('Edit button is rendered and clickable', () => {
    //     const mockCallBack = jest.fn();
    //     const { getByTestId, getByText } = render(<Provider store={store}><ContactDetails route={{
    //         params: {
    //             contact: CONTACTS[0]
    //         }
            
    //     }} navigation={
    //         {
    //             navigate:mockCallBack
    //         }
    //     }/></Provider>)
    //     expect(getByText('Edit Contact >>')).not.toBeNull()
    //     expect(getByTestId('edit-button')).not.toBeNull()
    //     fireEvent.press(getByTestId('edit-button'))
    //     expect(mockCallBack.mock.calls.length).toEqual(1);

    // })
    it('delete button is rendered and clickable', () => {
        // const mockCallBack = jest.fn();
        const { getByTestId, getByText } = render(<Provider store={store}><ContactDetails route={{
            params: {
                contact: CONTACTS[0]
            }
            
        }} /></Provider>)
        expect(getByText('Delete Contact')).not.toBeNull()
        expect(getByTestId('delete-button')).not.toBeNull()
        fireEvent.press(getByTestId('delete-button'))
        expect(Alert.alert).toHaveBeenCalled()
    })
    it('Match Snapshot', () => {
        const component = render(<Provider store={store}><ContactDetails  /></Provider>)
        expect(component).toMatchSnapshot()
    })
})