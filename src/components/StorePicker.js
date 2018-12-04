import React, { useRef } from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

StorePicker.propTypes = {
	history: PropTypes.object
};

export default function StorePicker({ history }) {
	const inputRef = useRef();

	const goToStore = e => {
		e.preventDefault();
		//grab store name
		const storeName = inputRef.current.value;
		//go to store/storename
		history.push(`/store/${storeName}`);
	};

	return (
		<form className="store-selector" onSubmit={goToStore}>
			<h2>Please Enter A Store</h2>
			<input
				ref={inputRef}
				type="text"
				required
				placeholder="Store Name"
				defaultValue={getFunName()}
			/>
			<button type="submit">Visit Store →</button>
		</form>
	);
}
