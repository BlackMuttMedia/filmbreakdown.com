/* eslint-disable */
/*String.prototype.format = function() {
    var content = this;
    for (var i=0; i < arguments.length; i++)
    {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);  
    }
    return content;
};*/

var me;
var tmdb = function(api_key) {
  me = this;
  this.api_key = api_key;
  this.config = null;
  this.base = 'http://api.themoviedb.org/3';  
  this.api_urls =
    {
      configuration:              this.base+'/configuration?api_key='+this.api_key,
      misc_latest:                this.base+'/latest/movie?api_key='+this.api_key,
      misc_upcoming:              this.base+'/movie/upcoming?page=%s&api_key='+this.api_key,
      misc_now_playing:           this.base+'/movie/now_playing?page=%s&api_key='+this.api_key,
      misc_popular:               this.base+'/movie/popular?page=%s&api_key='+this.api_key,
      misc_top_rated:             this.base+'/movie/top-rated?page=%s&api_key='+this.api_key,
      movie_info:                 this.base+'/movie/%s?api_key='+this.api_key+'&append_to_response=credits',
      movie_alternative_titles:   this.base+'/movie/%s/alternative_titles?api_key='+this.api_key,
      movie_casts:                this.base+'/movie/%s/casts?api_key='+this.api_key,
      movie_images:               this.base+'/movie/%s/images?api_key='+this.api_key,
      movie_keywords:             this.base+'/movie/%s/keywords?api_key='+this.api_key,
      movie_releases:             this.base+'/movie/%s/releases?api_key='+this.api_key,
      movie_trailers:             this.base+'/movie/%s/trailers?api_key='+this.api_key,
      movie_translations:         this.base+'/movie/%s/translations?api_key='+this.api_key,
      movie_similar:              this.base+'/movie/%s/similar_movies?page=%s&api_key='+this.api_key,
      person_info:                this.base+'/person/%s?api_key='+this.api_key,
      person_credits:             this.base+'/person/%s/credits?api_key='+this.api_key,
      person_images:              this.base+'/person/%s/images?api_key='+this.api_key,
      collection_info:            this.base+'/collection/%s?api_key='+this.api_key,
      search_movie:               this.base+'/search/movie?query=%s&page=%s&api_key='+this.api_key,
      search_person:              this.base+'/search/person?query=%s&page=%s&api_key='+this.api_key,
      search_companies:           this.base+'/search/company?query=%s&page=%s&api_key='+this.api_key,
      auth_request_token:     this.base+'/authentication/token/new?api_key='+this.api_key,
      auth_session_id:      this.base+'/authentication/session/new?request_token=%s&api_key='+this.api_key,
      write_rate_movie:     this.base+'/movie/%s/rating?session_id=%s&api_key='+this.api_key,
      company_info:               this.base+'/company/%s?api_key='+this.api_key,
      company_movies:             this.base+'/company/%s/movies?api_key='+this.api_key,
      account_info:               this.base+'/account?session_id=%s&api_key='+this.api_key,
      account_add_favorite:       this.base+'/account/%s/favorite?session_id=%s&api_key='+this.api_key,
      account_favorite_movies:    this.base+'/account/%s/favorite_movies?session_id=%s&api_key='+this.api_key,
      account_add_movie_watchlist: this.base+'/account/%s/movie_watchlist?session_id=%s&api_key='+this.api_key,
      account_movie_watchlist:    this.base+'/account/%s/movie_watchlist?session_id=%s&api_key='+this.api_key,
      account_rated_movies:       this.base+'/account/%s/rated_movies?session_id=%s&api_key='+this.api_key,
      genre_list:                 this.base+'/genre/list?api_key='+this.api_key,
      genre_movies:               this.base+'/genre/%s/movies?page=%s&api_key='+this.api_key
    };
};

/**
 * factory function
 **/
module.exports.init = function(apikey) {
  return new tmdb(apikey);
};