/* eslint-disable */
import { provideHooks } from 'redial'
import React, { PropTypes } from 'react'
import { loadGenre } from '../actions'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { selectGenre } from '../reducer'
import _ from 'lodash'
import { Grid, Row, Col } from 'react-bootstrap'
import Background from '../../../components/formatted-html/Background'
import PageContainer from '../../../components/template/PageContainer'
import ItemList from '../../../components/items/ItemList'
import * as FilmHelpers from '../../../helpers/FilmHelpers'
import GenreContent from '../components/GenreContent'

const redial = {
  fetch: ({ dispatch, params: { slug } }) => dispatch(loadGenre(slug))
}

const mapStateToProps = state => ({
  genre: selectGenre(state)
})

const GenrePage = ({ genre }) => (
  <Grid>
    { !genre.isLoading && genre.data.films &&
      <Background config={genre.config} backgroundPath={_.sample(genre.data.films.results).backdrop_path} /> }
    <Row>
      <Col md={12}>
        {genre.isLoading &&
          <Helmet title={ genre.data.name } /> }
        {genre.isLoading &&
          <div>
            <h2>Loading....</h2>
          </div>}
      </Col>
    </Row>
    <Row style={{ textShadow: '2px 2px 2px #444' }}>
      <GenreContent 
        userToken={genre.currentAuthorization ? genre.currentAuthorization.get('jwt') : undefined} 
        config={genre.config}
        films={(genre.data.films || {}).results || []} 
        baseUrl='/film/' 
        genre={genre.data}
        defaultText={'No description has yet been provided. Please consider providing a description for this genre.'} 
        endpointUrl={''/*this.props.info.endpointUrl*/}
        noUserAnchorHref={''/*this.props.info.noUserAnchorHref*/} 
        noUserAnchorText={null/*this.props.info.noUserAnchorText*/}
        descriptions={null/*this.props.info.descriptions*/} />
    </Row>
  </Grid>
)

GenrePage.PropTypes = {
  genre: PropTypes.array.isRequired
}


export default provideHooks(redial)(connect(mapStateToProps)(GenrePage))

