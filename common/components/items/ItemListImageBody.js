/* eslint-disable */
var React = require('react');
var LabeledImage = require('../formatted-html/LabeledImage')

var ItemListImageBody = React.createClass({
	render: function() {
		var imagePath;
		var divStyle = {
			position: 'relative'
		};

		if(this.props.baseUrl && this.props.backgroundPath && this.props.size)
		{
			imagePath = this.props.baseUrl + this.props.size + this.props.backgroundPath;
		}
		else
		{
			imagePath = '/img/placeholder.jpg';
		}

		return (
	    		<div ref="mainDiv" style={divStyle}>
			      <LabeledImage 
			      	src={imagePath}
			      	title={this.props.title} />
		      </div>
		);
	}
});

module.exports = ItemListImageBody;