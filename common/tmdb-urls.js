String.prototype.format = function() {
    var content = this;
    for (var i=0; i < arguments.length; i++)
    {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);  
    }
    return content;
};

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
      misc_upcoming:              this.base+'/movie/upcoming?page={0}&api_key='+this.api_key,
      misc_now_playing:           this.base+'/movie/now_playing?page={0}&api_key='+this.api_key,
      misc_popular:               this.base+'/movie/popular?page={0}&api_key='+this.api_key,
      misc_top_rated:             this.base+'/movie/top-rated?page={0}&api_key='+this.api_key,
      movie_info:                 this.base+'/movie/{0}?api_key='+this.api_key,
      movie_alternative_titles:   this.base+'/movie/{0}/alternative_titles?api_key='+this.api_key,
      movie_casts:                this.base+'/movie/{0}/casts?api_key='+this.api_key,
      movie_images:               this.base+'/movie/{0}/images?api_key='+this.api_key,
      movie_keywords:             this.base+'/movie/{0}/keywords?api_key='+this.api_key,
      movie_releases:             this.base+'/movie/{0}/releases?api_key='+this.api_key,
      movie_trailers:             this.base+'/movie/{0}/trailers?api_key='+this.api_key,
      movie_translations:         this.base+'/movie/{0}/translations?api_key='+this.api_key,
      movie_similar:              this.base+'/movie/{0}/similar_movies?page={1}&api_key='+this.api_key,
      person_info:                this.base+'/person/{0}?api_key='+this.api_key,
      person_credits:             this.base+'/person/{0}/credits?api_key='+this.api_key,
      person_images:              this.base+'/person/{0}/images?api_key='+this.api_key,
      collection_info:            this.base+'/collection/{0}?api_key='+this.api_key,
      search_movie:               this.base+'/search/movie?query={0}&page={1}&api_key='+this.api_key,
      search_person:              this.base+'/search/person?query={0}&page={1}&api_key='+this.api_key,
      search_companies:           this.base+'/search/company?query={0}&page={1}&api_key='+this.api_key,
      auth_request_token:     this.base+'/authentication/token/new?api_key='+this.api_key,
      auth_session_id:      this.base+'/authentication/session/new?request_token={0}&api_key='+this.api_key,
      write_rate_movie:     this.base+'/movie/{0}/rating?session_id={1}&api_key='+this.api_key,
      company_info:               this.base+'/company/{0}?api_key='+this.api_key,
      company_movies:             this.base+'/company/{0}/movies?api_key='+this.api_key,
      account_info:               this.base+'/account?session_id={0}&api_key='+this.api_key,
      account_add_favorite:       this.base+'/account/{0}/favorite?session_id={1}&api_key='+this.api_key,
      account_favorite_movies:    this.base+'/account/{0}/favorite_movies?session_id={1}&api_key='+this.api_key,
      account_add_movie_watchlist: this.base+'/account/{0}/movie_watchlist?session_id={1}&api_key='+this.api_key,
      account_movie_watchlist:    this.base+'/account/{0}/movie_watchlist?session_id={1}&api_key='+this.api_key,
      account_rated_movies:       this.base+'/account/{0}/rated_movies?session_id={1}&api_key='+this.api_key,
      genre_list:                 this.base+'/genre/list?api_key='+this.api_key,
      genre_movies:               this.base+'/genre/{0}/movies?page={0}&page={1}&api_key='+this.api_key
    };
};

/**
 * factory function
 **/
module.exports.init = function(apikey) {
  return new tmdb(apikey);
};