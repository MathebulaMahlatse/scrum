"use strict";angular.module("prodAngularApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","scrum.teamController","scrum.storiesService"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/scrumTeams.html",controller:"TeamController"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"}),b.hashPrefix("")}]),angular.module("prodAngularApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("prodAngularApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);var module=angular.module("scrum.storiesService",[]);module.factory("StoriesService",["$http",function(a){return{getStoriesAssignedToTeams:function(){return a.get("/mock/scrumData.json").then(function(a){return a.data})}}}]);var module=angular.module("scrum.teamController",[]);module.controller("TeamController",["$scope","StoriesService",function(a,b){function c(a){return _.map(a,function(a){return a.statusOfStories={backlog:_.filter(a.stories,{status:"backlog"}).length,todo:_.filter(a.stories,{status:"todo"}).length,inProgress:_.filter(a.stories,{status:"in progress"}).length,done:_.filter(a.stories,{status:"done"}).length},a})}b.getStoriesAssignedToTeams().then(function(b){a.teamsAndStoriesOverview=c(b.teams)})}]);