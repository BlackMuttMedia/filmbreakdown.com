/* eslint-disable */
import React, { PropTypes } from 'react'
import { provideHooks } from 'redial'
import {connect} from 'react-redux'
import { IndexLink, Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite'
import { Row, Col, FormGroup, Navbar, Nav, NavItem, MenuItem, Thumbnail, Modal } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import Reveal from './Reveal'
import LoginForm from './auth/LoginForm'
import SignupForm from './auth/SignupForm'
import { selectAuth, selectIsLoggedIn, selectCurrentUser } from '../reducers/auth'
import { clearAuthMessage, deleteAuthorization } from './auth/actions'

const redial = {
  //fetch: ({ dispatch, params: { slug } }) => dispatch(loadGenre(slug))
}

const mapStateToProps = state => ({
  currentAuthorization: selectAuth(state),
  isLoggedIn: selectIsLoggedIn(state),
  currentUser: selectCurrentUser(state)
    // currentAuthorization: state.get('currentAuthorization'),
    // config: state.get('config'),
})

class TopNavComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return(
      <Navbar className={css(styles.navbarStyle)} bsSize='small' staticTop inverse>
        <Navbar.Header>
          <Navbar.Brand><Link to='/'>Film Breakdown</Link></Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.props.isLoggedIn ? <NavItem eventKey={4} href='#' onClick={this.handleSignoutClick}>Sign Out</NavItem> : null}
            {this.props.isLoggedIn ? null : <NavItem eventKey={3} href='#' onClick={this.handleLoginClick}>Log In</NavItem>}
            {this.props.isLoggedIn ? null : <NavItem eventKey={4} href='#' onClick={this.handleSignupClick}>Sign Up</NavItem>}
          </Nav>
          <Navbar.Form pullRight>
            <FormGroup>
              <Typeahead
                options={['selected', 'option', 'thing', 'stuff', 'another', 'finally']} />
              {/*<Typeahead 
                className='input-group-sm input-group'
                placeholder='Search for films ...'
                onChange={this.onTypeaheadChange} 
                onBlur={this.onBlur}
                onOptionClick={this.clearState}
                onOptionChange={this.optionChange}
                options={(this.props.searchResults || List()).take(10).toJS()} 
                optionTemplate={SearchTemplate}
                inputValue={this.state.selectedTitle || this.state.inputValue} />*/}
            </FormGroup>
          </Navbar.Form>
          <Nav pullLeft>
            <LinkContainer to='/films'><NavItem>Films</NavItem></LinkContainer>
            <LinkContainer to='/genres'><NavItem>Genres</NavItem></LinkContainer>
            <LinkContainer to='/posts'><NavItem>Posts</NavItem></LinkContainer>
          </Nav>
        </Navbar.Collapse>
              <Reveal ref='loginReveal' revealHeader="Log In" revealContent={<LoginForm reveal={'loginReveal'} handleAuthorization={this.handleLoginAuthorization} />} />
              <Reveal ref='signupReveal' revealHeader='Sign Up' revealContent={<SignupForm reveal={this.refs.signupReveal} handleAuthorization={this.handleLoginAuthorization} />} />
      </Navbar>
    );
  }

  onTypeaheadChange = (e) =>  {
    var value = e.target.value;
    this.setInputValue(value);
    this.props.fetchFilmSearch(value, 1);
  }

  setInputValue = (value) => {
    this.setState({ inputValue: value });
  }

  clearState = () => {
    this.setState({ inputValue: undefined })
    this.props.fetchFilmSearch(undefined);
  }

  onBlur = () => {
    this.setState({ selectedTitle: undefined });
  }

  optionChange = (event, optionData, index) => {
    var title = index >= 0 ? optionData.original_title : undefined;
    this.setState({ selectedTitle: title })
  }

  handleSignoutClick = (e) => {
    e.preventDefault();
    this.props.dispatch(deleteAuthorization())
  }

  handleSignupClick = (e) => {
    e.preventDefault()
    this.refs.signupReveal.open();
  }

  handleLoginClick = (e) => {
    e.preventDefault();
    this.refs.loginReveal.handleClick(e);
  }

  handleLoginAuthorization = (userData, componentName) => {
    var self = this;
    var component = this.refs[componentName]
    if(userData && userData.success)
    {
      setTimeout(function() { 
        component.close()

        self.props.dispatch(clearAuthMessage())
      }, 500);
    }
  }

  preventDefault = function (e) { e.preventDefault() }
}

const styles = StyleSheet.create({
  link: {
    maxWidth: 700,
    color: '#999',
    margin: '1.5rem 1rem 1.5rem 0',
    display: 'inline-block',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.6
    }
  },
  navbarStyle: {
    marginBottom: '0px'
  },
  activeLink: {
    color: '#000'
  }
})

export default provideHooks(redial)(connect(mapStateToProps)(TopNavComponent))
