/* eslint-disable */
import React from 'react'
import Reveal from '../Reveal'
import PlaceHolderGenreConversation from '../PlaceHolders/PlaceHolderGenreConversation'
import AddPlaceholder from '../PlaceHolders/AddPlaceholder'
import ElementSummary from '../Element/ElementSummary'
import { Col, Row } from 'react-bootstrap'


class TabbedSidebarItem extends React.Component{
	render() {
		var seeMoreContent = this.props.heading == 'Elements' ? 
			<PlaceHolderGenreConversation /> :
			<ElementSummary heading="See More" genreName="See More" elementName="Seymour" />;

		var addContent = <AddPlaceholder />;

		return(
		  <Col sm={12}>
		  	<Row>
		  		<Col sm={12}>
		  			<h4>{this.props.heading}</h4>
		  		</Col>
		  	</Row>
		  	<Row>
		  		<Col sm={12}>
						{this.props.contentItem}
		  		</Col>
		  	</Row>
		  	<Row>
		  		<Col sm={6}>
						<a href="#" onClick={this.handleAddClick.bind(this)}>Add ...</a>
					</Col>
		  		<Col sm={6}>
						<a href="#" className="pull-right" onClick={this.handleMoreClick.bind(this)}>See More ...</a>
					</Col>
					<Reveal ref="addReveal" revealHeader={this.props.addHeader || "Add More Things"} revealContent={this.props.addContent || addContent} />
					<Reveal ref="moreReveal" revealHeader={this.props.seeMoreHeader || "See More Things"} revealContent={this.props.moreContent || seeMoreContent} />
				</Row>
		  </Col>
		)
	}

	handleMoreClick(e) {
		this.refs.moreReveal.handleClick(e);
		e.preventDefault();
	}

	handleAddClick(e) {
		this.refs.addReveal.handleClick(e);
		e.preventDefault();
	}
}

export default TabbedSidebarItem