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
	var genreFilms = (genre.films || {}).results || [];
	var backdrop = null;

	if(genreFilms != undefined && genreFilms.length > 0)
	{
		var counter = 0;
		while((backdrop == null || backdrop == "") && counter < 10000)
		{
			var randomNumber = _.random(genreFilms.size - 1);
			backdrop = genreFilms[randomNumber].backdrop_path;
			counter++;
		}
	}

	return backdrop;
}

export function GetBackdrops(genres, films) {
	var backdrops = [];

	//console.log(genres);
	(genres || []).map(function(genre) {
		var backdrop = GetBackdrop(genre, films);
		if(backdrop)
		{
			backdrops[genre.id] = backdrop;
		}
	});

	return backdrops;
};
