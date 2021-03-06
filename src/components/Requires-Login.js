import React from 'react';
import { connect } from 'react-redux';

export default () => Component => {
	function RequiresLogin(props) {
		const { authenticating, loggedIn, error, ...passThroughProps } = props;
		// if (authenticating) {
		// 	return <div>Logging in...</div>;
		// } else if (!loggedIn || error) {
		// 	return <Redirect to="/map" />;
		// }

		return <Component {...passThroughProps} />;
	}

	const displayName = Component.displayName || Component.name || 'Component';
	RequiresLogin.displayName = `RequiresLogin(${displayName})`;

	const mapStateToProps = (state, props) => ({
		authenticating: state.auth.loading,
		loggedIn: state.auth.currentUser !== null,
		error: state.auth.error,
	});

	return connect(mapStateToProps)(RequiresLogin);
};
