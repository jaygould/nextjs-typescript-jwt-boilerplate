import React, { Component } from 'react';
import { IGlobalAuth } from '../types/global.types';

import AuthService from './auth.service';

const AuthCtx = React.createContext<IGlobalAuth | null>(null);

class AuthProvider extends Component {
	state = {
		isLoggedIn: false,
		email: null
	};

	componentDidMount() {
		// localstorage only exists on client side, so only update here
		this.setState({
			isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')),
			email: localStorage.getItem('email')
		});
	}

	render() {
		return (
			<AuthCtx.Provider
				value={{
					isLoggedIn: this.state.isLoggedIn,
					email: this.state.email,
					addUserDetails: user => {
						this.setState(
							{
								isLoggedIn: true,
								email: user.email
							},
							() => {
								if (localStorage) {
									localStorage.setItem('isLoggedIn', JSON.stringify('true'));
									localStorage.setItem('email', user.email);
								}
							}
						);
					},
					logout: () => {
						this.setState(
							{
								isLoggedIn: false,
								email: null
							},
							() => {
								AuthService.logout();
								localStorage.removeItem('isLoggedIn');
								localStorage.removeItem('email');
							}
						);
					}
				}}
			>
				{this.props.children}
			</AuthCtx.Provider>
		);
	}
}
export default AuthProvider;
export const AuthConsumer = AuthCtx.Consumer;
