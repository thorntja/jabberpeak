'use strict';

import React from 'react';
import { render } from 'react-dom';

import App from './app/App';

import styles from './index.css';

// Needed for onTouchTap
// It's a mobile-friendly onClick() alternative for components in Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


// render the component
render(
	<App />,
	document.getElementById('root')
);
