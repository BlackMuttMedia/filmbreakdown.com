/* eslint-disable */
import { provideHooks } from 'redial'
import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import Router, { Route, RouteHandler, Link, DefaultRoute } from 'react-router'
import { Dropdown, MenuItem, Form, FormGroup, FormControl, Button, Row	, Col, SafeAnchor, Alert } from 'react-bootstrap'
import { saveUser } from './actions'
import { selectAuth } from '../../reducers/auth'

const redial = {
  //fetch: ({ dispatch, params: { slug } }) => dispatch(loadGenre(slug))
}

const mapStateToProps = state => ({
  auth: selectAuth(state)
    // currentAuthorization: state.get('currentAuthorization'),
    // config: state.get('config'),
})

class SignupFormComponent extends React.Component {
	render() {
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
							<Form horizontal onSubmit={this.signup}>
								<Col sm={12}>
									<FormGroup>
										<FormControl bsSize="medium" placeholder='First Name' type='text' inputRef={ref => { this.firstName = ref }} />
                  </FormGroup>
                  <FormGroup>
										<FormControl bsSize="medium" placeholder='Last Name' type='text' inputRef={ref => { this.lastName = ref }} />
                  </FormGroup>
                  <FormGroup>
										<FormControl bsSize="medium" placeholder='Email Address' type='text' inputRef={ref => { this.email = ref }} />
                  </FormGroup>
                  <FormGroup>
										<FormControl bsSize="medium" placeholder='Username' type='text' inputRef={ref => { this.username = ref }} />
                  </FormGroup>
                  <FormGroup>
										<FormControl bsSize="medium" placeholder='Password' type='password' inputRef={ref => { this.password = ref }} />
                  </FormGroup>
                  <FormGroup>
										<FormControl bsSize="medium" placeholder='Confirm Password' type='password' inputRef={ref => { this.confirm = ref }} />
                  </FormGroup>
                  <FormGroup>
										<Button type="submit">Sign Up</Button>
									</FormGroup>
								</Col>
							</Form>
						</Col>
					</Row>
				</Col>
			</Row>
		)
	}

  signup = (e) => {
  	e.preventDefault();
  	var user = {};
  	user.firstName = this.firstName.value
  	user.lastName = this.lastName.value
  	user.email = this.email.value
  	user.username = this.username.value
  	user.password = this.password.value
  	user.confirm = this.confirm.value

  	const{dispatch} = this.props;
  	dispatch(saveUser(user, this.handleSignup))
  }

  handleSignup = (userData) => {
  	console.log(this.props);
  	if(this.props.handleAuthorization){
  		this.props.handleAuthorization(userData, this.props.reveal);
  	}
  }
}

module.exports = provideHooks(redial)(connect(mapStateToProps)(SignupFormComponent))
