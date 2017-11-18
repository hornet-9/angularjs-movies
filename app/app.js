'use strict';


angular.module('MovieReviewsApp', [
  'ngRoute',
  'ngAnimate',
  'ngSanitize',
  'MovieReviewsApp.controllers',
  'MovieReviewsApp.directives',
  'MovieReviewsApp.services',
  'angular-toArrayFilter'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when("/movies", {templateUrl: "partials/moviesByMonth.html", controller: "moviesController"}).
    when("/movies/search/:query", { templateUrl: "partials/movieSearch.html", controller: "movieSearchController"}).
    when("/movies/:opening_date/:title", { templateUrl: "partials/movie.html", controller: "movieController"}).
		otherwise({redirectTo: '/movies'});
}]).filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]).
filter('formatSummary', function() {
  return function(input) {
  	return input && input.replace('Review: ', '');
  }
});