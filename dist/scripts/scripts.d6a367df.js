"use strict";angular.module("prodAngularApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","scrum.teamController","scrum.storiesService","scrum.storiesController","scrum.teamModal","scrum.storiesModal"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/scrumTeams.html",controller:"TeamController"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/stories",{templateUrl:"views/stories.html",controller:"StoriesController"}).otherwise({redirectTo:"/"}),b.hashPrefix("")}]),angular.module("prodAngularApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("prodAngularApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);var module=angular.module("scrum.storiesService",[]);module.factory("StoriesService",["$http","$q",function(a,b){function c(a){var b=_.last(a);return _.isUndefined(b)?1:b.storyId+1}function d(a){return _.last(a).teamId}function e(a,b){var d=!1;_.forEach(a,function(a){a.storyId===b.storyId&&(a.description=b.description,a.estimation=b.estimation,a.owner=b.owner,a.status=b.status,d=!0)}),d||a.push({storyId:c(a),description:b.description,estimation:b.estimation,owner:b.owner,status:b.status})}var f={},g=void 0;return{getStoriesAssignedToTeams:function(){if(_.isUndefined(g))return a.get("/mock/scrumData.json").then(function(a){return g=a.data,a.data});var c=b.defer();return c.resolve(g),c.promise},addOrEditStoriesAssignedToTeam:function(a){var b=a.story;_.forEach(g.teams,function(c){return c.teamId==a.teamId&&e(c.stories,b),c})},storeTeam:function(a){g.teams.push({teamId:d(g.teams),teamName:a.teamName,stories:a.stories})},storeSelectedTeam:function(a){f=a},retrieveSelectedTeam:function(){return f}}}]);var module=angular.module("scrum.teamController",["angularModalService"]);module.controller("TeamController",["$scope","StoriesService","$location","ModalService",function(a,b,c,d){function e(a){return _.map(a,function(a){return a.statusOfStories={backlog:_.filter(a.stories,{status:"backlog"}).length,todo:_.filter(a.stories,{status:"todo"}).length,inProgress:_.filter(a.stories,{status:"in progress"}).length,done:_.filter(a.stories,{status:"done"}).length},a})}b.getStoriesAssignedToTeams().then(function(b){a.teamsAndStoriesOverview=e(b.teams)}),a.selectTeam=function(a){b.storeSelectedTeam(a),c.path("/stories")},a.addTeam=function(){d.showModal({templateUrl:"views/teamModal.html",controller:"TeamModalController",inputs:{title:"Adding a team"}}).then(function(c){c.element.modal(),c.close.then(function(c){b.storeTeam({teamName:c.teamName,stories:[]}),a.teamsAndStoriesOverview.push({teamName:c.teamName,statusOfStories:{backlog:0,todo:0,inProgress:0,done:0}})})})}}]);var module=angular.module("scrum.storiesController",["scrum.storiesService","angularModalService"]);module.controller("StoriesController",["$scope","$location","StoriesService","ModalService",function(a,b,c,d){function e(a){return{backlogTasks:f(a,"backlog"),todoTasks:f(a,"todo"),inProgressTasks:f(a,"in progress"),completedTasks:f(a,"done")}}function f(a,b){return _.filter(a,{status:b})}function g(b){a.storiesViewModel=[{header:"Backlog",stories:b.backlogTasks},{header:"Todo",stories:b.todoTasks},{header:"In progress",stories:b.inProgressTasks},{header:"Done",stories:b.completedTasks}]}function h(){c.getStoriesAssignedToTeams().then(function(a){_.forEach(a.teams,function(a){a.teamId===i.teamId&&g(e(a.stories))})})}var i=c.retrieveSelectedTeam();i&&!i.teamName&&b.path("/"),a.teamName=i&&i.teamName,a.addOrEditStory=function(a){d.showModal({templateUrl:"views/storiesModal.html",controller:"StoriesModalController",inputs:{title:a}}).then(function(a){a.element.modal(),a.close.then(function(a){if(!_.isUndefined(a)){var b={teamId:i.teamId,story:{storyId:a.storyId,description:a.description,estimation:a.estimation,owner:a.owner,status:a.status}};c.addOrEditStoriesAssignedToTeam(b),h()}})})},g(e(i.stories))}]);var app=angular.module("scrum.teamModal",[]);app.controller("TeamModalController",["$scope","$element","title","close",function(a,b,c,d){a.title=c,a.name=null,a.submitForm=function(){b.modal("hide"),d({teamName:a.name},500)},a.cancel=function(){b.modal("hide"),d({teamName:a.name},500)}}]);var app=angular.module("scrum.storiesModal",[]);app.controller("StoriesModalController",["$scope","$element","title","close",function(a,b,c,d){function e(){_.isUndefined(c)&&(a.status="backlog",a.estimation="small",a.owner="Mahlatse - Product Owner"),a.statusOfTasks=["backlog","todo","in progress","done"],a.estimationStages=["small","medium","large"],a.ownerOfStory=["Mahlatse - Product Owner","Sharon - BA","William - The developer"]}a.description=c&&c.description,a.estimation=c&&c.estimation,a.owner=c&&c.owner,a.status=c&&c.status,e(),a.submitForm=function(){b.modal("hide"),d({storyId:c&&c.storyId,description:a.description,estimation:a.estimation,owner:a.owner,status:a.status},500)},a.cancel=function(){b.modal("hide"),d({},500)}}]);