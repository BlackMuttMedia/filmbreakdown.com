/* eslint-disable */
import React from 'react'
import GenreTitle from './GenreTitle'
import ItemList from '../../../components/items/ItemList'
// import TabbedSidebar  from '../Sidebars/TabbedSidebar')
import GenreConversationHeader from './GenreConversationHeader';
// import PostListComponent from '../Post/PostListComponent';
import { Col, Row } from 'react-bootstrap'

const GenreContent = React.createClass({
	render: function() {
		var films = (this.props.films || [])
			.map(function(item){
				return { id: item.id, name: item.title, backgroundPath: item.backdrop_path };
			})
		var headerRowStyle = {
			position: 'relative'
		};

		var headerContentStyle = {
			position: 'absolute',
			bottom: '0px',
			right: '0px'
		};
		var itemList = this.props.config ?  <ItemList config={this.props.config} linkTo="/film" items={films} /> : null;

		return (
		    <Col sm={12}>
		    	<Row style={headerRowStyle}>
		    		<Col sm={9}>
				    	<GenreTitle name={this.props.genre ? this.props.genre.name : ''} />
				    	{/*<PostListComponent 
				    		anchorText="Add Description ..." 
				    		postText="Post Description" 
				    		placeholderText="Enter a description ..." 
				    		parentId={this.props.parentId}
				    		endpointUrl={this.props.endpointUrl} 
				    		defaultText={this.props.defaultText}
				    		userToken={this.props.userToken} 
				    		noUserAnchorHref={this.props.noUserAnchorHref} 
				    		noUserAnchorText={this.props.noUserAnchorText} 
				    		posts={this.props.descriptions}
				    		handleSubmit={this.handleSubmit} />*/}
				    	<hr />
			    	</Col>
		    	</Row>
		    	<Row>
		    		<Col sm={9}>
		    			<Row>
			    			{itemList}
		    			</Row>
	    			</Col>
	    			<Col sm={3}>
			    		{this.props.genre ? <GenreConversationHeader genrename={this.props.genre.name} /> : null}
					    {/*<TabbedSidebar />*/}
			    	</Col>
		    	</Row>
		    </Col>
	    );
	},
	handleSubmit: function(e, postValue){
		var genreId;
		if(this.props.genre)
		{
			genreId = this.props.genre.id;
		}
		console.log(genreId);
		console.log(postValue);
		console.log(this.props.userToken);
		e.preventDefault();
	}
});

module.exports = GenreContent;