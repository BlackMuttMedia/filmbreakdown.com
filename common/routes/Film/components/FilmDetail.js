/* eslint-disable */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
var _ = require('lodash');
//var tmdb = require('tmdbv3').init('89a1a6500311a41b1a4c35541871e047');
var Grid = require('react-bootstrap/lib/Grid');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var FilmList = require('./FilmList');
var FilmPosterImage = require('./FilmPosterImage');
var FilmBackground = require('./FilmBackground');
var FilmContent = require('./FilmContent');
var FilmConversation = require('./FilmConversation');
import filmSelector from '../../flux/selectors/filmSelector';
import * as actionCreators from '../../flux/action_creators';
var Background = require('../FormattedHtml/Background');

var FilmDetailComponent = React.createClass({
  mixins: [React.addons.PureRenderMixin],
	componentWillReceiveProps: function(nextProps) { 
		if(this.props.params.info != nextProps.params.info) {
			this.props.fetchFilm(nextProps.params.info);
		}
	},
	componentDidMount: function() { 
		this.props.fetchFilm(this.props.params.info);
	},
	render: function() { 
		var image, baseUrl, posterPath, backgroundPath;
		var summaryStyle = {
	    textShadow: '2px 2px 2px #444'
		};

		if(this.props.config && this.props.config.get('images') && this.props.config.get('images').get('base_url') && 
			 this.props.film && this.props.film.get('poster_path'))
		{
			baseUrl = this.props.config.getIn(['images', 'base_url']);
			posterPath = this.props.film.get('poster_path');
			backgroundPath = this.props.film.get('backdrop_path');
		}

		var config = this.props.config ? this.props.config.toJS() : null;
		var film = this.props.film ? this.props.film.toJS() : null;
		var genres = this.props.filmGenres; // ? this.props.filmGenres.toJS() : null;
		var credits = this.props.filmCredits ? this.props.filmCredits.toJS() : null;

		console.log('FILM')
		console.log(film)

		return (

		  //<!-- First Band (Image) -->
		  <div>
		  	<Background config={this.props.config} backgroundPath={backgroundPath} />
				<Grid>
				  <Row style={summaryStyle} className="summary">
			  		<p className="notice"></p>
				    {<FilmPosterImage baseUrl={baseUrl} posterPath={posterPath} />}
				    {<FilmContent config={config} filmData={film} genres={genres} creditData={credits} films={this.props.films} />}
				    {/*<FilmConversation />*/}
				  </Row>
			  </Grid>
		  </div>
		);
	},
});

const FilmDetail = connect(filmSelector, actionCreators)(FilmDetailComponent);

module.exports = FilmDetail;