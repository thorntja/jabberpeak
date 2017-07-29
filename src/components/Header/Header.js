import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';

import styles from './Header.css';

const Header = ({clips}) => (
  <div className={styles.bar}>
    <Link to='/search'>Search</Link>
    <Link to='/dashboard'>Dashboard</Link>
    {clips.map(clip => (
      <Link to={clip}>{clip}</Link>
    ))}
    <h3 className={styles.logout} onClick={() => {window.sessionStorage.clear();props.history.push('/');}}>
      Logout
    </h3>
  </div>
);

export default withRouter(Header);
