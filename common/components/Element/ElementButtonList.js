/* eslint-disable */
import React from 'react'
import _ from 'lodash'
import { Col, Row, Button } from 'react-bootstrap'
import ElementSummary from './ElementSummary'
import Reveal from '../Reveal'

class ElementButtonList extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.state = {
			elementName: null, 
			genreName: null
    }
  }

	render() {
		var categoryHeaderStyle = {
			fontWeight: 'bold'
		};

		var buttonStyle = {
			margin: '8px'
		};
		var item = <ElementSummary genreName={this.state.genreName} elementName={this.state.elementName} />
		var that = this

		return( 
			<Row>
				<Col sm={12}>
					<span style={categoryHeaderStyle}>{this.props.heading}</span>
					<Row>
						<Col sm={12}>
				        {_.map(this.props.items, (item, i) => {
				          return (
				            <Button bsSize={that.props.size || "xsmall"} 
					            bsStyle={that.props.style || "info"} 
					            key={i} 
					            onClick={that.handleClick.bind(that, i)} 
					            style={buttonStyle}>{item}</Button>
				          );
				        }, this)}
						</Col>
					</Row>
					<Reveal ref='summaryReveal' revealHeader={this.state.genreName + ' Summary'} revealContent={item} revealStyle={this.props.revealStyle} />
				</Col>
			</Row>
		);
	}

	handleClick(i, e) {
		e.preventDefault()
		var elementName = this.props.items[i]
		this.setState({ elementName: elementName, genreName: this.props.genreName }, 
			function() { this.refs.summaryReveal.handleClick(); });
	}
}

export default ElementButtonList