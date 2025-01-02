import React from 'react';
import ReactDOM from 'react-dom/client';

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

import App from './App';


const fbapp = initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_URL,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

const analytics = getAnalytics(fbapp);

const db = getDatabase(fbapp);
const auth = getAuth(fbapp);

const root = ReactDOM.createRoot(document.getElementById('root'));

auth.onAuthStateChanged(user => {
	root.render(<App user={user} auth={auth} />);
});

if (document.location.search) {
	const params = new URLSearchParams(document.location.search);
	if (params.has('token')) {
		signInWithCustomToken(auth, params.get('token')).then(() => {
			document.location.href = document.location.pathname;
		}).catch(error => {
			console.error(error);
		});
	}
}