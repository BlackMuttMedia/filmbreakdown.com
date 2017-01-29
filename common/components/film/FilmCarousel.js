/* eslint-disable */
import React from 'react'

import { Carousel, CarouselItem } from 'react-bootstrap'
import FilmCarouselItem from './FilmCarouselItem'

const FilmCarousel = ({films, config}) => (
  <Carousel>
  	{ films && films.map((film, index) => getCarouselItem({ urlKey: '/', film: film, index: index, config: config})) }
  </Carousel>
)

const getCarouselItem = ({urlKey, film, index, config}) => (
  <CarouselItem key={index}>
      {config ? <img src={ config.images.base_url + config.images.backdrop_sizes[2] + film.backdrop_path} /> : null}
      <div className="carousel-caption">
        <h3>{film.title}</h3>
        <p>{film.overview}</p>
      </div>
  </CarouselItem>
)


export default FilmCarousel