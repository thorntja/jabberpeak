import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class UserForm extends Component {
  constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      admin: false,
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
    const { username, password, first_name, last_name, email, phone, admin } = this.state;
		this.setState({ processing: true, username: '', password: '', first_name: '', last_name: '', email: '', phone: '', admin: false });
    fetch('/api/users', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        admin: admin
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

  render(){
    const { processing, username, password, first_name, last_name, email, phone, message } = this.state;

    return(
      <div>
				{ processing ?
					<div>
						Loading...
					</div>
          :
          <h1>
            {message}
          </h1>
        }
        <div>
					<TextField
						floatingLabelText="Username"
						fullWidth={true}
						defaultValue={ username }
						onChange={ (event,newValue) => { this.updateField('username', newValue) } }
						autoFocus={true} />
					<TextField
						floatingLabelText="Password"
						fullWidth={true}
						defaultValue={ password }
						onChange={ (event,newValue) => { this.updateField('password', newValue) } } />
          <TextField
						floatingLabelText="First"
						fullWidth={true}
						defaultValue={ first_name }
						onChange={ (event,newValue) => { this.updateField('first_name', newValue) } } />
          <TextField
						floatingLabelText="Last"
						fullWidth={true}
						defaultValue={ last_name }
						onChange={ (event,newValue) => { this.updateField('last_name', newValue) } } />
          <TextField
						floatingLabelText="Email"
						fullWidth={true}
						defaultValue={ email }
						onChange={ (event,newValue) => { this.updateField('email', newValue) } } />
          <TextField
						floatingLabelText="Phone"
						fullWidth={true}
						defaultValue={ phone }
						onChange={ (event,newValue) => { this.updateField('phone', newValue) } } />
            <FlatButton
      				label="Cancel"
      				primary={ true }
      				containerElement={<Link to='/dashboard' />}
      			/>
            <FlatButton
      				label="Submit"
      				primary={ true }
      				disabled={ ! username || ! password }
      				onTouchTap={ this.submit }
      			/>
				</div>
      </div>
    );
  }

};

export default UserForm;
