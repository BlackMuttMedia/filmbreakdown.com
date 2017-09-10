/* eslint-disable */
import React from 'react'
import ElementSummaryReveal from '../Element/ElementSummaryReveal'
import ElementButtonList from '../Element/ElementButtonList'
import AddPlaceholder from '../PlaceHolders/AddPlaceholder'
import Reveal from '../Reveal'
import { Col, Row, DropdownButton, MenuItem } from 'react-bootstrap'

class PlaceHolderGenreConversation extends React.Component {
	render() {
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
	}

	handleAddClick(e) {
		this.refs.addReveal.handleClick(e);
		e.preventDefault();
	}
}

export default PlaceHolderGenreConversation;