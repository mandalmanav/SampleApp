
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import React from 'react';
import { CONTACTS, SEARCH_TERM } from '../../test-const';
import RightActionButton from '../../src/screens/AddContact/RightActionButton';
import RightActionButtonEdit from '../../src/screens/UpdateContact/RightActionButtonEdit';
import CancelButtonEdit from '../../src/screens/UpdateContact/CancelButtonEdit';

describe('Test Action Buttons', () => {
    let initialState = { contacts: CONTACTS, searchTerm: '', contact: {} }
    const mockStore = configureStore()
    let store, wrapper
    store = mockStore(initialState)
    it('Match Snapshot save button in add screen', () => {
        const component = render(<Provider store={store}><RightActionButton /></Provider>)
        expect(component).toMatchSnapshot()
    })
    it('Check for text', () => {
        const {getByText} = render(<Provider store={store}><RightActionButton /></Provider>)
        expect(getByText('Save')).not.toBeNull()
    })
    it('Match Snapshot save button in edit screen', () => {
        const component = render(<Provider store={store}><RightActionButtonEdit /></Provider>)
        expect(component).toMatchSnapshot()
    })
    it('Check for text', () => {
        const {getByText} = render(<Provider store={store}><RightActionButtonEdit /></Provider>)
        expect(getByText('Save')).not.toBeNull()
    })
    it('Match Snapshot cancel button in edit screen', () => {
        const component = render(<Provider store={store}><CancelButtonEdit /></Provider>)
        expect(component).toMatchSnapshot()
    })
    it('Check for text', () => {
        const {getByText} = render(<Provider store={store}><CancelButtonEdit /></Provider>)
        expect(getByText('Cancel')).not.toBeNull()
    })
})