import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import GoogleMapWrapper from './GoogleMapWrapper';
import ReportForm from './report';
import { closeDialog } from '../actions/modalActions';
import LoginForm from '../components/Login';
import RegistrationForm from '../components/register';

import './css/landingPage.css';

export class LandingPage extends Component {
	componentWillMount() {
		document.body.style.backgroundColor = 'white';
	}
	handleCloseDialog() {
		this.props.dispatch(closeDialog());
	}

	render() {

		let modalForm;
		if (this.props.currentTab) {
			if (this.props.currentTab === 'signup') {
				modalForm = <RegistrationForm />;
			} else {
				modalForm = <LoginForm />;
			}
		}

		return (
			<div className="landing-page">
				<Dialog
					bodyClassName="modal"
					title="safeR"
					modal={false}
					autoScrollBodyContent={true}
					contentStyle={{width: 300 }}
					open={this.props.dialog}
					onRequestClose={() => this.handleCloseDialog()}
				>
					{modalForm}
				</Dialog>

				<ReportForm/>
				<GoogleMapWrapper/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentTab: state.modal.currentTab,
	dialog: state.modal.dialog,
	currentUser: state.auth.currentUser ? state.auth.currentUser : '',
});

export default connect(mapStateToProps)(LandingPage);
