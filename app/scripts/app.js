'use strict';
angular
  .module('scrum', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'scrum.teamController',
      'scrum.storiesService',
      'scrum.storiesController',
      'scrum.teamModal',
      'scrum.storiesModal'
  ])
  .config(function ($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'features/teams/views/scrumTeams.html',
            controller: 'TeamController'
          })
          .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
          })
        .when('/stories', {
            templateUrl: 'features/stories/views/stories.html',
            controller: 'StoriesController'
        })
          .otherwise({
            redirectTo: '/'
          });

          $locationProvider.hashPrefix('');

  });
