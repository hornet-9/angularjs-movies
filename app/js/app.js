'use strict';

// The main application module can be thought of as the entry point to an app, the equivalent of a ‘main’ function.
// Recommended a module for each feature/reusable component and a main application module with initialisation code
// and dependencies on the sub-modules.

angular.module('MovieReviewsApp', [
  'ngRoute',
  'ngAnimate',
  'ngSanitize',
  'MovieReviewsApp.controllers',
  'MovieReviewsApp.directives',
  'MovieReviewsApp.services'
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