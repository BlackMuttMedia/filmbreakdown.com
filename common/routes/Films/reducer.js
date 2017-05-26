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

export default function films (state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

// Example of a co-located selector
export const selectFilms = state => 
{
  //let returnFilms = { data: _.sampleSize(state.films.data, 20), isLoading: state.films.isLoading, config: state.films.config }
  let returnFilms = { data: _.take(state.films.data, 20), isLoading: state.films.isLoading, config: state.films.config }
  //console.log(returnFilms)
  //console.log(state.films)
  return returnFilms
}
