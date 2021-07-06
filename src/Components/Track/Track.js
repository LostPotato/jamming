// JavaScript source code
import React from 'react';
import './Track.css';

export class Track extends React.Component{
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this)
		this.removeTrack = this.removeTrack.bind(this)
	}
	
	renderAction () {
	if (this.props.isRemoval) {
		return <button className='Track-action' onClick={this.removeTrack}>-</button>
	}
	else {
		return <button className='Track-action' onClick={this.addTrack}>+</button>
	}
	}
	addTrack() {
		if (this.props.onAdd) {
			this.props.onAdd(this.props.track)
		};
	}
	removeTrack() {
		if (this.props.onRemove) {
			this.props.onRemove(this.props.track)
        }
	}
	showPreview() {
		if (this.props.track.preview_url === null) {
			return;
		}
		else if (!this.props.isRemoval) {
			return <audio controls> <source src={this.props.track.preview_url} type="audio/mpeg" /> Your browser does not support audio </audio>
        }
    }
	render() {
		return (
			<div className='Track'>
				<div className="Track-Information">
					<h3>{this.props.track.name}</h3>
					<p>{this.props.track.artist} || {this.props.track.album} </p>
					{this.showPreview()}
				</div>
				{this.renderAction()}
			</div>
			)
	}
}
export default Track;
