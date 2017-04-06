/* eslint-disable */
import { provideHooks } from 'redial'
import React, { PropTypes } from 'react'
import { loadGenres } from '../actions'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { selectGenres, selectFilms } from '../reducer'
import PageContainer from '../../../components/template/PageContainer'
import ItemList from '../../../components/items/ItemList'
import * as FilmHelpers from '../../../helpers/FilmHelpers'

const redial = {
  fetch: ({ dispatch }) => dispatch(loadGenres())
}

const mapStateToProps = state => ({
  genres: selectGenres(state),
  films: selectFilms(state)
})

const GenresPage = ({ genres, config, films }) => (
	<PageContainer>
    { console.log(genres) }
    <Helmet title='All Genres' />
    {genres.isLoading &&
      <div>
        <h2>Loading....</h2>
      </div>}
    {!genres.isLoading &&
      <ItemList 
				config={genres.config} 
				items={getGenres(genres.data, films)} 
				urlFormat='{1}'
				linkTo="/genre"
				backdrops={FilmHelpers.GetBackdrops(genres.data, films)} /> }
  </PageContainer>
)

GenresPage.PropTypes = {
  genres: PropTypes.array.isRequired
}

const getGenres = (incoming, films) => { 
  let filmsData = (films || {}).data || [];
	let genres = (incoming || []).map((genre) => { 
    let genreFilms = filmsData.filter((film) => {
      return film.genre_ids.indexOf(genre.id) >= 0
    })

		genre.backgroundPath = FilmHelpers.GetBackdrop(genre)
    genre.films = {
      results: genreFilms
    }
		return genre
	})

	return genres
}

export default provideHooks(redial)(connect(mapStateToProps)(GenresPage))

// This is a static page. It uses an array to hold data about the resources
// and maintain DRY
/*const Genres = (props) => (
  <Grid>
    <Row>
      <Col md={12}>
        <h1>Genres At Film Breakdown!</h1>
        <p>Here is where you go to look up the movies and to write about them! What movies? That is up to you! What are some of your favorites? Say what works. Say what does not. Have fun!</p>
        <p>Not sure where to start? Try looking at some of the popular items below!</p>
      </Col>
    </Row>
  </Grid>
)

export default Genres*/
