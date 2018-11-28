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

		const itemsRef = firebase.database().ref(`${props.match.params.storeId}/fishes`)
		// itemsRef.push(fishes)

		itemsRef.on('value', (snapshot) => {
			console.log(snapshot.val())
		})
		return () => {
			itemsRef.off()
		}

		//these props are coming from router
		//this.ref from rebase not accesible, so this workaround:
		// const ref = base.syncState(`${props.match.params.storeId}/fishes`, {
		// 	context: {
		// 		setState: ({ fishes }) => setFish({ ...fishes }),
		// 		state: { fishes },
		// 	},
		// 	state: 'fishes'
		// })

		// 	return () => {
		// 		base.removeBinding(ref);
		// 	}
	}, [])

	const addFish = (fish) => {
		const newFishKey = firebase.database().ref().child(`${props.match.params.storeId}/fishes`).push().key;
		let updateFish = {};
		// updateFish[`${props.match.params.storeId}/fishes/${newFishKey}`] = fish;
		updateFish[newFishKey] = fish;
		// firebase.database().ref().update(updateFish);
		firebase.database().ref(`${props.match.params.storeId}/fishes/`).update(updateFish);
		// setFish({ ...updateFish, ...fishes })
		setFish({ ...fishes, ...updateFish })
		// console.log('updateFish object:')
		// console.log(updateFish)
		console.log(fishes)

		// const itemsRef = firebase.database().ref(`${props.match.params.storeId}/fishes`)
		// itemsRef.push(fish)
	}

	const loadSampleFishes = () => {
		// sampleFishesBody.map(fish => addFish(fish))
		const properSamples = sampleFishesBody.map(fish => {
			const newFishKey = firebase.database().ref().child(`${props.match.params.storeId}/fishes`).push().key;
			let updateFish = {};
			updateFish[newFishKey] = fish;
			firebase.database().ref(`${props.match.params.storeId}/fishes/`).update(updateFish);
			return updateFish
		})

		setFish({ ...fishes, ...properSamples })
		console.log(fishes)
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