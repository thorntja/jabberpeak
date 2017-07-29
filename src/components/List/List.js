import React from 'react';

import { Link } from 'react-router-dom';

const List = (props) => (
  <div style={{width: '70%', margin: '0 auto', marginTop: 30, height: '20em'}}>
    <ul>
      {props.tiles.map((tile) => (
        <div key={tile['_id']}><Link to={'/'+tile['type']+'/'+tile['_id']}>{tile[Object.keys(tile)[1]]}</Link><h1>{tile['type']}</h1><h1 style={{float: 'right'}} onClick={(e) => console.log(e)}>Copy</h1></div>
      ))}
    </ul>

  </div>
)

export default List;
