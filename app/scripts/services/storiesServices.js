var module = angular.module('scrum.storiesService', []);

module.factory('StoriesService', ['$http', '$q', function ($http, $q) {
    var _team = {};
    var _cachedScrumData = undefined;

    function generateStoryId(stories) {
        var lastAddedStory = _.last(stories);
        return lastAddedStory.storyId + 1;
    }

    return {
        getStoriesAssignedToTeams: function () {
            if(_.isUndefined(_cachedScrumData)) {
                return $http.get('/mock/scrumData.json').then(function (response) {
                    _cachedScrumData = response.data;
                    return response.data;
                })
            } else {
                var deferred = $q.defer();
                deferred.resolve(_cachedScrumData);
                return deferred.promise
            }

        },

        addStoriesAssignedToTeam: function (storyAssociatedWithATeam) {
            var story = storyAssociatedWithATeam.story;
            _.forEach(_cachedScrumData.teams, function (team) {
                if(team.teamId == storyAssociatedWithATeam.teamId) {
                    team.stories.push({
                        storyId: generateStoryId(team.stories),
                        description: story.description,
                        estimation: story.estimation,
                        owner: story.owner,
                        status: story.status
                    });

                    return team;
                }

                return team;
            });
        },
        storeSelectedTeam: function (selectedTeam) {
            _team = selectedTeam;
        },
        retrieveSelectedTeam: function () {
            return _team;
        }
    };
}]);
