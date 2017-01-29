/* eslint-disable */
var React = require('react');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var FilmDetailItem = React.createClass({
	render: function() {
		var detailItem;
		var label = this.props.displayValue || this.props.name;

		if(this.props.baseUrl)
		{
			var urlKey = getUrlKey((this.props.urlKey || this.state.key));
			var fullUrl = this.props.baseUrl + urlKey;
			detailItem = <a href={fullUrl}>{label}</a>;
		}
		else
		{
			detailItem = label;
		} 

		return(
			<Row>
				<Col sm={12}>
					{detailItem}
				</Col>
			</Row>
		);
	}
});

module.exports = FilmDetailItem;