describe('Unit Test for team controller', function () {
    beforeEach(angular.mock.module('scrum.teamController'));

    var scope, storiesService, location, modalService;
    beforeEach(inject(function ($controller, $rootScope, $q) {
        scope = $rootScope.$new();
        storiesService = jasmine.createSpyObj('StoriesService', ['getStoriesAssignedToTeams', 'storeSelectedTeam']);
        location = jasmine.createSpyObj('$location', ['path']);
        modalService = jasmine.createSpyObj('ModalService', ['showModal']);

        storiesService.getStoriesAssignedToTeams.and.returnValue($q.when({
            teams: [
                {
                    teamName: 'team 1',
                    teamId: 'an id of the team',
                    stories: [
                        {
                            storyId: 'an id of the story',
                            status: 'backlog'
                        }
                    ]
                }
            ]
        }));

        modalService.showModal.and.returnValue($q.when({
            team: 'team'
        }));

        $controller('TeamController', {
            $scope: scope,
            StoriesService: storiesService,
            $location: location,
            ModalService: modalService
        });

        scope.$digest();
    }));

    describe('when initialization', function () {
        it('should have called get stories assigned to teams', function () {
            expect(storiesService.getStoriesAssignedToTeams).toHaveBeenCalled();
        });

        it('should set teams and stories to model on the scope', function () {
            expect(scope.teamsAndStoriesOverview).toEqual([{
                teamName: 'team 1',
                teamId: 'an id of the team',
                stories: [
                    {
                        storyId: 'an id of the story',
                        status: 'backlog'
                    }
                ],
                statusOfStories: {
                    backlog: 1,
                    todo: 0,
                    inProgress: 0,
                    done: 0
                }
            }]);
        });
    });

    describe('when selecting a team', function () {
        it('should store selected team and call location.path', function () {
            var team = {
                teamId: 'selected team Id'

            };
            scope.selectTeam(team);

            expect(storiesService.storeSelectedTeam).toHaveBeenCalledWith(team);
            expect(location.path).toHaveBeenCalledWith('/stories');
        });
    });

    describe('when adding a team', function () {
        it('should have called show modal', function () {
            scope.addTeam();
            expect(modalService.showModal).toHaveBeenCalledWith({
                templateUrl: "views/teamModal.html",
                controller: "TeamModalController",
                inputs: {
                    title: "Adding a team"
                }
            })
        });
    });
});