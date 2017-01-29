/* eslint-disable */
var React = require('react');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var FilmOverview = React.createClass({
	render: function() { 
		return <p>{this.props.overviewText}</p>;
	}
});

module.exports = FilmOverview;