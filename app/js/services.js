'use strict';

angular.module('MovieReviewsApp.services', []).
factory('moviesAPIservice', function($http) {

    let moviesAPI = {};

    moviesAPI.getMovies = function(date, offset) {
        const daysInMonth = new Date(date.substring(0,4), date.substring(5,7), 0).getDate();
        const datePeriod = date + '-01;' + date + '-' + daysInMonth;
        return $http({ method: 'GET', url: 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=L7YZGa8N4GrfDcoicrL4ICAqLTaQQgJj&order=by-title&opening-date=' + datePeriod + '&offset=' + offset});
    }
    
    moviesAPI.getMovie = function(opening_date, title) {
        // Include opening date (if it exists) to avoid other movies with same name
        const dateSearch = !opening_date ? '&opening-date=' + opening_date : '';
            return $http({ method: 'GET', url: 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=L7YZGa8N4GrfDcoicrL4ICAqLTaQQgJj&query=\'' + title + '\'' + dateSearch});
    }

    moviesAPI.movieSearch = function(searchText, offset) {
        return $http({ method: 'GET', url: 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=L7YZGa8N4GrfDcoicrL4ICAqLTaQQgJj&order=by-title&query=' + searchText + '&offset=' + offset});
    }

    return moviesAPI;

}).
factory('pageState', function(){
    return {};
}).
factory('helpers', function () {
    var helper = {};

    helper.noMoviesMsg = function(scope, timeout){
        scope.noMoviesFlag = false;
        timeout(function () {
            scope.noMoviesFlag = true;
        }, 1500);
    };

    helper.nextPage = function(next, scope, getMovies, anchorScroll){
        scope.offset = next ? scope.offset + 20 : scope.offset - 20;
        getMovies();
        anchorScroll();
    };
    return helper;
});
