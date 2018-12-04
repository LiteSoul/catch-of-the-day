import React from "react";
import PropTypes from "prop-types";
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
	fishes
}) {
	return <Login />;
	return (
		<div className="inventory">
			<h2>Inventory</h2>
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
}
