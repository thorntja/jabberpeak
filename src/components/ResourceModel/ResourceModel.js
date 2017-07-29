import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const ResourceModel = (props) => {

  const handleChange = (e) => {
    props.getLabel(e)
  }

  return(
    <div>
    <input type='text' onChange={handleChange} value={props.name} name='name' placeholder='Enter resource name' />
    <ol>
      <li><input type='text' onChange={handleChange} value={props.input1} name='input1' /></li>
      <li><input type='text' onChange={handleChange} value={props.input2} name='input2' /></li>
      <li><input type='text' onChange={handleChange} value={props.input3} name='input3' /></li>
      <li><input type='text' onChange={handleChange} value={props.input4} name='input4' /></li>
      <li><input type='text' onChange={handleChange} value={props.input5} name='input5' /></li>
    </ol>
  </div>
  );
};

export default ResourceModel;
