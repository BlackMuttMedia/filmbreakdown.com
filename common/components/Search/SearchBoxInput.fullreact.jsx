var React = require('react');
var _ = require('lodash');
var Autosuggest = require('react-autosuggest');
var theMovieDb = require('../../../dependencies/themoviedb');
var TmdbHelper = require('../../../dependencies/TmdbHelper');
var SearchBoxItem = require('./SearchBoxItem');
var Autocomplete = require('../Autocomplete/Autocomplete');

var SearchBoxInput = React.createClass({
	render: function(){
    const inputAttributes = {
      id: 'search-box',
      placeholder: 'Search for Movies'
    };

    return(
        <Autocomplete />
  	);
	},
	getSuggestions: function(input, callback){
		theMovieDb.search.getMovie({"query":escape(input), "search_type":"ngram", "include_adult":"false"}, 
	  			function(data)
	  			{ 
	  				var results = _.first(JSON.parse(data).results, 8);
	  				callback(null, results); 
	  			}, 
	  			function(data) { response(null, null); });
	},
	renderSuggestion: function(item, input){
		//return <span>{TmdbHelper.getFormattedTitle(item)}</span>;
		return <SearchBoxItem baseImageUrl="http://image.tmdb.org/t/p/w45/" posterPath={item.poster_path} filmTitle={TmdbHelper.getFormattedTitle(item)} />;;
	},
	getSuggestionValue: function(item){
		return TmdbHelper.getFormattedTitle(item);
	},
	componentDidMount: function() {
	    	//$('.react-autosuggest__suggestions').addClass('f-dropdown small').data('dropdown-content');

		  	/*var listItem = <SearchBoxItem baseImageUrl="http://image.tmdb.org/t/p/w45/" posterPath={item.poster_path} filmTitle={TmdbHelper.getFormattedTitle(item)} />;
		  	var renderedListItem = React.renderToString(listItem);

		  	$(ul).append(renderedListItem);
		  	$(ul[0].lastChild).data("ui-autocomplete-item", item);

	    	return  ul;*/
	}
});

module.exports = SearchBoxInput;