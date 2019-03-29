import * as React from 'react';
import Header from '../../components/head';
const css = require('./index.scss');

function Dashboard() {
	return (
		<div>
			<Header />
			<h2 className={css.example}>Dash!</h2>
			<div />
		</div>
	);
}

Dashboard.getInitialProps = async () => {
	return {};
};

export default Dashboard;
