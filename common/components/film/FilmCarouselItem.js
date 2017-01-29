/* eslint-disable */
import React, { Component } from 'react'

import { CarouselItem } from 'react-bootstrap'

class FilmCarouselItem extends Component { 
	constructor(props) {
		super(props)
	}

	render() {
		console.log(this.props)

		return (
		  <CarouselItem key={this.props.index}>
		      {this.props.config ? <img src={ this.props.config.images.base_url + this.props.config.images.backdrop_sizes[2] + this.props.film.backdrop_path} /> : null}
		      <div className="carousel-caption">
		        <h3>{this.props.film.title}</h3>
		        <p>{this.props.film.overview}</p>
		      </div>
		  </CarouselItem>
		)
	}
}

export default FilmCarouselItem