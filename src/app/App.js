import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AsyncRoute from '../components/AsyncRoute/AsyncRoute';
import Header from '../components/Header/Header';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      clipboard: [],
      user: ''
    }
    this.mountUser = this.mountUser.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }
  mountUser(id){
    this.setState({
      user: id
    });
  }
  copyToClipboard(uri){
    let clips = this.state.clipboard.slice();
    clips.push(uri);
    this.setState({
      clipboard: clips
    });
  }
  render(){
    return(
      <Router>
        <MuiThemeProvider>
          <div>
            <Header clips={this.state.clipboard} />
            <div className={styles.content}>
              <Switch>
                <Route exact path="/" component={props => <AsyncRoute loading={System.import('../pages/Login/Login')} mountUser={this.mountUser} {...props} />} />
                <Route path="/:resource/add" component={props => <AsyncRoute loading={System.import('../pages/Form/Form')} {...props} />} />
                <Route path="/:resource/:id" component={props => <AsyncRoute loading={System.import('../pages/Details/Details')} copyToClipboard={this.copyToClipboard} {...props} />} />
                <Route path="/search" component={props => <AsyncRoute loading={System.import('../pages/ResourceList/ResourceList')} {...props} />} />
                <Route path="/dashboard" component={props => <AsyncRoute loading={System.import('../pages/Dashboard/Dashboard')} {...props} />} />
                <Route path="/resources" component={props => <AsyncRoute loading={System.import('../pages/ResourceForm/ResourceForm')} {...props} />} />
                <Route path="/programming" component={props => <AsyncRoute loading={System.import('../pages/Programming/Programming')} {...props} />} />
                <Route path="/settings" component={props => <AsyncRoute loading={System.import('../pages/Settings/Settings')} {...props} />} />
              </Switch>
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
