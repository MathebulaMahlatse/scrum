describe('Unit Test for StoriesService', function() {
    beforeEach(angular.mock.module('scrum.storiesService'));

    var storiesService, httpBackEnd, actual;

    var mockTeamData = {
        teams: [
            {
                teamId: 1,
                stories: [
                    {
                        storyId: 1,
                        status: ''
                    }
                ]
            },
            {
                teamId: 2,
                stories: [
                    {
                        storyId: 1,
                        status: ''
                    }
                ]
            }
        ]
    };

    beforeEach(inject(function($httpBackend, StoriesService) {
        httpBackEnd = $httpBackend;
        storiesService = StoriesService;

        httpBackEnd.expectGET('/mock/scrumData.json').respond(200, mockTeamData);

        storiesService.getStoriesAssignedToTeams().then(function (result) {
            actual = result;
        });
        httpBackEnd.flush();

    }));


    describe('getStoriesAssignedToTeams', function () {
        it('get stories assigned to team', function () {
            expect(storiesService.getStoriesAssignedToTeams()).toEqual(mockTeamData)
        });
    });

    describe('addStoriesAssignedToTeam', function () {
        it('should store stories', function () {
            var story = {
                teamId: 1,
                story: {
                    storyId: 1,
                    description: 'testing',
                    estimation: 'large',
                    status: 'backlog',
                    owner: 'William, developer'
                }
            };

            storiesService.addStoriesAssignedToTeam(story);

            expect(storiesService.getStoriesAssignedToTeams()).toEqual({
                teams: [
                    {
                        teamId: 1,
                        stories: [
                            {
                                storyId: 1,
                                status: ''
                            },
                            {
                                storyId: 2,
                                description: 'testing',
                                estimation: 'large',
                                status: 'backlog',
                                owner: 'William, developer'
                            }
                        ]
                    },
                    {
                        teamId: 2,
                        stories: [
                            {
                                storyId: 1,
                                status: ''
                            }
                        ]
                    }
                ]
            });

        });
    });
});
