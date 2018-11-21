import React from 'react'
import { getFunName } from '../helpers'

export default function StorePicker() {
	const myInput = React.createRef();

	const goToStore = (e) => {
		e.preventDefault()
		//grab store name
		console.log(myInput)
		console.log(myInput.current.value)
		//go to store/storename
	}

	return (
		<form className="store-selector" onSubmit={goToStore}>
			<h2>Please Enter A Store</h2>
			<input ref={myInput} type="text" required placeholder='Store Name' defaultValue={getFunName()} />
			<button type="submit">Visit Store →</button>
		</form>
	)
}