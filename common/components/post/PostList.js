/* eslint-disable */
var React = require('react');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Panel = require('react-bootstrap/lib/Panel');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
import PostListItem from './PostListItem'

var PostList = React.createClass({
	render: function() {
		var self = this;
		var posts = this.props.posts;
		return (
			<Row>
				<Col sm={12}>
					{this.props.posts && typeof this.props.posts[0] !== 'undefined' && this.props.posts[0] !== null ? 
						posts.map(function(post){
							return <PostListItem key={post.id} itemContent={post.content} showSeparator={self.props.showSeparator} />
						}) : 
						<p>{this.props.defaultText}</p>
					} 
				</Col>
			</Row>
		);
	}
});

module.exports = PostList;