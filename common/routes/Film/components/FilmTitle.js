/* eslint-disable */
var React = require('react');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var FilmTitle = React.createClass({
	render: function() { 
		var floatLeft = {
			float: "left",
		};

		return (
		<Row>
			<Col sm={12}>
				<h1 style={floatLeft}>{this.props.titleText} <small>({this.props.year})</small></h1>
			</Col>
		</Row>
	)}
});

module.exports = FilmTitle;