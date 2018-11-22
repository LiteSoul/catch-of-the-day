import React from 'react'
import AddFishForm from './AddFishForm'

export default function Inventory({ addFish }) {
	return (
		<div className="inventory">
			<h2>Inventory</h2>
			<AddFishForm addFish={addFish}></AddFishForm>
		</div>
	)
}