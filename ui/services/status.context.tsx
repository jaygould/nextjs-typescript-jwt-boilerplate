import React, { Component } from 'react';
const StatusCtx = React.createContext({});

class StatusProvider extends Component {
	state = {
		message: null
	};
	render() {
		return (
			<StatusCtx.Provider
				value={{
					message: this.state,
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
