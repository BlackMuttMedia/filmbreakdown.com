/* eslint-disable */
var React = require('react');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Panel = require('react-bootstrap/lib/Panel');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
import PostList from './PostList'
import PostForm from './PostForm'
import PostLink from './PostLink'
import PostAlert from './PostAlert'

var PostListComponent = React.createClass({
  getInitialState: function() {
      return { 
      	showPostBox: false, 
      	showPostLink: true, 
      	postContent: null,
      	showAlert: false,
      	alertMessage: null,
      	alertClass: null };
  },
	render: function() {
		return(
			<Row>
				<Col sm={12}>
					{this.props.header ? <PostHeader headerContent={this.props.header} /> : null }
					<PostList posts={this.props.posts} showSeparator={this.props.showSeparator} defaultText={this.props.defaultText} />
					{ this.state.showAlert ? <PostAlert alertMessage={this.state.alertMessage} alertClass={this.state.alertClass } handleClose={this.hideAlert} /> : null }
					{ this.state.showPostBox && this.props.userToken ? <PostForm postText={this.props.postText} placeholderText={this.props.placeholderText} handlePost={this.handleSubmit} /> : null }
					{ !(this.state.showPostBox && this.props.userToken) ? 
						<PostLink 
							anchorText={this.props.anchorText} 
							handleClick={this.showPostBox} 
							userToken={this.props.userToken}
							noUserAnchorHref={this.props.noUserAnchorHref} 
							noUserAnchorText={this.props.noUserAnchorText}  /> : null }
				</Col>
			</Row>
		);
	},
	showPostBox: function(e) {
    this.setState({ showPostBox: true, showPostLink: false });
    e.preventDefault();
	},
	/*
	handleSubmit: function(data, e) {
		var postContent = data.postContent;
		var postData = { 
			parentId: this.props.parentId, 
			content: postContent,
			userid: this.props.userid
		};

		this.setState({ postContent: postContent });

		$.ajax({
		  type: "POST",
		  url: this.props.endpointUrl,
		  data: postData,
		  success: this.handleSubmitSuccess,
		  error: this.handleSubmitFailure,
		  dataType: 'json'
		});

		e.preventDefault();
	},*/
	handleSubmit: function(e, postValue) {
		console.log('Handling submit');
		this.props.handleSubmit(e, postValue, this.handleSubmitSwitch);
	},
	handleSubmitSwitch: function(data) {
		console.log('SUBMIT!')
			this.setState({
				alertMessage: this.props.successMessage || 'Post submitted' ,
				alertClass: 'alert-box success radius',
				showAlert: true,
				showPostBox: false, 
				showPostLink: true 
			});
	},
	handleSubmitSuccess: function(data){
		if(data.status == 'ok') {
			var posts = this.props.posts || [];
			posts.push(data.object)

			this.setState({
				alertMessage: this.props.successMessage || 'Post submitted' ,
				alertClass: 'alert-box success radius',
				showAlert: true,
				posts: posts,
				showPostBox: false, 
				showPostLink: true 
			});
		}
		else{
			this.setState({
				alertMessage: data.message || 'There was an error submitting your post' ,
				alertClass: 'alert-box alert radius',
				showAlert: true
			});
		}
	},
	handleSubmitFailure: function(xhr, ajaxOptions, thrownError){
			this.setState({
				alertMessage: thrownError || 'There was an error submitting your post' ,
				alertClass: 'alert-box alert radius',
				showAlert: true
			});
	},
	/*hideAlert: function(e)
	{
		this.setState({
			alertMessage: null,
			alertClass: null,
			showAlert: false
		});
		e.preventDefault();
	}*/
});

module.exports = PostListComponent;
