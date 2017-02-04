/* eslint-disable */
import React from 'react';
import Reveal from '../Reveal';
import LoginForm from '../auth/LoginForm';

var PostLink = React.createClass({
	render: function() {
		var postLink;

		if(this.props.userToken){
			postLink = <a onClick={this.props.handleClick} href={this.props.anchorHref || '#'}>{this.props.anchorText || 'Add Post ...'}</a>;
		}
		else{
			postLink = <a onClick={this.handleLoginClick} href={this.props.noUserAnchorHref || '#'}>{this.props.noUserAnchorText || 'Log In to Add Post ...'}</a>;
		}

		return(
			<div className="row">
				<div className="small-12 text-right columns">
					{postLink}
				</div>
				<Reveal ref="loginReveal" revealHeader="Log In" revealContent={<LoginForm reveal={this.refs.loginReveal} handleAuthorization={this.handleLoginAuthorization} />} />
			</div>
		);
	},
	handleLoginClick: function(e) {
		e.preventDefault();
		this.refs.loginReveal.handleClick(e);
	},
	handleLoginAuthorization: function(userData, component) {
		var self = this;

		if(userData && userData.success)
		{
			setTimeout(function() { 
				component.close();
				if(self.props.clearAuthMessage) {
					self.props.clearAuthMessage();
				}
			}, 500);
		}
	}
});

module.exports = PostLink;