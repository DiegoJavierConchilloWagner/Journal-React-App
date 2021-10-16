import { types } from '../../types/types';


describe('Pruebas con nuestros tipos', () => {

    test('debe de tener estos tipos', () => {

        expect( types ).toEqual({
            // authReducer
            login: '[auth] login',
            logout: '[auth] logout',
            
            // uiReducer
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',

            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',

            // Notes
            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdated: '[Notes] Updated note',
            notesFileUrl: '[Notes] Updated image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout cleaning'
        })
        
    })
    

    
})
