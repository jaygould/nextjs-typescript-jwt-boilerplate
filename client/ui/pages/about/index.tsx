const css = require('./index.scss');

import PageContent from '../../components/PageContent';

import * as React from 'react';

function About() {
	return (
		<PageContent>
			<h2 className={css.example}>About!</h2>
		</PageContent>
	);
}

export default About;
