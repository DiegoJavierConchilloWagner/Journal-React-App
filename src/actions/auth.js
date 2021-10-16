import Swal from 'sweetalert2';

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "@firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from './notes';


export const startLoginEmailPassword = (email, password) => {
    const auth = getAuth();
    
    return ( dispatch ) => {
        
        dispatch( startLoading() )
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(
                    login( user.uid, user.displayName )
                );
            })
            .catch((error) => {
                console.log(error);
                Swal.fire('Error', error.message, 'error');
            })
            .finally(() => dispatch( finishLoading() ) )
    }
}

export const startRegisterWithNameEmailPassword = (name, email, password) => {
    const auth = getAuth();
    return ( dispatch ) => {
        
        createUserWithEmailAndPassword(auth, email, password)
            .then( async({ user }) => {
                await updateProfile( user, { displayName: name });
            })
            .catch( e => {
                console.warn( e );
                Swal.fire('Error', e.message, 'error');
            } );
    }
}


export const startGoogleLogin = () =>{
    const auth = getAuth();
    return (dispatch) =>{

        signInWithPopup(auth, googleAuthProvider)
            .then( ( { user } ) =>{
                dispatch(
                    login( user.uid, user.displayName )
                )
            });
    }
}

export const login = ( uid, displayName ) => {
    return{
        type: types.login,
        payload:{
            uid,
            displayName
        }
    }
};

export const startLogout = () =>{
    const auth = getAuth();
    return async(dispatch) =>{
        await signOut(auth);

        dispatch( logout() );
        dispatch( noteLogout() );
    }
}

export const logout = () =>({
    type: types.logout
})