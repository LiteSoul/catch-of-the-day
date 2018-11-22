import React from 'react'
import { getFunName } from '../helpers'

export default function StorePicker(props) {
	const inputRef = useRef();

	const goToStore = (e) => {
		e.preventDefault()
		//grab store name
		const storeName = myInput.current.value
		//go to store/storename
		props.history.push(`/store/${storeName}`)
	}

	return (
		<form className="store-selector" onSubmit={goToStore}>
			<h2>Please Enter A Store</h2>
			<input ref={inputRef} type="text" required placeholder='Store Name' defaultValue={getFunName()} />
			<button type="submit">Visit Store →</button>
		</form>
	)
}