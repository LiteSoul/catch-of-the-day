import React from 'react'
import AddFishForm from './AddFishForm'

export default function Inventory({ addFish, loadSampleFishes }) {
	return (
		<div className="inventory">
			<h2>Inventory</h2>
			<AddFishForm addFish={addFish}></AddFishForm>
			<button onClick={loadSampleFishes}>Load Sample Fishes</button>
		</div>
	)
}