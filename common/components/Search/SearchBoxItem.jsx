var React = require('react');
var SearchBoxItemImage = require('./SearchBoxItemImage');
var TmdbHelper = require('../../../dependencies/TmdbHelper');

var SearchBoxItem = React.createClass({
     render: function() {
     	var searchBoxImage;

     	if(!TmdbHelper.isNullOrWhitespace(this.props.posterPath))
     	{
     		searchBoxImage = <SearchBoxItemImage baseImageUrl={this.props.baseImageUrl} posterPath={this.props.posterPath} />;
     	}
	    return(
          <li className="row">
            <div className="small-3 medium-3 large-3 column">
               {searchBoxImage}
            </div>
           <div className="small-9 medium-9 large-9 right">{this.props.filmTitle}</div>
       	  </li>
	    );
     }
});

module.exports = SearchBoxItem;