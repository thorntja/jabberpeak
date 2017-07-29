import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import styles from './Details.css';

class Details extends Component {
  constructor(props){
    super(props);
    this.state = {
      processing: false,
      message: ''
    }
    this.uri = props.location.pathname;
    this.deleteResource = this.deleteResource.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
		fetch('http://localhost:3000/api'+this.uri)
			.then(resp => resp.json()) // Transform the data into json
			.then(payload => {
				this.setState({
					data: payload.result
				});
			})
  }
  deleteResource(){
    this.setState({processing: true})
    fetch('http://localhost:3000/api'+this.uri, {
      method: 'delete'
    })
    .then(respone => response.json())
    .then(response => {
      let message;
      if(response.err) message = response.err;
      else message = response.msg;

      this.setState({
        message: message,
        processing: false
      });
    });
	}
  handleClick(){
    this.props.copyToClipboard(this.props.location.pathname);
  }
  render(){
    const { processing, message } = this.state;

    return(
      <div>
      {processing ?
        <h1>
          Loading...
        </h1>
      :
        <h1>
          {message}
        </h1>
      }
        <h1 onClick={this.handleClick}>Copy</h1>
        <h1> Details </h1>
        <h1 onClick={this.deleteResource}> Delete </h1>
      </div>
    );
  }
}

export default Details;
