import * as types from '../../constants'
import config from '../../config'

const initialState = {
  data: [],
  lastFetched: null,
  isLoading: false,
  error: null,
  config: config,
  descriptionsLoading: false,
  descriptionsError: null,
  descriptionsLastFetched: null,
  descriptions: [],
}

export default function genre (state = initialState, action) {
  switch (action.type) {
    case types.LOAD_GENRE_REQUEST:
      return { ...state,
        isLoading: true,
        error: null}
    case types.LOAD_GENRE_SUCCESS:
      return { ...state,
        data: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false}
    case types.LOAD_GENRE_FAILURE:
      return { ...state,
        error: action.payload}
    case types.LOAD_GENRE_DESCRIPTIONS_REQUEST:
      return { ...state,
        descriptionsLoading: true,
        descriptionsError: null}
    case types.LOAD_GENRE_DESCRIPTIONS_SUCCESS:
      return { ...state,
        descriptions: action.payload,
        descriptionsLastFetched: action.meta.lastFetched,
        descriptionsLoading: false}
    case types.LOAD_GENRE_DESCRIPTIONS_FAILURE:
      return { ...state,
        descriptionsError: action.payload}
    case types.SAVE_GENRE_DESCRIPTION_REQUEST:
      return { ...state,
        descriptionError: null}
    case types.SAVE_GENRE_DESCRIPTION_SUCCESS:
      return { ...state,
        lastFetched: action.meta.lastFetched,
        isLoading: false}
    case types.SAVE_GENRE_DESCRIPTION_FAILURE:
      return { ...state,
        error: action.payload}
    default:
      return state
  }
}

// Example of a co-located selector
export const selectGenre = state => (state.genre || {})
export const selectDescriptions = state => state.genre.descriptions
