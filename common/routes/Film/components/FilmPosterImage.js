/* eslint-disable */
var React = require('react');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var LabeledImage = require('../../../components/formatted-html/LabeledImage')

var FilmPosterImage = React.createClass({
	render: function() {
		var image;
		var posterStyle = {
			marginTop: "20px",
		};

		if(this.props.baseUrl && this.props.posterPath)
		{
			image = <LabeledImage fullOpacity src={this.props.baseUrl + 'w154' + this.props.posterPath} />;
		}
		return (
	    <Col sm={3}>
	    	<Row>
	    		<Col sm={12}>
		    		<div style={posterStyle}>
				      {image}
			      </div>
		      </Col>
	      </Row>
	    </Col>
		);
	}
});

module.exports = FilmPosterImage;