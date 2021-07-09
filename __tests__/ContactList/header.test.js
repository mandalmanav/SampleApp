import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import Header from '../../src/screens/ContactList/Header'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('Test Search Box', () => {
    const initialState = { contacts: [], searchText: '' }
    const mockStore = configureStore()
    let store, wrapper
    store = mockStore(initialState)
    it('Search box is rendered correctly', () => {
        const { getByTestId } = render(<Provider store={store}><Header /></Provider>)
        expect(getByTestId('search-box')).not.toBeNull()
       })
    it('Placeholder text is \'Search\'', () => {
        const { getByPlaceholderText } = render(<Provider store={store}><Header /></Provider>)
        expect(getByPlaceholderText('Search')).not.toBeNull()
    })
    it('Match Snapshot', () => {
        const component = render(<Provider store={store}><Header /></Provider>)
        expect(component).toMatchSnapshot()
    })
})


