/* eslint-disable */
import { provideHooks } from 'redial'
import React, { PropTypes } from 'react'
import { loadFilms } from '../actions'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { selectFilms } from '../reducer'
import PageContainer from '../../../components/template/PageContainer'
import ItemList from '../../../components/items/ItemList'
import * as FilmHelpers from '../../../helpers/FilmHelpers'

const redial = {
  fetch: ({ dispatch }) => dispatch(loadFilms())
}

const mapStateToProps = state => ({
  films: selectFilms(state)
})

const FilmsPage = ({ films, config }) => (
	<PageContainer>
    <Helmet title='All Films' /> 
    {films.isLoading &&
      <div>
        <h2>Loading....</h2>
      </div>}
    {!films.isLoading &&
      <ItemList 
				config={films.config} 
				items={_.map(films.data, (film) => { film.name = film.title; return film; }) } 
				urlFormat='{0}-{1}'
				linkTo="/film"
				backdrops={getKeyedFilms(films.data)} /> }
  </PageContainer>
)

const getKeyedFilms = (films) => {
  let keyedFilms = Array()

  _.each(films, film => keyedFilms[film.id] = film.backdrop_path)

  return keyedFilms
}

FilmsPage.PropTypes = {
  films: PropTypes.array.isRequired
}

export default provideHooks(redial)(connect(mapStateToProps)(FilmsPage))

// This is a static page. It uses an array to hold data about the resources
// and maintain DRY
/*const Films = (props) => (
  <Grid>
    <Row>
      <Col md={12}>
        <h1>Films At Film Breakdown!</h1>
        <p>Here is where you go to look up the movies and to write about them! What movies? That is up to you! What are some of your favorites? Say what works. Say what does not. Have fun!</p>
        <p>Not sure where to start? Try looking at some of the popular items below!</p>
      </Col>
    </Row>
  </Grid>
)

export default Films*/
