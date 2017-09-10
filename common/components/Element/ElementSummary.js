/* eslint-disable */
import React from 'react'
import PostDisplay from '../Post/PostDisplay'
import AddPlaceholder from '../PlaceHolders/AddPlaceholder'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Reveal from '../Reveal'

class ElementSummary extends React.Component {
	render(){
		var fontStyle = {
			color: '#666666'
		};

		var addContent = <AddPlaceholder />;

		return (
			<div>
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<Row>
					<Col sm={12} className="text-right">
						<a style={fontStyle} onClick={this.handleAddClick.bind(this)} href="#">Add more ...</a>
					</Col>
				</Row>
				<Reveal ref="addReveal" revealHeader={this.props.heading || 'Add More Things'} revealContent={this.props.addContent || addContent} />
			</div>
		);
	}

	handleAddClick(e) {
		this.refs.addReveal.handleClick(e);
		e.preventDefault();
	}
}

export default ElementSummary