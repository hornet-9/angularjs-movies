'use strict';

angular.module('MovieReviewsApp.controllers', []).
	controller('moviesController', function($scope, $location, moviesAPIservice, $anchorScroll, $timeout, pageState, helpers) {

		$scope.movies = [];
		$scope.dateText = "this month";

		// Use previous search parameters if we have them
		$scope.dateRange = pageState.dateRange || new Date();
		$scope.offset = pageState.offset || 0;
		$scope.pageState = pageState;

		$scope.dateISO = $scope.dateRange.toISOString().substring(0,7);

		function getMovies() {
			$scope.pageState.dateRange = $scope.dateRange;
			$scope.pageState.offset = $scope.offset;

			moviesAPIservice.getMovies($scope.dateISO, $scope.offset)
			.success(function (response) {
				$scope.movies = response.results;
				$scope.movies.has_more = response.has_more;
			});				
		}
		
		$scope.searchMovies = function(searchText) {

			if(searchText.length === 0) {
				// if cleared go back to main list
				$location.path( '/');
			} else if(searchText.length < 3) {
				// Don't start instant search until after 3 characters entered
				return;
			}

			$location.path( '/search/' + searchText);
		}

		$scope.searchFilter = function (movie) {

			return !$scope.criticsChoiceFilter || movie.critics_pick;
		};

		$scope.changeDates = function() {

			const dateTest = Date.parse($scope.dateRange);
			const startOf1900 = -2208988800000;
			if (!dateTest || dateTest < startOf1900) {
				return;
			}

			$scope.dateISO = $scope.dateRange.toISOString().substring(0,7);
			$scope.offset = 0;

			const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
			$scope.dateText = months[parseInt($scope.dateISO.substring(5,7)) - 1] + ' ' + $scope.dateISO.substring(0,4);

			getMovies();
		}

		$scope.linkToMovie = function(opening_date, title) {

			title = encodeURIComponent(encodeURIComponent(title)); // https://github.com/angular/angular.js/issues/10479
			$location.path( '/' + opening_date + '/' + title);
		}

		$scope.nextPage = function(next) {
			helpers.nextPage(next, $scope, getMovies, $anchorScroll);
		}

		helpers.noMoviesMsg($scope, $timeout);

		getMovies();
	}).
	controller('movieController', function($scope, $routeParams, moviesAPIservice) {
		$scope.title = $routeParams.title;
		$scope.opening_date = $routeParams.opening_date;
		$scope.movie = null;
		moviesAPIservice.getMovie($scope.opening_date, $scope.title).success(function (response) {
			$scope.movie = response.results && response.results[0]; 
		});
	}).
	controller('movieSearchController', function($scope, $routeParams, moviesAPIservice, $anchorScroll, $timeout, helpers) {
		$scope.movies = [];
		$scope.offset = 0;
		$scope.movieSearchText = "";

		function getMovies() {
			moviesAPIservice.movieSearch($routeParams.query, $scope.offset).success( function (response) {
				$scope.movieSearchText = $routeParams.query;
				$scope.movies = response.results;
				$scope.movies.has_more = response.has_more;
			});			
		}

		$scope.nextPage = function(next) {
			helpers.nextPage(next, $scope, getMovies, $anchorScroll);
		}

		helpers.noMoviesMsg($scope, $timeout);

		getMovies();

	});
