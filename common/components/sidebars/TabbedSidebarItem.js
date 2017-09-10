/* eslint-disable */
var React = require('react');
var Reveal = require('../Reveal');
var PlaceHolderGenreConversation = require('../PlaceHolders/PlaceHolderGenreConversation');
var AddPlaceholder = require('../PlaceHolders/AddPlaceholder');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');


class TabbedSidebarItem extends React.Component{
	render() {
		var seeMoreContent = <PlaceHolderGenreConversation />; {/* this.props.heading == 'Elements' ? 
			<PlaceHolderGenreConversation /> :
			<ElementSummary heading="See More" genreName="See More" elementName="Seymour" />;*/}
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
						<a href="#" onClick={this.handleAddClick}>Add ...</a>
					</Col>
		  		<Col sm={6} col-sm-pull="right">
						<a href="#" onClick={this.handleMoreClick}>See More ...</a>
					</Col>
					{/* <Reveal ref="addReveal" revealHeader={this.props.addHeader || "Add More Things"} revealContent={this.props.addContent || addContent} />
					<Reveal ref="moreReveal" revealHeader={this.props.seeMoreHeader || "See More Things"} revealContent={this.props.moreContent || seeMoreContent} /> */}
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