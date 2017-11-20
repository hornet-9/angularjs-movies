'use strict';

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
		when("/", {templateUrl: "partials/moviesByMonth.html", controller: "moviesController"}).
        when("/search/:query", { templateUrl: "partials/movieSearch.html", controller: "movieSearchController"}).
        when("/:opening_date/:title", { templateUrl: "partials/movie.html", controller: "movieController"}).
		otherwise({redirectTo: '/'});
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