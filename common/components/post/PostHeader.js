/* eslint-disable */
import React from 'react'

var PostHeader = React.createClass({
	render: function() { 
		return (
			<h1>{this.props.headerContent}</h1>
		);
	}
});

module.exports = PostHeader;