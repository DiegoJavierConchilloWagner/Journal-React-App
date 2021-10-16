import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithNameEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( (state) => state.ui );

    const [ formValues, handleInputChange ] = useForm({
            name: "Diego",
            email: "diego@gmail.com",
            password: "1235",
            password2: "1235",
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = ( e ) => {
        e.preventDefault();
        if ( isFormValid() ) {
            dispatch( startRegisterWithNameEmailPassword( name, email, password ) );
        }
    }

    const isFormValid = () => {

        if ( name.trim().length === 0 ) {
            dispatch( setError( "Name is required" ) );
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError( "Email isn`t valid" ) );
            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            dispatch( setError( "Password should be at least 6 characters and match each other" ) );
            return false;
        }

        dispatch( removeError() );
        return true;
    }


    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }
                className='animate__animated animate__fadeIn animate__faster'>

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={ name }
                    onChange={ handleInputChange }
                    className="auth__input"
                    autoComplete="off"
                />

                {
                    msgError?.toLowerCase().includes('name') && 
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={ email }
                    onChange={ handleInputChange }
                    className="auth__input"
                    autoComplete="off"
                />

                {
                    msgError?.toLowerCase().includes('email') && 
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={ password }
                    onChange={ handleInputChange }
                    className="auth__input"
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    value={ password2 }
                    onChange={ handleInputChange }
                    className="auth__input"
                />

                {
                    msgError?.toLowerCase().includes('password') && 
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
