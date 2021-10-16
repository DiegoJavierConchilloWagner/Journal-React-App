import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getFirestore
} from 'firebase/firestore';
import {
    GoogleAuthProvider
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID, 
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};

// const firebaseConfigTesting = {
//     apiKey: "",
//     authDomain: "",
//     projectId: "",
//     storageBucket: "",
//     messagingSenderId: "",
//     appId: ""
// };

// if (process.env.NODE_ENV === 'test') {

//     initializeApp(firebaseConfigTesting);

// } else {

//     initializeApp(firebaseConfig);

// }

initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider
}