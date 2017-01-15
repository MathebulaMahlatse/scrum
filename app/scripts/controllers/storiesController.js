var module = angular.module('scrum.storiesController',
    [
        'scrum.storiesService',
        'angularModalService'
    ]);

module.controller('StoriesController', ['$scope', '$location', 'StoriesService', 'ModalService', function ($scope, $location, StoriesService, ModalService) {
    var selectedTeam = StoriesService.retrieveSelectedTeam();

    if(selectedTeam && !selectedTeam.teamId > 0) {
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
            modal.close.then(function(story) {
                if(!_.isUndefined(story)) {
                    var updatedStory = {
                        teamId: selectedTeam.teamId,
                        story: {
                            storyId: story.storyId,
                            description: story.description,
                            estimation: story.estimation,
                            owner: story.owner,
                            status: story.status
                        }
                    };

                    StoriesService.addOrEditStoriesAssignedToTeam(updatedStory);
                    refreshModelAfterAddOrEditOperation();
                }
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

    function refreshModelAfterAddOrEditOperation() {
        StoriesService.getStoriesAssignedToTeams().then(function (response) {
            _.forEach(response.teams, function (team) {
                if(team.teamId === selectedTeam.teamId) {
                    refreshViewModel(filterSelectedTeamForStories(team.stories));
                }
            });
        });

    }
}]);