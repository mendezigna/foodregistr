import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import firebase from 'firebase';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field

var firebaseConfig = {
  apiKey: "AIzaSyDTL9nz0fOjxEudfLCUgMQEUgSiiwnX-AM",
  authDomain: "foodregistr-96935.firebaseapp.com",
  databaseURL: "https://foodregistr-96935.firebaseio.com",
  projectId: "foodregistr-96935",
  storageBucket: "foodregistr-96935.appspot.com",
  messagingSenderId: "216101331283",
  appId: "1:216101331283:web:e737e52fd28053a79181a6",
  measurementId: "G-1SN11PMK1Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
