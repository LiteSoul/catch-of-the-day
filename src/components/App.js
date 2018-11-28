import React, { useState, useEffect } from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishesBody from '../samples-fishes-body'
// import base from '../base'
import firebase from '../firebase'
// import { useList, useObject } from 'react-firebase-hooks/database';

export default function App({ match: { params: { storeId } } }) {
	const [fishes, setFish] = useState({})
	const [order, setOrder] = useState(JSON.parse(localStorage.getItem(storeId)) || {})

	const fishesRef = firebase.database().ref(`${storeId}/fishes/`)

	useEffect(() => {
		//Take a snapshot of the DB
		fishesRef.on('value', (snapshot) => {
			console.log('Snapshot of the database:')
			console.log(snapshot.val())
			// setFish(prevState => { return { ...snapshot.val(), ...prevState } })
			setFish(snapshot.val())
		})

		return () => {
			//Stop the listener
			fishesRef.off()
		}
	}, [])

	const addFish = (fish) => {
		const newFishKey = firebase.database().ref(storeId).child('fishes').push().key;
		let fishObject = {};
		fishObject[newFishKey] = fish;
		fishesRef.update(fishObject);
		// setFish(prevState => { return { ...fishObject, ...prevState } })
		console.log('fishes state from addFish (missing latest):')
		console.log(fishes)
	}

	const loadSampleFishes = () => {
		sampleFishesBody.map(fish => addFish(fish))
	}

	const addToOrder = (key) => {
		//copy original order so we can add/update/modify data
		const newOrder = { ...order }
		//add a fishID to order, along with quantity
		newOrder[key] = newOrder[key] + 1 || 1
		//set it
		setOrder(newOrder)
		console.log(order)
	}

	useEffect(() => {
		console.log('SECOND USEEFFECT!')
		//first reinstate localStorage
		// const localStorageRef = localStorage.getItem(storeId)
		// console.log('LOCALSTORAGEREF ' + localStorageRef)
		// if (localStorageRef) {
		// 	setOrder(JSON.parse(localStorageRef))
		// }
		//save orders to localStorage
		localStorage.setItem(storeId, JSON.stringify(order))
	}, [order])

	return (
		<div className="catch-of-the-day">
			<div className="menu">
				<Header tagline='Fresh Seafood Market'></Header>
				<ul className="fishes">
					{Object.entries(fishes).map(([key, fish]) => <Fish key={key} fishID={key} fish={fish} addToOrder={addToOrder} />)}
				</ul>
			</div>
			<Order
				fishes={fishes}
				order={order}
			></Order>
			<Inventory
				addFish={addFish}
				loadSampleFishes={loadSampleFishes}
			></Inventory>
		</div>
	)
}