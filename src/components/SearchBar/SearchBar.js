import React from 'react';
import { Link } from 'react-router-dom';

import ActionSearch from 'material-ui/svg-icons/action/search';

import styles from './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      resource: 'users'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeResource = this.changeResource.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let query = this.state.value.replace(/\s/g, '+');
    let resource = this.state.resource;
    let searchPath = '/search?r='+resource+'&q='+query;

    this.props.searchAPI(searchPath);
  }
  changeResource(event){
    this.setState({resource: event.target.value});
  }
  render(){
    return(
      <div className={styles.searchBar}>
        <label>
          <ActionSearch />
          <input type='text' value={this.state.value} onChange={this.handleChange} />
        </label>
        <Link to='/search'><h3 onClick={this.handleSubmit}>Submit</h3></Link>
        <select onChange={this.changeResource}>
          <option value="users">Users</option>
          <option value="properties">Properties</option>
        </select>
      </div>
    );
  }
}

export default SearchBar;
