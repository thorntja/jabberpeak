'use strict';

import React from 'react';

import List from '../../components/List/List';
import ResourceMenu from '../../components/ResourceMenu/ResourceMenu';
import SearchBar from '../../components/SearchBar/SearchBar';

class ResourceList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: []
    };
		this.searchAPI = this.searchAPI.bind(this);
	}
	componentDidMount() {
		let apiUrl = this.props.location.pathname + this.props.location.search;
		this.searchAPI(apiUrl);
	}

	searchAPI(url) {
		let networkDataReceived = false;
		const URL = `http://localhost:3000/api${ url }`;
		fetch( URL )
			.then( (response) => {
				return response.json();
			})
			.then( (data) => {
				console.log(data);
				this.setState({ data: data.results });
			});
	}

	render() {
		return (
			<div>
        <div style={{marginTop: 30}}>
					{this.state.data ?
						<List tiles={this.state.data} />
					:
						<ResourceMenu searchAPI={this.searchAPI} />
					}
				</div>
				<SearchBar searchAPI={this.searchAPI} />
			</div>
		)
	}

}

export default ResourceList;
