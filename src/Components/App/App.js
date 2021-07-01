
import React from 'react'
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
class App extends React.Component {
	constructor (props) {
        super(props);
        this.state = { SearchResults: [
            {name: 'tinyDancer', artist: "Tim G", album: "MisterB", id: "1" },
            {name: 'tinyDancer2', artist: "Tim G2", album: "MisterB2", id: "2" },
            {name: 'tinyDancer3', artist: "Tim G", album: "MisterB", id: "3" }
            ] , 
            playlistName: "Top 50",
            PlaylistTracks: [
            {name: 'tinyDancer', artist: "Tim G", album: "MisterB", id: "5" },
            {name: 'tinyDancer2', artist: "Tim G2", album: "MisterB2", id: "55" },
            {name: 'tinyDancer3', artist: "Tim G", album: "MisterB", id: "3" }
            ]
       }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
    }
    addTrack(track) {
        let tracks = this.state.PlaylistTracks;
        if(tracks.find(savedTrack => savedTrack.id == track.id)) {
            return;
        }
        tracks.push(track)
        this.setState({PlaylistTracks: tracks})
    }
    removeTrack(track) {
        let tracks = this.state.PlaylistTracks;
        tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
        this.setState({ PlaylistTracks: tracks })
    }
    updatePlaylistName(newName) {
        this.setState({ name:newName })
    }
        render() {
        return( 
        <div>
           <h1>Ja<span className="highlight">mmm</span>ing</h1>
           <div className="App">
            <SearchBar />
                <div className="App-playlist">
                <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack} />
                        <Playlist playlistName={this.state.playlistName}
                            playlistTracks={this.state.PlaylistTracks}
                            onRemove={this.removeTrack}
                            onNameEdit={this.updatePlaylistName}
                        />
                </div>
           </div>
        </div>
	    );
        }
}
export default App;
