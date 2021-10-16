/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    startLoadingNotes,
    startNewNote,
    startSaveNote,
    startUploading
} from '../../actions/notes';
import {
    db
} from '../../firebase/firebase-config';
import {
    disableNetwork
} from "firebase/firestore";
import {
    types
} from '../../types/types';
import {
    doc,
    deleteDoc
} from "@firebase/firestore";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
    auth: {
        uid: 'TESTING'
    }
});

describe('Pruebas con las acciones de notes', () => {

    afterAll(() => {
        disableNetwork(db);
    })

    test('debe de crear una nueva nota startNewNote', async () => {

        await store.dispatch(startNewNote());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[0].payload.id;
        const noteRef = doc(db, `/TESTING/journal/notes/${docId}`);
        await deleteDoc(noteRef);

    });




    // test('startLoadingNotes debe cargar las notas', async () => {

    //     await store.dispatch(startLoadingNotes('TESTING'));
    //     const actions = store.getActions();

    //     expect(actions[0]).toEqual({
    //         type: types.notesLoad,
    //         payload: expect.any(Array)
    //     });

    //     const expected = {
    //         id: expect.any(String),
    //         title: expect.any(String),
    //         body: expect.any(String),
    //         date: expect.any(Number),
    //     }

    //     expect(actions[0].payload[0]).toMatchObject(expected);


    // })


    // test('startSaveNote debe de actualizar la nota', async () => {

    //     const note = {
    //         id: '02L6n2ZPdEgpELw8y7ML',
    //         title: 'titulo',
    //         body: 'body'
    //     };

    //     await store.dispatch(startSaveNote(note));

    //     const actions = store.getActions();
    //     // console.log(actions);
    //     expect(actions[0].type).toBe(types.notesUpdated);

    //     const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

    //     expect(docRef.data().title).toBe(note.title);

    // })


    // test('startUploading debe de actualizar el url del entry', async () => {

    //     const file = new File([], 'foto.jpg');
    //     await store.dispatch(startUploading(file));

    //     const docRef = await db.doc('/TESTING/journal/notes/02L6n2ZPdEgpELw8y7ML').get();
    //     expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg');

    // })



})