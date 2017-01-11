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
      'scrum.storiesService'
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
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.hashPrefix('');

  });
