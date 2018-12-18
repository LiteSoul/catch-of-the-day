import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import { firebaseApp } from "../firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";

Inventory.propTypes = {
	addFish: PropTypes.func,
	updateFish: PropTypes.func,
	deleteFish: PropTypes.func,
	loadSampleFishes: PropTypes.func,
	fishes: PropTypes.object
};

export default function Inventory({
	addFish,
	updateFish,
	deleteFish,
	loadSampleFishes,
	fishes,
	storeId
}) {
	const [owner, setOwner] = useState(null);
	const [user, setUser] = useState(null);

	const storeRef = firebase.database().ref(storeId);

	const authenticate = provider => {
		//create new provider base on chosen prvider button
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		//sign it with popup then handle with authHandler
		firebaseApp
			.auth()
			.signInWithPopup(authProvider)
			.then(authHandler);
	};

	//auth and check store owner
	const authHandler = async authData => {
		console.log(authData);
		const userId = authData.user.uid;
		setUser(userId);

		const storeOwner = await storeRef
			.child("owner")
			.once("value")
			.then(snapshot => snapshot.val());

		console.log(storeOwner);
		//if there is no store owner, create one with current userid
		if (!storeOwner) {
			storeRef.update({ owner: userId });
		}

		setOwner(storeOwner);

		console.log("store owner (prev state");
		console.log(owner);
		console.log("user id (prev state");
		console.log(user);
	};

	//logout method
	const logout = async () => {
		console.log("loggin out");
		await firebase.auth().signOut()
		setUser(null)
	};

	//maintain user logged in on page refresh
	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) authHandler({ user })
		})
	}, []);

	//logout button
	const logoutButton = <button onClick={logout}>Log Out</button>;


	//if there is no user currently loggedin, only show Login
	if (!user) return <Login authenticate={authenticate} />;

	//check if the user is the owner
	if (owner && user !== owner)
		return (
			<div className="inventory">
				{logoutButton}
				<h3>
					Sorry, you are not the owner of this store... go to the homepage to
					create a new store just for you!
				</h3>
			</div>
		);



	//otherwise (loggedin owner has access to full inventory)
	if (owner && user && owner === user)
		return (
			<div className="inventory">
				<h2>Inventory</h2>
				{logoutButton}
				{fishes &&
					Object.entries(fishes).map(([key, fish]) => (
						<EditFishForm
							key={key}
							fishId={key}
							fish={fish}
							updateFish={updateFish}
							deleteFish={deleteFish}
						/>
					))}
				<AddFishForm addFish={addFish} />
				<button onClick={loadSampleFishes}>Load Sample Fishes</button>
			</div>
		);


	return (
		<div>loading...</div>
	)

}
