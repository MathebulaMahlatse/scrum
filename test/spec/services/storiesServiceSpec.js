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

    var teamToBeStored = {
        teamName: 'team1',
        stories: []
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
            storiesService.getStoriesAssignedToTeams().then(function (team) {
                expect(team).toEqual(mockTeamData);
            });

        });
    });

    /*describe('addStoriesAssignedToTeam', function () {
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


            storiesService.getStoriesAssignedToTeams().then(function (team) {
                expect(team).toEqual({
                    teams: [
                        {
                            teamId: 11,
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
                })
            });

        });
    });

    describe('storeTeam', function () {
        it('should add a team', function () {
            storiesService.storeTeam(teamToBeStored);

            storiesService.getStoriesAssignedToTeams().then(function (team) {
                console.log('aaaa')
                expect(team).toEqual({
                    what: ''
                });
            });
        });
    });*/
});
