'use strict';

angular.module('MovieReviewsApp.services', []).
  factory('moviesAPIservice', function($http) {

    let moviesAPI = {};

    moviesAPI.getMovies = function(date, offset) {
		const daysInMonth = new Date(date.substring(0,4), date.substring(5,7), 0).getDate();
		const datePeriod = date + '-01;' + date + '-' + daysInMonth;

    	return $http({ method: 'GET', url: 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=292b053901534f9fafd16f72f1d017e0&order=by-title&opening-date=' + datePeriod + '&offset=' + offset});
    }
    
    moviesAPI.getMovie = function(opening_date, title) {
      // Include opening date (if it exists) to avoid other movies with same name
      let dateSearch = !opening_date ? '&opening-date=' + opening_date : '';
     	return $http({ method: 'GET', url: 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=292b053901534f9fafd16f72f1d017e0&query=\'' + title + '\'' + dateSearch});
    }

    moviesAPI.movieSearch = function(searchText, offset) {
     	return $http({ method: 'GET', url: 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=292b053901534f9fafd16f72f1d017e0&order=by-title&query=' + searchText + '&offset=' + offset});
    }

    return moviesAPI;
  }).
  factory('pageState', function(){
        return {};
  });