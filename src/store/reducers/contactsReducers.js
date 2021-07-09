import { SET_CONTACTS, ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT, SET_SEARCH, SET_SELECTED, SET_UPDATE_OBJECT, SET_PROPERTY } from '../constants'
let initialState = []

export const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTACTS:
            return action.payload
        case ADD_CONTACT:
            let newState = [...state, action.payload]
            return newState;
        case UPDATE_CONTACT:
            let oldState = [...state]
            let st = oldState.filter(contact=>contact.id!=action.payload.id)
            st.push(action.payload)
            return st
        
        case DELETE_CONTACT:
            return [...state].filter(contact=>contact.id!=action.payload)
        default:
            return state;
    }
}





export const searchTermReducer = (state='',action) =>{
    switch(action.type){
        case SET_SEARCH:
             return action.payload
        default:
            return state
    }
}

export const contactReducer = (state={},action) =>{
    switch(action.type){
        case SET_SELECTED:
         
             return action.payload
        default:
            return state
    }
}


export const updateObject =(state={},action) =>{
    switch(action.type){
        case SET_PROPERTY:
            let st = {...state}
            st[action.payload.property]=action.payload.value
            return st
        case SET_UPDATE_OBJECT:
             return action.payload
        default:
            return state
    }
}