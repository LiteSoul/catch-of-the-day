import React from 'react'
import { formatPrice } from '../helpers'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

export default function Order({ fishes, order,removeFromOrder }) {
	const orderIds = Object.keys(order)
	const total = orderIds.reduce((prevTotal, key) => {
		const fish = fishes[key]
		const count = order[key]
		const isAvailable = fish && fish.status === 'available'
		if (isAvailable) { return prevTotal + (count * fish.price) }
		return prevTotal
	}, 0)

	const renderOrder = (key) => {
		const fish = fishes[key]
		const count = order[key]
		const isAvailable = fish && fish.status === 'available'
		//make sure the fish is loaded from DB first
		if (!fish) return null
		if (!isAvailable) {
			return (
				<CSSTransition classNames='order' key={key} timeout={{enter:250,exit:250}}>
					<li key={key}>
						Sorry {fish ? fish.name : 'fish'} is no longer available
					</li>
				</CSSTransition>
			)
		}
		return (
			<CSSTransition classNames='order' key={key} timeout={{enter:250,exit:250}}>
				<li key={key}>
					{count} lbs {fish.name} {formatPrice(count * fish.price)}
					<button onClick={()=>removeFromOrder(key)}>&times;</button>
				</li>
			</CSSTransition>
		)

	}

	return (
		<div className="order-wrap">
			<h2>Order</h2>
			<TransitionGroup component='ul' className='order'>
				{orderIds.map(renderOrder)}
				<div className="total">
					Total: <strong>{formatPrice(total)}</strong>
				</div>
			</TransitionGroup>
		</div>
	)
}