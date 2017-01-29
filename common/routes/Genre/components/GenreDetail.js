/* eslint-disable */
var React = require('react/addons');
import {connect} from 'react-redux';
var _ = require('lodash');
import {Map, List} from 'immutable';
import * as actionCreators from '../../flux/action_creators';
import genreFilmsSelector from '../../flux/selectors/genreSelector';
var GenreContent = require('./GenreContent');
var GenreBackground = require('./GenreBackground');
var Grid = require('react-bootstrap/lib/Grid');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Background = require('../FormattedHtml/Background');

var GenreDetailComponent = React.createClass({
  mixins: [React.addons.PureRenderMixin],
	componentWillReceiveProps: function(nextProps) { 
		if(this.props.params.info != nextProps.params.info) {
			this.props.setGenre(nextProps.params.info);
		}
	},
  componentDidMount: function() {
  	// CALL Initialize Genres
  	this.props.setGenre(this.props.params.info);
  },
	render: function() { 
		var image, baseUrl, posterPath, backgroundPath, randomIndex;
		var summaryStyle = {
	    textShadow: '2px 2px 2px #444'
		};

		if(this.props.config && this.props.config.get('images') && this.props.config.get('images').get('base_url'))
		{
			baseUrl = this.props.config.get('images').get('base_url');
		}

		var genre = undefined;

		if( this.props.genreFilms && this.props.genreFilms.size > 0) { 
			var filteredFilms = this.props.genreFilms.filter(function(film) { return film.get('backdrop_path') != undefined; });
			if(filteredFilms && filteredFilms.size > 0) {
				randomIndex = Math.floor(Math.random() * filteredFilms.size);
				backgroundPath = filteredFilms.get(randomIndex).get('backdrop_path');
			}
		}

		return (
			<Grid>
				<Background config={this.props.config} backgroundPath={backgroundPath} />
			  <Row>
			  	<Col sm={12}>
			  		<p className="notice"></p>
			  		<Row>
		  			</Row>
					  <Row style={summaryStyle}>
					    <GenreContent 
					  		userToken={this.props.currentAuthorization ? this.props.currentAuthorization.get('jwt') : undefined} 
					    	config={this.props.config}
						    films={this.props.genreFilms} 
						    baseUrl='/film/' 
						    genre={this.props.genre}
					    	defaultText={'No description has yet been provided. Please consider providing a description for this genre.'} 
					    	endpointUrl={''/*this.props.info.endpointUrl*/}
					    	noUserAnchorHref={''/*this.props.info.noUserAnchorHref*/} 
					    	noUserAnchorText={null/*this.props.info.noUserAnchorText*/}
					    	descriptions={null/*this.props.info.descriptions*/} />
					  </Row>
					  {/*<ElementSummaryReveal />*/}
				  </Col>
			  </Row>
		  </Grid>
		);
	}
});
const GenreDetail = connect(genreFilmsSelector, actionCreators)(GenreDetailComponent);

module.exports = GenreDetail;
