'use strict';

/**
 * @ngdoc overview
 * @name prodAngularApp
 * @description
 * # prodAngularApp
 *
 * Main module of the application.
 */
angular
  .module('prodAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
      'scrum.teamController',
      'scrum.storiesService',
      'scrum.storiesController',
      'scrum.teamModal'
  ])
  .config(function ($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'views/scrumTeams.html',
            controller: 'TeamController'
          })
          .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
          })
        .when('/stories', {
            templateUrl: 'views/stories.html',
            controller: 'StoriesController'
        })
          .otherwise({
            redirectTo: '/'
          });

          $locationProvider.hashPrefix('');

  });
