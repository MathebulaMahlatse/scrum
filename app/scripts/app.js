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
            templateUrl: 'views/scrumTeams.html',
            controller: 'TeamController'
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
