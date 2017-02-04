/* eslint-disable */
var React = require('react');
import {Row, Col, FormControl } from 'react-bootstrap';

var PostForm = React.createClass({
	getInitialState: function() {
		return { postValue: '' };
	},
	render: function() {
		var linkAlign = {
			textAlign: 'right'
		};

		return(
			<Row>
				<Col sm={12}>
					<Row>
						<Col sm={12}>
							<FormControl autoFocus componentClass="textarea" value={this.state.postValue} ref="postContent" onChange={this.handleChange} placeholder={this.props.placeholderText} />
						</Col>
					</Row>
					<Row>
						<Col sm={12} style={linkAlign}>
							<a onClick={this.handleSubmit} href="#">{this.props.postText || 'Post'}</a>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	},
	handleSubmit: function(e) {
		e.preventDefault();
		this.props.handlePost(e, this.state.postValue );
	},
	handleChange: function(e) {
		this.setState({ postValue: e.target.value/*.trim()*/ });
	}
});

module.exports = PostForm;