import React, { useState } from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'

export default function App() {
	const [fishes, setFish] = useState({})
	const [order, setOrder] = useState({})

	const addFish = (fish) => {
		setFish({ ...fish, ...fishes })
		console.log('fish added!!!')
		console.log(fishes)
	}

	const loadSampleFishes = () => {
		setFish({ ...fishes, ...sampleFishes })
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
					{Object.keys(fishes).map(key =>
						<Fish key={key} fishID={key} fish={fishes[key]} addToOrder={addToOrder} />
					)}
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