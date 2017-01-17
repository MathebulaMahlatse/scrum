describe('Unit Test for Stories Controller', function () {
    beforeEach(angular.mock.module('scrum.storiesController'));

    var scope, controller, teamStoriesServices, location,modalService, localStorage;
    function initialize() {
        controller('StoriesController', {
            $scope: scope,
            TeamStoriesServices: teamStoriesServices,
            $location: location,
            ModalService: modalService,
            LocalStorage: localStorage
        })
    }
    beforeEach(inject(function ($controller, $rootScope, $q) {
        scope = $rootScope.$new();
        teamStoriesServices = jasmine.createSpyObj('TeamStoriesServices', ['addOrEditStoriesAssignedToTeam', 'getStoriesAssignedToTeams']);
        localStorage = jasmine.createSpyObj('LocalStorage', ['retrieveModel']);
        location = jasmine.createSpyObj('$location', ['path']);
        modalService = jasmine.createSpyObj('ModalService', ['showModal']);

        controller = $controller;

        localStorage.retrieveModel.and.returnValue({
            teamName: 'some team name',
            teamId: 1,
            stories: [
                {
                    storyId: 'id',
                    status: 'backlog'
                }
            ]
        });

        modalService.showModal.and.returnValue($q.when({
            element: {
                modal: function () {}
            },
            close: $q.when({
                storyId: 1,
                description: 'description',
                estimation: 'estimation',
                owner: 'owner',
                status: 'status'
            })
        }));

        teamStoriesServices.getStoriesAssignedToTeams.and.returnValue($q.when({
            teams: [
                {
                    teamName: 'team name',
                    teamId: 1,
                    stories: [
                        {
                            storyId: 1,
                            description: 'description',
                            estimation: 'estimation',
                            owner: 'owner',
                            status: 'status'
                        }
                    ]

                }
            ]
        }))
    }));

    describe('when initializing', function () {
        beforeEach(function () {
            initialize();
        });
        it('should retrieve selected team', function () {
            expect(localStorage.retrieveModel).toHaveBeenCalled()
        });

        it('should get a team name', function () {
            expect(scope.teamName).toEqual('some team name')
        });

        it('should set stories view model', function () {
            expect(scope.storiesViewModel).toEqual([
                {
                    header: 'Backlog',
                    stories: [
                        {
                            storyId: 'id',
                            status: 'backlog'
                        }
                    ]
                },
                {
                    header: 'Todo',
                    stories: []
                },
                {
                    header: 'In progress',
                    stories: []
                },
                {
                    header: 'Done',
                    stories: []
                }
            ])
        });

        it('should call location.path when nothing is selected', function () {
            localStorage.retrieveModel.and.returnValue({});
            initialize();
            expect(location.path).toHaveBeenCalledWith('/');
        });
    });

    describe('when adding or editing a story', function () {
        it('should call modal', function () {
            var story = 'some story';
            initialize();
            scope.addOrEditStory(story);
            scope.$digest();
            expect(modalService.showModal).toHaveBeenCalledWith({
                templateUrl: "features/stories/views/storiesModal.html",
                controller: "StoriesModalController",
                inputs: {
                    title: story
                }
            });

            expect(teamStoriesServices.addOrEditStoriesAssignedToTeam).toHaveBeenCalledWith({
                teamId: 1,
                story: {
                    storyId: 1,
                    description: 'description',
                    estimation: 'estimation',
                    owner: 'owner',
                    status: 'status'
                }
            });

            expect(teamStoriesServices.getStoriesAssignedToTeams).toHaveBeenCalled();
        });
    });
});