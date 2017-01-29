/* eslint-disable */
var React = require('react');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
import ItemList from '../../../components/items/ItemList'

var FilmGenreSection = React.createClass({
	render: function() {
		return(
  		<Row>
  			<Col sm={4}>
	    		<h5>Genres</h5>
	    	</Col>
	    	<Col sm={8}>
	      	<ItemList 
	      		config={this.props.config} 
	      		items={this.props.genres} 
	      		smallColumns={6} 
	      		mediumColumns={6} 
	      		largeColumns={6} 
	      		linkTo='Genre'
						urlFormat='{1}'
						backdrops={this.props.backdrops} />
	      </Col>
	    </Row>
    );
	}
});

module.exports = FilmGenreSection;