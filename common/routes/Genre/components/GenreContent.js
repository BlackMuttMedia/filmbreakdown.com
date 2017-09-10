/* eslint-disable */
import React from 'react'
import GenreTitle from './GenreTitle'
import ItemList from '../../../components/items/ItemList'
import TabbedSidebar  from '../../../components/sidebars/TabbedSidebar'
import GenreConversationHeader from './GenreConversationHeader'
import PostListComponent from '../../../components/post/PostListComponent'
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
		var descriptions = (this.props.descriptions || []).map((description) => {
			return { 
				id: description._id, 
				content: description.description,
				date_added: description.date_added,
			}
		})

		return (
		    <Col sm={12}>
		    	<Row style={headerRowStyle}>
		    		<Col sm={9}>
				    	<GenreTitle name={this.props.genre ? this.props.genre.name : ''} />
				    	<PostListComponent 
				    		anchorText="Add Description ..." 
				    		postText="Post Description" 
				    		placeholderText="Enter a description ..." 
				    		parentId={this.props.parentId}
				    		endpointUrl={this.props.endpointUrl} 
				    		defaultText={this.props.defaultText}
				    		userToken={this.props.userToken} 
				    		userId={this.props.userId}
				    		noUserAnchorHref={this.props.noUserAnchorHref} 
				    		noUserAnchorText={this.props.noUserAnchorText} 
								loading={this.props.descriptionsLoading}
				    		posts={descriptions}
				    		handleSubmit={this.handleSubmit} />
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
					    {this.props.genre ?  <TabbedSidebar genreName={this.props.genre.name} /> : null}
			    	</Col>
		    	</Row>
		    </Col>
	    );
	},
	handleSubmit: function(e, postValue, cb){
		var genreId;
		if(this.props.genre)
		{
			genreId = this.props.genre.id;
		}
		var userId = this.props.userId;
		console.log(genreId);
		console.log(postValue);
		console.log(this.props.userToken);
		e.preventDefault();

		var postObject = {
			user_id: userId,
			genre_id: genreId,
			description: postValue
		};

		if(this.props.handleSubmit) { 
			this.props.handleSubmit(postObject, cb);
		}
	}
});

module.exports = GenreContent;