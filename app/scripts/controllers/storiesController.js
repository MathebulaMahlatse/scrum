var module = angular.module('scrum.storiesController',
    [
        'scrum.storiesService'
    ]);

module.controller('StoriesController', ['$scope', '$location', 'StoriesService', function ($scope, $location, StoriesService) {
    var selectedTeam = StoriesService.retrieveSelectedTeam();

    if(selectedTeam && !selectedTeam.teamName) {
        $location.path('/');
    }
    $scope.teamName = selectedTeam && selectedTeam.teamName;
    filterSelectedTeam(selectedTeam);

    function filterSelectedTeam(selectedTeam) {
        $scope.backlogTasks = _.filter(selectedTeam.stories, {status: 'backlog'});
        $scope.todoTasks = _.filter(selectedTeam.stories, {status: 'todo'});
        $scope.inProgressTasks = _.filter(selectedTeam.stories, {status: 'in progress'});
        $scope.completedTasks = _.filter(selectedTeam.stories, {status: 'done'});
    }
}]);