var React = require('react');
var _ = require('lodash');

var SearchBoxInput = React.createClass({
	render: function(){
	    return(
    		<input type="text" className="titleSearch" placeholder="Search For Movies" />
    	);
	},
});

module.exports = SearchBoxInput;