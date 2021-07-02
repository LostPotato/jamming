// JavaScript source code
import React from 'react'
import "./Playlist.css"
import TrackList from '../TrackList/TrackList'
class Playlist extends React.Component {
	constructor(props) {
		super(props)
		this.handleNameChange = this.handleNameChange.bind(this);
    }
	handleNameChange(e) {
		let newName = e.target.value;
		this.props.onNameEdit(newName);
	}
	render() {
	return (
		<div className = "Playlist">
			<input defaultValue="Name Me!" onChange={ this.handleNameChange }/>
			<TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
			<button className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</button>
		</div>
	)
	}
}

export default Playlist;