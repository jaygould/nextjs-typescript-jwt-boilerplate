import React, { Component } from 'react';
import { StatusConsumer } from '../services/status.context';

const GlobalStatus = (AppComponent: any) =>
	class AppWrapComponent extends Component {
		constructor(props: any) {
			super(props);
			this.state = {};
		}
		componentDidMount() {}

		render() {
			return (
				<StatusConsumer>
					{context => <AppComponent {...this.props} globalStatus={context} />}
				</StatusConsumer>
			);
		}
	};

export default GlobalStatus;
