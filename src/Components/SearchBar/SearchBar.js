import React from 'react';
import "./SearchBar.css";
class SearchBar extends React.Component{
	constructor(props) {
		super(props);
		this.state = { term: '' };
		this.search = this.search.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	search() {
		this.props.onSearch(this.state.term);
	}
	handleChange(e) {
		let searchTerm = e.target.value;
		this.setState({ term: searchTerm });
    }
	render() {
	return(
	<div className="SearchBar">
			<input placeholder="Enter A Song, Album, or Artist" onChange={this.handleChange}/>
			<button className="SearchButton" onClick={this.search} >SEARCH</button>
	</div>
	)};
}

export default SearchBar;