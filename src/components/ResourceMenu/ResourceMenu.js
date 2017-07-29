import React from 'react';

import { Link } from 'react-router-dom';

import styles from './ResourceMenu.css';

const ResourceMenu = ({searchAPI}) => (
  <div>
    <Link to='/search?r=users'><div onClick={() => searchAPI('/search?r=users')}>View Users</div></Link>
    <Link to='/search?r=properties'><div onClick={() => searchAPI('/search?r=properties')}>View Properties</div></Link>
  </div>
)

export default ResourceMenu;
