/* eslint-disable */
import * as types from '../../constants'
import config from '../../config'
import _ from 'lodash'

const initialState = {
  data: [],
  lastFetched: null,
  isLoading: false,
  error: null,
  config: config
}

export default function genres (state = initialState, action) {
  //console.log('STATE!')
  //console.log(state)
  switch (action.type) {
    default:
      return state
  }
}

// Example of a co-located selector
export const selectGenres = state => {
  /*console.log('GENRES STATE')
  console.log(state)
  console.log(state.films)*/
  return state.genres
} 
export const selectFilms = state => state.films
/*
export const selectGenres = state =>  { 
  return (state.genres.data || [])
    .map((genre) => {
      let genreFilms = (state.films || []).filter((film) => {
          return film.genre_ids.indexOf(genre.id) >= 0
        })
      genre.films = {
        results: genreFilms
      }

      return genre
    })
}
export const selectGenreFilms = state => {
  let genreFilms = Array()
  (state.genres.data || []).forEach((genre) => {
    genreFilms[genre.id] = ((genre.films || {}).data || [])
      .filter((film) => {
        return (film.genre_ids || []).indexOf(genre.id) >= 0
      })
  })
  return genreFilms
}*/