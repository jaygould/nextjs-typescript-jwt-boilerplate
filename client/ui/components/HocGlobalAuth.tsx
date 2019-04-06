import React, { Component } from 'react';
import { AuthConsumer } from '../services/auth.context';

const GlobalAuth = (AppComponent: any) =>
	class AppWrapComponent extends Component {
		constructor(props: any) {
			super(props);
			this.state = {};
		}
		componentDidMount() {}

		render() {
			return (
				<AuthConsumer>
					{context => <AppComponent {...this.props} globalAuth={context} />}
				</AuthConsumer>
			);
		}
	};

export default GlobalAuth;
