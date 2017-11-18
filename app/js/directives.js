'use strict';

/* Directives */

angular.module('MovieReviewsApp.directives', []).
  directive("movieList", function() {
        return{
            restrict: 'E',
            templateUrl:"partials/movieTable.html",
		    link: function(scope, elem, attrs){
		      scope.movies.push[attrs];
		    }
        }
    });