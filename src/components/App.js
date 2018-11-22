import React, { useState } from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'

export default function App() {
	const [fishes, setFish] = useState({})

	const addFish = (fish) => {
		setFish({ ...fish, ...fishes })
		console.log('fish added!!!')
		console.log(fishes)
	}

	const loadSampleFishes = () => {
		setFish({ ...fishes, ...sampleFishes })
	}

	return (
		<div className="catch-of-the-day">
			<div className="menu">
				<Header tagline='Fresh Seafood Market'></Header>
				<ul className="fishes">
					{Object.keys(fishes).map(key =>
						<Fish key={key} fish={fishes[key]} />
					)}
				</ul>
			</div>
			<Order></Order>
			<Inventory
				addFish={addFish}
				loadSampleFishes={loadSampleFishes}
			></Inventory>
		</div>
	)
}