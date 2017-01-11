var module = angular.module('scrum.storiesService', []);

module.factory('StoriesService', function ($http) {
    return {
        getStoriesAssignedToTeams: function () {
            return $http.get('/mock/scrumData.json').then(function (response) {
                return response.data;
            })
        }
    };
});
