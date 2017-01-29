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
//import authSelector from '../../flux/selectors/authSelector';

//var LoginFormComponent = React.createClass({
var LoginForm = React.createClass({
	getInitialState: function() {
		return { alertVisible: false, alertMessage: undefined, alertStyle: 'success' };
	},
  render: function(){
  	var preventDefault = function(e) { e.preventDefault(); }
  	var topMargin = {
  		marginTop: "5"
  	};

  	var padded = {
  		padding: "3"
  	};

  	// console.log((this.props.currentAuthorization || Map()).toJS());
    return (
			<Row>
				<Col sm={12}>
					{this.props.currentAuthorization 
						&& this.props.currentAuthorization.get
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
							<Form onSubmit={this.authenticate}>
								<FormControl type='text' bsSize="medium" placeholder='Username' type='text' ref='username' />
								<FormControl type='text' bsSize="medium" placeholder='Password' type='password' ref='password' />
								<Button type="submit">Log In</Button>
							</Form>
						</Col>
					</Row>
				</Col>
			</Row>
    )
  },
  authenticate: function(e) {
  	e.preventDefault();
  	var user = this.refs.username.getValue();
  	var password = this.refs.password.getValue();

  	this.props.logIn(user, password, this.handleAuthorization);
  },
  handleAuthorization: function(userData) {
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

//var LoginForm = connect(mapStateToProps, actionCreators)(LoginFormComponent);
module.exports = LoginForm;