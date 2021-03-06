import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { clearAuth } from '../actions/userActions';
import { clearUserCredentials, clearAuthToken } from '../local-storage';
import { openSignUp, openLogin, openDialog, closeDialog } from '../actions/modalActions';
import { login } from '../actions/userActions';
// import Menu from '../components/dropdownMenu';

// styles

import './css/navbar.css';

export class Navbar extends Component {
	constructor() {
		super();

		this.state = {
			showMenu: false,
		};

		this.showMenu = this.showMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.logout = this.logout.bind(this);
	}

	showMenu(event) {
		event.preventDefault();

		this.setState({ showMenu: true }, () => {
			document.addEventListener('click', this.closeMenu);
		});
	}

	closeMenu() {
		this.setState({ showMenu: false }, () => {
			document.removeEventListener('click', this.closeMenu);
		});
	}

	logout() {
		clearAuthToken();
		clearUserCredentials();
		this.props.dispatch(clearAuth());
		this.props.dispatch(closeDialog());
	}

	signUp() {
		// todo: signup data flow
		this.props.dispatch(openDialog());
		this.props.dispatch(openSignUp());
	}
	logIn(data) {
		//todo: log in data flow
		this.props.dispatch(openDialog());
		this.props.dispatch(openLogin());
	}

	render() {
		let loggedInNavbar;

		if (this.props.loggedIn) {
			loggedInNavbar = (
				<button className="report-button-large" onClick={this.showMenu}>
					<div className="navbar-flex">
						<img
							src={
								this.props.profilePicture ||
								'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
							}
							alt="user profile icon"
							className="small-profile-nav"
						/>
						<p>Menu</p>
						<div className="nav-arrow">&#x25BC;</div>
					</div>
				</button>
			);
		} else {
			loggedInNavbar = (
				<div>
					<button className="signin" onClick={() => this.props.dispatch(login('pizzadev123', 'thinkful2018'))}>
						Demo
					</button>
					<button className="signup" onClick={() => this.signUp()}>
						Sign Up
					</button>
					<button className="signin" onClick={() => this.logIn()}>
						Log In
					</button>
				</div>
			);
		}
		return (
			<div>
				<nav className="navbar">
					<span className="home">
						<NavLink className="logo" to="/">
							safeR
						</NavLink>
					</span>
					{loggedInNavbar}
					{this.state.showMenu ? (
						<div className="dropdown-menu">
							<Link to="/">Map</Link>
							<Link to="/dashboard">Dashboard</Link>
							<Link to="/about">About</Link>
							<button className="navbar-link" onClick={this.logout}>
								{' '}
								Logout{' '}
							</button>
						</div>
					) : null}
				</nav>
			</div>
		);
	}
}

export const mapStateToProps = (state, props) => ({
	loggedIn: state.auth.currentUser !== null,
	currentUser: state.auth.currentUser ? state.auth.currentUser : '',
	profilePicture:
		state.auth.currentUser !== null
			? state.auth.currentUser.profilePicture
			: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
});

export default connect(mapStateToProps)(Navbar);
