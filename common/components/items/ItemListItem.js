/* eslint-disable */
var React = require('react');
var Link = require('react-router').Link;
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var ItemListImageBody = require('./ItemListImageBody');
import { LinkContainer } from 'react-router-bootstrap'

var ItemListItem = React.createClass({
	render: function() {
		var urlKey = format(this.props.urlFormat, this.props.id, (this.props.title || "").replace(/[\s:]+/g, '-'));
		var itemUrl = format('{0}{1}', this.props.baseItemUrl, urlKey);
		var listStyle = {
		};
		var anchorStyle = {
			margin: '0px',
			display: 'block',
			position: 'relative',
			paddingTop: "10px",
			paddingBottom: "10px"
		};

		return (
			<Col sm={this.props.smallColumns} md={this.props.mediumColumns} lg={this.props.largeColumns}>
				<Link to={ this.props.linkTo + '/' + urlKey } style={anchorStyle}>
					<ItemListImageBody 
						baseUrl={this.props.baseUrl} 
						backgroundPath={this.props.backgroundPath} 
						size={this.props.size} 
						title={this.props.title} />
				</Link>
			</Col>
		);
	}
});

var format = function (incoming) {
			var content = incoming;
			for (var i = 1; i < arguments.length; i++) {
						var replacement = '{' + (i - 1) + '}';
						content = content.replace(replacement, arguments[i]);
			}
			return content;
}

module.exports = ItemListItem;