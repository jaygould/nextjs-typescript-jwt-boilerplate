import React, { Component } from 'react';

interface IGlobalStatus {
	message: string;
	addMessage: (message: string) => any;
}
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
