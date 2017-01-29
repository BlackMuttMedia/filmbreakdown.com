var React = require('react');
import {connect} from 'react-redux';
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute; 
var Dropdown = require('react-bootstrap/lib/Dropdown');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var SafeAnchor = require('react-bootstrap/lib/SafeAnchor');
var Alert = require('react-bootstrap/lib/Alert');
import * as actionCreators from '../../flux/action_creators';
import {Map} from 'immutable';
import SignupForm from './SignupForm';
import Reveal from '../Reveal';
var NavItem = require('react-bootstrap/lib/NavItem');

var SignupLinkComponent = React.createClass({
	render: function() {
		return (
			<span>
				<a onClick={this.handleSignupClick} href="#">Sign Up</a>
				<Reveal ref="signupReveal" revealContent={<SignupForm />} />
			</span>
		);
	},
	handleSignupClick: function(e) {
		this.refs.signupReveal.handleClick(e);
		e.preventDefault();
	}
});

function mapStateToProps(state) {
  return {
    currentAuthorization: state.get('currentAuthorization'),
    config: state.get('config'),
  };
}

var SignupLink = connect(mapStateToProps, actionCreators)(SignupLinkComponent);
module.exports = SignupLink;
