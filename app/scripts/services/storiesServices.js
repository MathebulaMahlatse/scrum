var module = angular.module('scrum.storiesService', []);

module.factory('StoriesService', ['$http', function ($http) {
    var _team = {};
    return {
        getStoriesAssignedToTeams: function () {
            return $http.get('/mock/scrumData.json').then(function (response) {
                return response.data;
            })
        },
        storeSelectedTeam: function (selectedTeam) {
            _team = selectedTeam;
        },
        retrieveSelectedTeam: function () {
            return _team;
        }
    };
}]);
