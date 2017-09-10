/* eslint-disable */
var React = require('react');
var ElementSummaryReveal = require('../Element/ElementSummaryReveal');
var ElementButtonList = require('../Element/ElementButtonList');
var AddPlaceholder = require('../PlaceHolders/AddPlaceholder');
var Reveal = require('../Reveal');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var PlaceHolderGenreConversation = React.createClass({
	render: function() {
		var categoryHeaderStyle = {
			fontWeight: 'bold'
		};

		var buttonStyle = {
			padding: '8px;'
		};

		var revealStyle = {
			color: '#666666'
		};

		var addContent = <AddPlaceholder />;

		return( 
			<div>
				<ElementButtonList heading="Atmosphere" items={['Bleak', 'Dark', 'Chilling', 'Ugly', 'Scary']} /> 
				<ElementButtonList heading="Stock Characters" items={['Detective', 'Goofy Sidekick', 'Femme Fatale', 'Corrupt Police Officer', 'Anti-Hero']} /> 
				<ElementButtonList heading="Techniques" items={['Long Take', 'Dutch Angle', 'Low Angle', 'Backlighting', 'Establishing Shots']} /> 
				<Row>
					<Col sm={12} className="text-right">
						<a onClick={this.handleAddClick} style={revealStyle} href="#">Add more ...</a>
					</Col>
				</Row>
				<Reveal ref="addReveal" revealHeader="Add New Things" revealContent={this.props.addContent || addContent} />
			</div>
		);
	},
	handleAddClick: function(e) {
		this.refs.addReveal.handleClick(e);
		e.preventDefault();
	}
});

module.exports = PlaceHolderGenreConversation;