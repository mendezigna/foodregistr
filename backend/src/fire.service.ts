import * as firebase from 'firebase-admin';

export class FireService {
    protected FireDAO = firebase.firestore();
}
