/* eslint-disable */
var React = require('react');
var LabeledImageTitle = require('./LabeledImageTitle');

var LabeledImage = React.createClass({
	getInitialState: function() {
		var imageStyle = {
			zIndex: -1,
			borderRadius: "3px",
			border: "solid 4px #FFFFFF",
			maxWidth: "100%",
			minWidth: "100%",
			minHeight: "100%"
		};
		if(this.props.maxHeight) {
			imageStyle.maxHeight = this.props.maxHeight;
		}

		if(this.props.minHeight) {
			imageStyle.minHeight = this.props.minHeight;
		}

		imageStyle.opacity = this.props.fullOpacity ? 1 : .6;

		var divStyle = {
			position: "relative",
			minWidth: "100%",
			minHeight: "100%",
		};

		var photoStyle = {
			backgroundColor: "rgb(70,70,70)",
			position: "relative",
			margin: "0 auto",
			display: "table",
			minWidth: '100%',
			minHeight: "100%",
		};

		var titleStyle = {
			position: 'absolute',
			bottom: '4px',
			left: '4px',
			right: '4px',
			padding: '0.4rem',
			background: 'rgba(0, 0, 0, 0.7)',
			color: '#FFFFFF'
		};

		return { imageStyle: imageStyle, divStyle: divStyle, titleStyle: titleStyle, photoStyle: photoStyle };
	},
	render: function() {
		return (
			<div style={this.state.divStyle}>
				<div style={this.state.photoStyle}>
					<img style={this.state.imageStyle} onMouseLeave={this.__onMouseLeave} 
							onMouseEnter={this.__onMouseEnter} src={this.props.src}
							ref="image" />
					{ this.props.title ? <LabeledImageTitle titleStyle={this.state.titleStyle} title={this.props.title} /> : null }
				</div>
			</div>
		);
	},
	__onMouseEnter: function() {
		var imageStyle = {
			...this.state.imageStyle,
			opacity: 1}

		this.setState({ imageStyle: imageStyle });
	},
	__onMouseLeave: function() {
		var imageStyle = {
			...this.state.imageStyle,
			opacity: this.props.fullOpacity ? 1 : .6}

		this.setState({ imageStyle: imageStyle });
	}
});

module.exports = LabeledImage;