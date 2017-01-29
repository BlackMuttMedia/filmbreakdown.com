/* eslint-disable */
var React = require('react');
import _ from 'lodash'

var Background = React.createClass({
	render: function() {
		var backgroundStyle = {
			position: "absolute",
			left: "0px",
			height: "100%",
			width: "100%",
			opacity: "0.4", 
			backgroundSize: "cover", 
			backgroundRepeat: "no-repeat",
		};

		if(this.props.backgroundPath && this.props.config)
		{
			var baseUrl = this.props.config.images.base_url;
			var backdropSize = _.last(this.props.config.images.backdrop_sizes);
			backgroundStyle.backgroundImage = 'url(' + baseUrl + backdropSize + this.props.backgroundPath + ')';
		}

		return(
			<div style={backgroundStyle}></div>
		);
	}
});

module.exports = Background;