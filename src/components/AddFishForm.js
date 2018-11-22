import React from 'react'

export default function AddFishForm() {
	const nameRef = React.createRef()
	const priceRef = React.createRef()
	const statusRef = React.createRef()
	const descRef = React.createRef()
	const imageRef = React.createRef()

	const createFish = (e) => {
		e.preventDefault()
		console.log('making a fish')


	}

	return (
		<form className='fish-edit' onSubmit={createFish}>
			<input type="text" name='name' ref={nameRef} placeholder='Name' />
			<input type="text" name='price' ref={priceRef} placeholder='Price' />
			<select name='status' ref={statusRef}>
				<option value='available'>Fresh!</option>
				<option value='unavailable'>Sold Out!</option>
			</select>
			<textarea name='desc' ref={descRef} placeholder='Description' />
			<input type="text" name='image' ref={imageRef} placeholder='image' />
			<button type="submit">+ Add Fish</button>
		</form >
	)
}