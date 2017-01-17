var module = angular.module('scrum.teamStoriesServices', []);

module.factory('TeamStoriesServices', ['$http', '$q', function ($http, $q) {
    var _team = {};
    var _cachedScrumData = undefined;

    // TODO refactor this
    function generateStoryId(stories) {
        var lastAddedStory = _.last(stories);
        if(!_.isUndefined(lastAddedStory)) {
            return lastAddedStory.storyId + 1;
        }
        return 1;
    }

    function generateTeamId(team) {
        return _.last(team).teamId + 1;
    }

    function addOrEditStory(stories, newOrExistingStory) {
        var isStoryModified = false;
        _.forEach(stories, function (story) {
            if(story.storyId === newOrExistingStory.storyId) {
                story.description = newOrExistingStory.description;
                story.estimation = newOrExistingStory.estimation;
                story.owner = newOrExistingStory.owner;
                story.status = newOrExistingStory.status;

                isStoryModified = true;
            }
        });

        if(!isStoryModified) {
            stories.push({
                storyId: generateStoryId(stories),
                description: newOrExistingStory.description,
                estimation: newOrExistingStory.estimation,
                owner: newOrExistingStory.owner,
                status: newOrExistingStory.status
            })
        }
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

        addOrEditStoriesAssignedToTeam: function (storyAssociatedWithATeam) {
            var story = storyAssociatedWithATeam.story;
            _.forEach(_cachedScrumData.teams, function (team) {
                if(team.teamId == storyAssociatedWithATeam.teamId) {
                    addOrEditStory(team.stories, story);
                }

                return team;
            });
        },

        storeTeam: function (team) {
            _cachedScrumData.teams.push({
                teamId: generateTeamId(_cachedScrumData.teams),
                teamName: team.teamName,
                stories: team.stories
            });
        }
    };
}]);
