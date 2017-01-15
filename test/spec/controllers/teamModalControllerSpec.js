'use strict';
describe('Unit Test for team modal controller', function () {
    beforeEach(angular.mock.module('scrum.teamModal'));

    var scope, element;
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        element = jasmine.createSpyObj('$element', ['modal']);
        $controller('TeamModalController', {
            $scope: scope,
            $element: element,
            title: 'a title',
            close: function (model, timeout) {}
        });
    }));

    describe('when submitting a form', function () {
        it('should hide modal', function () {
            scope.submitForm();
            checkIfModalWasCalled();
        });
    });

    describe('when cancelling a modal', function () {
        it('should hide modal', function () {
            scope.cancel();
            checkIfModalWasCalled();
        });
    });

    function checkIfModalWasCalled() {
        expect(element.modal).toHaveBeenCalledWith('hide');
    }
});