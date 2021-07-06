
import React from 'react'
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

class App extends React.Component {
	constructor (props) {
        super(props);
        this.state = {
            SearchResults: [],
            playlistName: [],
            PlaylistTracks: []
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }
    addTrack(track) {
        let tracks = this.state.PlaylistTracks;
        if(tracks.find(savedTrack => savedTrack.id === track.id)) {
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
        this.setState({ playlistName: newName });
    }

    savePlaylist() {
        let trackURIs = [];
        this.state.PlaylistTracks.forEach(track => {
            trackURIs.push(track.uri)
        });
        Spotify.savePlaylist(this.state.playlistName, trackURIs);
        this.setState({ PlaylistTracks: [] })
        this.setState({PlaylistName: []})
    }
    search(term) {
        console.log(Spotify.search(term))
        Spotify.search(term).then(result => {
            this.setState({ SearchResults: result })
        })
    }
        render() {
        return( 
        <div>
           <h1>Ja<span className="highlight">mmm</span>ing</h1>
           <div className="App">
                <SearchBar onSearch={ this.search } />
                <div className="App-playlist">
                        <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack}/>
                        <Playlist playlistName={this.state.playlistName}
                            playlistTracks={this.state.PlaylistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}
                        />
                </div>
           </div>
        </div>
	    );
        }
}
export default App;
