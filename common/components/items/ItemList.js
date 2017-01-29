/* eslint-disable */
import React from 'react'
import _ from 'lodash'
import ItemListItem from './ItemListItem'
import { Grid, Row, Col } from 'react-bootstrap'

class ItemList extends React.Component {
	render(){
		return (
			<Row>
				{this.getItemListItems()}
			</Row>
		)
	}

	getItemListItems = () => {
		var items = [], backdropSize; 
		var small = this.props.smallColumns ? this.props.smallColumns : 6;
		var medium = this.props.mediumColumns ? this.props.mediumColumns : 3;
		var large = this.props.largeColumns ? this.props.largeColumns : 3;

		if(Object.prototype.toString.call( this.props.items ) === '[object Array]' && this.props.config 
				&& this.props.config.images && this.props.config.images.backdrop_sizes)
		{
			items = this.props.items.map(
				(item) => {
					if(item.id == 0)
					{
						return
					}

					backdropSize = this.props.config.images.backdrop_sizes[0]
					var backgroundPath = item.backgroundPath === null ? undefined : item.backgroundPath
					if(backgroundPath === undefined && Object.prototype.toString.call( this.props.backdrops ) === '[object Array]')
					{
						backgroundPath = this.props.backdrops[item.id]
					}

					return (
						<ItemListItem 
							key={item.id} 
							id={item.id} 
							title={item.name} 
							smallColumns={small}
							mediumColumns={medium}
							largeColumns={large}
							urlFormat={this.props.urlFormat || '{0}-{1}'}
							baseUrl={this.props.config.images.base_url} 
							backgroundPath={backgroundPath} 
							size={backdropSize} 
							baseItemUrl={this.props.baseItemUrl}
							linkTo={this.props.linkTo}
							linkParam={this.props.linkParam} />
						)
			})
		}

		return items
	}
}

module.exports = ItemList