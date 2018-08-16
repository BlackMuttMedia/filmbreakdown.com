/* eslint-disable */

import React from 'react'
import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import config from '../config'
import FilmCarousel from '../../../components/film/FilmCarousel'
import PageContainer from '../../../components/template/PageContainer'
import PostList from '../../PostList/containers/PostList'
import { loadNowPlaying } from '../actions'
import { selectNowPlaying } from '../../../reducers/nowPlaying'

const redial = {
  fetch: ({ dispatch }) => dispatch(loadNowPlaying())
}

const mapStateToProps = state => { 
    return { playing: selectNowPlaying(state), state: state }
  }

const Home = ({ playing, state }) => (
  <PageContainer>
    { /*console.log(state)*/ }
    <h1>Popular At Film Breakdown!</h1>
    <p>Here is where you go to look up the movies and to write about them! What movies? That is up to you! What are some of your favorites? Say what works. Say what does not. Have fun!</p>
    <p>Not sure where to start? Try looking at some of the popular items below!</p>
    <FilmCarousel urlKey='/film/{0}-{1}' films={playing.playing} config={config} />
  </PageContainer>
)

export default provideHooks(redial)(connect(mapStateToProps)(Home))
