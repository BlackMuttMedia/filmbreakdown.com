/* eslint-disable */
var React = require('react');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var FilmDetailItem = require('./FilmDetailItem');

var FilmDetailsList = React.createClass({
	render: function() {
		var items = this.getItems();

  	return (
  		<Row>
  			<Col sm={4}>
	    		<h5>{this.props.label}</h5>
	    	</Col>
	    	<Col sm={8}>
		      	{items}
	      </Col>
	    </Row>
    );
	},
	getItems: function() {
		var self = this;
		var details = (this.props.items ||[]).map(
			function(item){
				var urlKey = item.id + '-' + item.name;
				return <FilmDetailItem key={item.id} name={item.name} urlKey={urlKey} baseUrl={self.props.baseUrl} displayValue={item.displayValue} />;
		});

		return details;
	}
});

module.exports = FilmDetailsList;