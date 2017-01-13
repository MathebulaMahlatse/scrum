var module = angular.module('scrum.teamController',
    [
        'angularModalService'
    ]);

module.controller('TeamController',['$scope', 'StoriesService', '$location', 'ModalService' ,function ($scope, StoriesService, $location, ModalService) {
    StoriesService.getStoriesAssignedToTeams().then(function (response) {
        $scope.teamsAndStoriesOverview = filterStoriesBasedOnAStatus(response.teams);
    });

    $scope.selectTeam = function (team) {
        StoriesService.storeSelectedTeam(team);
        $location.path('/stories');
    };

    $scope.addTeam = function () {
        ModalService.showModal({
            templateUrl: "views/teamModal.html",
            controller: "TeamModalController",
            inputs: {
                title: "Adding a team"
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.teamsAndStoriesOverview.push({
                    teamName: result.teamName,
                    statusOfStories: {
                        backlog: 0,
                        todo: 0,
                        inProgress: 0,
                        done: 0
                    }
                })
            });
        });
    };

    function filterStoriesBasedOnAStatus(teams) {
        return _.map(teams, function (team) {
            team.statusOfStories = {
                backlog: _.filter(team.stories, {'status': 'backlog'}).length,
                todo: _.filter(team.stories, {'status': 'todo'}).length,
                inProgress:_.filter(team.stories, {'status': 'in progress'}).length,
                done:  _.filter(team.stories, {'status': 'done'}).length
            };

            return team;
        });
    }
}]);