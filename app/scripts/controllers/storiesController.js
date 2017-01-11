var module = angular.module('scrum.storiesController',
    [
        'scrum.storiesService'
    ]);

module.controller('StoriesController', ['$scope', 'StoriesService', function ($scope, StoriesService) {
    filterSelectedTeam(StoriesService.retrieveSelectedTeam());

    function filterSelectedTeam(selectedTeam) {
        $scope.backlogTasks = _.filter(selectedTeam.stories, {status: 'backlog'});
        $scope.todoTasks = _.filter(selectedTeam.stories, {status: 'todo'});
        $scope.inProgressTasks = _.filter(selectedTeam.stories, {status: 'inProgress'});
        $scope.completedTasks = _.filter(selectedTeam.stories, {status: 'done'});
    }
}]);