var app = angular.module('scrum.storiesModal', []);

app.controller('StoriesModalController', [
    '$scope', '$element', 'title', 'close',
    function($scope, $element, title, close) {

        $scope.description = title && title.description;
        $scope.estimation = title && title.estimation;
        $scope.owner = title && title.owner;
        $scope.status = title && title.status;

        $scope.title = title.status;

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