import React from 'react';

import { Link } from 'react-router-dom';

import UserForm from '../../components/Forms/UserForm';
import PropertyForm from '../../components/Forms/PropertyForm';

import styles from './Form.css';

const Form = (props) => (
      <div className={styles.form_container}>
        <Link to='/dashboard'>X</Link>
        <div className={styles.form}>
          {props.match.params.resource == 'users' ?
            <UserForm />
          :
            <PropertyForm />
          }
        </div>
      </div>
);

export default Form;
