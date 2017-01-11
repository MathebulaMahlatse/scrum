'use strict';

/**
 * @ngdoc function
 * @name prodAngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the prodAngularApp
 */
angular.module('prodAngularApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
