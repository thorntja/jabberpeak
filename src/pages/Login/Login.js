import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      token: false,
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    let token = window.sessionStorage.getItem('jwtToken');
    if(token){
      this.setState({
        token: true
      });
    }
  }
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(){
    this.setState({
      message: 'Loading...'
    })
    fetch('/auth/login', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(response => {
      return response.json();
		})
    .then(payload => {
      console.log(payload);
      if(payload.token){
        window.sessionStorage.setItem('jwtToken', payload.token);
        this.setState({
          token: true
        });
      }
      else
        this.setState({message: 'Invalid login information'})
    })
  };

  render(){
    const { username, password, message, token } = this.state;

    if (token) {
      return (
        <Redirect push to='/dashboard'/>
      )
    }
    return(
      <div>
        {message && <h1>{message}</h1>}
          <TextField
            name='username'
          id="text-field-controlled"
          value={username}
          onChange={this.handleChange}
        />
          <TextField
            name='password'
          id="text-field-controlled"
          value={password}
          onChange={this.handleChange}
        />
        <RaisedButton label="Login" onTouchTap={this.handleSubmit} />
      </div>
    );
  }
}

export default Login;
