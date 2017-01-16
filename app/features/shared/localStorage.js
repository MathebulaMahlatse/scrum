var module = angular.module('scrum.localStorage', []);

module.factory('LocalStorage', [function () {
    var _model = {};

    return {
        addModel: function (model) {
            _model = _.clone(model);
        },

        retrieveModel: function () {
            return _model;
        }
    };
}]);