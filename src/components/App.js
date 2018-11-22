import React, { useState } from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'

export default function App() {
	const [fishes, setFish] = useState({})

	const addFish = (fish) => {
		setFish({ ...fishes, fish })
		console.log('fish added!!!')
		console.log(fishes)
	}

	return (
		<div className="catch-of-the-day">
			<div className="menu">
				<Header tagline='Fresh Seafood Market'></Header>
			</div>
			<Order></Order>
			<Inventory addFish={addFish}></Inventory>
		</div>
	)
}