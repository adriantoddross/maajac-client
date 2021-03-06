import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Input from './input';
import { required, nonEmpty } from '../utils/validators';
import { login } from '../actions/userActions';
import { openSignUp, closeDialog } from '../actions/modalActions';

import './css/modal.css';

export class LoginForm extends Component {
	onLogin(values) {
		return this.props
			.dispatch(login(values.username, values.password))
			.then(() => this.props.dispatch(closeDialog()));
	}

	handleSignup() {
		this.props.dispatch(openSignUp());
	}

	render() {
		const { handleSubmit, pristine, submitting } = this.props;

		let errorMessage;
		if (this.props.error) {
			errorMessage = (
				<div className="form-error" aria-live="polite">
					{this.props.error}
				</div>
			);
		}

		// function viewPort(props) {
		// 	if (props) {
		// 		if (os === ('iOS' || 'Android')) {
		// 			// console.log('Mobile in here:', isMobile);
		// 			if (isMobile) {
		// 				return <Redirect to="/report" />;
		// 			}
		// 		} else {
		// 			return <Redirect to="/map" />;
		// 		}
		// 	}
		// }

		return (
			<div className="login">
				{/* // {viewPort(this.props.loggedIn)} */}
				{/* {this.props.loggedIn && (os === 'Android' || 'iOS') && !isMobile ? <Redirect to="/map" /> : ''}
				{this.props.loggedIn && (os === 'Windows' || 'Mac OS' || 'Linux') ? <Redirect to="/map" /> : ''} */}
				<form className="login-form" onSubmit={handleSubmit(values => this.onLogin(values))}>
					<div className="form-error" aria-live="polite">
						{errorMessage}
					</div>

					<label htmlFor="username">Username</label>
					<Field
						component={Input}
						placeholder="sally123"
						type="text"
						name="username"
						id="username"
						validate={[required, nonEmpty]}
					/>

					<label htmlFor="password">Password</label>
					<Field
						component={Input}
						placeholder="••••••••"
						type="password"
						name="password"
						id="password"
						validate={[required, nonEmpty]}
					/>
					<div className="button-group">
						<button className="form-primary-button form-button" disabled={pristine || submitting}>
							Log in
						</button>
						{/* <button className="form-register form-button" onClick={() => this.handleSignup()}>
              <span className="form-register-text">Sign up</span>
            </button> */}
					</div>
				</form>
			</div>
		);
	}
}

export const mapStateToProps = (state, props) => ({
	loggedIn: state.auth.currentUser !== null,
});

export default reduxForm({
	form: 'login',
})(connect(mapStateToProps)(LoginForm));
