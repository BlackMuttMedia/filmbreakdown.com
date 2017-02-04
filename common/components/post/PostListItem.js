/* eslint-disable */
var React = require('react');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Panel = require('react-bootstrap/lib/Panel');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var PostListItem = React.createClass({
	render: function() {
		return(
			<Row>
				<Col sm={12}>
					<p>{this.props.itemContent}</p>
					{ this.props.showSeparator == true ? <hr /> : null }
				</Col>
			</Row>
		);
	}
});

module.exports = PostListItem;