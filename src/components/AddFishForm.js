import React from 'react'

export default function AddFishForm({ addFish }) {
	const nameRef = React.createRef()
	const priceRef = React.createRef()
	const statusRef = React.createRef()
	const descRef = React.createRef()
	const imageRef = React.createRef()

	const createFish = (e) => {
		e.preventDefault()
		const fishId = `fish${Date.now()}`
		const fishBody = {
			name: nameRef.current.value,
			price: parseFloat(priceRef.current.value),
			status: statusRef.current.value,
			desc: descRef.current.value,
			image: imageRef.current.value,
		}
		let fullFish = {}
		fullFish[fishId] = fishBody
		addFish(fullFish)
		//clear form
		e.currentTarget.reset()
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