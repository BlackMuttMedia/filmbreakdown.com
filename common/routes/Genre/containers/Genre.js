/* eslint-disable */
import { provideHooks } from 'redial'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { selectGenre, selectDescriptions, selectDescriptionsLoading } from '../reducer'
import _ from 'lodash'
import { Grid, Row, Col } from 'react-bootstrap'
import Background from '../../../components/formatted-html/Background'
import PageContainer from '../../../components/template/PageContainer'
import ItemList from '../../../components/items/ItemList'
import * as FilmHelpers from '../../../helpers/FilmHelpers'
import GenreContent from '../components/GenreContent'
import { selectAuth, selectIsLoggedIn, selectCurrentUser } from '../../../reducers/auth'
import { loadGenre, loadGenreDescriptions, saveGenreDescription } from '../actions'

const redial = {
  fetch: ({ dispatch, params: { slug } }) => {
    console.log('Dispatching')
    dispatch(loadGenre(slug))
    dispatch(loadGenreDescriptions(slug, 0, 10))
  }
}

const mapStateToProps = state => ({
  genre: selectGenre(state),
  auth: selectAuth(state), 
  isLoggedIn: selectIsLoggedIn(state),
  currentUser: selectCurrentUser,
  descriptions: selectDescriptions(state),
  descriptionsLoading: selectDescriptionsLoading(state)
})

const GenrePage = ({ genre, auth, isLoggedIn, currentUser, descriptions, descriptionsLoading, dispatch }) => (
  <Grid>
    { !genre.isLoading && genre.data.films &&
      <Background config={genre.config} backgroundPath={(_.sample(genre.data.films.results) || {}).backdrop_path} /> }
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
        userToken={auth ? auth.jwt : undefined} 
        userId={currentUser ? currentUser._id : undefined}
        config={genre.config}
        films={(genre.data.films || {}).results || []} 
        baseUrl='/film/' 
        genre={genre.data}
        defaultText={'No description has yet been provided. Please consider providing a description for this genre.'} 
        endpointUrl={''/*this.props.info.endpointUrl*/}
        noUserAnchorHref={''/*this.props.info.noUserAnchorHref*/} 
        noUserAnchorText={null/*this.props.info.noUserAnchorText*/}
        descriptions={ descriptions }
        descriptionsLoading={descriptionsLoading}
        handleSubmit={(description, cb) => dispatch(saveGenreDescription(genre.data.name.toLowerCase(), description, cb))} />
    </Row>
  </Grid>
)

GenrePage.PropTypes = {
  genre: PropTypes.array.isRequired
}


export default provideHooks(redial)(connect(mapStateToProps)(GenrePage))

