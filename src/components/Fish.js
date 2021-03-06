import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

export default function Fish({ fish, addToOrder, fishID }) {
	const isAvailable = fish.status === "available";

	return (
		<li className="menu-fish">
			<img src={fish.image} alt={fish.name} />
			<h3 className="fish-name">
				{fish.name}
				<span className="price">{formatPrice(fish.price)}</span>
			</h3>
			<p>{fish.desc}</p>
			<button disabled={!isAvailable} onClick={() => addToOrder(fishID)}>
				{isAvailable ? "Add To Order" : "Sold Out!"}
			</button>
		</li>
	);
}

Fish.propTypes = {
	fish: PropTypes.object,
	addToOrder: PropTypes.func,
	fishID: PropTypes.string
};
