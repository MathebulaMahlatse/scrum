describe('Unit Test for local storage', function () {
    beforeEach(angular.mock.module('scrum.localStorage'));

    var localStorage;
    beforeEach(inject(function (LocalStorage) {
        localStorage = LocalStorage;
    }));

    describe('addModel', function () {
        it('should add a model and retrieve model', function () {
            localStorage.addModel({
                model: 'add'
            });

            expect(localStorage.retrieveModel()).toEqual({ model: 'add' })
        });
    });
});