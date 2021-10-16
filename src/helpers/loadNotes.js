import { collection, query, getDocs } from "@firebase/firestore";
import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {

    const notesSnap = await getDocs(query(collection(db, `${ uid }/journal/notes`)));
    const notes = [];

    notesSnap.forEach( childrenSnap => {
        notes.push({
            id: childrenSnap.id,
            ...childrenSnap.data()
        })
    });

    return notes;
};