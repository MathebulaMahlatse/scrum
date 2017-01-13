var module = angular.module('scrum.storiesController',
    [
        'scrum.storiesService',
        'angularModalService'
    ]);

module.controller('StoriesController', ['$scope', '$location', 'StoriesService', 'ModalService', function ($scope, $location, StoriesService, ModalService) {
    var selectedTeam = StoriesService.retrieveSelectedTeam();

    if(selectedTeam && !selectedTeam.teamName) {
        $location.path('/');
    }
    $scope.teamName = selectedTeam && selectedTeam.teamName;
    filterSelectedTeam(selectedTeam);


    $scope.addOrEditStory = function (story) {
        ModalService.showModal({
            templateUrl: "views/storiesModal.html",
            controller: "StoriesModalController",
            inputs: {
                title: "Adding a team",
                story: story
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
            });
        });
    };

    $scope.storiesViewModel = [
        {
            header: 'Backlog',
            stories: $scope.backlogTasks
        },
        {
            header: 'Todo',
            stories: $scope.todoTasks
        },
        {
            header: 'In progress',
            stories: $scope.inProgressTasks
        },
        {
            header: 'Done',
            stories: $scope.completedTasks
        }
    ];



    function filterSelectedTeam(selectedTeam) {
        $scope.backlogTasks = _.filter(selectedTeam.stories, {status: 'backlog'});
        $scope.todoTasks = _.filter(selectedTeam.stories, {status: 'todo'});
        $scope.inProgressTasks = _.filter(selectedTeam.stories, {status: 'in progress'});
        $scope.completedTasks = _.filter(selectedTeam.stories, {status: 'done'});
    }
}]);