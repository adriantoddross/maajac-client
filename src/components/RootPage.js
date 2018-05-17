import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from '../components/Login';
import RegistrationForm from '../components/register';
import { closeDialog } from '../actions/modalActions';

import './css/rootpage.css';

class RootPage extends Component {
	handleCloseDialog() {
		this.props.dispatch(closeDialog());
	}

	render() {
		function getOS() {
			let userAgent = window.navigator.userAgent,
				platform = window.navigator.platform,
				macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
				windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
				iosPlatforms = ['iPhone', 'iPad', 'iPod'],
				os = null;

			if (macosPlatforms.indexOf(platform) !== -1) {
				os = 'Mac OS';
			} else if (iosPlatforms.indexOf(platform) !== -1) {
				os = 'iOS';
			} else if (windowsPlatforms.indexOf(platform) !== -1) {
				os = 'Windows';
			} else if (/Android/.test(userAgent)) {
				os = 'Android';
			} else if (!os && /Linux/.test(platform)) {
				os = 'Linux';
			}

			return os;
		}
		const os = getOS();
		if (this.props.currentUser && (os === 'Mac Os' || 'Windows' || 'Linux')) {
			return <Redirect to="/map" />;
		} else if (this.props.currentUser && (os === 'iOS' || 'Android')) {
			return <Redirect to="/report" />;
		}

		const linkStyle = {
			color: 'white',
			display: 'block',
			fontWeight: 'bold',
			fontSize: 16,
			textTransform: 'uppercase',
			textDecoration: 'none',
		};

		const getStartedStyle = {
			color: 'white',
			display: 'block',
			fontWeight: 'bold',
			fontSize: 24,
			textTransform: 'uppercase',
			textDecoration: 'none',
		};

		if (this.props.currentUser) {
			return <Redirect to="/map" />;
		}


		let modalForm;
		if (this.props.currentTab) {
			if (this.props.currentTab === 'signup') {
				modalForm = <RegistrationForm />;
			} else {
				modalForm = <LoginForm />;
			}
		}

		return (
			<div className="rootpage">
				<Dialog
					bodyClassName="modal"
					title="safeR"
					modal={false}
					autoScrollBodyContent={true}
					contentStyle={{ width: 300 }}
					open={this.props.dialog}
					onRequestClose={() => this.handleCloseDialog()}
				>
					{modalForm}
				</Dialog>
				<header className="header">
					<h1>
						safeR makes it easy to find out about crimes and incidents in your community.
					</h1>
				</header>
				<main>
					<div className="landing-container">
						<div className="landing-signup">
							<span className="landing-title">
								<h2>safeR makes it easy to find out about crimes and incidents in your community.</h2>
							</span>
							<Link to="/map" style={getStartedStyle}>
								<p>Get started &#8594;</p>
							</Link>
						</div>
					</div>
					<div className="feature-container">
						<div className="feature">
							<img src={writingImage} alt="Icon of user with a pen" />
							<h3>No registration required</h3>
							<p>
								View incident locations and descriptions without signing up. Always know what's going on
								in your neighborhood.
							</p>
						</div>
						<div className="feature">
							<img src={groupImage} alt="Icon of 3 users" />
							<h3>Community driven</h3>
							<p>
								Create an account to report incidents in your community and create a safer neighborhood
								for everyone.
							</p>
						</div>
						<div className="feature">
							<img src={anonymousUserImage} alt="Icon of user crossed out" />
							<h3>Anonymous and easy to use</h3>
							<p>
								We value the privacy of our users. Report incidents in your community easily with your
								private profile.
							</p>
							</div>
					<div className="feature-container">
						<div className="feature">
							<img src='https://res.cloudinary.com/adriantoddross/image/upload/v1526504536/user-9.svg' alt='null' />
							<h2>Discover Incidents</h2>
							<p>View a map of incident locations and descriptions without signing up. Always know what's going on in your neighborhood.</p>
						</div>
						<div className="feature">
							<img src='https://res.cloudinary.com/adriantoddross/image/upload/v1526504456/user-10.svg' alt="null" />
							<h2>Report An Incident</h2>
							<p>Create an account and report incidents anonymously to contribute to a safer community for everyone.</p>
						</div>
						<div className="feature">
							<img src='https://res.cloudinary.com/adriantoddross/image/upload/v1526504613/user-13.svg' alt="null" />
							<h2>Stay safeR</h2>
							<p>Add a profile picture or delete old incidents from your dashboard. It's up to you!</p>
						</div>
					</div>
					<div className='start-link'>
						<Link to="/map">
							<p>Get started &#8594;</p>
						</Link>
					</div>
				</main>
				<footer className="footer">
						<h3>Created by Team MAJAAC</h3>
					<ul className="footer-credits">
						<li>
							<a href="http://www.alishaantoinette.com/" target="_blank" rel="noopener noreferrer">
								Alisha Evans
							</a>
						</li>
						<li>
							<a href="http://www.christinamakes.com/" target="_blank" rel="noopener noreferrer">
								Christina Moore
							</a>
						</li>
						<li>
							<a href="https://aliahmad-code.github.io/" target="_blank" rel="noopener noreferrer">
								Ali Ahmad
							</a>
						</li>
						<li>
							<a href="http://Muaath-Alaraj.com" target="_blank" rel="noopener noreferrer">
								Muaath Alaraj
							</a>
						</li>
						<li>
							<a href="https://github.com/adriantoddross" target="_blank" rel="noopener noreferrer">
								Adrian Ross
							</a>
						</li>
					</ul>
						<h3>View on GitHub</h3>
					<div className="github-container">
						<a
							className="github-link"
							href="https://github.com/thinkful-ei18/maajac-client"
							target="_blank"
							rel="noopener noreferrer"
						>
							Client Repo
						</a>
						<a
							className="github-link"
							href="https://github.com/thinkful-ei18/majaac-server"
							target="_blank"
							rel="noopener noreferrer"
						>
							Server Repo
						</a>
					</div>
				</footer>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentTab: state.modal.currentTab,
	dialog: state.modal.dialog,
	currentUser: state.auth.currentUser ? state.auth.currentUser : 0,
});

export default connect(mapStateToProps)(RootPage);
