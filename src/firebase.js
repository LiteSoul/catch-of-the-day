import firebase from "firebase";
const config = {
	// apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	apiKey: "AIzaSyB50Xl-Zzlk3fGxCXqHE74ZI10rT190wCQ",
	// authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	authDomain: "catch-in-da-night.firebaseapp.com",
	// databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
	databaseURL: "https://catch-in-da-night.firebaseio.com"
};
const firebaseApp = firebase.initializeApp(config);
export { firebaseApp };
export default firebase;
