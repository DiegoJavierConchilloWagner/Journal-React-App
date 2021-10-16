// {
//     notes: [],
//     active: null,
//     active: {
//         id: 'active',
//         title: 'hola',
//         body: '',
//         imageUrl: 'http://types',
//         date: 12312412213
//     }
// }

import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
};

export const notesReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
    
        case types.notesAddNew:
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }
        
        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                    ? action.payload.note
                    : note
                )
            }

        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload )
            }
        
        case types.notesLogoutCleaning:
            return {
                ...state,
                notes: [],
                active: null
                // ...initialState
            }

        default:
            return state;
    }
}