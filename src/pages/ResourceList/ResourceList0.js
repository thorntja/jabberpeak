'use strict';

import React from 'react';

import List from '../../components/List/List';
import ResourceMenu from '../../components/ResourceMenu/ResourceMenu';
import SidePanel from '../../components/SidePanel/SidePanel';
import SearchBar from '../../components/SearchBar/SearchBar';

class ResourceList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      panelVisible: false,
      panelData: [],
			data: []
    };
		this.fetchResources = this.fetchResources.bind(this);
		this.openPanel = this.openPanel.bind(this);
    this.closePanel = this.closePanel.bind(this);
    this.setPanel = this.setPanel.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	componentWillUpdate(nextProps, nextState) {
		// when the menu becomes visible, setup some handlers so we can close the menu easily
		if(nextState.panelData != '') document.addEventListener('keydown', this.handleKeyDown);
		else document.removeEventListener('keydown', this.handleKeyDown);
	}
	componentDidMount() {
	let apiUrl = this.props.location.pathname + this.props.location.search;
	this.fetchResources(apiUrl);
	}

	fetchResources(url) {
		let networkDataReceived = false;
		const URL = `http://localhost:3000/api${ url }`;

		fetch( URL )
			.then( (response) => {
				return response.json();
			})
			.then( (data) => {
				this.setState({ data: data.results });
			});
	}
	handleKeyDown(e){
    if(e.keyCode === 37)
      this.openPanel();
    else
      this.closePanel();
  }

  openPanel(){
    this.setState({
      panelVisible: true
    });
  }
  closePanel(){
    if(this.state.panelVisible)
    this.setState({
      panelVisible: false
    });
  }
  setPanel(e, id){
		let resource = { id: id, name: e.target.parentNode.firstChild.textContent };
    this.setState({
      panelData: resource
    });
    e.stopPropagation();
  }

	render() {
		return (
			<div>
        <SidePanel open={this.state.panelVisible} resource={this.state.panelData}/>
        {this.state.panelData.name &&
          <div className='panel-button' onClick={this.openPanel} onTouchStart={this.openPanel} style={{backgroundColor: 'rgba(0,0,0,0)', position: 'absolute', right: 0, top: '10em', height: 'calc(100% - 64px)'}}>View {this.state.panelData.name}</div>
        }
        <div style={{marginTop: 30}}>
					<List tiles={this.state.data} setPanel={this.setPanel} />
				</div>
				<SearchBar />
			</div>
		)
	}

}

export default ResourceList;
