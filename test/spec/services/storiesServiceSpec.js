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
            },
            {
                teamId: 3,
                stories: []
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

    describe('when storing a team', function () {
        it('should store a team', function () {
            storiesService.storeTeam({
                teamName: 'name of the team'
            });
        });
    });

    describe('when adding Or edit Stories Assigned To Team', function () {
        it('should add a story to existing team', function () {
            storiesService.addOrEditStoriesAssignedToTeam({
                teamId: 1,
                story: {
                    description: 'description',
                    estimation: 'estimation',
                    owner: 'owner',
                    status: 'status'
                }
            });
        });

        it('should edit a story to existing team', function () {
            storiesService.addOrEditStoriesAssignedToTeam({
                teamId: 1,
                story: {
                    storyId: 1,
                    description: 'description',
                    estimation: 'estimation',
                    owner: 'owner',
                    status: 'status'
                }
            });
        });
    });

    describe('when adding a story to a team with no existing stories', function () {
        it('should a story', function () {
            storiesService.addOrEditStoriesAssignedToTeam({
                teamId: 3,
                story: {
                    description: 'description',
                    estimation: 'estimation',
                    owner: 'owner',
                    status: 'status'
                }
            });
        });
    });
});
