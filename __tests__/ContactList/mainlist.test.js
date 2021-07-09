
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import MainList from '../../src/screens/ContactList/MainList'
import { CONTACTS, SEARCH_TERM } from '../../test-const';


describe('Test Contact List', () => {
    
    let initialState = { contacts: CONTACTS, searchTerm: '' }
    const mockStore = configureStore()
    let store, wrapper
    store = mockStore(initialState)
    it('Showing full list',()=>{
        const {getAllByTestId} = render(<Provider store={store}><MainList /></Provider>)
        expect(getAllByTestId('contact').length).toBe(CONTACTS.length)
    })
    it('List is filtered',()=>{
        initialState = { contacts: CONTACTS, searchTerm: CONTACTS[0].firstName }
        store = mockStore(initialState)
        const {getAllByTestId} = render(<Provider store={store}><MainList /></Provider>)
        expect(getAllByTestId('contact').length).toBe(1)
    })
    it('Match Snapshot', () => {
        const component = render(<Provider store={store}><MainList /></Provider>)
        expect(component).toMatchSnapshot()
    })
})