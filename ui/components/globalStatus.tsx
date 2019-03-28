import React, { Component } from 'react';
import { StatusConsumer } from '../services/status.context';

const GlobalStatus = AppComponent =>
	class AppWrapComponent extends Component {
		constructor(props) {
			super(props);
			this.state = {};
		}
		componentDidMount() {}

		render() {
			return (
				<StatusConsumer>
					{context => <AppComponent globalStatus={context} />}
				</StatusConsumer>
			);
		}
	};

export default GlobalStatus;
