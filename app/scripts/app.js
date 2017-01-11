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
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
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
