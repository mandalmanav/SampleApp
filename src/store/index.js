import { combineReducers } from "redux";
import { contactsReducer, updateObject } from './reducers/contactsReducers'
import { searchTermReducer } from './reducers/contactsReducers'
import { contactReducer } from "./reducers/contactsReducers"

export default combineReducers({
    contacts: contactsReducer,
    contact: contactReducer,
    searchTerm: searchTermReducer,
    updateObject:updateObject

})