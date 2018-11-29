import React from 'react'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'

export default function Inventory({ addFish, updateFish, loadSampleFishes, fishes }) {
	return (
		<div className="inventory">
			<h2>Inventory</h2>
			{fishes && Object.entries(fishes).map(([key, fish]) => <EditFishForm key={key} fishId={key} fish={fish} updateFish={updateFish} />)}
			<AddFishForm addFish={addFish}></AddFishForm>
			<button onClick={loadSampleFishes}>Load Sample Fishes</button>
		</div>
	)
}