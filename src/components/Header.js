import React from 'react'

export default function Header({ tagline }) {
	return (
		<header className="top">
			<h1>Catch
				<span className="ofThe">
					<span className="of">In</span>
					<span className="the">Da</span>
				</span>
				Night</h1>
			<h3 className="tagline">
				<span>{tagline}</span>
			</h3>
		</header>
	)
}