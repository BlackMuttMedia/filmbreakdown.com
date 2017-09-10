/* eslint-disable */
import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Panel from 'react-bootstrap/lib/Panel'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

var PostDisplay = React.createClass({
	render: function(){
		var isSidebar = this.props.sidebar && this.props.sidebar === true;
		var fontStyle = { 
			color: '#666666'
		}

		return (
			<Row>
				<Col sm={12}>
					<Panel style={fontStyle}>
						<Row>
							<Col sm={12}>
								<p>The {this.props.genreName} uses the {this.props.elementName} in such a way. It helps to communicate the fragility of fragile things 
								and the reasons for the way our faces are.</p>
							</Col>
						</Row>
						<Row>
							<Col sm={isSidebar ? 12 : 6} md={isSidebar ? 12 : 2}>Ratings:</Col>
							<Col sm={isSidebar ? 12 : 3} md={isSidebar ? 6 : 2} lg={isSidebar ? 6 : 1}>
								<Glyphicon bsClass="glyphicon" glyph="arrow-up" />300
							</Col>
							<Col sm={isSidebar ? 12 : 3} md={isSidebar ? 6 : 2} lg={isSidebar ? 6 : 1}>
								<Glyphicon bsClass="glyphicon" glyph="arrow-down" />-20
							</Col>
							<Col sm={12} md={isSidebar ? 12 : 6} lg={isSidebar ? 12 : 8}>
								<div className="pull-right">Jimmy Userguy</div>
							</Col>
						</Row>
					</Panel>
				</Col>
			</Row>
		)}
});

module.exports = PostDisplay;