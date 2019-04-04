import * as React from 'react';

import PageContent from '../../components/PageContent';

const css = require('./index.scss');

function Dashboard() {
	return (
		<PageContent>
			<h2 className={css.example}>Dash!</h2>
		</PageContent>
	);
}

Dashboard.getInitialProps = async () => {
	return {};
};

export default Dashboard;
