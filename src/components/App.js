import React, { useState, useEffect } from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import sampleFishesBody from '../samples-fishes-body'
// import base from '../base'
import firebase from '../firebase'

export default function App(props) {
	const [fishes, setFish] = useState({})
	const [order, setOrder] = useState({})

	useEffect(() => {
		//Take a snapshot of the DB
		const fishesRef = firebase.database().ref(`${props.match.params.storeId}/fishes`)
		fishesRef.on('value', (snapshot) => {
			console.log('Snapshot of the database:')
			console.log(snapshot.val())
		})
		return () => {
			//Stop the listener
			fishesRef.off()
		}
	}, [])

	const addFish = (fish) => {
		const newFishKey = firebase.database().ref().child(`${props.match.params.storeId}/fishes`).push().key;
		let fishObject = {};
		fishObject[newFishKey] = fish;
		firebase.database().ref(`${props.match.params.storeId}/fishes/`).update(fishObject);
		setFish(prevState => { return { ...fishObject, ...prevState } })
		console.log('fishes state from addFish (missing latest):')
		console.log(fishes)
	}

	const loadSampleFishes = () => {
		sampleFishesBody.map(fish => addFish(fish))
	}

	const addToOrder = (key) => {
		//maybe not mandatory: copy original order so we can add data
		const newOrder = { ...order }
		//add a fishID to order, along with quantity
		newOrder[key] = newOrder[key] + 1 || 1
		//set it
		setOrder(newOrder)
		console.log(order)
	}

	return (
		<div className="catch-of-the-day">
			<div className="menu">
				<Header tagline='Fresh Seafood Market'></Header>
				<ul className="fishes">
					{/* {Object.keys(fishes).map(key => <Fish key={key} fishID={key} fish={fishes[key]} addToOrder={addToOrder} />)} */}
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