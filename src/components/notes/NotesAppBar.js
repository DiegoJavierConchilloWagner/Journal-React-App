import React, { useRef } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector( (state) => state.notes );
    const fileRef = useRef();

    const noteDate = moment(active.date);

    const handleSave = () => dispatch( startSaveNote( active ) );
    const handlePictureClick = () => fileRef.current.click();
    const handleFileChange = ( e ) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading( file ) );
        }
    };

    return (
        <div className="notes__appbar">
            <span>{ noteDate.format('MMM Do YY') }</span>

            <input type="file" style={{ display: 'none' }}
                name='file' onChange={ handleFileChange } 
                ref={ fileRef } />

            <div>
                <button className="btn" onClick={ handlePictureClick }>
                    Picture
                </button>

                <button className="btn" onClick={ handleSave }>
                    Save
                </button>
            </div>
        </div>
    )
}
