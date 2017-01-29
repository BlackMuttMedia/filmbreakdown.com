/* eslint-disable */

import React from 'react'

import { StyleSheet, css } from 'aphrodite'
import { LinkContainer } from 'react-router-bootstrap'
import data from '../data'
import genres from '../genres'
import config from '../config'
import FilmCarousel from '../../../components/film/FilmCarousel'
import PageContainer from '../../../components/template/PageContainer'
import PostList from '../../PostList/containers/PostList'

// This is a static page. It uses an array to hold data about the resources
// and maintain DRY
const Home = (props) => (
  <PageContainer>
    <h1>Popular At Film Breakdown!</h1>
    <p>Here is where you go to look up the movies and to write about them! What movies? That is up to you! What are some of your favorites? Say what works. Say what does not. Have fun!</p>
    <p>Not sure where to start? Try looking at some of the popular items below!</p>
    <FilmCarousel films={genres.genres[0].films.results} config={config} />
  </PageContainer>
)

export default Home
