import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyB50Xl-Zzlk3fGxCXqHE74ZI10rT190wCQ",
	authDomain: "catch-in-da-night.firebaseapp.com",
	databaseURL: "https://catch-in-da-night.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database())

//named export
export { firebaseApp }
//default export
export default base