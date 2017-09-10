/* eslint-disable */
var React = require('react');

var GenreConversationHeader = ({ genrename }) => (
	<div style={headerStyle}>
		{genrename} Details
	</div>
)

const headerStyle = {
	fontWeight: 'bold',
	fontSize: '125%',
	paddingBottom: '10px'
}

export default GenreConversationHeader;
