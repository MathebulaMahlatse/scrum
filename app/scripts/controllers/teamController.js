var module = angular.module('scrum.teamController', []);

module.controller('TeamController', function ($scope, StoriesService) {
    StoriesService.getStoriesAssignedToTeams().then(function (response) {
        $scope.teamsAndStoriesOverview = filterStoriesBasedOnAStatus(response.teams);
    });

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
});