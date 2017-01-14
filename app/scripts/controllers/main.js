'use strict';

/**
 * @ngdoc function
 * @name prodAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the prodAngularApp
 */
angular.module('scrum')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
