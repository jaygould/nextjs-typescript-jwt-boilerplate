import React, { Component } from 'react';
import { IGlobalStatus } from '../types/global.types';

const StatusCtx = React.createContext<IGlobalStatus | null>(null);

class StatusProvider extends Component {
	state = {
		message: ''
	};
	render() {
		return (
			<StatusCtx.Provider
				value={{
					message: this.state.message,
					addMessage: message =>
						this.setState({
							message
						})
				}}
			>
				{this.props.children}
			</StatusCtx.Provider>
		);
	}
}
export default StatusProvider;
export const StatusConsumer = StatusCtx.Consumer;
