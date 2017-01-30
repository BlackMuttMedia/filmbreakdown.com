/* eslint-disable */
import React, { PropTypes } from 'react'
import { provideHooks } from 'redial'
import {connect} from 'react-redux'
import Router, { Route, RouteHandler, Link, DefaultRoute } from 'react-router'
import { Dropdown, MenuItem, Form, FormGroup, FormControl, Button, Row	, Col, SafeAnchor, Alert } from 'react-bootstrap'
import { selectAuth, selectIsLoggedIn, selectCurrentUser } from '../../reducers/auth'
import { logIn } from './actions'

const redial = {
  //fetch: ({ dispatch, params: { slug } }) => dispatch(loadGenre(slug))
}

const mapStateToProps = state => ({
  currentAuthorization: selectAuth(state)
  // currentAuthorization: state.get('currentAuthorization'),
  // config: state.get('config'),
})

class LoginFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { alertVisible: false, alertMessage: undefined, alertStyle: 'success' };
  }

  render() {
  	var preventDefault = function(e) { e.preventDefault(); }
  	var topMargin = {
  		marginTop: "5"
  	};

  	var padded = {
  		padding: "3"
  	};

    return (
			<Row>
				<Col sm={12}>
					{this.props.currentAuthorization 
						&& this.props.currentAuthorization.message ?
					<Row >
						<Col sm={12}>
							<Alert 
								bsSize="xsmall" 
								bsStyle={this.props.currentAuthorization.isValid ? "success" : "danger"}>
									{this.props.currentAuthorization.message}
								</Alert>
						</Col>
					</Row>
					: null }
					<Row>
						<Col sm={12}>
							<Form horizontal onSubmit={this.authenticate}>
                <Col sm={12}>
                  <FormGroup>
                    <FormControl type='text' bsSize="medium" placeholder='Username' type='text' inputRef={ref => { this.username = ref }} />
                  </FormGroup>
                  <FormGroup>
    								<FormControl type='text' bsSize="medium" placeholder='Password' type='password' inputRef={ref => { this.password = ref }} />
                  </FormGroup>
                  <FormGroup>
    								<Button type="submit">Log In</Button>
                  </FormGroup>
                </Col>
							</Form>
						</Col>
					</Row>
				</Col>
			</Row>
    )
  }

  authenticate = (e) => {
  	e.preventDefault();

    const{dispatch} = this.props;
  	dispatch(logIn(this.username.value, this.password.value, this.handleAuthorization))
  }

  handleAuthorization = (userData) => {
  	if(this.props.handleAuthorization){
  		this.props.handleAuthorization(userData, this.props.reveal);
  	}
  }
}

export default provideHooks(redial)(connect(mapStateToProps)(LoginFormComponent))