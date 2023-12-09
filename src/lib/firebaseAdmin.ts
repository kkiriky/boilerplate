import {credential} from 'firebase-admin';
import {initializeApp, getApps, App} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';

let firebaseAdmin: App;
if (!getApps().length) {
  firebaseAdmin = initializeApp({
    credential: credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS!)),
  });
}
export const firestoreAdmin = getFirestore(firebaseAdmin!);
