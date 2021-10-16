import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    // Route,
    Redirect
} from "react-router-dom";
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, async(user) => {
            
            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );

                dispatch( startLoadingNotes( user.uid ) );

            } else{
                setIsLoggedIn( false );
            }

            setChecking( false )

        });

    }, [ dispatch ])


    if ( checking ) {
        return(
            <h1>wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute path="/auth" isAuthenticated={ isLoggedIn } component={ AuthRouter } />

                    <PrivateRoute exact path="/" isAuthenticated={ isLoggedIn } component={ JournalScreen } />

                    <Redirect to="/auth/login" />
                </Switch> 
            </div>
        </Router>
    )
}
