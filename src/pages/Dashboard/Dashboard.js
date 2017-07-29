import React, { Component } from 'react';

import { Link } from 'react-router-dom';

const Dashboard = () => (
  <div>
    <Link to='/search?r=users'>
      Users (r)
    </Link>
    <br /><br />
    <Link to='/search?r=users&q=admin'>
      Users (r&q)
    </Link>
    <br /><br />
    <Link to='/search?r=properties'>
      Properties (r)
    </Link>
    <br /><br />
    <Link to='/resources'>
      Add A New Resource
    </Link>
    <br /><br />
    <Link to='/users/add'>
      Add User (Link)
    </Link>
    <br /><br />
    <Link to='/properties/add'>
      Add Property (Link)
    </Link>
  </div>
);

export default Dashboard;
