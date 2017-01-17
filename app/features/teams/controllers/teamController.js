var module = angular.module('scrum.teamController',
    [
        'angularModalService',
        'scrum.localStorage',
        'scrum.teamStoriesServices',
        'scrum.teamModal'
    ]);

module.controller('TeamController',['$scope', 'TeamStoriesServices', '$location', 'ModalService', 'LocalStorage' ,
    function ($scope, TeamStoriesServices, $location, ModalService, LocalStorage) {
    refreshModel();

    $scope.selectTeam = function (team) {
        LocalStorage.addModel(team);
        $location.path('/stories');
    };

    $scope.addTeam = function () {
        ModalService.showModal({
            templateUrl: "features/teams/views/teamModal.html",
            controller: "TeamModalController",
            inputs: {
                title: "Adding a team"
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if(!_.isUndefined(result)) {
                    TeamStoriesServices.storeTeam({
                        teamName: result.teamName,
                        stories: []
                    });

                    refreshModel();
                }
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

    function refreshModel() {
        TeamStoriesServices.getStoriesAssignedToTeams().then(function (response) {
            $scope.teamsAndStoriesOverview = filterStoriesBasedOnAStatus(response.teams);
        });
    }
}]);