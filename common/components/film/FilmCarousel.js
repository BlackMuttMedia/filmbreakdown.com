/* eslint-disable */
import React from 'react'
import { IndexLink, Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'

import { Carousel, CarouselItem } from 'react-bootstrap'
import FilmCarouselItem from './FilmCarouselItem'

const FilmCarousel = ({films, config, urlKey}) => (
  <Carousel>
  	{ films && films.map((film, index) => getCarouselItem({ 
      urlKey: format(urlKey || '/film/{0}-{1}', film.id, (film.title || "").replace(/[\s:]+/g, '-')), 
      film: film, 
      index: index, 
      config: config})) }
  </Carousel>
)

const getCarouselItem = ({urlKey, film, index, config}) => (
  <Carousel.Item key={index}>
    <Link to={urlKey}>
      <div>
        {config ? <img src={ config.images.base_url + config.images.backdrop_sizes[2] + film.backdrop_path} /> : null}
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, .4)' }}>
          <h3>{film.title}</h3>
          <p>{film.overview}</p>
        </Carousel.Caption>
      </div>
    </Link>
  </Carousel.Item>
)

var format = function (incoming) {
  var content = incoming;
  for (var i = 1; i < arguments.length; i++) {
        var replacement = '{' + (i - 1) + '}';
        content = content.replace(replacement, arguments[i]).toLowerCase();
  }
  return content;
}

export default FilmCarousel