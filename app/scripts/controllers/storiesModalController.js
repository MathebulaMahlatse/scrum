var app = angular.module('scrum.storiesModal', []);

app.controller('StoriesModalController', [
    '$scope', '$element', 'title', 'close',
    function($scope, $element, title, close) {

        $scope.description = null;
        $scope.estimation = null;
        $scope.owner = null;
        $scope.status = null;

        $scope.title = title;

        $scope.close = function() {
            close({
                description: $scope.description,
                estimation: $scope.estimation,
                owner: $scope.owner,
                status: $scope.status
            }, 500);
        };

        $scope.cancel = function() {
            $element.modal('hide');

            close({
                description: $scope.description,
                estimation: $scope.estimation,
                owner: $scope.owner,
                status: $scope.status
            }, 500);
        };

    }]);