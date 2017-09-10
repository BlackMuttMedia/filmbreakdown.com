/* eslint-disable */
var React = require('react');
var PostDisplay = require('../Post/PostDisplay');
var Reveal = require('../Reveal');

var ElementSummaryReveal = React.createClass({
	render: function(){
		var revealContent = 
			<div>
				<h2>Summary</h2>
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
			</div>;

		return (
			<Reveal ref='foundationReveal' revealContent={revealContent} revealStyle={this.props.revealStyle} />
		);
	},
	handleClick: function(e) {
		this.refs['foundationReveal'].handleClick(e);
	}
});

module.exports = ElementSummaryReveal;