import React, { Component } from 'react'

class AsyncRoute extends Component {
  constructor(){
    super();
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    this.props.loading.then(module => {
      this.component = module.default;
      this.setState({
        loaded: true
      });
    })
  }

  render(){
    let { props } = this;
    if(this.state.loaded) {
      return <this.component {...props} />;
    } else {
      return <h2>Loading... </h2>;
    }
  }
}

export default AsyncRoute;
