/* eslint-disable */
import React from 'react'
import { IndexLink, Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite'
import { Row, Col, Navbar, Nav, NavItem, MenuItem, Thumbnail, Modal } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import Reveal from './Reveal'
import LoginForm from './auth/LoginForm'
import SignupForm from './auth/SignupForm'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <Nav pullRight>
            <form className='navbar-form' role='search'>
              <div className='form-group form-group-sm'>
              <Typeahead
                options={['selected', 'option', 'thing', 'stuff', 'another', 'finally']}
              />
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
              </div>
            </form>
          </Nav>
          <Nav pullLeft>
            <LinkContainer to='/films'>
              <MenuItem eventKey={1.1}>Films</MenuItem>
            </LinkContainer>
            <LinkContainer to='/genres'>
              <MenuItem eventKey={1.2}>Genres</MenuItem>
            </LinkContainer>
            <LinkContainer to='/posts'>
              <MenuItem eventKey={1.3}>Posts</MenuItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
              <Reveal ref='loginReveal' revealHeader="Log In" revealContent={<LoginForm reveal={this.refs.loginReveal} handleAuthorization={this.handleLoginAuthorization} />} />
              <Reveal ref="signupReveal" revealHeader="Sign Up" revealContent={<SignupForm reveal={this.refs.signupReveal} handleAuthorization={this.handleLoginAuthorization} />} />
      </Navbar>
    );
  }

  onTypeaheadChange = (e) =>  {
    console.log(e); 
    return;
    var value = e.target.value;
    this.setInputValue(value);
    this.props.fetchFilmSearch(value, 1);
  }

  setInputValue = (value) => {
    console.log(value); 
    return;
    this.setState({ inputValue: value });
  }

  clearState = () => {
    return;
    this.setState({ inputValue: undefined })
    this.props.fetchFilmSearch(undefined);
  }

  onBlur = () => {
    return;
    this.setState({ selectedTitle: undefined });
  }

  optionChange = (event, optionData, index) => {
    console.log(event); 
    return;
    var title = index >= 0 ? optionData.original_title : undefined;
    this.setState({ selectedTitle: title })
  }

  handleSignoutClick = (e) => {
    console.log(e); 
    return;
    e.preventDefault();
    this.props.deleteAuthorization();
  }

  handleSignupClick = (e) => {
    e.preventDefault()
    this.refs.signupReveal.open();
  }

  handleLoginClick = (e) => {
    e.preventDefault();
    this.refs.loginReveal.handleClick(e);
  }

  handleLoginAuthorization = (userData, component) => {
    console.log(userData); 
    return;
    var self = this;

    if(userData && userData.success)
    {
      setTimeout(function() { 
        component.close();
        self.props.clearAuthMessage();
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

//export default TopNav
