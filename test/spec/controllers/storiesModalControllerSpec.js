describe('Unit Test for stories modal controller', function () {
    beforeEach(angular.mock.module('scrum.storiesModal'));

    var scope, element, controller;

    function initialize(story) {
        if(story !== undefined) {
            story = {
                description: story.description,
                estimation: story.estimation,
                owner: story.owner,
                status: story.status
            }
        }

        controller('StoriesModalController', {
            $scope: scope,
            $element: element,
            title: story,
            close: function (model, timeout) {}
        })
    }

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        element = jasmine.createSpyObj('$element', ['modal']);
        controller = $controller;
    }));

    describe('when initializing', function () {
        var description = 'description of the story';
        var estimation = 'estimation of the story';
        var owner = 'some owner';
        var status = 'some status';

        beforeEach(function () {
            initialize({
                description: description,
                estimation: estimation,
                owner: owner,
                status: status
            });
        });
        it('should set shared values to local scope variables', function () {
            expect(scope.description).toEqual(description);
            expect(scope.estimation).toEqual(estimation);
            expect(scope.owner).toEqual(owner);
            expect(scope.status).toEqual(status);
        });

        it('should set dropdown data', function () {
            expect(scope.statusOfTasks).toEqual(['backlog', 'todo', 'in progress', 'done']);
            expect(scope.estimationStages).toEqual(['small', 'medium', 'large']);
            expect(scope.ownerOfStory).toEqual(['Mahlatse - Product Owner', 'Sharon - BA', 'William - The developer'])
        });
    });

    describe('when initializing and there are no shared values', function () {
        it('should set dropdown data to default values', function () {
            initialize();
            expect(scope.status).toEqual('backlog');
            expect(scope.estimation).toEqual('small');
            expect(scope.owner).toEqual('Mahlatse - Product Owner');
        });
    });

    describe('when submitting form', function () {
        it('should hide modal', function () {
            initialize();
            scope.submitForm();
            checkIfModalWasCalled();
        });
    });

    describe('when cancelling a form', function () {
        it('should hide modal', function () {
            initialize();
            scope.cancel();
            checkIfModalWasCalled();
        });
    });

    function checkIfModalWasCalled() {
        expect(element.modal).toHaveBeenCalledWith('hide');
    }
});