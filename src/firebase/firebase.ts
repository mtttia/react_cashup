import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './configuration';


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app;