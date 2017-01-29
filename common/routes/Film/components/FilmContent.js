/* eslint-disable */
var React = require('react');
var _ = require('lodash');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var FilmTitle = require('./FilmTitle');
var FilmOverview = require('./FilmOverview');
var FilmDetailsList = require('./FilmDetailsList');
var FilmGenreSection = require('./FilmGenreSection');
import * as FilmHelpers from '../../../helpers/FilmHelpers'

var FilmContent = React.createClass({
	render: function() {
		var year, title, overview, genres = [], cast = [], directors = [], cast = [];
		var filmTitle = null, 
				filmOverview = null, 
				filmDirectorsList = null, 
				filmGenres = null, 
				filmCastList = null;

		if(this.props.filmData && this.props.filmData.release_date)
		{
			year = this.props.filmData.release_date.substring(0,4);
		}

		if(this.props.filmData)
		{
			title = this.props.filmData.title;
			overview = this.props.filmData.overview;
		  filmTitle = <FilmTitle titleText={title} year={year} />
		  filmOverview = <FilmOverview overviewText={overview} />
		}

		if(this.props.genres)
		{
			var backdrops = FilmHelpers.GetBackdrops(this.props.genres, this.props.films);
			genres = this.props.genres.toJS();
			filmGenres = <FilmGenreSection config={this.props.config} genres={genres} backdrops={backdrops} films={this.props.films} />;
		}

		if(this.props.creditData)
		{
			directors = this.getDirectors();
		  filmDirectorsList = <FilmDetailsList label="Directed By" items={directors} />

			if(this.props.creditData.cast)
			{
				cast = this.getCast();
		    filmCastList = <FilmDetailsList label="Top Cast" items={cast} />
			}
		}

		return (
		    <Col sm={6}>
		    	{filmTitle}
		    	{filmOverview}
		    	{filmDirectorsList}
		    	{filmGenres}
		    	{filmCastList}
		    </Col>
	    );
	},
	getGenres: function() {
		var genres = [];
		if(this.props.filmData.genres)
		{
			genres = this.props.filmData.genres;
		}
		return genres;
	},
	getDirectors: function() {
		let directorCrew = _.filter(this.props.creditData.crew, { department: "Directing", job: "Director" })
		let directors = _.map(directorCrew, (credit) => { return {id: credit.credit_id, name: credit.name} })

		return directors
	},
	getCast: function() {		var castMembers = this.props.creditData.cast.map(
			function(cast){
				var displayValue = cast.name + ' ..... ' + cast.character;
				return { id: cast.cast_id, name: cast.name, displayValue: displayValue }; 
		});

		return castMembers;
	}
});

module.exports = FilmContent;