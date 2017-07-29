'use strict';

import React from 'react';

import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


class PropertyForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			address: '',
			br: '',
			ba: '',
			rent: '',
			processing: false,
			message: ''
		};
		this.updateField = this.updateField.bind(this);
		this.submit = this.submit.bind(this);
	}


	updateField( field, value ) {
		this.setState({ [field]: value });
	}

	submit() {
		const { address, br, ba, rent, message, processing } = this.state;
		this.setState({ processing: true, address: '', br: '', ba: '', rent: '' });
    fetch('/api/properties', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address: address,
				br: br,
				ba: ba,
				rent: rent
      })
    })
		.then( (response) => {
      return response.json();
    })
    .then( (response) => {
      let message;
      if(response.err) message = response.err;
      else message = response.msg;

      this.setState({
        message: message,
        processing: false
      });
    });
	}


	render() {
		const { processing, address, br, ba, rent, message } = this.state;
		return (

			<div>
				<p>Enter details below.</p>

				{ processing ?
					<h1>
						Loading...
					</h1>
				:
					<h1>
					 {message}
					</h1>
				}
				<div>
					<TextField
						floatingLabelText="Address"
						fullWidth={true}
						defaultValue={ address }
						onChange={ (event,newValue) => { this.updateField('address', newValue) } }
						autoFocus={true} />
					<TextField
						floatingLabelText="Bedrooms"
						fullWidth={true}
						defaultValue={br }
						onChange={ (event,newValue) => { this.updateField('br', newValue) } }
						autoFocus={true} />
					<TextField
						floatingLabelText="Bathrooms"
						fullWidth={true}
						defaultValue={ ba }
						onChange={ (event,newValue) => { this.updateField('ba', newValue) } }
						autoFocus={true} />
					<TextField
						floatingLabelText="Rent"
						fullWidth={true}
						defaultValue={ rent }
						onChange={ (event,newValue) => { this.updateField('rent', newValue) } }
						autoFocus={true} />
						<FlatButton
							label="Cancel"
							primary={ true }
							containerElement={<Link to='/dashboard' />}
						/>
						<FlatButton
							label="Submit"
							primary={ true }
							disabled={ ! address }
							onTouchTap={ this.submit }
						/>
				</div>
			</div>
		)

	}

}

export default PropertyForm;
