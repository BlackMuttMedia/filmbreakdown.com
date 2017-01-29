/* eslint-disable */
var React = require('react');
import {connect} from 'react-redux';
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute; 
import { Dropdown, MenuItem, Form, FormControl, Button, Row	, Col, SafeAnchor, Alert } from 'react-bootstrap';
//import * as actionCreators from '../../flux/action_creators';

//var SignupFormComponent = React.createClass({
var SignupForm = React.createClass({
	render: function() {
		return(
			<Row>
				<Col sm={12}>
					{this.props.currentAuthorization 
						&& this.props.currentAuthorization.get('message') ?
					<Row >
						<Col sm={12}>
							<Alert 
								bsSize="xsmall" 
								bsStyle={this.props.currentAuthorization.get('isValid') ? "success" : "danger"}>
									{this.props.currentAuthorization.get('message')}
								</Alert>
						</Col>
					</Row>
					: null }
					<Row>
						<Col sm={12}>
							<Form onSubmit={this.signup}>
								<FormControl bsSize="medium" placeholder='First Name' type='text' ref='firstName' />
								<FormControl bsSize="medium" placeholder='Last Name' type='text' ref='lastName' />
								<FormControl bsSize="medium" placeholder='Email Address' type='text' ref='email' />
								<FormControl bsSize="medium" placeholder='Username' type='text' ref='username' />
								<FormControl bsSize="medium" placeholder='Password' type='password' ref='password' />
								<FormControl bsSize="medium" placeholder='Confirm Password' type='password' ref='confirm' />
								<Button type="submit">Sign Up</Button>
							</Form>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	},
  signup: function(e) {
  	e.preventDefault();
  	var user = {};
  	user.firstName = this.refs.firstName.getValue();
  	user.lastName = this.refs.lastName.getValue();
  	user.email = this.refs.email.getValue();
  	user.username = this.refs.username.getValue();
  	user.password = this.refs.password.getValue();
  	user.confirm = this.refs.confirm.getValue();

  	this.props.saveUser(user, this.handleSignup);
  },
  handleSignup: function(userData) {
  	console.log(this.props);
  	if(this.props.handleAuthorization){
  		this.props.handleAuthorization(userData, this.props.reveal);
  	}
  }
});

function mapStateToProps(state) {
  return {
    currentAuthorization: state.get('currentAuthorization'),
    config: state.get('config'),
  };
}

//var SignupForm = connect(mapStateToProps, actionCreators)(SignupFormComponent);
module.exports = SignupForm;
