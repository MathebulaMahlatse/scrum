describe('Unit Test for StoriesService', function() {
    beforeEach(angular.mock.module('scrum.teamStoriesServices'));

    var teamStoriesServices, httpBackEnd, actual;

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
        ],
        resources: [
            {
                name: "Test 1"
            },
            {
                name: "Test 2"
            }
        ]
    };

    var teamToBeStored = {
        teamName: 'team1',
        stories: []
    };

    beforeEach(inject(function($httpBackend, TeamStoriesServices) {
        httpBackEnd = $httpBackend;
        teamStoriesServices = TeamStoriesServices;

        httpBackEnd.expectGET('/mock/scrumData.json').respond(200, mockTeamData);

        teamStoriesServices.getStoriesAssignedToTeams().then(function (result) {
            actual = result;
        });
        httpBackEnd.flush();

    }));


    describe('getStoriesAssignedToTeams', function () {
        it('get stories assigned to team', function () {
            teamStoriesServices.getStoriesAssignedToTeams().then(function (team) {
                expect(team).toEqual(mockTeamData);
            });

        });
    });

    describe('when storing a team', function () {
        it('should store a team', function () {
            teamStoriesServices.storeTeam({
                teamName: 'name of the team'
            });
        });
    });

    describe('when adding Or edit Stories Assigned To Team', function () {
        it('should add a story to existing team', function () {
            teamStoriesServices.addOrEditStoriesAssignedToTeam({
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
            teamStoriesServices.addOrEditStoriesAssignedToTeam({
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
            teamStoriesServices.addOrEditStoriesAssignedToTeam({
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

    describe('get resources', function() {
        it('should return resources', function() {
            expect(teamStoriesServices.getResources()).toEqual(['Test 1', 'Test 2'])
        });
    });
});
