// JavaScript source code
import React from 'react';
import './Track.css';

class Track extends React.Component{
	render() {
		return (
			<div className='Track'>
				<div className="Track-Information">
					<h3>Random track name</h3>
					<p>Track artist || Track album </p>
				</div>
				<button className='Tract-action'></button>
		)
	}
}