
import React from 'react'
import './App.css';
import '../SearchBar/SearchBar'
import '../SearchResults/SearchResults'

class App extends React.Compenent {
	render() {
	<div>
       <h1>Ja<span className="highlight">mmm</span>ing</h1>
       <div className="App">
        <SearchBar />
            <div className="App-playlist">
            <SearchResults />
            <Playlist />
            </div>
       </div>
    </div>
	}
}
export default App;
