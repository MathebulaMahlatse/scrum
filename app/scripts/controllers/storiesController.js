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

    $scope.addOrEditStory = function (story) {
        ModalService.showModal({
            templateUrl: "views/storiesModal.html",
            controller: "StoriesModalController",
            inputs: {
                title: story
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
            });
        });
    };

    refreshViewModel(filterSelectedTeamForStories(selectedTeam.stories));

    function filterSelectedTeamForStories(stories) {
        return {
            backlogTasks: filterStoriesBasedOnStatus(stories, 'backlog'),
            todoTasks: filterStoriesBasedOnStatus(stories, 'todo'),
            inProgressTasks: filterStoriesBasedOnStatus(stories, 'in progress'),
            completedTasks: filterStoriesBasedOnStatus(stories, 'done')
        }
    }

    function filterStoriesBasedOnStatus(stories, status) {
        return _.filter(stories, {  status: status});
    }

    function refreshViewModel(stories) {
        $scope.storiesViewModel = [
            {
                header: 'Backlog',
                stories: stories.backlogTasks
            },
            {
                header: 'Todo',
                stories: stories.todoTasks
            },
            {
                header: 'In progress',
                stories: stories.inProgressTasks
            },
            {
                header: 'Done',
                stories: stories.completedTasks
            }
        ];
    }
}]);