/* eslint-disable */
var React = require('react');

var GenreTitle = React.createClass({
	render: function() { 
		return (
		<div className="row">
			<div>
				<h1>{this.props.name}</h1>
			</div>
		</div>
	)}
});

module.exports = GenreTitle;