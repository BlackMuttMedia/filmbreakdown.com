/* eslint-disable */
import { provideHooks } from 'redial'
import React, { PropTypes } from 'react'
import { loadFilm } from '../actions'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { selectFilm } from '../reducer'
import _ from 'lodash'
import { Grid, Row, Col } from 'react-bootstrap'
import Background from '../../../components/formatted-html/Background'
import PageContainer from '../../../components/template/PageContainer'
import ItemList from '../../../components/items/ItemList'
import * as FilmHelpers from '../../../helpers/FilmHelpers'
import FilmPosterImage from '../components/FilmPosterImage'
import FilmContent from '../components/FilmContent'

const redial = {
  fetch: ({ dispatch, params: { slug } }) => dispatch(loadFilm(slug))
}

const mapStateToProps = state => ({
  film: selectFilm(state)
})

const FilmPage = ({ film }) => (
  <Grid>
    { !film.isLoading && 
      <Background config={film.config} backgroundPath={film.data.backdrop_path} /> }
    <Row style={{textShadow: '2px 2px 2px #444'}} className="summary">
      <Col md={12}>
        {film.isLoading &&
          <Helmet title={ film.data.title } /> }
        {film.isLoading &&
          <div>
            <h2>Loading....</h2>
          </div>}
      </Col>
    </Row>
    <Row style={{ textShadow: '2px 2px 2px #444' }}>
      <Col>
        {!film.isLoading && 
          <FilmPosterImage baseUrl={film.config.images.base_url} posterPath={film.data.poster_path} /> }
        {!film.isLoading && 
          <FilmContent config={film.config} filmData={film.data} creditData={film.credits} /> }
        {/*genres={genres} films={this.props.films} />*/}
      </Col>
    </Row>
  </Grid>
)

FilmPage.PropTypes = {
  film: PropTypes.array.isRequired
}


export default provideHooks(redial)(connect(mapStateToProps)(FilmPage))

