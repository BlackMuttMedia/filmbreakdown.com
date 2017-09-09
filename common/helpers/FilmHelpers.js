/* eslint-disable */
import _ from 'lodash';

/*export function GetBackdrop(genre, films) {
	var backdrop;

	var genreFilms = (films || List()).filter(function(film) {
		return film.get('genre_ids').includes(genre.get('id'));
	}); 

	if(genreFilms != undefined && genreFilms.size > 0)
	{
		var counter = 0;
		while((backdrop == null || backdrop == "") && counter < 10000)
		{
			var randomNumber = _.random(genreFilms.size - 1);
			backdrop = genreFilms.get(randomNumber).get('backdrop_path');
			counter++;
		}
	}

	return backdrop;
};*/

export function GetBackdrop(genre, films) {
	const validFilms = films ? _.filter((films.data || films), (film) => getIsValid(film, genre.id)) : []
	const randomFilm = _.sample(validFilms)

	return randomFilm ? randomFilm.backdrop_path : undefined
}

export function getIsValid(film, genreId) {
	return film && (film.backdrop_path || '').length > 0 && _.includes(film.genre_ids, genreId)
}

export function GetBackdrops(genres, films) {
	var backdrops = [];

	// console.log(genres);
	// console.log(films);
	(genres || []).map(function(genre) {
		var backdrop = GetBackdrop(genre, films);
		if(backdrop)
		{
			backdrops[genre.id] = backdrop;
		}
	});

	return backdrops;
};
